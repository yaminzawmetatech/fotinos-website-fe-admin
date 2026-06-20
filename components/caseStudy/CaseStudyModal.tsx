"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import CaseStudyForm from "./CaseStudyForm";
import { toast } from "@/lib/toast";
import { useCaseStudyStore } from "@/store/useCaseStudyStore";
import { useCaseStudies } from "@/hook/useCaseStudies";

export default function CaseStudyModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useCaseStudyStore();
  const { createCaseStudy, updateCaseStudy } = useCaseStudies();

  const form = useForm({
    defaultValues: {
      name_en: "",
      name_mm: "",
      description_en: "",
      description_mm: ""
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        name_en: "",
        name_mm: "",
        description_en: "",
        description_mm: ""
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateCaseStudy({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Case Study updated successfully");
      } else {
        await createCaseStudy(values);

        toast.success("Case Study created successfully");
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
            {editData ? "Edit Case Study" : "Create Case Study"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <CaseStudyForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}