const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.status(403).json({ message: "Wrong authentication !" });
      } else {
        req.userId = decodedToken.userId;
        req.poster = decodedToken.poster;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
