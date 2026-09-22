// src/pages/admin/CreateblogForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const BASE_URL =   "http://localhost:3000";

export default function CreateblogForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    status: "active",
    duration: "",
    role: "",
    category: "",
    liveDemo: "",
    github: "",
    technologies: "" 
  });

  // main image (single) and screenshots (multiple)
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  const [screenshots, setScreenshots] = useState([]); // File objects
  const [screenshotPreviews, setScreenshotPreviews] = useState([]); // data URLs

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // main image change
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImage(file);
    const reader = new FileReader();
    reader.onload = () => setMainPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // screenshots change (multiple)
  const handleScreenshots = (e) => {
    const files = Array.from(e.target.files);
    setScreenshots(files);

    // build previews
    const readers = files.map((file) => {
      return new Promise((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((imgs) => setScreenshotPreviews(imgs));
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
    setScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setForm({
      name: "",
      tagline: "",
      description: "",
      status: "active",
      duration: "",
      role: "",
      category: "",
      liveDemo: "",
      github: "",
      technologies: ""
    });
    setMainImage(null);
    setMainPreview(null);
    setScreenshots([]);
    setScreenshotPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Basic client-side validation
      if (
        !form.name.trim() ||
        !form.description.trim() ||
        !form.category.trim()
      ) {
        setMessage("Please fill name, description and category.");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("tagline", form.tagline);
      fd.append("description", form.description);
      fd.append("status", form.status);
      fd.append("duration", form.duration);
      fd.append("role", form.role);
      fd.append("category", form.category);
      fd.append("liveDemo", form.liveDemo);
      fd.append("github", form.github);
      fd.append("technologies", form.technologies); // comma separated string

      // For backward compatibility: append main image as 'image' (like your previous backend)
      if (mainImage) {
        fd.append("image", mainImage);
      }

      // Append additional screenshots as array `screenshots[]`
      screenshots.forEach((file) => {
        fd.append("screenshots[]", file);
      });

      const res = await fetch(`${BASE_URL}/api/blogs/create`, {
        method: "POST",
        body: fd
        // DO NOT set Content-Type header — browser sets multipart boundary
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ blog created successfully!");
        
        clearForm();
     
        setTimeout(() => {
          navigate("/admin/blogs-create");
        }, 1000);
      } else {
        setMessage(
          data?.message || "❌ Failed to create blog. Check backend logs."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New blog</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Row 1: Name & Tagline */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">blog Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
              placeholder="My Portfolio Website"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tagline</label>
            <input
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="A personal portfolio built with React & Node"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            required
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Describe the blog, goals, features, challenges and outcomes..."
          />
        </div>

        {/* Technologies & Category */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Technologies</label>
            <input
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="React, Node.js, Tailwind CSS"
            />
            <p className="text-xs text-gray-500 mt-1">
              Comma separated (will show as tags on detail page)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">Category *</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Portfolio / Web App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Developer"
            />
          </div>
        </div>

        {/* Status & Duration */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Duration</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="Jan 2025 - Mar 2025"
            />
          </div>
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Live Demo URL</label>
            <input
              name="liveDemo"
              value={form.liveDemo}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">GitHub URL</label>
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium">Main Image (hero)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImage}
            className="mt-1 block w-full"
          />
          {mainPreview && (
            <div className="mt-3 flex items-start gap-4">
              <img
                src={mainPreview}
                alt="main preview"
                className="w-48 h-28 object-cover rounded"
              />
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setMainImage(null);
                    setMainPreview(null);
                  }}
                  className="text-sm text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Screenshots */}
        <div>
          <label className="block text-sm font-medium">Screenshots (optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleScreenshots}
            className="mt-1 block w-full"
          />

          {screenshotPreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {screenshotPreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={src}
                    alt={`shot-${idx}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeScreenshot(idx)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600 text-sm shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              clearForm();
              setMessage("");
            }}
            className="px-4 py-2 border rounded"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Create blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
