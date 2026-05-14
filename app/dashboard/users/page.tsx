"use client";

import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users/UsersTable";
import UserModal from "@/components/users/UserModal";
import { useUserStore } from "@/store/useUserStore";

export default function UsersPage() {
  const { setCreateModalOpen } = useUserStore();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add User
        </Button>
      </div>

      <UsersTable />
      <UserModal />
    </div>
  );
}