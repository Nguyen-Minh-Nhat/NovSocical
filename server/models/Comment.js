const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    childComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "childComment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
