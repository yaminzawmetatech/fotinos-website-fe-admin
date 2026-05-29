"use client";

import { Button } from "@/components/ui/button";
import { usePlanVideoStore } from "@/store/usePlanVideoStore";
import PlanVideoTable from "@/components/planVideo/PlanVideoTable";
import PlanVideoModal from "@/components/planVideo/PlanVideoModal";

export default function PlanVideosPage() {
  const { setCreateModalOpen } = usePlanVideoStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Plan Videos</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Plan Video
        </Button>
      </div>

      <PlanVideoTable />
      <PlanVideoModal />
    </div>
  );
}