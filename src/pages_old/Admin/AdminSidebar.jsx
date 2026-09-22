import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  TicketIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard",},
    { name: "Skills", path: "/admin/skills", },
    { name: "Projects", path: "/admin/projects-create", },
    { name: "Blogs", path: "/admin/blogs", },
    { name: "Contect", path: "/admin/contect",},
  ];

  return (
    <>
      
      <div className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:inset-auto lg:transform-none shadow-lg`}>
        <div className="p-6 flex max-md:mt-10 flex-col max-md:h-full">
          <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>

          <nav className="flex-1 ">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center  gap-3 px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                  location.pathname === link.path ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>
      </button>
 
    </>
  );
};

export default AdminSidebar;
