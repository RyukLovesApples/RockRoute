import { Vote } from "../models/voteModel.js";
import { wss } from "../server.js";

export class VoteController {
  countVotes = async (postId, commentId) => {
    try {
      const allVotes = await Vote.getCounts(postId, commentId);
      const allVotesCount = parseInt(allVotes.upvote_count, 10) - parseInt(allVotes.downvote_count,10);
      return allVotesCount;
    } catch(err) {
      console.log("Error loading vote count: ", err);
      res.status(500).send("Error loading vote count.")
    }
  }

  checkUserVote = async (userId, postId, commentId) => {
    try {
      const vote = await Vote.check(userId, postId, commentId);
      if(vote) {
        return vote;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error checking if user has voted: ", err);
      res.status(500).send("Error checking if user has voted");
    }
  }

  voteOnPost = async (req, res) => {
    const { postId, commentId, userId, vote } = req.body;
    try {
        const existingVote = await this.checkUserVote(userId, postId,commentId);
        if (existingVote) {
          if (
              (existingVote.upvote && vote === 'upvote') ||
              (existingVote.downvote && vote === 'downvote')
          ) {
              await Vote.delete(existingVote.id);
          } else {
              const updatedVote = {
                  ...existingVote,
                  upvote: vote === 'upvote',
                  downvote: vote === 'downvote',
              };
              await Vote.update(existingVote.id, updatedVote);
          }
        } else {
          const upvote = vote === 'upvote';
          const downvote = vote === 'downvote';
          await Vote.create(userId, postId, commentId, upvote, downvote);
        }
        const voteCount = await this.countVotes(postId, commentId);
        const targetType = postId ? "post" : "comment";
        const targetId = postId || commentId;
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ type: "voteUpdate", postId, targetType, targetId, voteCount }));
          }
        });
    } catch (err) {
        console.log("Error processing vote: ", err);
        res.status(500).send("Error processing vote");
    }
  };
}
