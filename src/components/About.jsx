"use client";

import React from "react";
import { CheckCircle, Code2, Users, Award, Coffee } from "lucide-react";
import Tilt from "react-parallax-tilt";

export function About() {
  const stats = [
    { icon: Code2, value: "50+", label: "Projects Completed", color: "#7c3aed" },
    { icon: Users, value: "30+", label: "Happy Clients", color: "#4ade80" },
    { icon: Award, value: "5+", label: "Years Experience", color: "#f59e0b" },
    { icon: Coffee, value: "∞", label: "Cups of Coffee", color: "#ec4899" },
  ];

  const highlights = [
    "Full Stack Development with MERN Stack",
    "Responsive Web Design & Mobile Development",
    "RESTful API Design & Development",
    "Database Design & Optimization",
    "Cloud Deployment & DevOps",
    "Agile Development Methodologies",
  ];

  const services = [
    {
      title: "Responsive Design",
      desc: "I make your website look perfect on any device, with layouts that adapt seamlessly across screens.",
      icon: "🎨",
    },
    {
      title: "CMS Development",
      desc: "Set up user-friendly CMS solutions like WordPress or custom admin dashboards with ease.",
      icon: "⚙️",
    },
    {
      title: "API Integrations",
      desc: "Seamless integration with third-party APIs and services, enhancing functionality and performance.",
      icon: "🔗",
    },
    {
      title: "Website Redesign",
      desc: "Refresh outdated websites with modern, accessible designs that keep users engaged and coming back.",
      icon: "✨",
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Heading */}
        <div className="section-heading">
          <span className="section-label">About Me</span>
          <h2>
            Passionate Developer with a Love for{" "}
            <span className="text-gradient">Creating</span>
          </h2>
          <p>
            Passionate developer with a love for creating elegant solutions to
            complex problems.
          </p>
        </div>

        {/* About Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
            marginBottom: 80,
          }}
          className="about-grid"
        >
          {/* Left - Text */}
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: 16,
                fontFamily: "var(--font-display)",
              }}
            >
              I&apos;m Sudhanshu, a{" "}
              <span className="text-gradient">Full Stack Developer</span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                On the backend, I design RESTful APIs, handle authentication,
                and manage data flow with clean controller logic and robust
                error handling. I ensure smooth integration between client and
                server, keeping performance and security in mind.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Outside of development, I explore new frameworks, contribute to
                open source, and write tutorials to share practical insights
                from real-world debugging and implementation.
              </p>
            </div>

            {/* Highlights */}
            <div style={{ marginTop: 24 }}>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: 16,
                  color: "var(--accent-light)",
                }}
              >
                What I Do:
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {highlights.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: "#4ade80", flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Tilt
                  key={stat.label}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  glareEnable={true}
                  glareMaxOpacity={0.08}
                  glareBorderRadius="16px"
                >
                  <div
                    className="card-3d"
                    style={{
                      padding: 24,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "var(--radius-md)",
                        background: `${stat.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Icon size={22} style={{ color: stat.color }} />
                    </div>
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        fontFamily: "var(--font-display)",
                        color: stat.color,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </Tilt>
              );
            })}
          </div>
        </div>

        {/* Quality Services */}
        <div>
          <div className="section-heading" style={{ marginBottom: "3rem" }}>
            <span className="section-label">Services</span>
            <h2>
              My Quality{" "}
              <span className="text-gradient">Services</span>
            </h2>
            <p>
              I build your vision into reality with cutting-edge solutions that
              inspire your audience and grow your business.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
            }}
          >
            {services.map((service, idx) => (
              <div
                key={service.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 20,
                  alignItems: "center",
                  padding: "24px 28px",
                  background: "var(--bg-card)",
                  borderBottom:
                    idx < services.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                  e.currentTarget.style.borderLeftColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-card)";
                  e.currentTarget.style.borderLeftColor = "transparent";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "1px solid rgba(124, 58, 237, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {service.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-muted)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "1.2rem",
                  }}
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
