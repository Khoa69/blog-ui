const RoleModel = require("../models/RoleModel");

const RoleRepository ={};

RoleRepository.create = async(payload) => {
    const Role = new RoleModel(payload);
    return await Role.save();
}

RoleRepository.getAllRole =async()=> {
    return await RoleModel.find();
}
module.exports = RoleRepository;
