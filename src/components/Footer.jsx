"use client";

import { Mail, Phone, Heart, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
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
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Consulting",
    "API Development",
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-secondary)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Main Footer Content */}
        <div style={{ padding: "64px 0 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
              gap: 40,
            }}
            className="footer-grid"
          >
            {/* About */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "var(--gradient-1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  S
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                  }}
                >
                  Sudhanshu
                </span>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Full Stack Developer passionate about creating exceptional
                digital experiences. Let&apos;s build something amazing together.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      transition: "all 0.3s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--accent-light)";
                      e.currentTarget.style.background =
                        "rgba(124,58,237,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--border-color)";
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Quick Links
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {quickLinks.map((link) => (
                  <li key={link.name} style={{ marginBottom: 10 }}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--accent-light)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--text-muted)")
                      }
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Services
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {services.map((service) => (
                  <li
                    key={service}
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      marginBottom: 10,
                    }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Get In Touch
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <a
                  href="mailto:sudhanshusaini06@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Mail size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  sudhanshusaini06@gmail.com
                </a>
                <a
                  href="tel:+918191087255"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Phone size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  8191087255
                </a>
              </div>

              {/* Newsletter */}
              <div style={{ marginTop: 24 }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: 10,
                  }}
                >
                  Stay updated with my newsletter
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    placeholder="Your email"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                  <button
                    className="btn-primary"
                    style={{ padding: "10px 16px", fontSize: "0.8rem" }}
                  >
                    <Mail size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            padding: "20px 0",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <span>© {currentYear} Sudhanshu. Made with</span>
            <Heart
              size={16}
              style={{ color: "#ef4444", fill: "#ef4444" }}
            />
            <span>and lots of coffee.</span>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            Back to top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}