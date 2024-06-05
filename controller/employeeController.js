import pgClient from "../db.js";

const createEmployee = async (req, res) => {
  try {
    const { name, role_id, empcode, mail_id, phone_number } = req.body;
    const sameMailQuery = "SELECT * FROM employees WHERE mail_id = $1";
    const employWithSameMail = await pgClient.query(sameMailQuery, [mail_id]);
    if (employWithSameMail.rowCount > 0) {
      res.status(400).json({
        success: false,
        message: "Employ with same mail exists",
      });
      return;
    }

    const insertQuery =
      "INSERT INTO employees (name,role_id,empcode,mail_id,phone_number) VALUES ($1,$2,$3,$4,$5)";
    const newEmployee = await pgClient.query(insertQuery, [
      name,
      role_id,
      empcode,
      mail_id,
      phone_number,
    ]);
    if (newEmployee.rowCount > 0) {
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const getAllQuery =
      "SELECT e.*, r.role_name FROM employees e INNER JOIN roles r ON e.role_id = r.id";
    const employees = await pgClient.query(getAllQuery);
    if (employees.rowCount > 0) {
      res.status(200).json({
        success: true,
        data: employees.rows,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to fetch employees",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const getQuery =
      "SELECT * FROM employees WHERE id = $1";
    const employee = await pgClient.query(getQuery, [id]);

    if (employee.rowCount > 0) {
      res.status(200).json({
        success: true,
        data: employee.rows[0],
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Employee with this id doest not exist",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roleId, empcode, mail_id, phone_number } = req.body;
    const checkEmployeeQuery = "SELECT * FROM employees WHERE id = $1";
    const employee = await pgClient.query(checkEmployeeQuery, [id]);
    if (employee.rowCount === 0) {
      res.status(400).json({
        success: false,
        message: "This employee do not exist",
      });
      return;
    }

    const updateQuery = `UPDATE employees SET
    name = COALESCE($1,name),
    role_id = COALESCE($2,role_id),
    empcode =  COALESCE($3,empcode),
    mail_id = COALESCE($4,mail_id),
    phone_number = COALESCE($5,phone_number)
    WHERE id = $6
    RETURNING *;
    `;
    const updated = await pgClient.query(updateQuery, [
      name,
      roleId,
      empcode,
      mail_id,
      phone_number,
      id,
    ]);

    if (updated.rowCount > 0) {
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const checkIfEmployeeQuery = "SELECT * FROM employees WHERE id = $1";
    const checkIfEmployee = await pgClient.query(checkIfEmployeeQuery, [id]);

    if (checkIfEmployee.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee does not exist",
      });
    }

    const deleteQuery = "DELETE FROM roles WHERE id = $1";
    const deleted = await pgClient.query(deleteQuery, [id]);
    if (deleted.rowCount > 0) {
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};


const getEmployeeAndRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const getQuery =
      "SELECT e.*, r.role_name FROM employees e INNER JOIN roles r ON e.role_id = r.id WHERE e.id = $1";
    const employee = await pgClient.query(getQuery, [id]);

    if (employee.rowCount > 0) {
      res.status(200).json({
        success: true,
        data: employee.rows[0],
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Employee with this id doest not exist",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeAndRoles,
};
