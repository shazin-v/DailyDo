import React from "react";
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

const HomeHeader = () => {
  return (
    <div className="bg-white shadow-md py-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-[70%] gap-4">
          <h1 className="text-xl font-semibold">Your Tasks</h1>
          <input
            type="text"
            placeholder="Search Tasks Here..."
            className="w-full md:w-[50%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Add New
              </button>
              {/* <Button variant="outline">Edit Profile</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                    Fill the form below to add a new task
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value=""
                    className="col-span-3"
                    placeholder="Enter Task Title"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value=""
                    className="col-span-3"
                    placeholder="Enter Task Description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant={"outline"} type="submit">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <select className="px-3 py-2 border rounded-md bg-gray-100">
            <option value="notcompleted">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
