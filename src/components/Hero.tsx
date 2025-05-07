import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download, Code, Zap, Star } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTypingIndex, setActiveTypingIndex] = useState(0);
  const roles = ["Data Scientist", "Software Developer", "ML Enthusiast", "Problem Solver"];

  useEffect(() => {
    setIsVisible(true);
    
    // Set up typing animation interval
    const typingInterval = setInterval(() => {
      setActiveTypingIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(typingInterval);
  }, []);

  // Particles for background effect
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 40 + 20
  }));

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center py-16 md:py-0">
      {/* Enhanced Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 dark:from-primary/20 dark:via-secondary/10 dark:to-primary/20 animate-gradient-shift" />
      
      {/* Particle Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/20 dark:bg-primary/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              y: {
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          {/* Text Content - Enhanced with staggered animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            className="md:w-1/2 text-center md:text-left"
          >
            {/* Pre-headline tag - New addition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary font-medium text-sm"
            >
              <Zap className="inline-block w-4 h-4 mr-1 mb-0.5" />
              Welcome to my portfolio
            </motion.p>
            
            {/* Headline with highlighted text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight"
            >
              Dinesh Babu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Surapaneni
              </span>
            </motion.h1>
            
            {/* Typewriter effect for roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-10 mb-6"
            >
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 flex items-center justify-center md:justify-start">
                I'm am{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTypingIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 font-semibold text-primary"
                  >
                    {roles[activeTypingIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 font-bold text-primary"
                >
                  |
                </motion.span>
              </p>
            </motion.div>

            {/* Brief bio - New addition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
            >
              Passionate about turning data into insights and code into solutions. 
              Focused on machine learning, web development, and creating impactful technology.
            </motion.p>

            {/* Call-to-action buttons/links - Enhanced with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-8"
            >
              {/* Primary CTA - View Projects */} 
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--color-primary-rgb), 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
              >
                View Projects <ArrowRight className="ml-2 w-5 h-5"/>
              </motion.a>

              {/* Secondary CTA - Resume Download */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-base font-medium rounded-full shadow-md text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
              >
                Resume <Download className="ml-2 w-5 h-5"/>
              </motion.a>

              {/* Social Links with enhanced styling */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <motion.a
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/Dineshbabu290904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/dinesh-babu-surapaneni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:dineshbabus309@gmail.com"
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30"
                  aria-label="Send an email"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
            
            {/* Stats - New feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0"
            >
              <div className="text-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Code className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">10+ Projects</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Star className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">5+ Skills</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Zap className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">3+ Years</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section - Enhanced with 3D effect and glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Decorative circles behind image */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl"
              />
              
              {/* Multiple orbit rings */}
              <div className="absolute inset-0 rounded-full">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-2 border-dashed border-secondary/30 rounded-full"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ 
                  x: [20, -20, 20], 
                  y: [-20, 20, -20], 
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-10 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-secondary/60 to-primary/60 rounded-2xl blur-md"
              />
              <motion.div 
                animate={{ 
                  x: [-20, 20, -20], 
                  y: [20, -20, 20], 
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-0 w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-primary/60 to-secondary/60 rounded-full blur-md"
              />
              
              {/* Profile image with enhanced effects */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                className="relative w-full h-full rounded-full flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full shadow-2xl overflow-hidden border-8 border-white dark:border-gray-800">
                  <motion.img
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    src="https://lh3.googleusercontent.com/pw/AP1GczOXE6-cOmg6MPy9KaLor0BF_xbzfEHgPH4C7Uj9mRj1O3GsyJCWM9PbCV-hdZNvtTEDYTJkqyXGTLO-Bwv1JdnB78AChu7O8Q-695GTxbaSkXFIZgTDGrSiK1XIO_cJ_PPvxKRampbhvger5zE29QI_=w255-h319-s-no-gm"
                    alt="Dinesh Babu Surapaneni Profile"
                    className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
                  />
                  {/* Image overlay glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-40" />
                </div>
                
                {/* Animated rings */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.9, 0.7]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-4 border-primary/40"
                />
                <motion.div 
                  animate={{ 
                    scale: [1.05, 1.1, 1.05],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 rounded-full border-4 border-secondary/30"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced animations and style definitions */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.7;
            box-shadow: 0 0 20px 10px rgba(var(--color-primary-rgb), 0.3);
          }
          50% { 
            opacity: 0.9;
            box-shadow: 0 0 30px 15px rgba(var(--color-primary-rgb), 0.5);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}