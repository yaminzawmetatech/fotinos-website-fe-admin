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
    if (editData) {
      reset(editData);
    } else {
      reset();
    }
  }, [editData, reset]);

  const submitHandler = async (data: any) => {
    const payload = {
      name: data.name,
      email: data.email,
      ph_no: data.ph_no,
      ...(!editData && { password: data.password }),
    };

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

      {/* <div>
        <label className="text-sm font-medium">Password</label>
        <Input {...register("password")} required type="password" />
      </div> */}
      {!editData ? <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            required
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
      </div> : <></>}
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