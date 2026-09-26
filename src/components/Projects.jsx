"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

function getExternalUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";

  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    try {
      return new URL(`https://${value.trim()}`).href;
    } catch {
      return "";
    }
  }
}

export default function Projects() {
  const [filter, setFilter] = useState("");
  const [projects, setProjects] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState(() => new Set());

  const toggleDescription = (projectId) => {
    setExpandedDescriptions((expanded) => {
      const nextExpanded = new Set(expanded);
      if (nextExpanded.has(projectId)) {
        nextExpanded.delete(projectId);
      } else {
        nextExpanded.add(projectId);
      }
      return nextExpanded;
    });
  };

  useEffect(() => {
    fetch("/api/public/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data.map((p) => ({
            id: p._id,
            name: p.name,
            description: p.description || p.tagline,
            status: p.status === "active" ? "Active" : p.status === "completed" ? "Completed" : "In Progress",
            category: p.category,
            tech: p.technologies || [],
            liveDemo: p.liveDemo,
            github: p.github,
            image: p.image,
          })));
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

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
            const liveDemoUrl = getExternalUrl(project.liveDemo);
            const githubUrl = getExternalUrl(project.github);
            const isDescriptionExpanded = expandedDescriptions.has(project.id);
            const hasLongDescription = project.description?.length > 120;
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
                  className="card-3d project-card"
                  style={{
                    overflow: "hidden",
                    animation: `fade-in-up 0.5s ease forwards`,
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <div className="project-card-image-wrap">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.name} project preview`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 360px"
                        unoptimized
                        className="project-card-image"
                      />
                    ) : (
                      <div className="project-card-image-placeholder" aria-hidden="true">
                        {project.name?.charAt(0) || "P"}
                      </div>
                    )}
                  </div>

                  <div className="project-card-body" style={{ padding: 28 }}>
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
                      className={`project-description ${isDescriptionExpanded ? "is-expanded" : ""}`}
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: hasLongDescription ? 6 : 20,
                      }}
                    >
                      {project.description}
                    </p>
                    {hasLongDescription && (
                      <button
                        type="button"
                        className="project-read-more"
                        aria-expanded={isDescriptionExpanded}
                        onClick={() => toggleDescription(project.id)}
                      >
                        {isDescriptionExpanded ? "Show less" : "Read more"}
                        {isDescriptionExpanded ? (
                          <ChevronUp size={14} aria-hidden="true" />
                        ) : (
                          <ChevronDown size={14} aria-hidden="true" />
                        )}
                      </button>
                    )}

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
                    <div className="project-card-actions" style={{ display: "flex", gap: 10 }}>
                      <a
                        href={liveDemoUrl || undefined}
                        target={liveDemoUrl ? "_blank" : undefined}
                        rel={liveDemoUrl ? "noopener noreferrer" : undefined}
                        aria-disabled={!liveDemoUrl}
                        tabIndex={liveDemoUrl ? 0 : -1}
                        className="btn-primary"
                        style={{
                          padding: "8px 18px",
                          fontSize: "0.82rem",
                          flex: 1,
                          justifyContent: "center",
                          opacity: liveDemoUrl ? 1 : 0.5,
                          cursor: liveDemoUrl ? "pointer" : "not-allowed",
                        }}
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </a>
                      <a
                        href={githubUrl || undefined}
                        target={githubUrl ? "_blank" : undefined}
                        rel={githubUrl ? "noopener noreferrer" : undefined}
                        aria-disabled={!githubUrl}
                        tabIndex={githubUrl ? 0 : -1}
                        className="btn-outline"
                        style={{
                          padding: "8px 18px",
                          fontSize: "0.82rem",
                          flex: 1,
                          justifyContent: "center",
                          opacity: githubUrl ? 1 : 0.5,
                          cursor: githubUrl ? "pointer" : "not-allowed",
                        }}
                      >
                        <FaGithub size={15} />
                        Code
                      </a>
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