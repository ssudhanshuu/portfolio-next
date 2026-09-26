"use client";

import Navbar from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { Skills } from "../components/Skills";

function Home() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
