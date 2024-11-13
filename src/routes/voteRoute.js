import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import { VoteController } from "../controllers/voteController.js";

const voteRouter = Router();
const voteController = new VoteController();

voteRouter.post("/", ensureAuthenticated, voteController.voteOnPost);
// voteRouter.delete("/:id", voteController.deleteVote);

export default voteRouter;
