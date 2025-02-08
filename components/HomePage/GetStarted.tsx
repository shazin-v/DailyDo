"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const GetStarted = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col md:flex-row  items-center justify-center  h-[600px]  w-full">
        <div className="w-1/2 h-full">
          <h1 className="pt-10 px-6 text-7xl">
            Schedule Your Daily Tasks With <br />{" "}
            <span className="text-[#0184fc]">DailyDo!</span>
          </h1>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#0184fc] text-white p-4 hover:bg-[#0184fc]/90 rounded-md m-6"
          >
            Get Started
          </button>
        </div>

        <div className="w-1/2 h-full">
          <Image
            src="/img/image2.jpeg"
            alt="Picture of the author"
            className="object-contain w-fit h-full"
            width={600}
            height={600}
          />
        </div>
      </div>
    </>
  );
};

export default GetStarted;
