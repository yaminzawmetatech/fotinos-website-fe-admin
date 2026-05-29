"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import OrderForm from "./OrderForm";
import { toast } from "@/lib/toast";
import { useOrderStore } from "@/store/useOrderStore";
import { useOrders } from "@/hook/useOrders";

export default function OrderModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useOrderStore();
  const { createOrder, updateOrder } = useOrders();

  const form = useForm({
    defaultValues: {
      plan_id: "",
      user_id: "",
      total_amount: "",
      status: "",
      payment_method_id: "",
      screenshot_image_url: "",
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        plan_id: "",
        user_id: "",
        total_amount: "",
        status: "",
        payment_method_id: "",
        screenshot_image_url: "",
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateOrder({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Order updated successfully");
      } else {
        await createOrder(values);

        toast.success("Order created successfully");
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
            {editData ? "Edit Order" : "Create Order"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <OrderForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}