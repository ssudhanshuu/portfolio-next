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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    router.push("/admin/skills");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/skills/create",
        formData
      );

      setMessage("✅ Skill added successfully!");

      setFormData({
        category: "",
        name: "",
        proficiency: "",
        year: "",
      });

      console.log("Response:", res.data);
    } catch (err) {
      if (err.response?.status === 409) {
        setError(
          "⚠️ Skill already exists in this category."
        );
      } else {
        setError(
          "❌ Failed to add skill. Please try again."
        );
      }

      console.error(err);
    }
  };

  // ==========================================
  // CONTACT PAGE STYLE
  // ==========================================

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
      id="contact"
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
        <div
          className="card-3d"
          style={{
            padding: 36,
            overflow: "hidden",
          }}
        >
          {/* =================================
              SUCCESS MESSAGE
          ================================== */}

          {message && (
            <div
              style={{
                marginBottom: 20,
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                background:
                  "rgba(74, 222, 128, 0.1)",
                border:
                  "1px solid rgba(74, 222, 128, 0.2)",
                color: "#4ade80",
                fontSize: "0.9rem",
              }}
            >
              {message}
            </div>
          )}

          {/* =================================
              ERROR MESSAGE
          ================================== */}

          {error && (
            <div
              style={{
                marginBottom: 20,
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                background:
                  "rgba(239, 68, 68, 0.1)",
                border:
                  "1px solid rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          {/* =================================
              SAME CONTACT FORM STRUCTURE
          ================================== */}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Category + Skill Name */}

            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Category */}

              <div>
                <label style={labelStyle}>
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2392929f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:
                      "right 14px center",
                  }}
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Frontend">
                    Frontend
                  </option>

                  <option value="Backend">
                    Backend
                  </option>

                  <option value="Database">
                    Database
                  </option>

                  <option value="Others">
                    Others
                  </option>
                </select>
              </div>

              {/* Skill Name */}

              <div>
                <label style={labelStyle}>
                  Skill Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB"
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Proficiency + Year */}

            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Proficiency */}

              <div>
                <label style={labelStyle}>
                  Proficiency (%)
                </label>

                <input
                  type="number"
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleChange}
                  placeholder="e.g. 80"
                  min="0"
                  max="100"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Year */}

              <div>
                <label style={labelStyle}>
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* =================================
                SAME CONTACT SUBMIT SECTION
            ================================== */}

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

              <button
                type="submit"
                className="btn-primary"
                style={{
                  cursor: "pointer",
                }}
              >
                Add Skill
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =================================
          SAME CONTACT RESPONSIVE CSS
      ================================== */}

      <style jsx>{`
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }

        input::placeholder {
          color: var(--text-muted);
        }

        input:focus,
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
};

export default AdminCreateSkills;