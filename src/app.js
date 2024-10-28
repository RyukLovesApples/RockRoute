import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import postRouter from "./routes/postRoute.js";
import userRoutes from "./routes/userRoute.js";
import commentRouter from "./routes/commentRoute.js";
import { initializeSession, initializePassport } from "./config/session.js";
import { PostController } from "./controllers/postController.js";
import methodOverride from "method-override";
import { dirname } from "path";

export const app = express();
const port = 3000;
const postController = new PostController();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

initializeSession(app);
initializePassport(app);

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

app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
