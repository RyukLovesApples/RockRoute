import bcrypt from "bcrypt";
import passport from "passport";
import {Strategy} from "passport-local";
import { User } from "../models/userModel.js";

const saltRounds = 10;

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        reject(err);
      } else {
        resolve(hash);
      }
    })
  })
};

export const authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

export function verifyUser() {
  passport.use(
    new Strategy({ usernameField: 'email' }, async function verify(email, password, cb) {
      try {
        const result = await User.checkEmail(email);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
}
