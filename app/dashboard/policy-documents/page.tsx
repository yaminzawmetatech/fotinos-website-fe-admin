"use client";

import { Button } from "@/components/ui/button";
import { usePolicyDocumentStore } from "@/store/usePolicyDocumentStore";
import PolicyDocumentTable from "@/components/policyDocument/PolicyDocumentTable";
import PolicyDocumentModal from "@/components/policyDocument/PolicyDocumentModal";

export default function PolicyDocumentsPage() {
  const { setCreateModalOpen } = usePolicyDocumentStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Policy Document</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Policy Document
        </Button>
      </div>

      <PolicyDocumentTable />
      <PolicyDocumentModal />
    </div>
  );
}