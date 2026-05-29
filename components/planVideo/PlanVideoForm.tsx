"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import FormSelect from "../common/FormSelect";
import { usePlans } from "@/hook/usePlans";
import FormCheckbox from "../common/FormCheckbox";
import { useModules } from "@/hook/useModules";

export default function PlanVideoForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

  const { modules, isLoading } = useModules();
  const { plans, isLoading: planLoading } = usePlans();

  // Format array payload into simple standard options
  const moduleOptions = (modules || []).map((module: any) => ({
    id: module.id,
    name: module.module_name_en,
  }));

  // Format array payload into simple standard options
  const planOptions = (plans || []).map((plan: any) => ({
    id: plan.id,
    name: plan.name_en,
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
      module_id: data.module_id,
      name_en: data.name_en,
      name_mm: data.name_mm,
      video_link: data.video_link,
      video_order: data.video_order,
      is_free: data?.is_free ?? false,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">
      {/* NAME EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Name (EN)</label>
        <Input {...register("name_en")} required />
      </div>

      {/* NAME MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Name (MM)</label>
        <Input {...register("name_mm")} required />
      </div>

      {/* Plan SELECT ELEMENT */}
      <FormSelect
        name="plan_id"
        control={control}
        options={planOptions}
        label="Plan"
        rules={{ required: "Plan is required" }}
      />

      <FormSelect
        name="module_id"
        control={control}
        options={moduleOptions}
        label="Module"
        rules={{ required: "Module is required" }}
      />

      {/* Video Link */}
      <div>
        <label className="text-sm font-medium block mb-1">Video Link</label>
        <Input {...register("video_link")} required />
      </div>

      {/* Video Order */}
      <div>
        <label className="text-sm font-medium block mb-1">Video Order</label>
        <Input {...register("video_order")} required />
      </div>


      {/* Video Order */}
      <div>
        <FormCheckbox
          control={control}
          name="is_free"
          label="Is Free"
        />
      </div>
     
      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Plan Video" : "Create Plan Video"}
      </Button>
    </form>
  );
}