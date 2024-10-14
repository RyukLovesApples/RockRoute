import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoute.js';
import { initializeSession, initializePassport } from "./config/session.js";

export const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

initializeSession(app);
initializePassport(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', userRoutes);

app.listen(port, () => {
  console.log("Server is running on Port ", port);
});
