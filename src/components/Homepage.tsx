import React from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Skills from './Skills';
import TerminalPage from './TerminalPage';

function Homepage() {
  return (
    <>
      <Hero id="hero" />
      <About id="about" />
      <Skills id="skills" />
      <Experience id="experience" />
      <Projects id="projects" />
      <Contact id="contact" />
    </>
  );
}

export default Homepage;