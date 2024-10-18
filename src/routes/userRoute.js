import { Router } from 'express';
import { User } from "../models/userModel.js";
import { authenticateUser, verifyUser } from "../controllers/authController.js";

const router = Router();

verifyUser();

router.get("/login", (req, res) => {
  res.render("login", { isLoginPage: true });
});

router.get("/register", (req, res) => {
  res.render("register", { isLoginPage: true});
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const checkEmail = await User.checkEmail(email);
    if (checkEmail.rows.length > 0) {
      res.send("Account already exists");
      return;
    } else {
      await User.create(email, username, password);
      res.redirect("/");
    }
  } catch (err) {
    console.log("Registration failed: ", err);
    res.send("Registration failed");
  }
});

router.post("/login", authenticateUser);

export default router;
