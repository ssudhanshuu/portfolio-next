"use client";

import React, { useContext, useEffect } from "react";

import { AdminContext } from "@/context/Admincontext";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


const Card = ({ children }) => (
  <div className="bg-[#13131a] rounded-2xl overflow-hidden flex flex-col h-full border border-[#22222f] shadow-lg">{children}</div>
);

const ImageWithFallback = ({ src, alt, className }) => (
  <img
    src={
      src
        ? src
        : "https://dummyimage.com/300x200/13131a/a855f7.jpg&text=No+Image"
    }
    alt={alt}
    className={className}
  />
);

export default function AdminProjectCreate() {
  let router = useRouter()
  const { projects, fetchProjects } = useContext(AdminContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">All Projects</h1>
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-purple-500/20"
            onClick={() => router.push("/admin/create")}
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project._id}>
                {/* Image */}
                <div className="relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-40 object-cover border-b border-[#2b2b40]"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${
                      project.status === 'active' ? 'bg-[#1e293b] text-emerald-400 border border-emerald-500/20' : 
                      project.status === 'completed' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20' : 
                      'bg-[#1e293b] text-gray-400 border border-gray-600/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-1.5">{project.name}</h3>
                  <p className="text-sm text-[#92929f] mb-4 line-clamp-2">
                    {project.tagline || project.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#2b2b40]">
                    <span className="text-xs text-indigo-400 font-medium">
                      {project.category}
                    </span>
                    <button 
                      onClick={() => router.push(`/admin/projectShowcase/${project._id}`)}
                      className="text-white hover:text-indigo-400 bg-[#2b2b40] hover:bg-[#35354a] px-3 py-1.5 rounded text-xs transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-[#1e1e2d] rounded-xl border border-[#2b2b40]">
              <h3 className="text-lg font-medium text-white">No projects found</h3>
              <p className="text-sm mt-2 text-[#92929f]">Click "Add Project" to create your first one.</p>
            </div>
          )}
        </div>
    </>
  );
}
