"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarIcon,
  TicketIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Skills", path: "/admin/skills", icon: <Cog6ToothIcon className="w-5 h-5" /> },
    { name: "Projects", path: "/admin/projects-create", icon: <TicketIcon className="w-5 h-5" /> },
    { name: "Blogs", path: "/admin/blogs", icon: <CalendarIcon className="w-5 h-5" /> },
    { name: "Contact", path: "/admin/contect", icon: <UsersIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      <div className={`
        fixed inset-y-0 left-0 w-80 bg-[#0a0a0f] z-50 transform transition-transform duration-300 ease-in-out p-6 border-r border-[#22222f]
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-auto md:transform-none md:bg-transparent md:p-0 md:border-none md:w-full
      `}>
        <div className="flex flex-col h-full md:mt-0 relative">
          <nav className="flex-1 space-y-4">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? "bg-[#13131a] border border-purple-500/40 shadow-[0_0_15px_rgba(124,58,237,0.15)]" 
                      : "bg-[#13131a] border border-[#22222f] hover:border-purple-500/30"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isActive ? "bg-[#0a0a0f] border-purple-500/30 text-purple-400" : "bg-[#0a0a0f] border-[#22222f] text-[#71717a]"}`}>
                    {React.cloneElement(link.icon, { className: "w-5 h-5" })}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-0.5">Navigation</span>
                    <span className={`font-semibold ${isActive ? "text-white" : "text-[#a1a1aa]"}`}>{link.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0a0a0f] border border-[#22222f] rounded-md shadow-lg"
      >
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 transition-all duration-300 ${sidebarOpen ? 'bg-white rotate-45 translate-y-2' : 'bg-[#a1a1aa]'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : 'bg-[#a1a1aa]'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${sidebarOpen ? 'bg-white -rotate-45 -translate-y-2' : 'bg-[#a1a1aa]'}`}></span>
        </div>
      </button>
    </>
  );
};

export default AdminSidebar;
