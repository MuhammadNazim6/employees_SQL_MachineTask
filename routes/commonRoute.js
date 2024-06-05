import express from "express";
const commonRoute = express();

import { getEmployeeAndRoles } from "../controller/employeeController.js";


commonRoute.get("/:id", getEmployeeAndRoles);


export default commonRoute;
