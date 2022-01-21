const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ChildComment = require("../models/ChildComment");
const { post } = require("../routes/auth");
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
            `veta/posts/${newPost._id}`
          );

          //Update a post
          newPost = await Post.findOneAndUpdate(
            { _id: newPost._id },
            { postImage },
            { new: true }
          ).populate({
            path: "user",
            select: "avatar name",
          });
        }
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
    const listOfPost = await Post.find({ user: userID }).populate({
      path: "user",
      select: "avatar name",
    });
    res.json({ success: true, message: "This is list of post", listOfPost });
  },

  getAPost: async (req, res) => {
    const postID = req.params.id;

    const { userID } = req.body;
    const Post = await Post.findOne({ user: userID, post: postID }).populate({
      path: "user",
      select: "avatar name",
    });
    res.json({ success: true, message: "This is a post", Post });
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
          postImage = await upload(file.tempFilePath, "veta/posts");
        }

        //Update a post
        const newPost = { postText, postImage, user: userID };

        var updatedPost = await Post.findOneAndUpdate(
          { _id: postID, user: userID },
          newPost,
          { new: true }
        ).populate({
          path: "user",
          select: "avatar name",
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
          { new: true }
        );
        state = 1;
      } else {
        lovedPost = await Post.findByIdAndUpdate(
          { _id: postID },
          {
            $pull: { likes: userID },
          },
          { new: true }
        );
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
      const deletePost = await Post.findOneAndDelete({ _id, user: userID });

      await destroyDirectory(`veta/posts/${deletePost._id}`);
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
