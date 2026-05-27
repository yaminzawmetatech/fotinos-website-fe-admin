
"use client";

import { Menu } from "lucide-react";

type TopbarProps = {
  onToggleSidebar: () => void;
};

export function Topbar({ onToggleSidebar }: TopbarProps) {
  return (
    <header className="h-15 border-b bg-white flex items-center justify-between shadow-md mb-6">
      {/* Left side: toggle + title (optional) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>

        <h2 className="text-sm font-semibold text-gray-700">
          Admin Dashboard
        </h2>
      </div>

      {/* Right side (future actions) */}
      <div className="flex items-center gap-3 p-2">

        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
          A
        </div>
      </div>
    </header>
  );
}