"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

export default function Projects() {
  const [filter, setFilter] = useState("");

  const projects = [
    {
      id: 1,
      name: "Movie Booking App",
      description:
        "Full stack movie booking application with Clerk auth, seat selection, and real-time availability.",
      status: "Active",
      category: "Web",
      tech: ["React", "Node.js", "MongoDB", "Clerk"],
    },
    {
      id: 2,
      name: "E-commerce Platform",
      description:
        "Modern e-commerce app with cart, checkout flow, Stripe payments, and admin dashboard.",
      status: "Completed",
      category: "Web",
      tech: ["React", "Express", "MongoDB", "Stripe"],
    },
    {
      id: 3,
      name: "Mobile Banking",
      description:
        "Banking app with secure authentication, fund transfers, and transaction history.",
      status: "In Progress",
      category: "Mobile",
      tech: ["React Native", "Node.js", "PostgreSQL"],
    },
  ];

  const categories = ["All", "Web", "Mobile"];

  const filtered = projects.filter((p) =>
    filter && filter !== "All" ? p.category === filter : true
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return { bg: "rgba(74, 222, 128, 0.1)", color: "#4ade80", border: "rgba(74, 222, 128, 0.3)" };
      case "Completed":
        return { bg: "rgba(124, 58, 237, 0.1)", color: "#a78bfa", border: "rgba(124, 58, 237, 0.3)" };
      case "In Progress":
        return { bg: "rgba(251, 191, 36, 0.1)", color: "#fbbf24", border: "rgba(251, 191, 36, 0.3)" };
      default:
        return { bg: "rgba(124, 58, 237, 0.1)", color: "#a78bfa", border: "rgba(124, 58, 237, 0.3)" };
    }
  };

  return (
    <section id="projects" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div className="section-heading">
          <span className="section-label">Portfolio</span>
          <h2>
            My Recent{" "}
            <span className="text-gradient">Works</span>
          </h2>
          <p>
            Check out some of my recent projects that showcase my skills in
            building modern web applications.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => {
            const isActive = filter === cat || (cat === "All" && !filter);
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat === "All" ? "" : cat)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: isActive
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border-color)",
                  background: isActive
                    ? "rgba(124, 58, 237, 0.15)"
                    : "var(--bg-card)",
                  color: isActive
                    ? "var(--accent-light)"
                    : "var(--text-secondary)",
                  boxShadow: isActive ? "var(--shadow-glow)" : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
          }}
          className="projects-grid"
        >
          {filtered.map((project, idx) => {
            const statusStyle = getStatusStyle(project.status);
            return (
              <Tilt
                key={project.id}
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareBorderRadius="16px"
                scale={1.01}
              >
                <div
                  className="card-3d"
                  style={{
                    overflow: "hidden",
                    animation: `fade-in-up 0.5s ease forwards`,
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  {/* Card Header - gradient bar */}
                  <div
                    style={{
                      height: 4,
                      background: "var(--gradient-1)",
                    }}
                  />

                  <div style={{ padding: 28 }}>
                    {/* Title & Status */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {project.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          padding: "4px 12px",
                          borderRadius: "var(--radius-full)",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: 20,
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 20,
                      }}
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: "var(--radius-full)",
                            background: "rgba(124, 58, 237, 0.08)",
                            color: "var(--accent-light)",
                            border: "1px solid rgba(124, 58, 237, 0.15)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="btn-primary"
                        style={{
                          padding: "8px 18px",
                          fontSize: "0.82rem",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </button>
                      <button
                        className="btn-outline"
                        style={{
                          padding: "8px 18px",
                          fontSize: "0.82rem",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <FaGithub size={15} />
                        Code
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}