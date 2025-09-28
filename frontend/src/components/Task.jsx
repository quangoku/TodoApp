import { MdDeleteOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
export default function Task({ task, handleDelete, handleToggle, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleSave() {
    handleEdit(task._id, newTitle);
    setIsEditing(false);
  }

  return (
    <div className="flex h-11  items-center justify-between border-b-1 border-blue-300 pb-3">
      <div className="flex items-center gap-3  h-full">
        {task.isCompleted ? (
          <FaRegCheckCircle
            size={"28px"}
            color="orange"
            className="cursor-pointer"
            onClick={() => {
              handleToggle(task._id);
            }}
          />
        ) : (
          <FaRegCircle
            size={"28px"}
            className="cursor-pointer "
            onClick={() => {
              handleToggle(task._id);
            }}
          />
        )}
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
            className="text-2xl border-b border-orange-400 focus:outline-none"
          />
        ) : (
          <p
            className={`duration-300 text-2xl ${
              task.isCompleted ? "text-gray-400 line-through" : ""
            }`}
          >
            {task.title}
          </p>
        )}
      </div>
      <div className="flex h-full items-center gap-3">
        <FaPen
          size={"25px"}
          color="orange"
          className="cursor-pointer p-1 rounded-full  hover:bg-gray-300  duration-300"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        />
        <MdDeleteOutline
          size={"25px"}
          color="orange"
          onClick={() => {
            handleDelete(task._id);
          }}
          className="cursor-pointer rounded-full  hover:bg-gray-300  duration-300"
        />
      </div>
    </div>
  );
}
