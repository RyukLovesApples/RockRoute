import { pool } from "../config/db.js";

export class Post {
  constructor(title, content, user_id) {
    this.title = title,
    this.content = content,
    this.upvotes = 0,
    this.user_id = user_id
  }

  static async getPosts() {
    try{
      const result = await pool.query("SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id");
      return result.rows;
    } catch(err) {
      console.log("Failed to fetch posts: ", err);
    }
  }

  static async findById(id) {
    try{
      const result = await pool.query("SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1", [id]);
      return result.rows[0];
    } catch(err) {
      console.log("Failed to fetch post: ", err);
    }
  }

  static async create(title, content, user_id) {
    try {
      const result = await pool.query("INSERT INTO posts(title, content, user_id) VALUES ($1, $2, $3) RETURNING *", [title, content, user_id]);
      console.log("Successfully created post: ", result.rows[0]);
      return result.rows[0];
    } catch(err) {
      console.log("Failed to create post: ", err);
    }
  }

  static async update(id, title, content) {
    try {
      const result = await pool.query("UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *", [title, content, id]);
      console.log("Successfully updated post: ", result.rows[0]);
      return result.rows[0];
    } catch(err) {
      console.log("Failed to update post: ", err);
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
      console.log("Deleted post: ", result.rows[0]);
      return result.rows[0];
    } catch(err) {
      console.log("Failed to delete post: ", err);
    }
  }

  static async upvotePost(id) {
    try {
      const result = await pool.query("UPDATE posts SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *", [id]);
      console.log("Successfully upvoted post: ", result.rows[0]);
      return result.rows[0];
    } catch(err) {
      console.log("Failed to upvote post: ", err);
    }
  }
}
