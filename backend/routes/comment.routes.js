const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const { checkUser } = require("../middleware/auth.middleware");

router.post("/", checkUser, commentCtrl.CreateComment);
router.get("/all/:id", commentCtrl.getAllComments);
router.get("/:id", commentCtrl.getOneComment);
router.delete("/:id", checkUser, commentCtrl.deleteComment);

module.exports = router;
