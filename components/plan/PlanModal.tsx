"use client";

import axios from "axios";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import PlanForm, { type PlanFormValues } from "./PlanForm";
import { toast } from "@/lib/toast";
import { usePlanStore } from "@/store/usePlanStore";
import { usePlans } from "@/hook/usePlans";

type PlanEditData = PlanFormValues & {
  uuid: string;
};

export default function PlanModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = usePlanStore();
  const { createPlan, updatePlan } = usePlans();
  const currentEditData = editData as PlanEditData | null;

  const form = useForm<PlanFormValues>({
    defaultValues: {
      service_id: "",
      name_en: "",
      name_mm: "",
      price: "",
      outline_en: "",
      outline_mm: "",
      description_en: "",
      description_mm: "",
    },
  });

  useEffect(() => {
    if (currentEditData) {
      form.reset({
        service_id: currentEditData.service_id ?? "",
        name_en: currentEditData.name_en ?? "",
        name_mm: currentEditData.name_mm ?? "",
        price: currentEditData.price ?? "",
        outline_en: currentEditData.outline_en ?? "",
        outline_mm: currentEditData.outline_mm ?? "",
        description_en: currentEditData.description_en ?? "",
        description_mm: currentEditData.description_mm ?? "",
      });
      return;
    }

    form.reset({
      service_id: "",
      name_en: "",
      name_mm: "",
      price: "",
      outline_en: "",
      outline_mm: "",
      description_en: "",
      description_mm: "",
    });
  }, [currentEditData, form]);

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        service_id: "",
        name_en: "",
        name_mm: "",
        price: "",
        outline_en: "",
        outline_mm: "",
        description_en: "",
        description_mm: "",
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: PlanFormValues) => {
    try {
      if (currentEditData) {
        await updatePlan({
          uuid: currentEditData.uuid,
          data: values,
        });

        toast.success("Plan updated successfully");
      } else {
        await createPlan(values);

        toast.success("Plan created successfully");
      }

      handleClose(false);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      toast.error(message || "Something went wrong");
    }
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[calc(100%-20px)] max-h-[90vh] overflow-y-auto overflow-x-visible rounded-2xl p-6">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-center text-orange-600 text-lg font-semibold">
            {currentEditData ? "Edit Plan" : "Create Plan"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <PlanForm
            key={currentEditData?.uuid ?? "create"}
            editData={currentEditData}
            form={form}
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
