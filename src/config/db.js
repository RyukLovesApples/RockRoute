import pkg from "pg";
const { Pool } = pkg;
import env from "dotenv";

env.config();

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function connect() {
  try {
    await pool.connect();
    console.log("Connection to database successful!");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

connect();
