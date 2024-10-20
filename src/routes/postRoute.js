import { Router } from "express";
import { PostController } from "../controllers/postController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const postRouter = Router();
const postController = new PostController();


postRouter.get("/new", (req, res) => res.render("postForm", {postId: null}));
postRouter.post("/new", ensureAuthenticated, postController.createPost);
postRouter.get("/:id", postController.getPost);
postRouter.get("/:id/edit", postController.getPostForEdit);
postRouter.put("/:id", postController.updatePost);
postRouter.post("/:id/delete", postController.deletePost);

export default postRouter;
