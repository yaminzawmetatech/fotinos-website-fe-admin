
"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable";
import { orderColumns } from "./OrderColumns";
import { useOrders } from "@/hook/useOrders";
import { ColumnPinningState } from "@tanstack/react-table";

export default function OrderTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { orders, total, isLoading } = useOrders(LIMIT, offset);
  
   // dynamic column pinning state
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "user_name"],
    right: ["actions"],
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile phone: Unpin columns
        setColumnPinning({ left: [], right: [] });
      } else {
        // Desktop/Tablet: Pin columns
        setColumnPinning({
          left: ["no", "user_name"],
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
        data={orders}
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