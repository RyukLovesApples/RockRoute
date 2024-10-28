import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import { CommentController } from "../controllers/commentController.js";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post("/new", ensureAuthenticated, commentController.createComment);
commentRouter.put("/:id", commentController.updateComment);
commentRouter.delete("/:id/delete", commentController.deleteComment);

export default commentRouter;
