"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react"; 
import { useForm } from "react-hook-form";
import { useOurServiceStore } from "@/store/useOurServiceStore";
import { useOurServices } from "@/hook/useOurServices";
import OurServiceForm from "./OurServiceForm";
import { toast } from "@/lib/toast";

export default function OurServiceModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useOurServiceStore();
  const { createOurService, updateOurService } = useOurServices();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  // When editData changes -> set form values
  // React.useEffect(() => {
  //   console.log("hahah ",editData)
  //   if (editData) {
  //     form.reset(editData);
  //   } else {
  //     form.reset({ name: "", email: "", role: "" });
  //   }
  // }, [editData]);

  // const onSubmit = (values: any) => {
  //   if (editData) {
  //     updateOurService({ uuid: editData.uuid, data: values });
  //   } else {
  //     createOurService(values);
  //   }
  //   reset();
  //   setCreateModalOpen(false);
  // };


const onSubmit = async (values: any) => {
  try {
    if (editData) {
      await updateOurService({
        uuid: editData.uuid,
        data: values,
      });

      toast.success("Service updated successfully");
    } else {
      await createOurService(values);

      toast.success("Service created successfully");
    }

    reset();
    setCreateModalOpen(false);
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
     <DialogContent className="max-w-2xl w-[calc(100%-20px)] max-h-[90vh] overflow-y-auto overflow-x-visible rounded-2xl p-6">
      <DialogHeader className="shrink-0">
        <DialogTitle className="text-center text-orange-600 text-lg font-semibold">
          {editData ? "Edit Service" : "Create Service"}
        </DialogTitle>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto pr-2">
        <OurServiceForm editData={editData} form={form} onSubmit={onSubmit} />
      </div>
    </DialogContent>
    </Dialog>
  );
}