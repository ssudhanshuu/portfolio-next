"use client";

import { useState, useEffect } from "react";
import { Download, Mail, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "UI/UX Enthusiast",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const typeWriter = () => {
      const currentRole = roles[currentIndex];
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };
    const timer = setTimeout(typeWriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Happy Clients" },
    { value: "∞", label: "Cups of Coffee" },
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Content */}
          <div
            className={mounted ? "animate-slide-left" : ""}
            style={{ opacity: mounted ? undefined : 0 }}
          >
            {/* Greeting badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "var(--radius-full)",
                padding: "6px 16px",
                marginBottom: 24,
                fontSize: "0.9rem",
                color: "var(--accent-light)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>👋</span>
              Hello, I&apos;m
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
                letterSpacing: "-2px",
              }}
            >
              <span style={{ color: "var(--text-primary)" }}>Sudhanshu</span>
            </h1>

            {/* Dynamic Role */}
            <div style={{ height: 56, display: "flex", alignItems: "center", marginBottom: 24 }}>
              <h2
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                }}
              >
                I&apos;m a{" "}
                <span className="text-gradient" style={{ fontWeight: 700 }}>
                  {displayText}
                </span>
                <span
                  style={{
                    color: "var(--accent)",
                    animation: "pulse 1s infinite",
                    fontWeight: 100,
                  }}
                >
                  |
                </span>
              </h2>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                maxWidth: 520,
                marginBottom: 32,
              }}
            >
              I create exceptional digital experiences through clean code and
              innovative solutions. Passionate about building scalable web
              applications that make a difference.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
              <button
                className="btn-primary"
                onClick={() => scrollToSection("contact")}
              >
                <Mail size={18} />
                Get In Touch
              </button>
              <a
                href="https://github.com/ssudhanshuu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <FaGithub size={18} />
                GitHub
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: 12 }}>
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/ssudhanshuu",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com/in/johndoe",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent-light)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Profile Image */}
          <div
            className={mounted ? "animate-slide-right" : ""}
            style={{
              display: "flex",
              justifyContent: "center",
              opacity: mounted ? undefined : 0,
            }}
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#7c3aed"
              glarePosition="all"
              glareBorderRadius="24px"
              scale={1.02}
            >
              <div
                style={{
                  position: "relative",
                  width: 340,
                  height: 340,
                }}
              >
                {/* Animated ring */}
                <div
                  className="animate-spin-slow"
                  style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: "50%",
                    border: "2px dashed rgba(124, 58, 237, 0.2)",
                  }}
                />

                {/* Glow behind */}
                <div
                  className="animate-pulse-glow"
                  style={{
                    position: "absolute",
                    inset: 20,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
                  }}
                />

                {/* Profile Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 24,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid rgba(124, 58, 237, 0.3)",
                    boxShadow: "0 0 40px rgba(124, 58, 237, 0.2)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "5rem",
                      fontWeight: 800,
                      color: "white",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    S
                  </div>
                </div>

                {/* Floating badge - React */}
                <div
                  className="animate-float"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    padding: "8px 14px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--accent-light)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  ⚛️ React
                </div>

                {/* Floating badge - Node */}
                <div
                  className="animate-float-slow"
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: -10,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    padding: "8px 14px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4ade80",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  🟢 Node.js
                </div>
              </div>
            </Tilt>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={mounted ? "animate-fade-in-up delay-500" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 80,
            opacity: mounted ? undefined : 0,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card-3d"
              style={{
                padding: "24px 20px",
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
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            textAlign: "center",
            marginTop: 48,
          }}
        >
          <button
            onClick={() => scrollToSection("about")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              fontSize: "0.8rem",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="Scroll to about section"
          >
            <span>Scroll Down</span>
            <div className="animate-float" style={{ animationDuration: "2s" }}>
              <ArrowDown size={20} />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
        }
        @media (max-width: 640px) {
          .hero-grid + div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
