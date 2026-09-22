"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus({
        loading: false,
        success: false,
        error: "Please fill all required fields.",
      });
      return;
    }
    try {
      setStatus({ loading: true, success: false, error: "" });
      await new Promise((res) => setTimeout(res, 2000));
      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: "",
      });
    } catch {
      setStatus({
        loading: false,
        success: false,
        error: "Something went wrong. Try again!",
      });
    }
  };

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "API Development",
    "Consulting",
    "Maintenance",
    "Other",
  ];
  const budgetRanges = [
    "Under $1000",
    "$1000 - $5000",
    "$5000 - $10000",
    "$10000 - $25000",
    "$25000+",
    "Not sure",
  ];
  const timelines = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible",
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sudhanshusaini06@gmail.com",
      href: "mailto:sudhanshusaini06@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "8191087255",
      href: "tel:+918191087255",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "MERN Developer",
      href: null,
    },
  ];

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "inherit",
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = "var(--accent)";
    e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.1)";
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = "var(--border-color)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section id="contact" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div className="section-heading">
          <span className="section-label">Contact</span>
          <h2>
            Get In{" "}
            <span className="text-gradient">Touch</span>
          </h2>
          <p>
            Ready to start your project? I&apos;d love to hear about your ideas and
            discuss how we can work together.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 40,
          }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Contact Cards */}
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="card-3d"
                  style={{ padding: 24 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "var(--radius-md)",
                        background: "rgba(124, 58, 237, 0.1)",
                        border: "1px solid rgba(124, 58, 237, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} style={{ color: "var(--accent-light)" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                          marginBottom: 4,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 600,
                        }}
                      >
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          style={{
                            color: "var(--text-primary)",
                            textDecoration: "none",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            transition: "color 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "var(--accent-light)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "var(--text-primary)")
                          }
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                          }}
                        >
                          {info.value}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Response time */}
            <div
              className="card-3d"
              style={{
                padding: 24,
                background:
                  "linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(236, 72, 153, 0.05))",
              }}
            >
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "var(--accent-light)",
                }}
              >
                ⚡ Response Time
              </h4>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                I typically respond within 24 hours. For urgent projects, call
                me directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="card-3d"
            style={{ padding: 36, overflow: "hidden" }}
          >
            {status.success && (
              <div
                style={{
                  marginBottom: 20,
                  padding: "14px 18px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(74, 222, 128, 0.1)",
                  border: "1px solid rgba(74, 222, 128, 0.2)",
                  color: "#4ade80",
                  fontSize: "0.9rem",
                }}
              >
                ✅ Thank you for your message! I&apos;ll reply within 24 hours.
              </div>
            )}
            {status.error && (
              <div
                style={{
                  marginBottom: 20,
                  padding: "14px 18px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#ef4444",
                  fontSize: "0.9rem",
                }}
              >
                ⚠️ {status.error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Name + Email */}
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                className="form-row"
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    style={inputStyle}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    style={inputStyle}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    required
                  />
                </div>
              </div>

              {/* Phone + Company */}
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                className="form-row"
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 81910 87255"
                    style={inputStyle}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Your company"
                    style={inputStyle}
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "var(--text-secondary)",
                  }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="Brief description of your project"
                  style={inputStyle}
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  required
                />
              </div>

              {/* Selects */}
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
                className="form-selects"
              >
                {[
                  { label: "Project Type", field: "projectType", options: projectTypes },
                  { label: "Budget", field: "budget", options: budgetRanges },
                  { label: "Timeline", field: "timeline", options: timelines },
                ].map((sel) => (
                  <div key={sel.field}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {sel.label}
                    </label>
                    <select
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: 36,
                      }}
                      value={formData[sel.field]}
                      onChange={(e) =>
                        handleChange(sel.field, e.target.value)
                      }
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    >
                      <option value="">Select</option>
                      {sel.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "var(--text-secondary)",
                  }}
                >
                  Message *
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell me about your project..."
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  required
                />
              </div>

              {/* Submit */}
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
                  disabled={status.loading}
                  className="btn-primary"
                  style={{
                    opacity: status.loading ? 0.6 : 1,
                    cursor: status.loading ? "not-allowed" : "pointer",
                  }}
                >
                  {status.loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin-slow" style={{ animationDuration: "1s" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row,
          .form-selects {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
