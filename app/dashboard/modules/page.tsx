"use client";

import { Button } from "@/components/ui/button";
import { useModuleStore } from "@/store/useModuleStore";
import ModuleTable from "@/components/module/ModuleTable";
import ModuleModal from "@/components/module/ModuleModal";

export default function ModulesPage() {
  const { setCreateModalOpen } = useModuleStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Modules</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Module
        </Button>
      </div>

      <ModuleTable />
      <ModuleModal />
    </div>
  );
}