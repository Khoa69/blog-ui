const CommentModel = require("../models/CommentModel");

const CommentService = {};

CommentService.delete = async (id) => {
  const commentParent = await CommentModel.findById(id);

  await commentParent.comments.forEach(async (comment) => {
    const commentChild = await CommentModel.findById(comment);
    if (commentChild.comments.length > 0) {
      console.log("test");
      await CommentService.delete(comment);
    }
    await CommentModel.findByIdAndDelete(comment);
  });
  await CommentModel.findByIdAndDelete(id);
};

CommentService.getCommentById = async (id) => {
  const comment = await CommentModel.findById(id);
  return comment;
};

module.exports = CommentService;
