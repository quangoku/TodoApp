import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import taskRoute from "./routes/task.route.js";
import { authentication } from "./middleware/authentication.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(passport.initialize());

app.use("/", authRoute);
app.use("/tasks", authentication, taskRoute);

// khoi dong app
app.listen(3000, async () => {
  await connectDB();
  console.log("server listen at 3000");
});
