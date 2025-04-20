import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticlesBackground from './components/ParticlesBackground';
import Skills from './components/Skills'; // Import Skills component
import './index.css';

function App() {
  return (
    <div className="relative">
      <ParticlesBackground />
      <Navigation />
      <Hero />
      <About />
      <Skills /> {/* Include Skills component here */}
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
