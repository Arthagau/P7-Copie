const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middleware/multer-config.middleware");
const { checkUser } = require("../middleware/auth.middleware");

router.post(
  "/",
  checkUser,
  upload.single("postImage"),
  postController.createPost
);
router.get("/", postController.getAllPosts);
router.get("/userPosts/:id", postController.getAllUserPosts);
router.get("/:id", postController.getOnePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
