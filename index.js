import express from "express";
import employeesRoute from "./routes/employeesRoute.js";
import rolesRoute from "./routes/rolesRoute.js";

const port = process.env.PORT;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 })
);

app.use(
  "/api/employees",
  employeesRoute
);
app.use(
  "/api/roles",
  rolesRoute
);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
