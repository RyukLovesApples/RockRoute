import { Comment } from "../models/commentModel.js";

export class CommentController {

  // getAllComments = async (req, res) => {
  //   const postId = req.posts;
  //   console.log(postId);
  //   try {
  //     // if(postId) {
  //     //   const comments = await Comment.getComments(postId);
  //     // }
  //   } catch (err) {
  //     console.log("Error loading comments: ", err);
  //     res.status(500).send("Error loading comments.");
  //   }
  // }

  createComment = async (req, res) => {
    const { content, postId, userId, parent_comment_id } = req.body;
    try {
      if(parent_comment_id){
        await Comment.create(content, postId, userId, parent_comment_id);
        res.redirect(`/posts/${postId}`);
      } else {
        await Comment.create(content, postId, userId, null);
        res.redirect(`/posts/${postId}`);
      }
    } catch (err) {
      console.log("Error creating comment: ", err);
      res.status(500).send("Error creating comment.");
    }
  }

  updateComment = async (req, res) => {
    const { postId, content, commentId } = req.body;
    const userId = req.user.id;

    if(!content) {
      res.status(400).send("Content is required.");
    }
    try {
      const comment = await Comment.findById(commentId);
      if(comment.user_id !== userId) {
        return res.status(403).send("Unauthorized to update comment.")
      }
      await Comment.update(commentId, content);
      res.redirect(`/posts/${postId}`);
    } catch(err) {
      console.log("Error updating comment: ", err);
      res.status(500).send("Error updating comment.");
    }
  }

  deleteComment = async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;
    const commentId = req.params.id;

    try {
      const comment = await Comment.findById(commentId);
      if(comment.user_id !== userId) {
        return res.status(403).send("Unauthorized to update comment.")
      }
      await Comment.delete(commentId);
      res.redirect(`/posts/${postId}`);
    } catch (err) {
      console.log("Error deleting comment: ", err);
      res.status(500).send("Error deleting comment.")
    }
  }

  commentTree = async (postId) => {
    try {
      const comments = Comment.getComments(postId);
      const commentMap = new Map();
      comments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
      });

      const tree = [];
      commentMap.forEach(comment => {
        if (comment.parent_comment_id) {
          const parent = commentMap.get(comment.parent_comment_id);
          if (parent) {
            parent.replies.push(comment);
          }
        } else {
          tree.push(comment);
        }
      });
    } catch (err) {
      console.log("Error creating comment tree: ", err);
      res.status(500).send("Error creating comment tree for display.")
    }
    return tree;
  }
}