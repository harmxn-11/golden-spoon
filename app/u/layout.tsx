import React from "react";
import Sidebar from "@/components/Sidebar";
export default function layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 py-5 md:p-5 w-full md:ml-72 bg-gradient-to-br from-slate-900 via-gray-900 to-black">{children}</div>
    </div>
  );
}
