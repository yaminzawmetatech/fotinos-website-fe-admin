"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import FormSelect from "../common/FormSelect";

export default function ContactUsForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

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
      phone: data.phone,
      company: data.company,
      message: data.message
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">
      {/* NAME */}
      <div>
        <label className="text-sm font-medium block mb-1">Name</label>
        <Input {...register("name")} required />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium block mb-1">Email</label>
        <Input {...register("email")} required />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-medium block mb-1">Phone</label>
        <Input {...register("phone")} required />
      </div>

      {/* COMPANY */}
      <div>
        <label className="text-sm font-medium block mb-1">Company</label>
        <Input {...register("company")} />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="text-sm font-medium block mb-1">Message</label>
        <Input {...register("message")} />
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Contact Us" : "Create Contact Us"}
      </Button>
    </form>
  );
}