import roleModel from "../models/roleModel.js";

const createRole = async (req, res) => {
  try {
    const { role } = req.body;
    const roleExists = await roleModel.findOne({ role_name: role });
    if (roleExists) {
      console.log(roleExists);
      return res.status(400).json({
        success: false,
        message: "The role entered already exists",
      });
    }
    const newRole = new roleModel({
      role_name: role,
    });
    const saved = await newRole.save();
    if (saved) {
      return res.status(200).json({
        success: true,
        message: "New role has been added successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to create new role",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleModel.findById(id);
    console.log(role);
    if (role) {
      res.status(200).json({
        success: true,
        message: "Role fetched successfully",
        data: role,
      });
    } else {
      res.status(400).json({
        success: true,
        message: "Role do not exist",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const roleToUpdate = await roleModel.findById(id);
    if (!roleToUpdate) {
      res.status(400).json({
        success: false,
        message: `The role doesn't exist`,
      });
      return;
    }
    roleToUpdate.role_name = role;
    console.log(roleToUpdate);
    const saved = await roleToUpdate.save();
    if (saved) {
      res.status(200).json({
        success: true,
        message: `The role name has been updated to ${roleToUpdate.role_name}`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to update the role name",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const getAllRoles = async (req, res) => {
  try {
    console.log("getAllRoles");
    const roles = await roleModel.find();
    if (roles) {
      res.status(200).json({
        success: false,
        data: roles,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `No roles exist`,
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await roleModel.deleteOne({ _id: id });
    if (deleted.deletedCount) {
      res.status(200).json({
        success: true,
        message: `Role has been deleted`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Failed deletion of role`,
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export { createRole, updateRole, deleteRole, getAllRoles, getRole };
