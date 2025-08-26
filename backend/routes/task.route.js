import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "../controllers/task.controller.js";
const Router = express.Router();

Router.get("/", getTasks);
Router.post("/create", createTask);
Router.delete("/delete/:id", deleteTask);
Router.put("/update/:id", updateTask);
Router.put("/toggle/:id", toggleTask);
export default Router;
