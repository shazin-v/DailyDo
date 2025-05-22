import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit, Check, X } from "lucide-react";
import { TaskItemProps } from "@/types/task";
import { cn } from "@/lib/utils";

const TaskItem = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const handleEdit = () => {
    if (editedTitle.trim() === "") return;

    onEdit({
      ...task,
      title: editedTitle,
      description: editedDescription.trim() || undefined,
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-todo-high";
      case "medium":
        return "bg-todo-medium";
      case "low":
        return "bg-todo-low";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col p-4 mb-2 bg-white rounded-lg shadow-sm border transition-all hover:shadow-md animate-fade-in dark:bg-gray-800 dark:border-gray-700",
        task.completed && "bg-opacity-60"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex items-center">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
               className="transition-all hover:scale-110 
             border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-700 
             data-[state=checked]:bg-[#3879e2] dark:data-[state=checked]:bg-[#3879e2]
             data-[state=checked]:border-[#3879e2] dark:data-[state=checked]:border-[#3879e2]"
/>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700  dark:border-gray-600 dark:text-white"
                autoFocus
              />
            ) : (
              <div className="flex items-center">
                <span
                  className={cn(
                    "dark:text-white font-medium transition-all",
                    task.completed && "todo-complete"
                  )}
                >
                  {task.title}
                </span>
                <div
                  className={cn(
                    "ml-4 w-4 h-4 rounded-full",
                    getPriorityColor(task.priority)
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {isEditing ? (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleEdit}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={cancelEdit}
                className="h-8 w-8"
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 text-[#3879e2] hover:text-blue-500"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 text-red-500 hover:text-red-500"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Task Description Section */}
      <div className="mt-2 ml-8">
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Task description (optional)"
            className="w-full resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
          />
        ) : task.description ? (
          <p
            className={cn(
              "text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap",
              task.completed && "text-gray-400 line-through"
            )}
          >
            {task.description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default TaskItem;
