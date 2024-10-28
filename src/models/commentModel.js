import { pool } from "../config/db.js";

export class Comment {
  constructor (content, user_id, post_id, parent_comment_id = null){
    this.content = content,
    this.user_id = user_id,
    this.post_id = post_id,
    this.parent_comment_id = parent_comment_id
  }

  static async getComments(postId) {
    try {
      const result = await pool.query("SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = $1", [postId]);
      return result.rows;
    } catch (err) {
      console.log("Failed to fetch comments: ", err);
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query("SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = $1", [id]);
      return result.rows[0];
    } catch (err) {
      console.log("Failed to fetch comment: ", err);
    }
  }

  static async create(content, post_id, user_id, parent_comment_id) {
    try {
      const result = await pool.query("INSERT INTO comments(content, user_id, post_id, parent_comment_id, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *", [content, user_id, post_id, parent_comment_id]);
      console.log("Successfully created comment: ", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log("Failed to create comment: ", err);
    }
  }

  static async update(id, content) {
    try {
      const result = await pool.query("UPDATE comments SET content = $1, created_at = CURRENT_TIMESTAMP WHERE comments.id = $2 RETURNING *", [content, id]);
      console.log("Successfully updated comment to: ", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log("Failed to update comment: ", err);
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query("DELETE FROM comments WHERE id = $1 RETURNING *", [id]);
      console.log("Successfully deleted comment: ", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log("Failed to delete comment: ", err);
    }
  }

}
