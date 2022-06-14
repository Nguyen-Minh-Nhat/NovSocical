const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const ChildComment = require("../models/ChildComment");
var success = false;

const postController = {
  create: async (req, res) => {
    const { userID, postText } = req.body;
    const file = req.files?.postImage;
    try {
      if (file || postText) {
        var postImage = "";
        //Create new post
        var newPost = new Post({ postText, postImage, user: userID });
        await newPost.save();
        if (file) {
          postImage = await upload(
            file.tempFilePath,
            `novsocial/posts/${newPost._id}`,
          );

          //Update a post
          newPost = await Post.findOneAndUpdate(
            { _id: newPost._id },
            { postImage },
            { new: true },
          );
        }
        newPost = await Post.findOne({ _id: newPost._id }).populate({
          path: "user",
          select: "avatar name followers",
        });
        success = true;
      }
    } catch (error) {
      console.log(error);
    }

    if (req.files) await deleteTmp(req.files);
    if (success) {
      res.json({
        success,
        message: "Post a status successfully",
        newPost,
      });
    } else {
      res.json({
        success,
        message: "Cannot create a post",
      });
    }
  },

  getAllPost: async (req, res) => {
    const { userID } = req.body;
    const { page = 1, limit = 5 } = req.query;
    const user = await User.find({ _id: userID }).select("following");
    const listOfPost = await Post.find({
      user: [...user[0].following, userID],
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort("-createdAt")
      .populate({
        path: "user",
        select: "avatar name followers",
      });
    res.json({
      success: true,
      message: "This is list of post",
      listOfPost,
    });
  },

  getAPost: async (req, res) => {
    const postID = req.params.id;

    const { userID } = req.body;
    const post = await Post.findOne({
      user: userID,
      post: postID,
    }).populate({
      path: "user",
      select: "avatar name followers",
    });
    res.json({ success: true, message: "This is a post", post });
  },

  getAllPostOfAUser: async (req, res) => {
    const userID = req.params.id;

    const post = await Post.find({ user: userID }).sort("-createdAt").populate({
      path: "user",
      select: "avatar name followers",
    });
    success = true;
    if (success) {
      res.json({
        success,
        message: "This is all post of a user",
        post,
      });
    } else {
      res.json({
        success,
        message: "Get post fail",
      });
    }
  },

  update: async (req, res) => {
    const postID = req.params.id;
    const { userID, postText, isImageChange } = req.body;

    const updatePost = await Post.findOne({ _id: postID, user: userID });

    try {
      if (updatePost) {
        var postImage = updatePost.postImage;
        const file = req.files?.postImage;
        if (isImageChange === "true" && postImage !== "") {
          await destroy(postImage);
          postImage = "";
        }
        if (isImageChange === "true" && file?.name !== undefined) {
          postImage = await upload(file.tempFilePath, "novsocial/posts");
        }

        //Update a post
        const newPost = { postText, postImage, user: userID };

        var updatedPost = await Post.findOneAndUpdate(
          { _id: postID, user: userID },
          newPost,
          { new: true },
        ).populate({
          path: "user",
          select: "avatar name followers",
        });

        success = true;
      }
    } catch (error) {
      console.log(error);
    }

    if (req.files) await deleteTmp(req.files);
    if (success) {
      res.json({
        success,
        message: "Update a status successfully",
        updatedPost,
      });
    } else {
      res.json({
        success,
        message: "Update fail",
      });
    }
  },

  love: async (req, res) => {
    const { userID, postID } = req.body;
    var state = 0;

    try {
      var lovedPost = await Post.findOne({ _id: postID });

      if (!lovedPost.likes?.includes(userID)) {
        lovedPost = await Post.findByIdAndUpdate(
          { _id: postID },
          {
            $push: { likes: userID },
          },
          { new: true },
        ).populate({
          path: "user",
          select: "avatar name followers",
        });
        state = 1;
      } else {
        lovedPost = await Post.findByIdAndUpdate(
          { _id: postID },
          {
            $pull: { likes: userID },
          },
          { new: true },
        ).populate({
          path: "user",
          select: "avatar name followers",
        });
        state = -1;
      }
      success = true;
    } catch (error) {
      console.log(error);
    }
    if (req.files) await deleteTmp(req.files);
    if (success) {
      res.json({
        success,
        message: "Love a post successfully",
        state,
        lovedPost,
      });
    } else {
      res.json({
        success,
        message: "Love fail may be the post was deleted!",
      });
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;
    const { userID } = req.body;
    try {
      const deletePost = await Post.findOneAndDelete({
        _id,
        user: userID,
      });

      if (deletePost.postImage) {
        await destroyDirectory(`novsocial/posts/${deletePost._id}`);
      }
      await Comment.deleteMany({ post: deletePost._id });
      await ChildComment.deleteMany({ post: deletePost._id });

      res.json({
        success: true,
        message: "Delete a status successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Delete fail",
      });
    }
  },
};

module.exports = postController;
