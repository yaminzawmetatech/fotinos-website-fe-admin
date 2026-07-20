"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import AppointmentForm from "./AppointmentForm";
import { toast } from "@/lib/toast";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useAppointments } from "@/hook/useAppointments";

export default function AppointmentModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useAppointmentStore();
  const { createAppointment, updateAppointment } = useAppointments();

  const form = useForm({
    defaultValues: {
      service_id: "",
      name: "",
      email: "",
      phone: "",
      appointment_date: "",
      status: "",
      note: "",
      meeting_link: ""
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        service_id: "",
        name: "",
        email: "",
        phone: "",
        appointment_date: "",
        status: "",
        note: "",
        meeting_link: ""
      });
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateAppointment({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("Appointment updated successfully");
      } else {
        await createAppointment(values);

        toast.success("Appointment created successfully");
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
            {editData ? "Edit Appointment" : "Create Appointment"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <AppointmentForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}