"use client";

import React, { useContext, useEffect, useState } from "react";

import { AdminContext } from "@/context/Admincontext";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const { projects, fetchProjects } = useContext(AdminContext);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    tagline: "",
    description: "",
    technology: "",
    category: "",
    role: "",
    duration: "",
    status: "active",
    liveDemo: "",
    github: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    const projectId = String(id || "").trim();
    if (!projectId) {
      toast.error("This project does not have a valid ID.");
      return;
    }

    const response = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Unable to delete project.");
      return;
    }

    fetchProjects();
    toast.success(result.message || "Project deleted successfully.");
  };

  const startEdit = (project) => {
    const projectId = String(project?._id || project?.id || "").trim();
    setEditingId(projectId);
    setEditForm({
      name: project.name || "",
      tagline: project.tagline || "",
      description: project.description || "",
      technology: (project.technologies || []).join(", "),
      category: project.category || "",
      role: project.role || "",
      duration: project.duration || "",
      status: project.status || "active",
      liveDemo: project.liveDemo || "",
      github: project.github || "",
    });
  };

  const handleSave = async () => {
    try {
      const projectId = String(editingId || "").trim();
      if (!projectId) {
        toast.error("This project does not have a valid ID.");
        return;
      }

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          technologies: editForm.technology,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to update project.");
      }

      setEditingId(null);
      fetchProjects();
      toast.success(result.message || "Project updated successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">All Projects</h1>
        <button
          className="bg-linear-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-purple-500/20"
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
              <div className="relative">
                <ImageWithFallback
                  src={project.image}
                  alt={project.name}
                  className="w-full h-40 object-cover border-b border-[#2b2b40]"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${project.status === 'active' ? 'bg-[#1e293b] text-emerald-400 border border-emerald-500/20' :
                    project.status === 'completed' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20' :
                      'bg-[#1e293b] text-gray-400 border border-gray-600/20'
                    }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {editingId === project._id ? (
                  <div className="space-y-2">
                    <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white text-sm" placeholder="Name" />
                    <input value={editForm.tagline} onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })} className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white text-sm" placeholder="Tagline" />
                    <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white text-sm" rows={3} placeholder="Description" />
                    <input value={editForm.technology} onChange={(e) => setEditForm({ ...editForm, technology: e.target.value })} className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white text-sm" placeholder="Technologies" />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white">Save</button>
                      <button onClick={() => setEditingId(null)} className="flex-1 rounded-md border border-[#2b2b40] px-3 py-2 text-xs font-medium text-white">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-white mb-1.5">{project.name}</h3>
                    <p className="text-sm text-[#92929f] mb-4 line-clamp-2">
                      {project.tagline || project.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#2b2b40]">
                      <span className="text-xs text-indigo-400 font-medium">{project.category}</span>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(project)} className="text-white hover:text-indigo-400 bg-[#2b2b40] hover:bg-[#35354a] px-3 py-1.5 rounded text-xs transition-colors">Edit</button>
                        <button onClick={() => handleDelete(project?._id || project?.id)} className="text-white bg-red-600/80 hover:bg-red-500 px-3 py-1.5 rounded text-xs transition-colors">Delete</button>
                      </div>
                    </div>
                  </>
                )}
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
