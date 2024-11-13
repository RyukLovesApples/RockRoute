import { pool } from "../config/db.js";

export class Vote {
  constructor(user_id, post_id, comment_id) {
    this.user_id = user_id;
    this.post_id = post_id;
    this.comment_id = comment_id;
  }

  static async getCounts(post_id, comment_id) {
    try {
      const result = await pool.query("SELECT COUNT(CASE WHEN upvote = TRUE THEN 1 END) AS upvote_count, COUNT(CASE WHEN downvote = TRUE THEN 1 END) AS downvote_count FROM votes WHERE post_id = $1 OR comment_id = $2", [post_id, comment_id]);
      return result.rows[0];
    } catch (err) {
      console.log("Faile to fetch vote count: ", err);
    }
  }

  static async create(user_id, post_id, comment_id, upvote, downvote) {

    try {
      const result = await pool.query("INSERT INTO votes (user_id, post_id, comment_id, upvote, downvote) VALUES ($1, $2, $3, $4, $5) RETURNING *", [user_id, post_id, comment_id, upvote, downvote]);
      console.log("Successfully created a vote: ", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log("Failed to create a vote: ", err);
    }
  }

  static async update(vote_id, {user_id, post_id, comment_id, upvote, downvote}) {
    try {
      const result = await pool.query("UPDATE votes SET user_id = $1, post_id = $2, comment_id = $3, upvote = $4, downvote = $5 WHERE id = $6 RETURNING *", [user_id, post_id, comment_id, upvote, downvote, vote_id]);
      console.log("Successfully updated vote: ", result.rows[0]);
    } catch (err) {
      console.log("Failed to update vote: ", err);
    }
  }

  static async check(user_id, post_id, comment_id) {
    try {
      const result = await pool.query(
        `SELECT * FROM votes
        WHERE user_id = $1
        AND ((post_id = $2) OR (comment_id = $3))`,
        [user_id, post_id || null, comment_id || null]
      );
      return result.rows[0];
    } catch (err) {
      console.log("Failed to check if user has voted: ", err);
    }
  }

  static async delete(comment_id) {
    try {
      const result = await pool.query("DELETE FROM votes WHERE id = $1 RETURNING *", [comment_id]);
      console.log("Successfully deleted vote: ", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log("Failed to delete vote: ", err);
    }
  }
}
