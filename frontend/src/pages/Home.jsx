import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import { toast, ToastContainer } from "react-toastify";
import getProfile from "../utils/getProfile.js";
import {
  getTasksRoute,
  createTasksRoute,
  deleteTasksRoute,
  toggleTaskRoute,
  updateTaskRoute,
  logoutRoute,
} from "../utils/APIRoutes";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, settitle] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getPhoto() {
      const profile = await getProfile();
      setPhoto(profile.photo);
    }
    getPhoto();
  }, []);

  useEffect(() => {
    async function getTasks() {
      const res = await fetch(getTasksRoute, {
        method: "get",
        credentials: "include",
      });
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      const data = await res.json();
      setTasks(data.tasks);
    }
    getTasks();
  }, []);

  function validate() {
    if (title.trim().length === 0) {
      toast.warn("Task can't be an empty string");
      return false;
    }
    return true;
  }

  async function createTask(title) {
    if (!validate()) {
      return;
    }
    try {
      const res = await fetch(createTasksRoute, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
        credentials: "include",
      });
      const data = await res.json();
      setTasks([...tasks, data.task]);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete(id) {
    try {
      await fetch(`${deleteTasksRoute}/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleToggle(id) {
    try {
      const res = await fetch(`${toggleTaskRoute}/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setTasks(tasks.map((task) => (task._id === id ? data.task : task)));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEdit(id, title) {
    try {
      const res = await fetch(`${updateTaskRoute}/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: title }),
      });
      const data = await res.json();
      setTasks(tasks.map((task) => (task._id == id ? data.task : task)));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleLogout() {
    try {
      const res = await fetch(logoutRoute, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="wrapper h-screen space-y-8  ">
      <div
        className="grid grid-cols-3 items-center py-2 px-4"
        style={{ backgroundColor: "#F1ECE6" }}
      >
        <div></div>
        <header className="text-center text-5xl">TODO</header>
        <div className="flex items-center justify-self-end space-x-4">
          {photo ? (
            <img
              onClick={() => {
                navigate("/profile");
              }}
              src={photo}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-600 cursor-pointer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/40x40/cccccc/333333?text=?";
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
              ?
            </div>
          )}
          <button
            className="px-4 py-2 text-lg rounded-lg cursor-pointer hover:text-amber-600 duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div>
        <form
          action=""
          className="text-center"
          onSubmit={(e) => {
            e.preventDefault();
            createTask(title);
            settitle("");
          }}
        >
          <input
            type="text"
            placeholder="What do you need to do "
            required
            className="h-12 w-xl rounded-l-full p-5 text-xl outline-none"
            style={{ backgroundColor: "#F1ECE6" }}
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <button
            type="submit"
            style={{ backgroundColor: "#76B7CD" }}
            className="h-12 text-xl cursor-pointer px-6  text-white font-semibold rounded-r-full "
          >
            ADD
          </button>
        </form>
      </div>

      <div
        style={{ backgroundColor: "#F1ECE6" }}
        className="w-2xl  min-h-2/3 mx-auto px-10 rounded-4xl py-3"
      >
        <div className="space-y-8">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
            ></Task>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
