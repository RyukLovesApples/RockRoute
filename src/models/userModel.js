import { pool } from "../config/db.js";
import { hashPassword } from "../controllers/authController.js";

export class User {
  constructor(email, username, password) {
    this.email = email,
    this.username = username,
    this.password = password
  }

  static async create(email, username, password) {
    try {
      const hashedPassword = await hashPassword(password);
      const result = await pool.query("INSERT INTO users(email, username, password) VALUES ($1, $2, $3) RETURNING *", [email, username, hashedPassword]);
      return result.rows[0];
    } catch(err) {
      console.log("User couldnt be created: ", err);
    }
  };

  static async findById(id) {
    try{
      const userID = Number(id);
      const result = await pool.query("SELECT id, email, username FROM users WHERE id = $1", [userID]);
      return result.rows[0];
    } catch(err) {
      console.log(err);
    }
  };

  static async checkEmail(email) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      return result;
    } catch (err) {
      console.log("Failed query", err);
    }
  }
}
