"use client";

import { Home, Users, Settings,Blocks, BadgeDollarSign, NotebookPen, Video, Layers  } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/dashboard", label: "Users", icon: Users },
  { href: "/dashboard/services", label: "Services", icon: Blocks },
  { href: "/dashboard/payment-methods", label: "Payment Methods", icon: BadgeDollarSign },
  { href: "/dashboard/plans", label: "Plans", icon: NotebookPen  },
  { href: "/dashboard/modules", label: "Modules", icon: Layers  },
  { href: "/dashboard/plan-videos", label: "Plan Videos", icon: Video  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col">
      {/* Header */}
      <div className="h-20 px-5 border-b flex items-center gap-3">
        <img src="/logo.png" className="w-18 h-18 object-contain" />

        <div className="leading-tight">
            <h1 className="text-sm font-bold text-gray-800">
            Fotinos IT Solutions
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
        </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-orange-100 text-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 border-t text-xs text-gray-400">
        © 2026 Fotinos IT Solutions
      </div>
    </div>
  );
}