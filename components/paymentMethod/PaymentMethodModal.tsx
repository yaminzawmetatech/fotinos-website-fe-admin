"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import PaymentMethodForm from "./PaymentMethodForm";
import { toast } from "@/lib/toast";
import { usePaymentMethodStore } from "@/store/usePaymentMethodStore";
import { usePaymentMethods } from "@/hook/usePaymentMethods";

export default function PaymentMethodModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = usePaymentMethodStore();
  const { createPaymentMethod, updatePaymentMethod } = usePaymentMethods();

  const form = useForm({
    defaultValues: {
      name_en: "",
      name_mm: "",
      account_name: "",
      account_number: ""
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        name_en: "",
        name_mm: "",
        account_name: "",
        account_number: ""
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updatePaymentMethod({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Payment Method updated successfully");
      } else {
        await createPaymentMethod(values);

        toast.success("Payment Method created successfully");
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
            {editData ? "Edit Payment Method" : "Create Payment Method"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <PaymentMethodForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}