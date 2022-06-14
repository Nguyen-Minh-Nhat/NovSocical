const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const Comment = require("../models/Comment");
const ChildComment = require("../models/ChildComment");
const Post = require("../models/Post");
var success = false;

const commentController = {
  create: async (req, res) => {
    const { commentText, userID, postID } = req.body;
    const file = req.files?.commentImage;

    try {
      if (file || commentText) {
        var commentImage = "";
        //Create new comment
        var newComment = new Comment({
          commentText,
          commentImage,
          user: userID,
          post: postID,
        });
        await newComment.save();

        //Update a post
        await Post.findOneAndUpdate(
          { _id: postID },
          {
            $push: { comments: newComment._id },
          },
          { new: true }
        );

        if (file) {
          commentImage = await upload(
            file.tempFilePath,
            `veta/posts/${postID}/${newComment._id}`
          );

          //Update a comment
          newComment = await Comment.findOneAndUpdate(
            { _id: newComment._id },
            { commentImage },
            { new: true }
          );
        }
        newComment = await Comment.findOne({
          _id: newComment._id,
        }).populate({
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
      return res.json({
        success,
        message: "Comment successfully",
        newComment,
      });
    } else {
      return res.json({
        success,
        message: "Cannot comment at this post",
      });
    }
  },

  getAllComment: async (req, res) => {
    const postID = req.params.id;
    const listOfComment = await Comment.find({
      post: postID,
    }).populate({
      path: "user",
      select: "avatar name",
    });
    res.json({
      success: true,
      message: "This is list of comment",
      listOfComment,
    });
  },

  update: async (req, res) => {
    const commentID = req.params.id;
    const { userID, commentText, isImageChange, postID } = req.body;

    const updateComment = await Comment.findOne({
      _id: commentID,
      user: userID,
      post: postID,
    });

    if (!updateComment) {
      res.json({
        success: false,
        message: "You do not have permission to update it",
      });
    }

    try {
      var imgName = updateComment.commentImage;
      const file = req.files?.commentImage;
      if (isImageChange === "true" && imgName !== "") {
        await destroy(imgName);
      }
      if (isImageChange === "true" && file?.name !== undefined) {
        imgName = upload(file.tempFilePath, "veta/comments");
      }

      //Update a comment
      const newComment = {
        commentText,
        commentImage: imgName,
        user: userID,
        post: postID,
      };

      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentID, user: userID, post: postID },
        newComment,
        { new: true }
      ).populate({
        path: "user",
        select: "avatar name",
      });

      return res.json({
        success: true,
        message: "Update a comment successfully",
        updatedComment,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Update fail",
        error,
      });
    }
  },

  delete: async (req, res) => {
    const commentID = req.params.id;

    const { userID } = req.body;
    try {
      const deleteComment = await Comment.findOneAndDelete({
        _id: commentID,
        user: userID,
      });

      await Post.findOneAndUpdate(
        { _id: deleteComment.post },
        {
          $pull: { comments: deleteComment._id },
        }
      );

      await ChildComment.deleteMany({ comment: deleteComment._id });

      await destroyDirectory(
        `veta/posts/${deleteComment.post}/${deleteComment._id}`
      );

      success = true;
    } catch (error) {
      console.log(error);
    }

    if (success) {
      res.json({
        success: true,
        message: "Delete a comment successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Delete fail",
      });
    }
  },
};

module.exports = commentController;
