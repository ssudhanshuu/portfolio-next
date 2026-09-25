import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Plus } from "lucide-react";
import { AdminContext } from "../../context/Admincontext";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = () => {
    navigate("/admin/create/skill");
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
    <div className="flex md:flex-row flex-col">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-12">
        {/* Header */}
        <div className="text-xl flex font-semibold border-b-2 pl-2 mb-4 justify-between">
          Skills
          <button
            className="mr-4 cursor-pointer flex items-center gap-2"
            onClick={handleAddSkill}
          >
            Add Skill <Plus size={18} />
          </button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${selectedCategory === ""
                ? "bg-blue-600 text-white shadow"
                : "bg-white dark:bg-gray-800 border hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white dark:bg-gray-800 border hover:bg-gray-100 dark:hover:bg-gray-700"
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
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold">{skill.name}</h4>
                  <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {skill.year}y
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Proficiency: {skill.proficiency}%
                </p>
                <p className="text-xs text-gray-400 mt-1 italic">
                  Category: {skill.category}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No skills found.</p>
          )}
        </motion.div>

        {/* Chart Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-6 text-center">
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
              <Bar dataKey="proficiency" fill="#3b82f6" name="Proficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminSkill;
