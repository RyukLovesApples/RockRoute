import { Router } from 'express';
import { User } from "../models/userModel.js";
import { authenticateUser, verifyUser } from "../controllers/authController.js";

const router = Router();

verifyUser();

router.get("/", (req, res) => {
  res.render("index");
});

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
    const checkEmail = await User.checkEmail(email); // Make sure to await the checkEmail call
    if (checkEmail.rows.length > 0) {
      res.send("Account already exists");
      return; // Make sure to return after sending a response
    } else {
      await User.create(email, username, password); // Make sure to await the create call
      res.redirect("/");
    }
  } catch (err) {
    console.log("Registration failed: ", err);
    res.send("Registration failed");
  }
});

router.post("/login", authenticateUser); // Use the authenticateUser function

export default router; // Export the router
