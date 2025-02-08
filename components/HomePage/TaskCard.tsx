import React from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

type TaskProps = {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
};

const TaskCard: React.FC<TaskProps> = ({
  title,
  description,
  date,
  isCompleted,
  onEdit,
  onDelete,
  onComplete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border flex flex-col gap-2 w-80">
      {/* Task Title & Status */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span
          className={`px-2 py-1 text-sm rounded-md font-medium ${
            isCompleted ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isCompleted ? "Completed" : "Incomplete"}
        </span>
      </div>

      {/* Task Description */}
      <p className="text-gray-600 text-sm">{description}</p>

      {/* Task Date */}
      <div className="text-gray-500 text-xs bg-gray-100 p-2 rounded-md">
        {date}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition"
        >
          <FaTrash />
        </button>
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="text-green-500 hover:text-green-700 transition"
          >
            <FaCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
