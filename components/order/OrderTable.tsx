
"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable";
import { orderColumns } from "./OrderColumns";
import { usePlans } from "@/hook/usePlans";
import { ColumnPinningState } from "@tanstack/react-table";

export default function PlansTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { plans, total, isLoading } = usePlans(LIMIT, offset);
  
   // dynamic column pinning state
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name_en"],
    right: ["actions"],
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile phone: Unpin everything so it scrolls nicely
        setColumnPinning({ left: [], right: [] });
      } else {
        // Desktop/Tablet: Keep your clean layout locks
        setColumnPinning({
          left: ["no", "name_en"],
          right: ["actions"],
        });
      }
    };

    // Run on initial load & layout changes
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div>
      <DataTable
        data={plans}
        columns={orderColumns}
        total={total}
        limit={LIMIT}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
        columnPinning={columnPinning}
        setColumnPinning={setColumnPinning}
      />
    </div>
  );
}