"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useOurServices } from "@/hook/useOurServices";
import FormSelect from "../common/FormSelect";

export default function PlanForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

  const { ourServices, isLoading } = useOurServices();

  // Format array payload into simple standard options
  const serviceOptions = (ourServices || []).map((service: any) => ({
    id: service.id,
    name: service.name_en,
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
      name_en: data.name_en,
      name_mm: data.name_mm,
      price: data.price,
      outline_en: data.outline_en,
      outline_mm: data.outline_mm,
      description_en: data.description_en,
      description_mm: data.description_mm,
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

      {/* SERVICE SELECT ELEMENT */}
      <FormSelect
        name="service_id"
        control={control}
        options={serviceOptions}
        label="Service"
        rules={{ required: "Service is required" }}
      />

      {/* DESCRIPTION EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Description (EN)</label>
        <Input
          {...register("description_en")}
          className="h-24 !items-start !py-3"
        />
      </div>

      {/* DESCRIPTION MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Description (MM)</label>
        <Input
          {...register("description_mm")}
          className="h-24 !items-start !py-3"
        />
      </div>

      {/* OUTLINE EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Outline (EN)</label>
        <Input {...register("outline_en")} required />
      </div>

      {/* OUTLINE MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Outline (MM)</label>
        <Input {...register("outline_mm")} required />
      </div>

      {/* PRICE */}
      <div>
        <label className="text-sm font-medium block mb-1">Price</label>
        <Input {...register("price")} required />
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Plan" : "Create Plan"}
      </Button>
    </form>
  );
}