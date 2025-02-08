"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);
  const router = useRouter();

  return (
    <div className="bg-gray-400 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between w-[98%] items-center ">
        <h1>DailyDo</h1>
        <div className="space-x-6">
          <button onClick={() => router.push("/")} className="">
            Home
          </button>
          {user ? (
            <button>My Task</button>
          ) : (
            <button onClick={() => router.push("/login")} className="">
              Login
            </button>
          )}
          {user ? (
            <button>Logout</button>
          ) : (
            <button onClick={() => router.push("/signup")} className="">
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
