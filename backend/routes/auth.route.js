import express from "express";
import {
  login,
  register,
  logout,
  refresh,
  googleCallBack,
  profile,
  uploadImg,
} from "../controllers/user.controller.js";
import passport from "passport";
import { authentication } from "../middleware/authentication.js";
import upload from "../middleware/mutler.js";
const Router = express.Router();

Router.post("/login", login);
Router.post("/register", register);
Router.post("/refresh", refresh);
Router.post("/logout", logout);
Router.get("/profile", authentication, profile);
Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
Router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallBack
);

Router.post("/upload", authentication, upload.single("image"), uploadImg);

export default Router;
