"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormData } from "@/utils/types";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    localStorage.setItem("user", data.email);
    router.push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              {errors?.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            <div>
              <Button type="submit" className="w-full">
                {" "}
                Sign Up
              </Button>
            </div>

            {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <Link
          href="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
          Log In
          </Link>
          </p> */}
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
