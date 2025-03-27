import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="flex-grow" />
      <div className="flex justify-center mb-4">
        <span className="text-gray-500 text-sm font-semibold">
          LMS &copy;2024 | Built by Shivam
        </span>
      </div>
    </div>
  );
};

export default SideBar;
