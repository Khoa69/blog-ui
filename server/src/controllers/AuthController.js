// const UserRepository = require("../repository/UserRepository");
// const bcrypt =require("bcrypt");
// const { generateToken } = require("../utils/jwt");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const AuthController = {};

// // AuthController.register= async(req,res)=>{
// //     const { username, email, password } = req.body;

// // 	const userByUsername = await UserRepository.getUserByUsername(username);

// // 	if (userByUsername){
// //         return res
// // 				.status(400)
// // 				.send(JSON.stringify({
// //                     message:"Username exist!"
// //                 }));
// //     }

// //     const hashPassword = await bcrypt.hash(password,12);

// //     const newUser = await UserRepository.newUser({
// //         username,
// //         email,
// //         password: hashPassword
// //     });

// //     res.status(200).json(newUser);
// // };

// // AuthController.login = async (req, res) => {
// // 	const username = req.body.username || 'test';
// // 	const password = req.body.password || '12345';

// // 	const user = await UserRepository.getUserByUsername(username);
// // 	if (!user) {
// // 		return res.status(401).send(JSON.stringify({
// //                     message:"Account does not exist!"
// //                 }));
// // 	}

// // 	const isPasswordValid = bcrypt.compareSync(password, user.password);
// // 	if (!isPasswordValid) {
// // 		return res.status(401).send(JSON.stringify({
// //                     message:"password is incorrect!"
// //                 }));
// // 	}

// // 	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

// // 	const dataForAccessToken = {
// // 		username: user.username,
// // 	};
// // 	const accessToken = await generateToken(
// // 		dataForAccessToken,
// // 		accessTokenSecret,
// // 		accessTokenLife,
// // 	);
// // 	if (!accessToken) {
// // 		return res
// // 			.status(401)
// // 			.send(JSON.stringify({
// //                     message:"Login failed!"
// //                 }));
// // 	}

// // 	return res.json({
// // 		msg: 'Login success.',
// // 		accessToken,
// // 		user,
// // 	});
// // };

const User = require("../models/UserModel");
const Role = require("../models/RoleModel");

AuthController.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        },
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
AuthController.login = async (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

      var token = jwt.sign({ id: user.id }, accessTokenSecret, {
        expiresIn: accessTokenLife, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        user: user,
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

module.exports = AuthController;
