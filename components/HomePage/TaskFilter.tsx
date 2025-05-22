import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskSort } from "@/types/task";

interface TaskFilterProps {
  filter: "all" | "active" | "completed";
  sortBy: "createdAt" | "priority";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  onSortChange: (sortBy: "createdAt" | "priority") => void;
  completedCount: number;
  onClearCompleted: () => void;
}

const TaskFilter = ({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
  completedCount,
  onClearCompleted,
}: TaskFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2 animate-fade-in">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={sortBy}
          onValueChange={(value: TaskSort) => onSortChange(value)}
        >
          <SelectTrigger className="w-36 dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Added</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>

        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Clear Completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskFilter;
