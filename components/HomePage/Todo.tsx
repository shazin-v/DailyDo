import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskCard from "./TaskCard";
import { useTaskContext } from "@/app/TaskContext";
import { Task } from "@/utils/types";

const Todo = ({ onEdit }: { onEdit: (task: Task) => void }) => {
  const { tasks, deleteTask, completeTask } = useTaskContext();

  return (
    <div className="p-6">
      {tasks.length > 0 ? (
        <div className="md:flex md:gap-4 w-full gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              onEdit={() => onEdit(task)} 
              onDelete={() => deleteTask(task.id)}
              onComplete={() => completeTask(task.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 h-full text-gray-500">
          <FontAwesomeIcon icon={faInbox} className="h-10" />
          <p className="mt-4 text-lg font-medium">No tasks available</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
