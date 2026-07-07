"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function UserForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset } = form;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const defaultValues = {
      name: "",
      email: "",
      ph_no: "",
      password: "",
    };

    if (editData) {
      reset({ ...defaultValues, ...editData, password: "" });
    } else {
      reset(defaultValues);
    }
  }, [editData, reset]);

  const submitHandler = async (data: any) => {
    const payload: any = {
      name: data.name,
      email: data.email,
      ph_no: data.ph_no,
    };

    if (!editData) {
      payload.password = data.password;
    } else if (data.password) {
      payload.password = data.password;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">

      <div>
        <label className="text-sm font-medium">Name</label>
        <Input {...register("name")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" {...register("email")} required />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Password{editData ? " (optional)" : ""}
        </label>
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            required={!editData}
            placeholder={editData ? "Leave blank to keep the current password" : ""}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {editData ? (
          <p className="mt-1 text-xs text-gray-500">
            Leave blank to keep the current password.
          </p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium">Phone No</label>
        <Input {...register("ph_no")} required />
      </div>

      <Button type="submit" className="w-full">
        {editData ? "Update User" : "Create User"}
      </Button>
    </form>
  );
}