import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminCreateSkills = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    proficiency: "",
    year: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    navigator("/admin/skills");

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
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-15 mt-5">
        <h2 className="text-2xl border-b-2 font-semibold mb-6 mr-10">Add Skill</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 max-w-md space-y-4"
        >
          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Select Category</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Skill Name */}
          <div>
            <label className="block text-gray-700 mb-1">Skill Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Proficiency */}
          <div>
            <label className="block text-gray-700 mb-1">Proficiency (%)</label>
            <input
              type="number"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              placeholder="e.g. 80"
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-700 mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Skill
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AdminCreateSkills;
