const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const RoleController = require("../controllers/RoleController.js");

router.get("/",[authJwt.verifyToken,authJwt.isManager], async (req, res) => {
    RoleController.getAllRole(req, res);
})

router.post("/",[authJwt.verifyToken,authJwt.isManager], async (req, res) => {
    RoleController.createRole(req, res);
})

module.exports = router;
