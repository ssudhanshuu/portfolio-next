"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000";

export default function CreateblogForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
  });

  // Optional cover image.
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE TEXT INPUTS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // MAIN IMAGE
  // =========================
  const handleMainImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setMainImage(file);

    const reader = new FileReader();

    reader.onload = () => {
      setMainPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {
    setForm({
      name: "",
      description: "",
      category: "",
    });

    setMainImage(null);
    setMainPreview(null);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Basic validation
      if (
        !form.name.trim() ||
        !form.description.trim() ||
        !form.category.trim()
      ) {
        toast.error("Please fill name, description and category.");

        setLoading(false);
        return;
      }

      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("category", form.category);

      // Main image
      if (mainImage) {
        fd.append("image", mainImage);
      }

      const res = await fetch(`${BASE_URL}/api/blogs`, {
        method: "POST",
        body: fd,
        // DO NOT set Content-Type
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Blog created successfully!");

        clearForm();

        setTimeout(() => {
          router.push("/admin/blogs");
        }, 1000);
      } else {
        toast.error(data?.message || "Failed to create blog. Check backend logs.");
      }
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong. See console.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CONTACT STYLE
  // =========================

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontWeight: 500,
    outline: "none",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: 6,
    color: "var(--text-secondary)",
  };

  return (
    <section
      id="create-blog"
      style={{
        padding: "10px 0",
        position: "relative",
      }}
    >

      <div
        className="card-3d"
        style={{
          padding: 36,
          overflow: "hidden",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Blog title and category */}
          <div
            className="form-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <label style={labelStyle}>Blog Title *</label>

              <input
                type="text"
                name="name"
                placeholder="Enter a clear blog title"
                style={inputStyle}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>
              <input
                type="text"
                name="category"
                placeholder="Technology, Development..."
                style={inputStyle}
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* =========================
                DESCRIPTION
            ========================== */}
          <div>
            <label style={labelStyle}>
              Description *
            </label>

            <textarea
              name="description"
              rows={6}
              placeholder="Write your blog content..."
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: 120,
              }}
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Optional cover image */}
          <div>
            <label style={labelStyle}>
              Cover Image (optional)
            </label>

            <div
              style={{
                padding: 16,
                borderRadius: "var(--radius-md)",
                border:
                  "1px dashed rgba(124, 58, 237, 0.3)",
                background:
                  "rgba(124, 58, 237, 0.03)",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImage}
                style={{
                  width: "100%",
                  color: "var(--text-secondary)",
                }}
              />

              {mainPreview && (
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <img
                    src={mainPreview}
                    alt="main preview"
                    style={{
                      width: 220,
                      height: 130,
                      objectFit: "cover",
                      borderRadius:
                        "var(--radius-md)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setMainImage(null);
                      setMainPreview(null);
                    }}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* =========================
                SUBMIT
            ========================== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              * Required fields
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  clearForm();
                }}
                style={{
                  padding: "11px 20px",
                  borderRadius: "var(--radius-md)",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  background:
                    "rgba(255,255,255,0.03)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  opacity: loading ? 0.6 : 1,
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {loading
                  ? "Saving..."
                  : "Create Blog"}
              </button>
            </div>
          </div>
        </form>
      </div>


      {/* =========================
          RESPONSIVE CSS
      ========================== */}
      <style jsx>{`
        @media (max-width: 768px) {
          .form-row,
          .form-selects {
            grid-template-columns: 1fr !important;
          }
        }

        input::placeholder,
        textarea::placeholder {
          color: var(--text-muted);
        }

        input:focus,
        textarea:focus,
        select:focus {
          border-color: var(--accent-light) !important;
          box-shadow: 0 0 0 3px
            rgba(124, 58, 237, 0.08);
        }

        select option {
          background: #11111b;
          color: white;
        }
      `}</style>
    </section>
  );
}