const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String
    },
    title:{
      type: String,
    },
    category:{
       type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    createdAt:{
      type:Date
    },
    comments:{
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    isDelete:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
