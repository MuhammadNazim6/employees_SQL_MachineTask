import pg from "pg";
const { Client } = pg;

const pgClient = new Client({
  host: "localhost",
  user: "postgres",
  port: process.env.PSQL_PORT,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DB,
});

pgClient 
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

export default pgClient;
