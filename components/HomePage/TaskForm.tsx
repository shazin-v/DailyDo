import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { TaskFormProps, TaskPriority } from "@/types/task";

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      toast({
        title: "Task title is required",
        description: "Please enter a title for your task.",
        variant: "destructive",
      });
      return;
    }

    onAddTask(title.trim(), description.trim(), priority);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6 animate-scale-in"
    >
      <div>
        <Input
          type="text"
          placeholder="Task heading..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full font-medium dark:text-white  dark:border-gray-700"
        />
      </div>

      <div>
        <Textarea
          placeholder="Task description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none dark:border-gray-700 dark:text-white"
          rows={3}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select
          value={priority}
          onValueChange={(value: TaskPriority) => setPriority(value)}
        >
          <SelectTrigger className="w-full sm:w-36 dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className="w-full sm:w-auto flex items-center gap-1 bg-[#3879e2]"
        >
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
