
import { Task } from "../types/task";
import Cookies from "js-cookie";

// Get the current user ID
const getCurrentUserId = (): string | null => {
    const userCookie = Cookies.get("dailydo-user");
    if (!userCookie) return null;

    try {
        const user = JSON.parse(userCookie);
        return user.id;
    } catch (error) {
        console.error("Error parsing user data from cookie:", error);
        return null;
    }
};

// Get storage key for current user
const getUserStorageKey = (): string => {
    const userId = getCurrentUserId();
    return userId ? `dailydo-tasks-${userId}` : "dailydo-tasks";
};

// Get tasks from localStorage for the current user
export const getTasks = (): Task[] => {
    const storageKey = getUserStorageKey();
    const tasksString = localStorage.getItem(storageKey);
    if (!tasksString) return [];

    try {
        const parsedTasks = JSON.parse(tasksString);
        // Convert string dates back to Date objects
        return parsedTasks.map((task:Task) => ({
            // return parsedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
    } catch (error) {
        console.error(`Error parsing tasks from localStorage for key ${storageKey}:`, error);
        return [];
    }
};

// Save tasks to localStorage for the current user
export const saveTasks = (tasks: Task[]): void => {
    const storageKey = getUserStorageKey();
    try {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
        console.error(`Error saving tasks to localStorage for key ${storageKey}:`, error);
    }
};

// Add a new task for the current user
export const addTask = (task: Omit<Task, "id" | "createdAt">): Task => {
    const tasks = getTasks();
    const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date(),
    };

    saveTasks([...tasks, newTask]);
    return newTask;
};

// Update a task for the current user
export const updateTask = (updatedTask: Task): Task | null => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

    if (taskIndex === -1) return null;

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);
    return updatedTask;
};

// Delete a task for the current user
export const deleteTask = (id: string): boolean => {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);

    if (filteredTasks.length === tasks.length) return false;

    saveTasks(filteredTasks);
    return true;
};

// Toggle task completion for the current user
export const toggleTaskCompletion = (id: string): Task | null => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) return null;

    const updatedTask = {
        ...tasks[taskIndex],
        completed: !tasks[taskIndex].completed
    };

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);
    return updatedTask;
};