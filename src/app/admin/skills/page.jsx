"use client";

import React, { useContext, useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { AdminContext } from "@/context/Admincontext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  const router = useRouter();

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = () => {
    router.push("/admin/create/skill");
  };

  // Extract all category names
  const categories = skills.map((item) => item.category);

  // Find selected category's skills
  const selectedCategoryData = skills.find(
    (item) => item.category === selectedCategory
  );

  // Flatten all skills into a single array
  const allSkills = skills.flatMap((item) =>
    item.skills.map((s) => ({
      ...s,
      category: item.category,
    }))
  );

  // Filter data to display based on selected category
  const displayedSkills = selectedCategory
    ? selectedCategoryData?.skills.map((s) => ({
      ...s,
      category: selectedCategoryData.category,
    })) || []
    : allSkills;

  return (
    <>
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2b2b40]">
          <h1 className="text-2xl font-bold text-white">Skills Management</h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
            onClick={handleAddSkill}
          >
            <Plus size={18} /> Add Skill
          </button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all border ${selectedCategory === ""
                ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/50"
                : "bg-[#1e1e2d] text-[#92929f] border-[#2b2b40] hover:bg-[#2b2b40] hover:text-white"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-all border ${selectedCategory === cat
                  ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/50"
                  : "bg-[#1e1e2d] text-[#92929f] border-[#2b2b40] hover:bg-[#2b2b40] hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
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
                key={index}
                className="p-6 bg-[#1e1e2d] border border-[#2b2b40] rounded-xl transition"
              >
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
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-[#1e1e2d] rounded-xl border border-[#2b2b40]">
              <p className="text-sm text-[#92929f]">No skills found.</p>
            </div>
          )}
        </motion.div>

        {/* Chart Section */}
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
