export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    dueDate?: Date;
}

export type Theme = "light" | "dark";

// Define types for our context
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

export
    interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onEditTask: (task: Task) => void;
    onClearCompleted: () => void;
}


export interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export interface TaskFormProps {
    onAddTask: (
        title: string,
        description: string,
        priority: "low" | "medium" | "high"
    ) => void;
}

export type TaskPriority = "low" | "medium" | "high";

export type TaskSort = "createdAt" | "priority";