"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-400 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between w-[98%] items-center ">
        <h1>DailyDo</h1>
        <div className="space-x-6">
          <button onClick={() => router.push("/")} className="">
            Home
          </button>
          <button onClick={() => router.push("/login")} className="">
            Login
          </button>
          <button onClick={() => router.push("/signup")} className="">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
