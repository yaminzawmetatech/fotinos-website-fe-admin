
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type TopbarProps = {
  onToggleSidebar: () => void;
};

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [showUserCard, setShowUserCard] = useState(false);

  const routeTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/dashboard": "Users",
    "/dashboard/services": "Services",
    "/dashboard/payment-methods": "Payment Methods",
    "/dashboard/plans": "Plans",
    "/dashboard/modules": "Modules",
    "/dashboard/plan-videos": "Plan Videos",
    "/dashboard/case-studies": "Case Studies",
    "/dashboard/settings": "Settings",
  };

  const lastSegment = pathname.split("/").filter(Boolean).pop();
  const title = routeTitles[pathname]
    || (lastSegment
      ? lastSegment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Admin Dashboard");

  return (
    <header className="h-15 border-b bg-white flex items-center justify-between shadow-md mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
      </div>

      <div className="relative flex items-center gap-3 p-2">
        <button
          type="button"
          onClick={() => setShowUserCard((prev) => !prev)}
          className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold"
        >
          A
        </button>

        {showUserCard && (
          <div className="absolute right-2 top-12 min-w-56 rounded-xl border bg-white p-4 shadow-lg">
            <p className="mt-1 break-all text-sm font-semibold text-gray-700">
              {user?.email || "No email found"}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
