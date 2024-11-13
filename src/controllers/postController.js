import { Post } from "../models/postModel.js";
import { Comment } from "../models/commentModel.js";
import { buildCommentTree } from "../../public/js/utils/commentTree.js";
import { renderComment } from "../../public/js/template/commentReply.js";
import { VoteController } from "./voteController.js";

const voteController = new VoteController();

export class PostController {
  getAllPosts = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    try {
      const posts = await Post.getPosts();
      let postsWithVotes = [];
      if(posts) {
        const commentsPromises = posts.map(async (post) => {
          try {
              return await Comment.getComments(post.id);
          } catch (error) {
              console.log(`Error fetching comments for post ${post.id}: `, error);
              return [];
          }
      });
      const comments = await Promise.all(commentsPromises);
      postsWithVotes = await Promise.all(posts.map(async (post, index) => {
        post.comments = comments[index] || [];
        post.voteCount = await voteController.countVotes(post.id, null);
        if(userId) {
          post.userVote = await voteController.checkUserVote(userId, post.id, null);
        }
        return post;
      }));
      }
      res.render("index", {posts: postsWithVotes, userId: userId});
    } catch(err) {
      console.log("Error loading posts: ", err)
      res.status(500).send("Error loading posts.");
    }
  }

  getPost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user ? req.user.id : null;
    if (!postId) {
      return res.status(400).send("Post ID is required.");
    }
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send("Post not found.");
      }
      let commentTree = [];
      let votesMap = {};
      let commentsHTML = "";
      let topLevelCommentCount = 0;
      const comments = await Comment.getComments(postId);
      if(comments) {
        for(const comment of comments) {
          votesMap[comment.id] = await voteController.countVotes(null, comment.id);
        }
        const topLevelComments = comments.filter(comment => !comment.parent_comment_id);
        topLevelCommentCount = topLevelComments.length;
        commentTree = buildCommentTree(comments);
        commentsHTML = commentTree.map(comment => renderComment({...comment, voteCount: votesMap[comment.id]}, userId)).join('');
      }
      let vote;
      if(userId){
        vote = await voteController.checkUserVote(userId, postId, null);
      }
      const voteCount = await voteController.countVotes(postId, null) || null;
      res.render("post", {post: post, userId: userId, comments: commentsHTML, topLevelCount: topLevelCommentCount, userVote: vote, voteCount: voteCount});
    } catch(err) {
      console.log("Error loading post: ", err);
      res.status(500).send("Error loading post.");
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
      res.status(500).send("Error creating post.");
    }
  }

  updatePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const {title, content} = req.body;
    if(!title && !content) {
      res.status(400).send("Title and content are required.");
    }
    try {
      const post = await Post.findById(postId);
      if(post.user_id !== userId) {
        return res.status(403).send("Unauthorized to update post.")
      }
      await Post.update(postId, title, content);
      res.redirect(`/posts/${postId}`)
    } catch {
      console.log("Error updating post: ", err);
      res.status(500).send("Error updating post.");
    }
  }

  deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    try {
      const post = await Post.findById(postId);
      if(post.user_id !== userId) {
        res.status(403).send("Unauthorized to delete post.")
      }
      await Post.delete(postId);
      res.redirect("/");
    } catch (err) {
      res.status(500).send("Error deleting post.")
    }
  }

  getPostForEdit = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        res.render("postForm", { post, postId });
    } catch (err) {
        console.log("Error loading post for editing: ", err);
        res.status(500).send("Error loading post.");
    }
  }
}
