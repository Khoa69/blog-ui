const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const AuthController = require("../controllers/AuthController.js");

router.post(
  "/register",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  AuthController.signup,
);

router.post("/login", async (req, res) => {
  AuthController.login(req, res);
});

module.exports = router;
