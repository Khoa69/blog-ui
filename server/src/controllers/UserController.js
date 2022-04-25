const UserRepository = require("../repository/UserRepository");

const UserController = {};

UserController.updateUser = async (req, res) => {
  const user = await UserRepository.updateUser(req.params.id, req.body);
  res.status(200).send(
    JSON.stringify({
      success: true,
      notice: "Update Success",
      data: user,
    }),
  );
};

UserController.newUser = async (req, res) => {
  console.log(req.body);
  const user = await UserRepository.newUser(req.body);
  res.status(200).send(
    JSON.stringify({
      data: user,
      notice: "Create Success",
    }),
  );
};

UserController.deleteUser = async (req, res) => {
  const user = await UserRepository.getUserByID(req.params.id);

  if (!user) {
    return res.status(400).send(
      JSON.stringify({
        message: "Account does not exist!",
      }),
    );
  }

  await UserRepository.deleteUserByID(req.params.id);
  res.status(200).send(
    JSON.stringify({
      success: true,
      notice: "Delete Success",
    }),
  );
};

UserController.findById = async (req, res) => {
  const user = await UserRepository.getUserByID(req.params.id);

  if (!user) {
    return res.status(400).send(
      JSON.stringify({
        message: "Account does not exist!",
      }),
    );
  }

  res.status(200).send(
    JSON.stringify({
      user: user,
    }),
  );
};

UserController.getAllUsers = async (req, res) => {
  const user = await UserRepository.getAllUsers();
  res.status(200).send(
    JSON.stringify({
      user: user,
    }),
  );
};

UserController.getAllUsersDelete = async (req, res) => {
  const user = await UserRepository.getAllUsersDelete();
  res.status(200).send(
    JSON.stringify({
      user: user,
    }),
  );
};
UserController.sortDelete = async (req, res) => {
  const user = await UserRepository.sortDelete(req.params.id);
  res.status(200).send(user);
};
module.exports = UserController;
