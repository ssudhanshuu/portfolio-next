"use client";

import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("");
  const [skillCategories, setSkillCategories] = useState([]);

  useEffect(() => {
    fetch("/api/public/skills")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((cat) => ({
            name: cat.category,
            icon: cat.category === "Frontend" ? "🎨" : cat.category === "Backend" ? "⚙️" : "🗄️",
            skills: (cat.skills || []).map((s) => ({
              name: s.name,
              level: s.proficiency,
              icon: "💻",
            })),
          }));
          setSkillCategories(mapped);
          setActiveCategory(mapped[0]?.name || "");
        }
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  const activeSkills =
    skillCategories.find((cat) => cat.name === activeCategory)?.skills || [];

  const overallStats = [
    { label: "Languages", count: "2+" },
    { label: "Frameworks", count: "2+" },
    { label: "Databases", count: "2+" },
    { label: "Tools", count: "5+" },
  ];

  return (
    <section id="skills" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div className="section-heading">
          <span className="section-label">Skills</span>
          <h2>
            Skills &{" "}
            <span className="text-gradient">Technologies</span>
          </h2>
          <p>
            Here are the technologies and tools I work with to bring ideas to
            life.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          {skillCategories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: isActive
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border-color)",
                  background: isActive
                    ? "rgba(124, 58, 237, 0.15)"
                    : "var(--bg-card)",
                  color: isActive ? "var(--accent-light)" : "var(--text-secondary)",
                  boxShadow: isActive ? "var(--shadow-glow)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          key={activeCategory}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {activeSkills.map((skill, idx) => (
            <Tilt
              key={skill.name}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable={true}
              glareMaxOpacity={0.06}
              glareBorderRadius="16px"
            >
              <div
                className="card-3d"
                style={{
                  padding: 24,
                  animation: `fade-in-up 0.5s ease forwards`,
                  animationDelay: `${idx * 0.08}s`,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{skill.icon}</span>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {skill.name}
                    </h4>
                  </div>
                  <span
                    className="text-gradient"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: 6,
                    borderRadius: 3,
                    background: "rgba(124, 58, 237, 0.1)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: "100%",
                      borderRadius: 3,
                      background: "var(--gradient-1)",
                      transition: "width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      boxShadow: "0 0 10px var(--accent-glow)",
                    }}
                  />
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Overall Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginTop: 64,
          }}
          className="stats-grid"
        >
          {overallStats.map((stat) => (
            <div
              key={stat.label}
              className="card-3d"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                className="text-gradient"
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  marginBottom: 4,
                }}
              >
                {stat.count}
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
