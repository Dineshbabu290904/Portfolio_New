import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-particles';
import { Engine } from 'tsparticles-engine';
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Setup dark mode detector
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const isDark = 
        document.documentElement.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    // Initialize state
    handleChange();
    
    // Setup mutation observer to detect class changes on html element
    const observer = new MutationObserver(handleChange);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    // Listen for theme changes in localStorage
    window.addEventListener('storage', handleChange);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: isDarkMode ? '#50C4FF' : '#2A2A72',
          },
          links: {
            color: isDarkMode ? '#50C4FF' : '#2A2A72',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}