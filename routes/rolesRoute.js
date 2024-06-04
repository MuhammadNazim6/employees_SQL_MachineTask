import express from "express";
const roleRoute = express();
import {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRole,
} from "../controller/rolesController.js";

roleRoute.get("/full", getAllRoles);
roleRoute.get("/:id", getRole);
roleRoute.post("/", createRole);
roleRoute.put("/:id", updateRole);
roleRoute.delete("/:id", deleteRole);

export default roleRoute;
