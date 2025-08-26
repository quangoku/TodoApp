import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new Schema(
  {
    title: { type: String },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
