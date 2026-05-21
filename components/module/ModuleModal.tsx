"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import ModuleForm from "./ModuleForm";
import { toast } from "@/lib/toast";
import { useModuleStore } from "@/store/useModuleStore";
import { useModules } from "@/hook/useModules";

export default function ModuleModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useModuleStore();
  const { createModule, updateModule } = useModules();

  const form = useForm({
    defaultValues: {
      plan_id: "",
      module_name_en: "",
      module_name_mm: "",
      module_order: "",
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        plan_id: "",
        module_name_en: "",
        module_name_mm: "",
        module_order: "",
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateModule({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Module updated successfully");
      } else {
        await createModule(values);

        toast.success("Module created successfully");
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
            {editData ? "Edit Module" : "Create Module"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <ModuleForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}