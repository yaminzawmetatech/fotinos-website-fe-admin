"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import PlanForm from "./OrderForm";
import { toast } from "@/lib/toast";
import { usePlanStore } from "@/store/usePlanStore";
import { usePlans } from "@/hook/usePlans";

export default function PlanModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = usePlanStore();
  const { createPlan, updatePlan } = usePlans();

  const form = useForm({
    defaultValues: {
      service_id: "",
      name_en: "",
      name_mm: "",
      price: "",
      outline_en: "",
      outline_mm: "",
    },
  });

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
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updatePlan({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Plan updated successfully");
      } else {
        await createPlan(values);

        toast.success("Plan created successfully");
      }

      handleClose(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[calc(100%-20px)] max-h-[90vh] overflow-y-auto overflow-x-visible rounded-2xl p-6">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-center text-orange-600 text-lg font-semibold">
            {editData ? "Edit Plan" : "Create Plan"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <PlanForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}