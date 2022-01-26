require("dotenv").config();
const { UserModel } = require("../models/Post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ firstName, email, password: hash });
    res.status(201).json(user);
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;
    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.status(200).json({
          user,
          jwtToken: jwt.sign(
            { userId: user.id, poster: user.firstName },
            process.env.SECRET_TOKEN,
            {
              expiresIn: "18000s",
            }
          ),
        });
        next();
      } else {
        res.status(400).json("Wrong email / password combination !");
      }
    } else {
      res.status(404).json("User not found !");
    }
  } catch (e) {
    res.status(500).send("Something broke !");
  }
};

module.exports.logout = (req, res) => {
  res.status(200).json("Logged out !");
};
