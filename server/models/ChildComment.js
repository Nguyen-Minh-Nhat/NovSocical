const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChildCommentSchema = new Schema(
  {
    commentText: String,
    commentImage: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("childComment", ChildCommentSchema);
