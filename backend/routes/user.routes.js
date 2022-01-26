const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const { checkUser } = require("../middleware/auth.middleware");

// auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

// user info
router.get("/", checkUser, userCtrl.getAllUsers);
router.get("/:id", checkUser, userCtrl.userInfo);
router.put("/:id", checkUser, userCtrl.updateUser);
router.delete("/:id", checkUser, userCtrl.deleteUser);

module.exports = router;
