import React from 'react'
import Navbar from '../component/Navbar'
import { Hero } from '../component/Hero'
import { About } from '../component/About'
import Projects from '../component/Projects'
import Blogs from '../component/Blogs'
import Contact from '../component/Contact'
import Testimonials from '../component/Testimonials'
import { Footer } from '../component/Footer'
import { Skills } from '../component/Skills'



function Home() {
  return (
    <div className='m-10 p-0'>
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
  )
}

export default Home
