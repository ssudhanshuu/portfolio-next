"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import Tilt from "react-parallax-tilt";

const gradients = [
  "linear-gradient(135deg, #7c3aed, #3b82f6)",
  "linear-gradient(135deg, #ec4899, #f59e0b)",
  "linear-gradient(135deg, #4ade80, #3b82f6)",
  "linear-gradient(135deg, #f43f5e, #7c3aed)",
  "linear-gradient(135deg, #06b6d4, #3b82f6)",
];

function getReadingTime(text) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export default function Blogs() {
  const [filter, setFilter] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch("/api/public/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data.map((blog, index) => {
            const description = blog.description || blog.tagline || "";
            return {
              id: blog._id,
              title: blog.name,
              description,
              category: blog.category,
              image: blog.image,
              date: blog.createdAt
                ? new Date(blog.createdAt).toISOString().split("T")[0]
                : "2025-09-01",
              readTime: getReadingTime(description),
              gradient: gradients[index % gradients.length],
            };
          }));
        }
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  useEffect(() => {
    if (!selectedBlog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedBlog(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedBlog]);

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
                    className="blog-cover"
                  >
                    {blog.image ? (
                      <>
                        <Image
                          src={blog.image}
                          alt={`${blog.title} cover`}
                          fill
                          sizes="(max-width: 640px) 100vw, 340px"
                          className="blog-cover-image"
                        />
                        <div className="blog-cover-overlay" />
                      </>
                    ) : (
                      <span className="blog-cover-fallback" aria-hidden="true">
                        {blog.category === "React"
                          ? "⚛️"
                          : blog.category === "CSS"
                            ? "🎨"
                            : "🟢"}
                      </span>
                    )}
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
                      className="blog-description-preview"
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
                        type="button"
                        className="blog-read-more"
                        onClick={() => setSelectedBlog(blog)}
                        aria-haspopup="dialog"
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

      {selectedBlog && (
        <div
          className="blog-modal-backdrop"
          onMouseDown={() => setSelectedBlog(null)}
        >
          <article
            className="blog-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="blog-modal-topline">
              <span className="blog-modal-category">{selectedBlog.category}</span>
              <button
                type="button"
                className="blog-modal-close"
                onClick={() => setSelectedBlog(null)}
                aria-label="Close article"
              >
                <X size={18} />
              </button>
            </div>
            <h2 id="blog-modal-title">{selectedBlog.title}</h2>
            <div className="blog-modal-meta">
              <span><Calendar size={14} /> {selectedBlog.date}</span>
              <span><Clock size={14} /> {selectedBlog.readTime}</span>
            </div>
            <div className="blog-modal-divider" />
            <div className="blog-modal-content">{selectedBlog.description}</div>
          </article>
        </div>
      )}

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
