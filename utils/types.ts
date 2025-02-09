export interface FormData {
  email: string;
  password: string;
};

export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
};

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "date">) => void;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
};

export interface HomeHeaderProps {
  editTaskData: Task | null;
  setEditTaskData: (task: Task | null) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
};

export interface TaskProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
};