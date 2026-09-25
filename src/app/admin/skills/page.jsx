"use client";

import React, { useContext, useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { AdminContext } from "@/context/Admincontext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function AdminSkill() {
  const { skills, fetchSkills } = useContext(AdminContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [editForm, setEditForm] = useState({ category: "", name: "", proficiency: "", year: "" });
  const router = useRouter();

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = () => {
    router.push("/admin/create/skill");
  };

  const handleDeleteSkill = async (skill) => {
    if (!window.confirm(`Delete ${skill.name} from ${skill.category}?`)) return;

    const response = await fetch("/api/skills", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: skill.category, name: skill.name }),
    });

    const result = await response.json();
    if (response.ok) {
      fetchSkills();
      setEditingSkill(null);
      toast.success(result.message || "Skill deleted successfully.");
      return;
    }

    toast.error(result.message || "Unable to delete skill.");
  };

  const handleEditSkill = (skill) => {
    setEditingSkill({ category: skill.category, name: skill.name });
    setEditForm({
      category: skill.category,
      name: skill.name,
      proficiency: skill.proficiency,
      year: skill.year,
    });
  };

  const handleSaveSkill = async () => {
    try {
      const finalName = String(editForm.name || "").trim();
      const finalProficiency = Number(editForm.proficiency);
      const finalYear = Number(editForm.year);

      const response = await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: String(editForm.category || "").trim(),
          oldName: String(editingSkill?.name || "").trim(),
          name: finalName,
          proficiency: finalProficiency,
          year: finalYear,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to update skill.");
      }

      setEditingSkill(null);
      fetchSkills();
      toast.success(result.message || "Skill updated successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const categories = skills.map((item) => item.category);
  const selectedCategoryData = skills.find((item) => item.category === selectedCategory);
  const allSkills = skills.flatMap((item) =>
    item.skills.map((s) => ({
      ...s,
      category: item.category,
    }))
  );

  const displayedSkills = selectedCategory
    ? selectedCategoryData?.skills.map((s) => ({
      ...s,
      category: selectedCategoryData.category,
    })) || []
    : allSkills;

  return (
    <>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2b2b40]">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          onClick={handleAddSkill}
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-all border ${selectedCategory === ""
            ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/50"
            : "bg-[#1e1e2d] text-[#92929f] border-[#2b2b40] hover:bg-[#2b2b40] hover:text-white"}
          `}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all border ${selectedCategory === cat
              ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/50"
              : "bg-[#1e1e2d] text-[#92929f] border-[#2b2b40] hover:bg-[#2b2b40] hover:text-white"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {displayedSkills.length > 0 ? (
          displayedSkills.map((skill, index) => (
            <div
              key={`${skill.category}-${skill.name}-${index}`}
              className="p-6 bg-[#1e1e2d] border border-[#2b2b40] rounded-xl transition"
            >
              {editingSkill && editingSkill.category === skill.category && editingSkill.name === skill.name ? (
                <div className="space-y-3">
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    value={editForm.proficiency}
                    onChange={(e) => setEditForm({ ...editForm, proficiency: e.target.value })}
                    className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    value={editForm.year}
                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    className="w-full rounded-md border border-[#2b2b40] bg-[#151521] px-3 py-2 text-white"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSaveSkill} className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white">Save</button>
                    <button onClick={() => setEditingSkill(null)} className="flex-1 rounded-md border border-[#2b2b40] px-3 py-2 text-sm text-white">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                    <span className="text-xs bg-[#2b2b40] text-[#92929f] px-2.5 py-1 rounded-md font-semibold tracking-wider">
                      {skill.year}y
                    </span>
                  </div>
                  <div className="w-full bg-[#151521] border border-[#2b2b40] rounded-full h-2.5 mb-3">
                    <div
                      className="bg-indigo-500 h-2.5 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-[#92929f] flex justify-between">
                    <span>Proficiency</span>
                    <span className="text-white font-medium">{skill.proficiency}%</span>
                  </p>
                  <p className="text-xs text-indigo-400/80 mt-2 uppercase tracking-wider font-semibold">
                    {skill.category}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => handleEditSkill(skill)} className="flex-1 rounded-md bg-[#2b2b40] px-3 py-2 text-xs font-medium text-white">Edit</button>
                    <button onClick={() => handleDeleteSkill(skill)} className="flex-1 rounded-md bg-red-600/80 px-3 py-2 text-xs font-medium text-white">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-[#1e1e2d] rounded-xl border border-[#2b2b40]">
            <p className="text-sm text-[#92929f]">No skills found.</p>
          </div>
        )}
      </motion.div>

      <div className="mt-12 bg-[#1e1e2d] border border-[#2b2b40] p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-6">
          {selectedCategory ? selectedCategory : "All"} Skills Chart
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={displayedSkills}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="proficiency" fill="#6366f1" radius={[4, 4, 0, 0]} name="Proficiency (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default AdminSkill;
