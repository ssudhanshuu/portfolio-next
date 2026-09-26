"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function CreateProjectForm() {
  const router = useRouter();

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
    technologies: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  const [screenshots, setScreenshots] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleScreenshots = (e) => {
    const files = Array.from(e.target.files);

    setScreenshots(files);

    const readers = files.map((file) => {
      return new Promise((res) => {
        const r = new FileReader();

        r.onload = () => res(r.result);

        r.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((imgs) => {
      setScreenshotPreviews(imgs);
    });
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setScreenshotPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
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
      technologies: "",
    });

    setMainImage(null);
    setMainPreview(null);

    setScreenshots([]);
    setScreenshotPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
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
      fd.append("tagline", form.tagline);
      fd.append("description", form.description);
      fd.append("status", form.status);
      fd.append("duration", form.duration);
      fd.append("role", form.role);
      fd.append("category", form.category);
      fd.append("liveDemo", form.liveDemo);
      fd.append("github", form.github);
      fd.append("technologies", form.technologies);

      if (mainImage) {
        fd.append("image", mainImage);
      }

      screenshots.forEach((file) => {
        fd.append("screenshots[]", file);
      });

      const res = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Project created successfully!");

        clearForm();

        setTimeout(() => {
          router.push("/admin/projects-create");
        }, 1000);
      } else {
        toast.error(data?.message || "Failed to create project. Check backend logs.");
      }
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong. See console.");
    } finally {
      setLoading(false);
    }
  };

  // Same style as Contact page
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
      id="create-project"
      style={{
        padding: "10px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >


        {/* =========================
            CONTACT STYLE CARD
        ========================== */}
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
            {/* NAME + TAGLINE */}
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <label style={labelStyle}>
                  Project Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="My Portfolio Website"
                  style={inputStyle}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Tagline
                </label>

                <input
                  type="text"
                  name="tagline"
                  placeholder="A personal portfolio built with React & Node"
                  style={inputStyle}
                  value={form.tagline}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label style={labelStyle}>
                Description *
              </label>

              <textarea
                name="description"
                rows={5}
                placeholder="Describe the project, goals, features, challenges and outcomes..."
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

            {/* TECHNOLOGIES + CATEGORY + ROLE */}
            <div
              className="form-selects"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <label style={labelStyle}>
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  placeholder="React, Node.js, Tailwind CSS"
                  style={inputStyle}
                  value={form.technologies}
                  onChange={handleChange}
                />

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: 6,
                    marginBottom: 0,
                  }}
                >
                  Comma separated
                </p>
              </div>

              <div>
                <label style={labelStyle}>
                  Category *
                </label>

                <input
                  type="text"
                  name="category"
                  placeholder="Portfolio / Web App"
                  style={inputStyle}
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  placeholder="Developer"
                  style={inputStyle}
                  value={form.role}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* STATUS + DURATION */}
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <label style={labelStyle}>
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  placeholder="Jan 2025 - Mar 2025"
                  style={inputStyle}
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* LIVE DEMO + GITHUB */}
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <label style={labelStyle}>
                  Live Demo URL
                </label>

                <input
                  type="url"
                  name="liveDemo"
                  placeholder="https://example.com"
                  style={inputStyle}
                  value={form.liveDemo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  GitHub URL
                </label>

                <input
                  type="url"
                  name="github"
                  placeholder="https://github.com/username/repo"
                  style={inputStyle}
                  value={form.github}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* MAIN IMAGE */}
            <div>
              <label style={labelStyle}>
                Main Image (Hero)
              </label>

              <div
                style={{
                  padding: 18,
                  borderRadius:
                    "var(--radius-md)",
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

            {/* SCREENSHOTS */}
            <div>
              <label style={labelStyle}>
                Screenshots (optional)
              </label>

              <div
                style={{
                  padding: 18,
                  borderRadius:
                    "var(--radius-md)",
                  border:
                    "1px dashed rgba(124, 58, 237, 0.3)",
                  background:
                    "rgba(124, 58, 237, 0.03)",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshots}
                  style={{
                    width: "100%",
                    color: "var(--text-secondary)",
                  }}
                />

                {screenshotPreviews.length > 0 && (
                  <div
                    style={{
                      marginTop: 16,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    {screenshotPreviews.map(
                      (src, idx) => (
                        <div
                          key={idx}
                          style={{
                            position:
                              "relative",
                            overflow: "hidden",
                            borderRadius:
                              "var(--radius-md)",
                            border:
                              "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <img
                            src={src}
                            alt={`shot-${idx}`}
                            style={{
                              width: "100%",
                              height: 120,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeScreenshot(
                                idx
                              )
                            }
                            style={{
                              position:
                                "absolute",
                              top: 6,
                              right: 6,
                              width: 26,
                              height: 26,
                              borderRadius:
                                "50%",
                              border: "none",
                              background:
                                "rgba(0,0,0,0.7)",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
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
                    borderRadius:
                      "var(--radius-md)",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background:
                      "rgba(255,255,255,0.03)",
                    color:
                      "var(--text-secondary)",
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
                    : "Create Project"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* SAME RESPONSIVE STYLE AS CONTACT */}
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