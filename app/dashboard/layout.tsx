// "use client";

// import { Sidebar } from "@/components/layout/sidebar";
// import { Topbar } from "@/components/layout/topbar";
// import { useState } from "react";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {

//   const [open, setOpen] = useState(true);

//   return (
//     <div className="flex">
//       {open && <Sidebar />}

//       <div className="flex-1">
//         <Topbar onToggleSidebar={() => setOpen(!open)} />
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  const router = useRouter();
  const { token, hydrated, hydrate } = useAuthStore();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    hydrate(); // load from cookies + localStorage
  }, []);

  // Wait for hydration to complete
  if (!hydrated) return <div>Loading...</div>;

  // If no token, redirect to login
  if (!token) {
    router.replace("/login");
    return null;
  }


  // return (
  //   <div className="flex">
  //     {open && <Sidebar />}

  //     <div className="flex-1">
  //       <Topbar onToggleSidebar={() => setOpen(!open)} />
  //       <div className="p-6">{children}</div>
  //     </div>
  //   </div>
  // );

    return (
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        {open && <Sidebar />}

  
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
  
          <main className="flex-1 overflow-y-auto p-4 md:p-6 min-w-0">
            <Topbar onToggleSidebar={() => setOpen(!open)} />
            <div className="p-1">{children}</div>
          </main>
        </div>
      </div>
    );
}