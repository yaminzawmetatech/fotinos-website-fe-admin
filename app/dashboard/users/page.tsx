"use client";

import { Button } from "@/components/ui/button";
import UserTable from "@/components/users/UserTable";
import UserModal from "@/components/users/UserModal";
import { useUserStore } from "@/store/useUserStore";

export default function UsersPage() {
  const { setCreateModalOpen, setEditData } = useUserStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>

        <Button
          onClick={() => {
            setCreateModalOpen(true);
            setEditData(null);
          }}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add New User
        </Button>
      </div>

      <UserTable />
      <UserModal />
    </div>
  );
}