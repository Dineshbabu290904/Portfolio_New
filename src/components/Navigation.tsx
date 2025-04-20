import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Code, Award, Mail, Search, Clock, UserCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Define navigation items with icons
  const navItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'About', icon: <User size={20} /> },
    { name: 'Skills', icon: <Award size={20} /> },
    { name: 'Experience', icon: <Briefcase size={20} /> },
    { name: 'Projects', icon: <Code size={20} /> },
    { name: 'Contact', icon: <Mail size={20} /> }
  ];

  // Mobile navigation items
  const mobileNavItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'About', icon: <User size={20} /> },
    { name: 'Skills', icon: <Award size={20} /> },
    { name: 'Experience', icon: <Briefcase size={20} /> },
    { name: 'Projects', icon: <Code size={20} /> },
    { name: 'Contact', icon: <Mail size={20} /> }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleSectionVisibility = () => {
      // This function would check which section is currently in view
      // and update activeSection accordingly
      // This is just a placeholder - you would implement actual logic based on your page sections
      
      // Example:
      // const sections = document.querySelectorAll('section');
      // sections.forEach(section => {
      //   const rect = section.getBoundingClientRect();
      //   if (rect.top <= 100 && rect.bottom >= 100) {
      //     setActiveSection(section.id.charAt(0).toUpperCase() + section.id.slice(1));
      //   }
      // });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionVisibility);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionVisibility);
    };
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    
    // Scroll to the section
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white dark:bg-gray-800/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo and Desktop Nav */}
          <div className="hidden md:flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-shrink-0 font-bold text-primary"
            >
              Portfolio
            </motion.div>
            
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`#${item.name.toLowerCase()}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.name ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.name);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>
						<div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
          
          {/* Mobile Top Navigation (Moved from bottom) */}
          <div className="md:hidden w-full">
            <div className="flex justify-between items-center h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0 font-bold text-primary pl-2"
              >
                DS
              </motion.div>
              
              <div className="overflow-x-auto flex items-center space-x-4 pr-2 no-scrollbar">
                {mobileNavItems.map((item) => (
                  <motion.a
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`#${item.name.toLowerCase()}`}
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.name);
                    }}
                  >
                    {activeSection === item.name ? (
                      <div className="flex flex-col items-center text-primary">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {item.icon}
                        </div>
                        <span className="text-xs mt-1 font-medium">{item.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 hover:text-gray-700">
                        {item.icon}
                        <span className="text-xs mt-1">{item.name}</span>
                      </div>
                    )}
                  </motion.a>
                ))}
								<div className="ml-4">
		              <ThemeToggle />
		            </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Add a custom style for no scrollbar */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}