const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const { authJwt, verifySignUp } = require("../middlewares");

router.post("/register", UserController.newUser);

router.put("/edit/:id", [authJwt.verifyToken], (req, res, next) => {
  UserController.updateUser(req, res, next);
});

router.delete(
  "/sortDelete/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res, next) => {
    UserController.sortDelete(req, res, next);
  },
);

router.delete(
  "/delete/:id",
  [authJwt.verifyToken, authJwt.isManager],
  (req, res, next) => {
    UserController.deleteUser(req, res, next);
  },
);

router.get("/:id", [authJwt.verifyToken], (req, res, next) => {
  UserController.findById(req, res, next);
});

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.getAllUsers,
);

router.get(
  "/sortDelete/all",
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.getAllUsersDelete,
);

module.exports = router;
