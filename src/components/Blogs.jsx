"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Tilt from "react-parallax-tilt";

const gradients = [
  "linear-gradient(135deg, #7c3aed, #3b82f6)",
  "linear-gradient(135deg, #ec4899, #f59e0b)",
  "linear-gradient(135deg, #4ade80, #3b82f6)",
  "linear-gradient(135deg, #f43f5e, #7c3aed)",
  "linear-gradient(135deg, #06b6d4, #3b82f6)",
];

export default function Blogs() {
  const [filter, setFilter] = useState("All");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/public/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data.map((b, i) => ({
            id: b._id,
            title: b.name,
            description: b.description || b.tagline,
            category: b.category,
            date: b.createdAt ? new Date(b.createdAt).toISOString().split("T")[0] : "2025-09-01",
            readTime: "5 min read",
            gradient: gradients[i % gradients.length],
          })));
        }
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter(
    (blog) => filter === "All" || blog.category === filter
  );

  return (
    <section id="blog" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div className="section-heading">
          <span className="section-label">Blog</span>
          <h2>
            Recent{" "}
            <span className="text-gradient">Blogs</span>
          </h2>
          <p>
            Web development, React, Node.js, and TailwindCSS insights and
            tutorials.
          </p>
        </div>

        {/* Filter */}
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
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
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

        {/* Blog Cards */}
        {filteredBlogs.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "1.1rem",
            }}
          >
            No blogs found 😕
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 24,
            }}
            className="blog-grid"
          >
            {filteredBlogs.map((blog, idx) => (
              <Tilt
                key={blog.id}
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable={true}
                glareMaxOpacity={0.06}
                glareBorderRadius="16px"
                scale={1.01}
              >
                <div
                  className="card-3d"
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    animation: `fade-in-up 0.5s ease forwards`,
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  {/* Gradient Header */}
                  <div
                    style={{
                      height: 140,
                      background: blog.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "3rem",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                      }}
                    >
                      {blog.category === "React"
                        ? "⚛️"
                        : blog.category === "CSS"
                        ? "🎨"
                        : "🟢"}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(8px)",
                        color: "white",
                      }}
                    >
                      {blog.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: 24,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        marginBottom: 10,
                        lineHeight: 1.3,
                      }}
                    >
                      {blog.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: 16,
                      }}
                    >
                      {blog.description}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 16,
                        borderTop: "1px solid var(--border-color)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Calendar size={14} />
                          {blog.date}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Clock size={14} />
                          {blog.readTime}
                        </span>
                      </div>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--accent-light)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          transition: "gap 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
                        onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
                      >
                        Read More <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
