"use client";

import OurServiceModal from "@/components/ourService/OurServiceModal";
import OurServicesTable from "@/components/ourService/OurServiceTable";
import { Button } from "@/components/ui/button";
import { useOurServiceStore } from "@/store/useOurServiceStore";


export default function ServicesPage() {
  const { setCreateModalOpen, setEditData } = useOurServiceStore();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Services</h1>

        <Button
          onClick={() => {
            setCreateModalOpen(true);
            setEditData(null);
          }}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add New Service
        </Button>
      </div>

      <OurServicesTable />
      <OurServiceModal />
    </div>
  );
}