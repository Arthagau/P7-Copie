const { PostModel, CommentModel } = require("../models/Post.model");
const { post } = require("../routes/post.routes");

module.exports.createPost = async (req, res, next) => {
  try {
    const { body, file, userId, poster } = req;
    if (!file) {
      delete req.body.postImage;
      if (req.body.postMessage.length >= 2) {
        const post = await PostModel.create({
          userId: req.userId,
          poster: req.poster,
          ...body,
        });
        res.status(201).json(post);
      } else {
        res
          .status(400)
          .json("2 characters minimum or simply upload a picture to post !");
      }
    } else {
      const post = await PostModel.create({
        userId: req.userId,
        poster: req.poster,
        ...body,
        postImage: `${req.protocol}://${req.get("host")}/images/posts/${
          req.file.filename
        }`,
      });
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll({
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json("Can't find posts !");
  }
};

module.exports.getAllUserPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll({
      where: { userId: req.params.id },
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json("Can't find posts !");
  }
};

module.exports.getOnePost = async (req, res) => {
  try {
    const post = await PostModel.findOne({ where: { id: req.params.id } });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json("Can't find post !");
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    PostModel.update(
      { postMessage: req.body.postMessage },
      { returning: true, where: { id: req.params.id } }
    ).then(res.status(200).json("Successful request !"));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    PostModel.destroy({ where: { id: req.params.id } }).then(
      CommentModel.destroy({ where: { postId: req.params.id } }),
      res.status(200).json("Post deleted !")
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
