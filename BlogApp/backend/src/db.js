const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "pass",
  database: process.env.DB_NAME || "blogdb",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

module.exports = pool;