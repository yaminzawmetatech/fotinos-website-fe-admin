"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FormSelect from "../common/FormSelect";
import { usePlans } from "@/hook/usePlans";

export default function PlanForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

  const { plans, isLoading } = usePlans();

  // Format array payload into simple standard options
  const planOptions = (plans || []).map((plan: any) => ({
    id: plan.id,
    name: plan.name_en
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
      plan_id: data.plan_id,
      module_name_en: data.module_name_en,
      module_name_mm: data.module_name_mm,
      module_order: data.module_order
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">
      {/* NAME EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Name (EN)</label>
        <Input {...register("module_name_en")} required />
      </div>

      {/* NAME MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Name (MM)</label>
        <Input {...register("module_name_mm")} required />
      </div>

      {/* PLAN SELECT ELEMENT */}
      <FormSelect
        name="plan_id"
        control={control}
        options={planOptions}
        label="Plan"
        rules={{ required: "Plan is required" }}
      />

      {/* MODULE ORDER */}
      <div>
        <label className="text-sm font-medium block mb-1">Module Order</label>
        <Input
          {...register("module_order")} required
        />
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Module" : "Create Module"}
      </Button>
    </form>
  );
}