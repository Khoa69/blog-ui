const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    desc: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    idParent: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", CommentSchema);
