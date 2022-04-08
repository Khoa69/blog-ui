const RoleRepository = require("../repository/RoleRepository");

const RoleController= {};

RoleController.getAllRole = async (req, res) => {
    const roles = await RoleRepository.getAllRole();

    res.status(200).send(roles);
}

RoleController.createRole = async (req, res) => {
    const role = await RoleRepository.create(req.body);

    res.status(201).send(JSON.stringify({
        data:role,
        notice:"Create Success!"
    }));


}
module.exports = RoleController;
