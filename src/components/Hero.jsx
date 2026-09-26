"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const technologies = ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "Sql", "PostgreSql"];
const highlights = [
    { value: "1+", label: "Years Of Exprince" },
    { value: "MERN", label: "Full-stack toolkit" },
    { value: "Q4 '26", label: "Available to collaborate" },
];

export function Hero() {
    const scrollToSection = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (!section) return;

        const top = section.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-grid-lines" aria-hidden="true" />
            <div className="hero-container">
                <div className="hero-layout">
                    <div className="hero-copy animate-slide-left">
                        <p className="hero-eyebrow">
                            <span className="hero-eyebrow-dot" />
                            Full Stack Developer
                            <span className="hero-eyebrow-divider">/</span>
                            India / Remote
                        </p>

                        <h1>
                            I build scalable web applications
                            <span>that solve real-world problems.</span>
                        </h1>

                        <p className="hero-description">
                            Full-stack product engineer turning ambitious ideas into fast,
                            scalable web experiences, from first commit to products built to
                            grow.
                        </p>

                        <div className="hero-actions">
                            <a
                                href="#projects"
                                className="hero-button hero-button-primary"
                                onClick={(event) => scrollToSection(event, "projects")}
                            >
                                Explore selected work
                                <ArrowUpRight size={17} aria-hidden="true" />
                            </a>
                            <a
                                href="#contact"
                                className="hero-button hero-button-secondary"
                                onClick={(event) => scrollToSection(event, "contact")}
                            >
                                <Mail size={16} aria-hidden="true" />
                                Get in touch
                            </a>
                            <a
                                href="/resumepdf.pdf"
                                download="Sudhanshu-Resume.pdf"
                                className="hero-button hero-button-secondary"
                            >
                                <Download size={16} aria-hidden="true" />
                                Download Resume
                            </a>
                        </div>

                        <div className="hero-tech-list" aria-label="Core technologies">
                            {technologies.map((technology) => (
                                <span key={technology}>{technology}</span>
                            ))}
                        </div>

                        <div className="hero-highlights">
                            {highlights.map((highlight) => (
                                <div className="hero-highlight" key={highlight.label}>
                                    <strong>{highlight.value}</strong>
                                    <span>{highlight.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-social-links" aria-label="Social profiles">
                            <a
                                href="https://github.com/ssudhanshuu"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <FaGithub size={17} />
                            </a>
                            <a
                                href="https://linkedin.com/in/johndoe"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={17} />
                            </a>
                            <a
                                href="https://www.instagram.com/mr.sudhanshusaini?stkn=eHIydnZmYTA0d281"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={17} />
                            </a>
                            <a
                                href="https://www.facebook.com/saini.sudhanshu.3"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={17} />
                            </a>
                        </div>
                    </div>

                    <div className="hero-visual animate-slide-right">
                        <div className="hero-scene">
                            <div className="hero-scene-grid" aria-hidden="true" />

                            <Tilt
                                className="hero-tilt"
                                tiltMaxAngleX={5}
                                tiltMaxAngleY={8}
                                perspective={1100}
                                glareEnable
                                glareMaxOpacity={0.12}
                                glareColor="#a78bfa"
                                glarePosition="all"
                                scale={1.015}
                            >
                                <div className="hero-photo-card">
                                    <Image
                                        src="/profilephoto.png"
                                        alt="Sudhanshu, full-stack developer"
                                        fill
                                        sizes="(max-width: 980px) 84vw, 440px"
                                        preload
                                        className="hero-photo"
                                    />
                                    <div className="hero-photo-shade" />
                                    <div className="hero-photo-caption">
                                        <span>PORTFOLIO / 2026</span>
                                        <strong>Building what&apos;s next.</strong>
                                    </div>
                                </div>
                            </Tilt>

                            <div className="hero-ready-badge" aria-hidden="true">
                                <span />
                                PROJECT READY
                            </div>

                            <div className="hero-code-window" aria-hidden="true">
                                <div className="hero-window-bar">
                                    <span className="hero-window-dots">
                                        <i />
                                        <i />
                                        <i />
                                    </span>
                                    <code>build.ts</code>
                                </div>
                                <div className="hero-editor-code">
                                    <p>
                                        <span className="code-purple">const</span> idea ={" "}
                                        <span className="code-green">&quot;ambitious&quot;</span>;
                                    </p>
                                    <p>
                                        <span className="code-purple">const</span> product ={" "}
                                        <span className="code-blue">await</span> build(idea);
                                    </p>
                                    <p>
                                        <span className="code-blue">ship</span>(product);
                                    </p>
                                </div>
                            </div>

                            <div className="hero-score-badge" aria-hidden="true">
                                <strong>5+</strong>
                                <span>PROJECTS SHIPPED</span>
                            </div>

                            <div className="hero-stack-badge" aria-hidden="true">
                                API <span /> UI <span /> DATA
                            </div>
                        </div>
                    </div>
                </div>

                <a
                    href="#about"
                    className="hero-scroll-link"
                    onClick={(event) => scrollToSection(event, "about")}
                >
                    <span>Scroll to explore</span>
                    <ArrowDown size={15} aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}