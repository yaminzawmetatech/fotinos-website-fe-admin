"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import PlanVideoForm from "./PlanVideoForm";
import { toast } from "@/lib/toast";
import { usePlanVideoStore } from "@/store/usePlanVideoStore";
import { usePlanVideos } from "@/hook/usePlanVideos";

export default function PlanVideoModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = usePlanVideoStore();
  const { createPlanVideo, updatePlanVideo } = usePlanVideos();

  const form = useForm({
    defaultValues: {
      plan_id: "",
      module_id: "",
      name_en: "",
      name_mm: "",
      video_link: "",
      video_order: "",
      is_free: "",
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        plan_id: "",
        module_id: "",
        name_en: "",
        name_mm: "",
        video_link: "",
        video_order: "",
        is_free: "",
      },);
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updatePlanVideo({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Plan Video updated successfully");
      } else {
        await createPlanVideo(values);

        toast.success("Plan Video created successfully");
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
            {editData ? "Edit Plan Video" : "Create Plan Video"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <PlanVideoForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}