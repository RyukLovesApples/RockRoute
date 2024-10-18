import session from "express-session";
import env from "dotenv";
import passport from "passport";
import { User } from "../models/userModel.js";

env.config();

export function initializeSession(app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false, maxAge: 30 * 60 * 1000}
    })
  );
}

export function initializePassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id);
      cb(null, user);
    } catch(err) {
      cb(err, null);
    }
  });
}
