import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useTaskContext } from "@/app/TaskContext";
import { HomeHeaderProps, Task } from "@/utils/types";

const HomeHeader: React.FC<HomeHeaderProps> = ({
  editTaskData,
  setEditTaskData,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const { addTask, editTask } = useTaskContext();
  const { register, handleSubmit, setValue, reset } =
    useForm<Omit<Task, "id" | "date">>();

  useEffect(() => {
    if (editTaskData) {
      setValue("title", editTaskData.title);
      setValue("description", editTaskData.description);
    } else {
      reset(); 
    }
  }, [editTaskData, setValue, reset]);

  const onSubmit = (data: Omit<Task, "id" | "date">) => {
    if (editTaskData) {
      editTask(editTaskData.id, data.title, data.description); // Update Task
    } else {
      addTask(data); 
    }
    reset();
    setEditTaskData(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-white shadow-md py-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-[70%] gap-4">
          <h1 className="text-xl font-semibold">Your Tasks</h1>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => {
                  setEditTaskData(null);
                  setIsDialogOpen(true);
                }}
              >
                Add New Task
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editTaskData ? "Edit Task" : "Add New Task"}
                </DialogTitle>
                <DialogDescription>
                  {editTaskData
                    ? "Modify your task details"
                    : "Fill in the details to create a new task."}
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="col-span-3"
                    {...register("title", { required: "Title is required" })}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    className="col-span-3"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editTaskData ? "Save Changes" : "Add Task"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
