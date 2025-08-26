import Task from "../models/task.model.js";

export async function createTask(req, res) {
  try {
    const userId = req.user.id;
    const title = req.body.title;
    const newTask = await Task.create({
      title: title,
      isCompleted: false,
      userId: userId,
    });
    res
      .status(202)
      .json({ message: "task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "failed to create task " });
  }
}
export async function getTasks(req, res) {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId: userId });
    res.status(202).json({ message: "get task done", tasks: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get tasks" });
  }
}
export async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (task !== null) {
      res.status(200).json({ message: "deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to delete" });
  }
}
export async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title: title,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (task !== null) {
      res.status(200).json({ message: "updated successfully", task: task });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to update" });
  }
}
export async function toggleTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({ message: "Task updated", task: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
