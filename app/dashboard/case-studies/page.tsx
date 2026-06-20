"use client";

import { Button } from "@/components/ui/button";
import { useCaseStudyStore } from "@/store/useCaseStudyStore";
import CaseStudyModal from "@/components/caseStudy/CaseStudyModal";
import CaseStudyTable from "@/components/caseStudy/CaseStudyTable";

export default function CaseStudiesPage() {
  const { setCreateModalOpen } = useCaseStudyStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Case Studies</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Case Study
        </Button>
      </div>

      <CaseStudyTable />
      <CaseStudyModal />
    </div>
  );
}