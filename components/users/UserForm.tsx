"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserForm({ form, onSubmit }: any) {
  const { register, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label className="text-sm font-medium">Name</label>
        <Input {...register("name")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" {...register("email")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <Input {...register("password")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Phone No</label>
        <Input {...register("ph_no")} required />
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
      >
        Save
      </Button>
    </form>
  );
}