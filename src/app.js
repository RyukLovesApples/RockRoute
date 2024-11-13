import express from "express";
import methodOverride from "method-override";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { initializeSession, initializePassport } from "./config/session.js";
import { PostController } from "./controllers/postController.js";
import commentRouter from "./routes/commentRoute.js";
import postRouter from "./routes/postRoute.js";
import userRoutes from "./routes/userRoute.js";
import voteRouter from "./routes/voteRoute.js";

const app = express();
console.log("Initialized express server")
const postController = new PostController();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

initializeSession(app);
console.log("Initialized Session")
initializePassport(app);
console.log("Initialized Passport")

app.use(express.static(path.join(__dirname, "..", 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", postController.getAllPosts);
app.use("/", userRoutes);
app.use("/posts/", postRouter);
app.use("/comments/", commentRouter);
app.use("/vote", voteRouter);

export default app;
