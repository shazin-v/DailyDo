import React, { useState } from "react";
import HomeHeader from "./HomeHeader";
import Todo from "./Todo";
import { Task } from "@/utils/types";

const Homes = () => {
  const [editTaskData, setEditTaskData] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setEditTaskData(task);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <HomeHeader
        editTaskData={editTaskData}
        setEditTaskData={setEditTaskData}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <Todo onEdit={handleEdit} />
    </div>
  );
};

export default Homes;
