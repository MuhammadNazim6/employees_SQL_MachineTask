import pgClient from "../db.js";

const createRole = async (req, res) => {
  try {
    const { role } = req.body;
    const queryText = "SELECT * FROM roles WHERE role_name = $1";
    const roleExists = await pgClient.query(queryText, [role]);
    if (roleExists.rows.length > 0) {
      console.log(roleExists);
      return res.status(400).json({
        success: false,
        message: "The role entered already exists",
      });
    }

    const insertQuery =
      "INSERT INTO roles (role_name) VALUES ($1) RETURNING id";
    const insertResult = await pgClient.query(insertQuery, [role]);

    if (insertResult.rowCount > 0) {
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const getQuery = "SELECT * FROM roles WHERE id = ($1)";
    const role = await pgClient.query(getQuery, [id]);
    if (role.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Role fetched successfully",
        data: role.rows[0],
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Role does not exist",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const checkExistQuery = "SELECT * FROM roles WHERE id = $1";
    const roleToUpdate = await pgClient.query(checkExistQuery, [id]);

    if (roleToUpdate.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: `The role doesn't exist`,
      });
      return;
    }

    const updateQuery = "UPDATE roles SET role_name = $1 WHERE id = $2";
    const updated = await pgClient.query(updateQuery, [role, id]);

    if (updated.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: `The role name has been updated to ${role}`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to update the role",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const getAllQuery = "SELECT * FROM roles";
    const roles = await pgClient.query(getAllQuery);
    if (roles.rowCount > 0) {
      res.status(200).json({
        success: false,
        data: roles.rows,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `No roles exist`,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};


const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const checkRoleQuery = 'SELECT * FROM roles WHERE id = $1';
    const roleCheck = await pgClient.query(checkRoleQuery, [id]);

    if (roleCheck.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Role does not exist",
      });
    }
    
    const deleteQuery = "DELETE FROM roles WHERE id = $1"
    const deleted = await pgClient.query(deleteQuery,[id])
    if (deleted.rowCount > 0) {
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
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

export { createRole, updateRole, deleteRole, getAllRoles, getRole };
