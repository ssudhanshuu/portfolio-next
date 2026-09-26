"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Blog", href: "#blog", id: "blog" },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" },
  { label: "Contact", href: "#contact", id: "contact" },
];
const headerNavItems = navItems.filter(
  (item) => item.id !== "home" && item.id !== "contact"
);

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navItems.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header id="navbar" className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="site-brand"
        >
          <span className="site-brand-mark">S</span>
          <span className="site-brand-copy">
            <strong>Sudhanshu</strong>
            <small>Full Stack Developer</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          {headerNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`site-nav-link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="site-header-actions">
          <div className="site-availability">
            <span className="site-availability-dot" />
            <span>Available Q4 2026</span>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="site-cta"
          >
            Let&apos;s talk
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="site-menu-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          className="site-mobile-menu"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {headerNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`site-mobile-link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="site-cta site-mobile-cta"
          >
            Let&apos;s talk
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
