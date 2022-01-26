const { UPSERT } = require("sequelize/dist/lib/query-types");
const { UserModel, PostModel, CommentModel } = require("../models/Models");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.findAll();
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  const user = await UserModel.findOne({ where: { id: req.params.id } });
  if (user === null) {
    res.status(400).json({ message: "Utilisateur non trouvé !" });
  } else {
    res.status(200).json(user);
  }
};

module.exports.updateUser = (req, res) => {
  UserModel.update(
    { bio: req.body.bio },
    { returning: true, where: { id: req.params.id } }
  ).then(res.status(200).json("Reqûete réussie !"));
};

module.exports.deleteUser = (req, res) => {
  try {
    CommentModel.destroy({ where: { userId: req.params.id } })
      .then(PostModel.destroy({ where: { userId: req.params.id } }))
      .then(UserModel.destroy({ where: { id: req.params.id } }));
    res.status(200).json("User deleted !");
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
