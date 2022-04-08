const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const { authJwt } = require("../middlewares");

router.put('/edit/:id', (req, res,next)=>{
    UserController.updateUser(req,res,next);
})

router.delete('/delete/:id',[authJwt.verifyToken,authJwt.isAdmin], (req, res,next)=>{
    UserController.deleteUser(req,res,next);
})

router.get('/:id',[authJwt.verifyToken], (req, res,next)=>{
    UserController.findById(req, res,next);
})

router.get('/',
    [authJwt.verifyToken, 
    authJwt.isAdmin],
    UserController.getAllUsers
);

module.exports = router;
