const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const PostController = require("../controllers/PostController.js");

router.post("/create", async (req, res) => {
  PostController.create(req, res);
});

router.put("/:id", async (req, res) => {
  PostController.update(req, res);
});

router.get("/", async (req, res) => {
  PostController.getAllPost(req, res);
});

router.get("/trash", async (req, res) => {
  PostController.getAllTrashPost(req, res);
});

router.get("/page/", async (req, res) => {
  PostController.getPostPage(req, res);
});

router.get("/page/:page", async (req, res) => {
  PostController.getPostPage(req, res);
});

router.get("/:id", async (req, res) => {
  PostController.getPostById(req, res);
});

router.delete("/sortDelete/:id", [authJwt.verifyToken], (req, res, next) => {
  PostController.sortDelete(req, res, next);
});

router.delete("/:id", [authJwt.verifyToken], async (req, res) => {
  PostController.delete(req, res);
});

router.get("/comments/:id", async (req, res) => {
  PostController.getAllComments(req, res);
});

router.put("/like/:id", async (req, res) => {
  PostController.like(req, res);
});

module.exports = router;
