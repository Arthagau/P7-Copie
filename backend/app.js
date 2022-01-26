const express = require("express");
const db = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

db.authenticate()
  .then(() => console.log("Database connected !"))
  .catch((err) => console.log("Error..." + err));

// routes
app.use("/auth", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

// permet de créer un chemin d'accès
app.use("/images", express.static("./images"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
