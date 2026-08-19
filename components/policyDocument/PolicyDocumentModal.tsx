"use client";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import PolicyDocumentForm, { type PolicyDocumentFormValues } from "./PolicyDocumentForm";
import { toast } from "@/lib/toast";
import { usePolicyDocumentStore } from "@/store/usePolicyDocumentStore";
import { usePolicyDocuments } from "@/hook/usePolicyDocuments";

export default function ContactUsModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = usePolicyDocumentStore();
  const { createPolicyDocument, updatePolicyDocument } = usePolicyDocuments();

  const form = useForm<PolicyDocumentFormValues>({
    defaultValues: {
      document_type: "",
      title: "",
      content: "",
      is_view: false,
      is_downloadable: false,
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        document_type: "",
        title: "",
        content: "",
        is_view: false,
        is_downloadable: false,
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: PolicyDocumentFormValues) => {
    try {
      if (editData) {
        await updatePolicyDocument({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Policy Document updated successfully");
      } else {
        await createPolicyDocument(values);

        toast.success("Policy Document created successfully");
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
            {editData ? "Edit Policy" : "Create Policy Document"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <PolicyDocumentForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
