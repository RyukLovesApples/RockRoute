import { Post } from "../models/postModel.js";

export class PostController {
  constructor() {
  }

  getAllPosts = async (req, res) => {
    try {
      const posts = await Post.getPosts();
      console.log(posts);
      res.render("index", {posts: posts});
    } catch(err) {
      console.log("Error loading posts: ", err)
      res.status(500).send("Error loading posts");
    }
  }

  getPost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user ? req.user.id : null;

    if (!postId) {
      return res.status(400).send("Post ID is required");
    }
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send("Post not found");
      }
        res.render("post", {post: post, userId: userId});
    } catch(err) {
      console.log("Error loading post: ", err);
      res.status(500).send("Error loading post");
    }
  }

  createPost = async (req, res) => {
    const post = req.body;
    const userId = req.user.id;
    if (!post.title || !post.content) {
      return res.status(400).send("Title and content are required.");
    }
    try{
      await Post.create(post.title, post.content, userId);
      res.redirect("/");
    } catch(err) {
      console.log("Error creating post: ", err);
      res.status(500).send("Error creating post");
    }
  }

  updatePost = async (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    if(!title && !content) {
      res.status(400).send("Title and content are required.");
    }
    try {
      await Post.update(id, title, content);
      res.redirect(`/posts/${id}`)
    } catch {
      console.log("Error updating post: ", err);
      res.status(500).send("Error updating post");
    }
  }

  deletePost = async (req, res) => {
    const id = req.params.id;
    try {
      await Post.delete(id);
      res.redirect("/");
    } catch (err) {
      res.status(500).send("Error deleting post")
    }
  }

  getPostForEdit = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        res.render("postForm", { post, postId });
    } catch (err) {
        console.log("Error loading post for editing: ", err);
        res.status(500).send("Error loading post");
    }
  }

  authorizedToChangePost = async(req, res) => {
    const postId = req.params.id;
    try {

    } catch (err) {
      console.log("Error checking for authorization: ", err);
      res.status(500).send("Error checking for authorization")
    }
  }
}