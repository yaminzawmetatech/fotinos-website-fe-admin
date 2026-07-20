"use client";

import { Button } from "@/components/ui/button";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import AppointmentTable from "@/components/appointment/AppointmentTable";
import AppointmentModal from "@/components/appointment/AppointmentModal";

export default function AppointmentsPage() {
  const { setCreateModalOpen } = useAppointmentStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Appointment
        </Button>
      </div>

      <AppointmentTable />
      <AppointmentModal />
    </div>
  );
}