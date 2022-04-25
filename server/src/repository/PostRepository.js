const PostModel = require("../models/PostModel");
const CommentService = require("../service/CommentService");

const PostRepository = {};

PostRepository.getAllComments = async (id, res) => {
  const Post = await PostModel.findById(id);
  var Comments = [];
  Post.comments.length
    ? await Post.comments.forEach(async (comment, index) => {
        let commentByID = await CommentService.getCommentById(comment);
        Comments = await [...Comments, commentByID];
        if (index === Post.comments.length - 1) {
          while (Comments.length < Post.comments.length) {
            var commentLast = await CommentService.getCommentById(comment);
            Comments = await [...Comments, commentLast];
          }
          res.status(200).send(Comments);
        }
      })
    : res.status(200).send([]);
};

PostRepository.save = async (payload) => {
  const Post = new PostModel(payload);
  return await Post.save();
};

PostRepository.updatePost = async (id, payload) => {
  return await PostModel.findByIdAndUpdate(id, payload);
};

PostRepository.getAllPost = async () => {
  return await PostModel.find({ isDelete: false });
};

PostRepository.DeleteAllPostByUserID = async (id, check) => {
  const listPost = await PostModel.find({ isDelete: check, userId: id });
  listPost.forEach((post) => {
    PostRepository.sortDelete(post._id);
  });
};

PostRepository.getAllTrashPost = async () => {
  return await PostModel.find({ isDelete: true });
};

PostRepository.updateCommentPost = async (comment, PostId) => {
  const post = await PostModel.findById(PostId);
  await post.updateOne({ $push: { comments: comment } });
};

PostRepository.deleteCommentPost = async (commentK, PostId) => {
  const post = await PostModel.findById(PostId);
  var comments = [];
  post?.comments.forEach((comment) => {
    if (comment._id != commentK._id.toString()) {
      comments = [...comments, comment];
    }
  });

  post.comments = comments;
  await post.save();
};
PostRepository.updateComment = async (commentK, PostId) => {
  const post = await PostModel.findById(PostId);
  var comments = [];
  post?.comments.forEach((comment) => {
    if (comment._id != commentK._id.toString()) {
      comments = [...comments, comment];
    } else {
      comments = [...comments, commentK];
    }
  });

  post.comments = comments;
  await post.save();
};
PostRepository.sortDelete = async (id) => {
  const post = await PostModel.findById(id);

  post.isDelete = !post.isDelete;
  return await post.save();
};

PostRepository.delete = async (id) => {
  const post = await PostModel.findById(id);

  await post?.comments.forEach((comment) => {
    CommentService.delete(comment);
  });

  return await PostModel.findByIdAndDelete(id);
};
PostRepository.getPostByID = async (id) => {
  const post = await PostModel.findById(id);
  return post;
};
PostRepository.getPostPage = async (perPage, page, res, req) => {
  const cateName = req.query.cateName;
  const userId = req.query.userId;
  if (userId) {
    console.log(userId);
    await PostModel.find({ userId, isDelete: false })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, posts) => {
        res.send({
          posts,
          current: page,
          pages: Math.ceil(posts.length / perPage),
        });
      });
  }
  if (cateName) {
    await PostModel.find({
      category: {
        $in: [cateName],
      },
      isDelete: false,
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, posts) => {
        PostModel.countDocuments((err, count) => {
          if (err) return next(err);
          res.send({
            posts,
            current: page,
            pages: Math.ceil(posts.length / perPage),
          });
        });
      });
  } else {
    await PostModel.find({ isDelete: false })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, posts) => {
        PostModel.countDocuments((err, count) => {
          if (err) return next(err);
          res.send({
            posts,
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  }
};

PostRepository.likePost = async (id, userId) => {
  const post = await PostModel.findById(id);

  if (!post.likes.includes(userId)) {
    await post.updateOne({ $push: { likes: userId } });
    return {
      like: post.likes.length + 1,
      message: "Like success",
    };
  } else {
    await post.updateOne({ $pull: { likes: userId } });
    return {
      like: post.likes.length - 1,

      message: "Dislike success",
    };
  }
};

module.exports = PostRepository;
