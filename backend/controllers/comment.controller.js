const { UserModel, CommentModel } = require("../models/Models");

module.exports.CreateComment = async (req, res, next) => {
  try {
    const { body, userId, poster } = req;
    if (req.body.comment.length >= 2) {
      const postComment = await CommentModel.create({
        userId: req.userId,
        poster: req.poster,
        ...body,
      });
      res.status(201).json(postComment);
    } else {
      res.status(400).json("2 characters minimum to post a comment !");
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports.getAllComments = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const allComments = await CommentModel.findAll({
      where: {
        postId: postId,
      },
      include: UserModel,
    });
    res.status(201).json(allComments);
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports.getOneComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const oneComment = await CommentModel.findOne({ where: { id: commentId } });
    res.status(201).json(oneComment);
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    CommentModel.destroy({ where: { id: commentId } }).then(
      res.status(200).json("Comment deleted !")
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
