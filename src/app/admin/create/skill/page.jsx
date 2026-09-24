"use client";

import React, { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

const AdminCreateSkills = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    proficiency: "",
    year: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    router.push("/admin/skills");

    try {
      const res = await axios.post("http://localhost:3000/api/skills/create", formData);
      setMessage("✅ Skill added successfully!");
      setFormData({ category: "", name: "", proficiency: "", year: "" });
      console.log("Response:", res.data);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("⚠️ Skill already exists in this category.");
      } else {
        setError("❌ Failed to add skill. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#22222f]">
        <h1 className="text-2xl font-bold text-white">Add Skill</h1>
      </div>

      <div className="max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-[#13131a] border border-purple-500/40 rounded-2xl p-6 space-y-5 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
        >
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#a1a1aa] mb-1.5">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0a0a0f] border border-[#22222f] rounded-xl p-3 text-white outline-none focus:border-pink-500 transition"
              required
            >
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Skill Name */}
          <div>
            <label className="block text-sm font-semibold text-[#a1a1aa] mb-1.5">Skill Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full bg-[#0a0a0f] border border-[#22222f] rounded-xl p-3 text-white placeholder-[#71717a] outline-none focus:border-pink-500 transition"
              required
            />
          </div>

          {/* Proficiency */}
          <div>
            <label className="block text-sm font-semibold text-[#a1a1aa] mb-1.5">Proficiency (%)</label>
            <input
              type="number"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              placeholder="e.g. 80"
              min="0"
              max="100"
              className="w-full bg-[#0a0a0f] border border-[#22222f] rounded-xl p-3 text-white placeholder-[#71717a] outline-none focus:border-pink-500 transition"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-semibold text-[#a1a1aa] mb-1.5">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2"
              className="w-full bg-[#0a0a0f] border border-[#22222f] rounded-xl p-3 text-white placeholder-[#71717a] outline-none focus:border-pink-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-purple-500/20"
          >
            Add Skill
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-400 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-400 font-medium">{error}</p>
        )}
      </div>
    </>
  );
};

export default AdminCreateSkills;
