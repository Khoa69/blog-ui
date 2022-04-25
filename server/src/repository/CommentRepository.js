const CommentModel = require("../models/CommentModel");
const PostRepository = require("./PostRepository");

const CommentRepository = {};

CommentRepository.save = async (payload) => {
  const comment = new CommentModel(payload);
  return await comment.save();
};

CommentRepository.getAllComments = async () => {
  return await CommentModel.find();
};

CommentRepository.getCommentById = async (id) => {
  return await CommentModel.findById(id);
};

CommentRepository.updateComment = async (id, payload) => {
  const comment = await CommentModel.findById(id);

  comment.desc = payload.desc;
  if (comment.type == "post") {
    await PostRepository.updateComment(comment, comment.idParent);
  }

  if (comment.type == "comment") {
    const commentP = await CommentModel.findById(comment.idParent);
    var comments = [];
    commentP?.comments.forEach((commentK) => {
      if (commentK._id != comment._id.toString()) {
        comments = [...comments, commentK];
      } else {
        comments = [...comments, comment];
      }
    });
    commentP.comments = comments;
    await commentP.save();
  }

  return await comment.save();
};

CommentRepository.commentPost = async (id, payload) => {
  const comment = new CommentModel({ ...payload, idParent: id, type: "post" });
  await comment.save();
  await PostRepository.updateCommentPost(comment, id);
};

CommentRepository.delete = async (id) => {
  const commentParent = await CommentModel.findById(id);

  if (commentParent.type == "post") {
    await PostRepository.deleteCommentPost(
      commentParent,
      commentParent.idParent,
    );
  }

  if (commentParent.type == "comment") {
    const commentP = await CommentModel.findById(commentParent.idParent);
    var comments = [];
    commentP?.comments.forEach((comment) => {
      if (comment._id != commentParent._id.toString()) {
        comments = [...comments, comment];
      }
    });
    commentP.comments = comments;
    await commentP.save();
  }
  await CommentModel.findByIdAndDelete(id);
};

CommentRepository.commentToComment = async (id, payload) => {
  const comment = new CommentModel({
    ...payload,
    idParent: id,
    type: "comment",
  });
  await comment.save();
  let commentParent = await CommentModel.findById(id);

  await commentParent.updateOne({
    $push: { comments: comment },
  });

  return {
    message: "Comment success",
  };
};

CommentRepository.likeComment = async (id, userId) => {
  const comment = await CommentModel.findById(id);

  if (!comment.likes.includes(userId)) {
    await comment.updateOne({ $push: { likes: userId } });
    return {
      like: comment.likes.length + 1,
      message: "Like success",
    };
  } else {
    await comment.updateOne({ $pull: { likes: userId } });
    return {
      like: comment.likes.length - 1,
      message: "Dislike success",
    };
  }
};

module.exports = CommentRepository;
