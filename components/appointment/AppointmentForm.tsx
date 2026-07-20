"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import FormSelect from "../common/FormSelect";
import { useOurServices } from "@/hook/useOurServices";

export default function AppointmentForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

  const { ourServices, isLoading } = useOurServices();

  // Format array payload into simple standard options
  const serviceOptions = (ourServices || []).map((service: any) => ({
    id: service.id,
    name: service.name_en
  }));

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset();
    }
  }, [editData, reset]);

  const submitHandler = async (data: any) => {
    const payload = {
      service_id: data.service_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      appointment_date: data.appointment_date,
      status: data.status,
      meeting_link: data.meeting_link
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

      {/* SERVICE SELECT ELEMENT */}
      <FormSelect
        name="service_id"
        control={control}
        options={serviceOptions}
        label="Service"
        rules={{ required: "Service is required" }}
      />

      {/* PHONE */}
      <div>
        <label className="text-sm font-medium block mb-1">Phone</label>
        <Input {...register("phone")} required />
      </div>

      {/* APPOINTMENT DATE */}
      <div>
        <label className="text-sm font-medium block mb-1">
          Appointment Date
        </label>
        <Input
          type="datetime-local"
          {...register("appointment_date", {
            required: "Appointment date is required",
          })}
        />
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium block mb-1">Note</label>
        <Input {...register("note")} />
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium block mb-1">Status</label>
        <Input {...register("status")} required />
      </div>

      {/* Meeting Link */}
      <div>
        <label className="text-sm font-medium block mb-1">Meeting Link</label>
        <Input {...register("meeting_link")}  />
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Appointment" : "Create Appointment"}
      </Button>
    </form>
  );
}