const UserModel = require("../models/UserModel");
const PostRepository = require("./PostRepository");
const bcrypt = require("bcrypt");

const UserRepository = {};

UserRepository.newUser = async (payload) => {
  const user = new UserModel(payload);
  return await user.save();
};

UserRepository.getUserByUsername = async (username) => {
  return await UserModel.findOne({ username: username });
};

UserRepository.getUserByID = async (id) => {
  return await UserModel.findById(id);
};

UserRepository.updateUser = async (id, payload) => {
  if (payload.password) {
    const hashPassword = await bcrypt.hash(payload.password, 12);
    return await UserModel.findByIdAndUpdate(id, {
      ...payload,
      password: hashPassword,
    });
  } else {
    return await UserModel.findByIdAndUpdate(id, { ...payload });
  }
};

UserRepository.sortDelete = async (id) => {
  const user = await UserModel.findById(id);
  const listPost = await PostRepository.DeleteAllPostByUserID(
    id,
    user.isDelete,
  );
  user.isDelete = !user.isDelete;
  return await user.save();
};

UserRepository.deleteUserByID = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

UserRepository.getAllUsers = async () => {
  return await UserModel.find({ isDelete: false });
};
UserRepository.getAllUsersDelete = async () => {
  return await UserModel.find({ isDelete: true });
};

module.exports = UserRepository;
