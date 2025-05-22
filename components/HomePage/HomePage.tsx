"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Task, TaskPriority } from "@/types/task";
import { useAuth } from "@/context/AuthContext";
import {
  addTask,
  deleteTask,
  getTasks,
  saveTasks,
  toggleTaskCompletion,
  updateTask,
} from "@/services/taskService";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, [user]); // Reload tasks when user changes

  const handleAddTask = (
    title: string,
    description: string,
    priority: TaskPriority
  ) => {
    try {
      const newTask = addTask({
        title,
        description: description || undefined,
        completed: false,
        priority,
      });

      setTasks((prevTasks) => [newTask, ...prevTasks]);

      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    const updatedTask = toggleTaskCompletion(id);

    if (updatedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    }
  };

  const handleDeleteTask = (id: string) => {
    const deleted = deleteTask(id);

    if (deleted) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      toast({
        title: "Task deleted",
        description: "Your task has been deleted.",
      });
    }
  };

  const handleEditTask = (updatedTask: Task) => {
    const result = updateTask(updatedTask);

    if (result) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === result.id ? result : task))
      );

      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    }
  };

  const handleClearCompleted = () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    saveTasks(filteredTasks);
    setTasks(filteredTasks);

    toast({
      title: "Completed tasks cleared",
      description: "All completed tasks have been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-6 pb-12 px-4 transition-colors duration-200">
      <div className="container max-w-3xl mx-auto">
        {!user ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8 text-center animate-scale-in">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Welcome to DailyDo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please login or register to manage your tasks.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-scale-in transition-colors duration-200">
              <TaskForm onAddTask={handleAddTask} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onClearCompleted={handleClearCompleted}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
