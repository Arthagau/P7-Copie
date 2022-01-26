const { BOOLEAN } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../config/database");

const PostModel = db.define("post", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postMessage: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  poster: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  postImage: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "",
  },
});

const UserModel = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue: "./images/profil/image-utilisateur-base.png",
  },
  bio: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE,
  },
});

const CommentModel = db.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE,
  },
});

UserModel.hasMany(PostModel, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
PostModel.belongsTo(UserModel);

UserModel.hasMany(CommentModel, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
CommentModel.belongsTo(UserModel);

PostModel.hasMany(CommentModel, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
CommentModel.belongsTo(PostModel);

db.sync({ alter: true });

module.exports = {
  PostModel,
  UserModel,
  CommentModel,
};
