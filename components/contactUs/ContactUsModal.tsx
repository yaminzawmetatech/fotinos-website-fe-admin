"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import ContactUsForm from "./ContactUsForm";
import { toast } from "@/lib/toast";
import { useContactUsStore } from "@/store/useContactUsStore";
import { useContactUs } from "@/hook/useContactUs";

export default function ContactUsModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useContactUsStore();
  const { createContactUs, updateContactUs } = useContactUs();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateContactUs({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Contact Us updated successfully");
      } else {
        await createContactUs(values);

        toast.success("Contact Us created successfully");
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
            {editData ? "Edit Contact Us" : "Create Contact Us"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <ContactUsForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}