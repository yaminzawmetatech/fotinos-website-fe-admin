
"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable";
import { userColumns } from "./UserColumns";
import { ColumnPinningState } from "@tanstack/react-table";
import { useUsers } from "@/hook/useUsers";

export default function UserTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { users, total, isLoading } = useUsers(LIMIT, offset);
  
   // dynamic column pinning state
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
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
          left: [],
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
        data={users}
        columns={userColumns}
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