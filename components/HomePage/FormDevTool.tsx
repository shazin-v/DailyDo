"use client";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function FormDevTool() {
  const { control } = useForm({
    mode: "onChange",
  });

  return <DevTool control={control} />;
}
