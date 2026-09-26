"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials", { signal: controller.signal });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load testimonials.");
        setTestimonials(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching testimonials:", error);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadTestimonials();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () =>
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  const prevTestimonial = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const current = testimonials[currentIndex];
  const averageRating = testimonials.length
    ? (testimonials.reduce((total, item) => total + item.rating, 0) / testimonials.length).toFixed(1)
    : "0.0";

  const clientStats = [
    { value: testimonials.length, label: "Client Testimonials" },
    { value: `${averageRating} ★`, label: "Average Rating" },
    { value: testimonials.filter((item) => item.rating === 5).length, label: "5-star Reviews" },
  ];

  return (
    <section
      id="testimonials"
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div className="section-heading">
          <span className="section-label">Testimonials</span>
          <h2>
            My Client&apos;s{" "}
            <span className="text-gradient">Stories</span>
          </h2>
          <p>
            Don&apos;t just take my word for it — here&apos;s what my clients have to say
            about working with me.
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {current ? (
            <div
              className="card-3d"
              style={{
                padding: "48px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Quote icon */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 28,
                  color: "rgba(124, 58, 237, 0.15)",
                }}
              >
                <Quote size={48} />
              </div>

              {/* Testimonial Text */}
              <blockquote
                style={{
                  fontSize: "1.15rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: 28,
                  fontStyle: "italic",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                &ldquo;{current.testimonial}&rdquo;
              </blockquote>

              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  marginBottom: 24,
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    style={{
                      color: i < current.rating ? "#fbbf24" : "var(--border-color)",
                      fill: i < current.rating ? "#fbbf24" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Client Info */}
              <div>
                {/* Avatar */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--gradient-1)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "white",
                    border: "2px solid rgba(124, 58, 237, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  {current.photo ? (
                    <Image
                      src={current.photo}
                      alt={`${current.name} portrait`}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    current.name?.[0] || "?"
                  )}
                </div>
                <h4
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {current.name}
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                    margin: "4px 0",
                  }}
                >
                  {current.role} at {current.company}
                </p>
                {current.projectName && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--accent-light)",
                      marginTop: 4,
                    }}
                  >
                    Project: {current.projectName}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="card-3d" style={{ padding: "48px 24px", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                {loading ? "Loading testimonials..." : "Client testimonials will appear here."}
              </p>
            </div>
          )}

          {/* Nav Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                style={{
                  position: "absolute",
                  left: -60,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
                className="testimonial-nav"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                style={{
                  position: "absolute",
                  right: -60,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
                className="testimonial-nav"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots */}
          {current && <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 24,
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background:
                    i === currentIndex
                      ? "var(--gradient-1)"
                      : "var(--border-color)",
                }}
              />
            ))}
          </div>}
        </div>

        {/* Stats */}
        {testimonials.length > 0 && <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 64,
          }}
          className="testimonial-stats"
        >
          {clientStats.map((stat) => (
            <div
              key={stat.label}
              className="card-3d"
              style={{ padding: 28, textAlign: "center" }}
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
        </div>}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .testimonial-nav {
            display: none !important;
          }
          .testimonial-stats {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
