const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const Comment = require("../models/Comment");
const ChildComment = require("../models/ChildComment");
var success = false;

const childCommentController = {
  create: async (req, res) => {
    const { commentText, userID, commentID } = req.body;
    const file = req.files?.commentImage;
    const comment = await Comment.findOne({ _id: commentID }, "post");

    try {
      if (file || commentText) {
        var commentImage = "";
        //Create new childcomment
        var newChildComment = new ChildComment({
          commentText,
          commentImage,
          user: userID,
          post: comment.post,
          comment: commentID,
        });
        await newChildComment.save();

        await Comment.findOneAndUpdate(
          { _id: newChildComment.comment },
          {
            $push: { childComments: newChildComment._id },
          },
          { new: true }
        );

        if (file) {
          commentImage = await upload(
            file.tempFilePath,
            `veta/posts/${comment.post}/${newChildComment.comment}`
          );

          //Update a child comment
          newChildComment = await ChildComment.findOneAndUpdate(
            { _id: newChildComment._id },
            { commentImage },
            { new: true }
          );
        }
        newChildComment = await ChildComment.findOne({
          _id: newChildComment._id,
        })
          .populate({
            path: "user",
            select: "avatar name",
          })
          .populate({
            path: "comment",
            select: "user",
            populate: { path: "user", select: "name" },
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
        message: "Comment successfully",
        newChildComment,
      });
    } else {
      res.json({
        success,
        message: "Cannot comment at this post",
      });
    }
  },

  getAllChildComment: async (req, res) => {
    const commentID = req.params.id;
    const listOfChildComment = await ChildComment.find({ comment: commentID })
      .populate({
        path: "comment",
        select: "user",
        populate: { path: "user", select: "name" },
      })
      .populate({
        path: "user",
        select: "avatar name",
      });
    res.json({
      success: true,
      message: "This is list of child comment",
      listOfChildComment,
    });
  },

  update: async (req, res) => {
    const childCommentID = req.params.id;
    const { userID, commentText, isImageChange } = req.body;

    const updateChildComment = await ChildComment.findOne({
      _id: childCommentID,
    });

    try {
      if (updateChildComment) {
        var imageName = updateChildComment.commentImage;
        const file = req.files?.commentImage;
        if (isImageChange === "true" && imageName !== "") {
          await destroy(imageName);
        }
        if (isImageChange === "true" && file?.name !== undefined) {
          imageName = await upload(
            file.tempFilePath,
            `veta/posts/${updateChildComment.post}/${updateChildComment.comment}`
          );
        }

        //Update a child comment
        var newChildComment = {
          commentText,
          commentImage: imageName,
        };

        newChildComment = await ChildComment.findOneAndUpdate(
          { _id: childCommentID, user: userID, post: updateChildComment.post },
          newChildComment,
          { new: true }
        )
          .populate({
            path: "comment",
            select: "user",
            populate: { path: "user", select: "name" },
          })
          .populate({
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
        message: "Update a child comment successfully",
        newChildComment,
      });
    } else {
      res.json({
        success,
        message: "Update a child comment faily",
      });
    }
  },

  delete: async (req, res) => {
    const childCommentID = req.params.id;

    const { userID } = req.body;
    try {
      const deleteComment = await ChildComment.findOneAndDelete({
        _id: childCommentID,
        user: userID,
      });

      await Comment.findOneAndUpdate(
        { _id: deleteComment.comment },
        {
          $pull: { childComments: deleteComment._id },
        }
      );

      if (deleteComment?.commentImage !== "") {
        await destroy(deleteComment.commentImage);
      }

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

module.exports = childCommentController;
