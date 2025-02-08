import React, { useEffect, useState } from "react";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
};

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: true } : task
    );
    setTasks(updatedTasks);
  };

  const handleEdit = (id: number) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      description: "Task description",
      date: new Date().toLocaleString(),
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="p-6">
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Task
      </button>

      {tasks.length > 0 ? (
        <div className="md:flex md:gap-4 w-full gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
              onComplete={() => handleComplete(task.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 h-full text-gray-500">
          <FontAwesomeIcon icon={faInbox} className="h-10" />
          <p className="mt-4 text-lg font-medium">No data</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
