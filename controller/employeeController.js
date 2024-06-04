import employeeModel from "../models/employeeModel.js";

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find().populate("roleId");
    if (employees) {
      res.status(200).json({
        success: true,
        data: employees,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to fetch employees",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findById(id).populate("roleId");

    if (employee) {
      res.status(200).json({
        success: true,
        data: employee,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Employee with this id doest not exist",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, roleId, empcode, mail_id, phone_number } = req.body;
    const employWithSameMail = await employeeModel.findOne({ mail_id });
    if (employWithSameMail) {
      res.status(400).json({
        success: false,
        message: "Employ with same mail exists",
      });
      return;
    }
    const newEmployee = new employeeModel({
      name,
      roleId,
      empcode,
      mail_id,
      phone_number,
    });
    const saved = await newEmployee.save();
    if (saved) {
      res.status(200).json({
        success: true,
        message: "New employee has been added",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to add a new employee",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roleId, empcode, mail_id, phone_number } = req.body;
    const employee = await employeeModel.findById(id);
    if (!employee) {
      res.status(400).json({
        success: false,
        message: "This employee do not exist",
      });
      return;
    }

    const updated = await employeeModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name || employee.name,
          roleId: roleId || employee.roleId,
          empcode: empcode || employee.empcode,
          mail_id: mail_id || employee.mail_id,
          phone_number: phone_number || employee.phone_number,
        },
      },
      { new: true }
    );
    console.log("UPDATED:", updated);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "The employee have been updated",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to update the employee data",
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await employeeModel.deleteOne({ _id: id });
    if (deleted.deletedCount) {
      res.status(200).json({
        success: true,
        message: `Employee has been deleted`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Unable to delete the employee`,
      });
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
