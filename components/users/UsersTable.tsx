"use client";

import { useusers } from "@/hook/useUsers";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";

export default function UsersTable() {
  const { users, isLoading, deleteUser } = useusers();
  const { setEditData, setCreateModalOpen } = useUserStore();

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
      <thead className="bg-orange-50">
        <tr>
          <th className="p-3 text-left text-sm font-semibold text-orange-700">Name</th>
          <th className="p-3 text-left text-sm font-semibold text-orange-700">Email</th>
          <th className="p-3 text-left text-sm font-semibold text-orange-700">Role</th>
          <th className="p-3 text-left text-sm font-semibold text-orange-700">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u: any) => (
          <tr key={u.id}>
            <td className="border p-2">{u.name}</td>
            <td className="border p-2">{u.email}</td>
            <td className="border p-2">{u.role}</td>

            <td className="border p-2 space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditData(u);
                setCreateModalOpen(true);
              }}
              className="border-orange-300 text-orange-600 hover:bg-orange-100"
            >
              Edit
            </Button>

            <Button
              onClick={() => deleteUser(u.id)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Delete
            </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}