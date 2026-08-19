"use client";

import { Button } from "@/components/ui/button";
import { useContactUsStore } from "@/store/useContactUsStore";
import ContactUsTable from "@/components/contactUs/ContactUsTable";
import ContactUsModal from "@/components/contactUs/ContactUsModal";

export default function AppointmentsPage() {
  const { setCreateModalOpen } = useContactUsStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Contact Us</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Contact Us
        </Button>
      </div>

      <ContactUsTable />
      <ContactUsModal />
    </div>
  );
}