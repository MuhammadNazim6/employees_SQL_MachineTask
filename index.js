import express from "express";
import { Client } from "pg";
import employeesRoute from "./routes/employeesRoute.js";
import rolesRoute from "./routes/rolesRoute.js";

const port = process.env.PORT;

const pgClient = new Client({
  connectionString: process.env.POSTGRESS_STRING,
});
pgClient
  .connect()
  .then(() => console.log("Connected to database psql"))
  .catch((err) => console.log("Error occured while DB connection", err.stack));

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 })
);

app.use(
  "/api/employees",
  (req, res, next) => {
    req.pgClient = pgClient;
    next();
  },
  employeesRoute
);
app.use(
  "/api/roles",
  (req, res, next) => {
    req.pgClient = pgClient;
    next();
  },
  rolesRoute
);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
