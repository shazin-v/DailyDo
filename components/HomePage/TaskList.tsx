import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import { Task, TaskListProps } from "@/types/task";

const TaskList = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onClearCompleted,
}: TaskListProps) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "priority">("createdAt");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    let result = [...tasks];

    // Apply filter
    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    // Apply sorting
    if (sortBy === "priority") {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      });
    } else {
      result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    setFilteredTasks(result);
  }, [tasks, filter, sortBy]);

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="w-full">
      <TaskFilter
        filter={filter}
        sortBy={sortBy}
        onFilterChange={setFilter}
        onSortChange={setSortBy}
        completedCount={completedCount}
        onClearCompleted={onClearCompleted}
      />

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed animate-fade-in">
            {filter === "all"
              ? "No tasks yet. Add your first task above!"
              : `No ${filter} tasks.`}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 flex justify-between">
        <span>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} total
        </span>
        <span>{completedCount} completed</span>
      </div>
    </div>
  );
};

export default TaskList;
