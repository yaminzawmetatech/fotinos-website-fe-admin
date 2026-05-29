"use client";

import { Home, Users, Settings,Blocks, BadgeDollarSign, NotebookPen, Video, Layers, ShoppingCart   } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/services", label: "Services", icon: Blocks },
  { href: "/dashboard/payment-methods", label: "Payment Methods", icon: BadgeDollarSign },
  { href: "/dashboard/plans", label: "Plans", icon: NotebookPen  },
  { href: "/dashboard/modules", label: "Modules", icon: Layers  },
  { href: "/dashboard/plan-videos", label: "Plan Videos", icon: Video  },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart  },
  // { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    // <div className="w-64 h-screen border-r bg-white flex flex-col">
    //   {/* Header */}
    //   <div className="h-20 px-5 border-b flex items-center gap-3">
    //     <img src="/logo.png" className="w-18 h-18 object-contain min-w-[40px]" />

    //     <div className="leading-tight hidden md:block">
    //         <h1 className="text-sm md:text-xs font-bold text-gray-800">
    //         Fotinos IT Solutions
    //         </h1>
    //         <p className="text-xs text-gray-500">Admin Panel</p>
    //     </div>
    //     </div>

    //   {/* Menu */}
    //   <nav className="flex-1 p-3 space-y-1">
    //     {menuItems.map((item) => {
    //       const Icon = item.icon;
    //       const isActive = pathname === item.href;

    //       return (
    //         <Link
    //           key={item.href}
    //           href={item.href}
    //           className={`
    //             flex items-center gap-3 px-3 py-2 rounded-lg transition
    //             ${
    //               isActive
    //                 ? "bg-orange-100 text-orange-600 font-medium"
    //                 : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    //             }
    //           `}
    //         >
    //           <Icon size={18} />
    //           <span className="text-sm">{item.label}</span>
    //         </Link>
    //       );
    //     })}
    //   </nav>

    //   {/* Footer (optional) */}
    //   <div className="p-4 border-t text-xs text-gray-400">
    //     © 2026 Fotinos IT Solutions
    //   </div>
    // </div>
      // 1. Change w-64 to w-16 on mobile, md:w-64 on desktop
      <div className="w-16 md:w-64 h-screen border-r bg-white flex flex-col transition-all">
        
        {/* Header */}
        <div className="h-20 px-4 md:px-5 border-b flex items-center justify-center md:justify-start gap-3">
          <img src="/logo.png" className="w-18 h-18 object-contain min-w-[40px]" />
  
          {/* 2. Hide text block on mobile, display block on desktop panels */}
          <div className="leading-tight hidden md:block">
            <h1 className="text-sm font-bold text-gray-800">
              Fotinos IT Solutions
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
  
        {/* Menu */}
        <nav className="flex-1 p-2 md:p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
  
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-orange-100 text-orange-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <Icon size={18} className="shrink-0" />
                {/* 3. Hide menu label text on mobile */}
                <span className="text-sm hidden md:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>
  
        {/* Footer */}
        {/* 4. Hide footer notice text completely on mobile viewports */}
        <div className="p-4 border-t text-xs text-gray-400 hidden md:block">
          © 2026 Fotinos IT Solutions

</div>
    </div>
  );
}