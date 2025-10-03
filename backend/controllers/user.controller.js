import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import cloudinary from "../utils/cloudinary.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_CLIENT_ID,
      clientSecret: process.env.GG_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            provider: profile.provider,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export function googleCallBack(req, res) {
  const user = { id: req.user._id, username: req.user.username };
  const accessToken = generateAccessToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });
  res.redirect("http://localhost:5173/");
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}

export const register = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).json({ message: "email already exist" });
    } else {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const newUser = await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        provider: "credentials",
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "register successfully", user: newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "failed to register" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email });
  if (!data) {
    return res.status(404).json({ message: "account is not exist" });
  }
  const isCorrectPassword = await bcrypt.compare(password, data.password);
  if (!isCorrectPassword) {
    return res.status(400).json({ message: "password is incorrect" });
  }

  const user = { id: data.id, username: data.username, email: data.email };
  const accessToken = generateAccessToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  secure: true,      
  sameSite: "none", 
  });

  return res.status(202).json({ message: "login successfully" });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true, 
    sameSite: "none",
  });

  res.sendStatus(204);
};

export const profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.sendStatus(404).json({ message: "user not found" });
    } else {
      return res.status(202).json({
        message: "Done get user profile",
        profile: { username: user.username, photo: user.photo },
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const uploadImg = async (req, res) => {
  cloudinary.uploader.upload(req.file.path, async function (err, result) {
    if (err) {
      return res.status(500).json({
        message: "server failed to upload img",
      });
    } else {
      const user = await User.findById({ _id: req.user.id });
      const url = cloudinary.url(result.public_id, {
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      });
      user.photo = url;
      await user.save();
      return res
        .status(200)
        .json({ message: "change pfp successfull", url: url });
    }
  });
};
