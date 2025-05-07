import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Zap, BookOpen, Eye, ArrowRight } from 'lucide-react'; // Added Eye, ArrowRight
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';

// Animation Variants
const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the appearance of cards
      delayChildren: 0.3,    // Delay after section header appears
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } }
};


function Projects() {
  const [isVisible, setIsVisible] = useState(false); // For overall section visibility trigger if needed
  // activeProject state is removed as direct link navigation is primary

  useEffect(() => {
    // This can be used if you want to trigger animations once the component is mounted,
    // but whileInView on individual elements is often more effective for scroll-triggered animations.
    setIsVisible(true); 
  }, []);

  // Particles for background effect (assuming this component is used within a layout that has it)
  // Or, if you want particles specific to this section:
  const particles = Array.from({ length: 12 }).map((_, i) => ({ // Reduced count for subtlety
    id: i,
    size: Math.random() * 3 + 1.5, // Smaller particles
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 35 + 25, // Slower, more gentle movement
    delay: Math.random() * 3,
  }));

  const projects = [
    {
      id: "bone-fracture-detection",
      title: "Bone Fracture Detection",
      shortDescription: "AI-powered X-ray analysis for accurate bone fracture identification.",
      description: "Developed deep learning models to detect bone fractures in X-ray images using CNN architecture. Achieved 92% accuracy on test dataset.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Scikit-learn"],
      kaggleUrl: "https://www.kaggle.com/code/dineshbabusurapaneni/machine-learning-capstone-one-fracture",
      githubUrl: "", // Add if available
      demoUrl: "",
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&q=80&auto=format', // More relevant image
      category: "Machine Learning",
      highlights: ["92% Accuracy", "CNN Architecture", "Medical Imaging AI"]
    },
    {
      id: "digimart",
      title: "DigiMart E-commerce",
      shortDescription: "Full-stack platform connecting farmers directly with buyers.",
      description: `E-commerce application connecting farmers and buyers, enhancing market transparency through real-time pricing and demand analysis.`,
      technologies: ["Java", "Servlets", "JSP", "MySQL", "HTML", "CSS", "JavaScript"],
      kaggleUrl: "",
      githubUrl: "https://github.com/Dineshbabu290904/DigiMart",
      demoUrl: "",
      image: 'https://builtin.com/sites/www.builtin.com/files/styles/og/public/2022-09/ecommerce.png', // Agriculture/Market
      category: "Web Development",
      highlights: ["Full-Stack Java", "E-commerce", "Real-time Data"]
    },
    {
      id: "data-analytics-dashboard",
      title: "Interactive Analytics Dashboard",
      shortDescription: "Dynamic visualization of complex datasets for insightful analysis.",
      description: `Interactive dashboard visualizing complex datasets with customizable views, filters, and real-time updating capabilities.`,
      technologies: ["React", "Node.js", "MongoDB", "D3.js"],
      kaggleUrl: "",
      githubUrl: "https://github.com/Dineshbabu290904/data-analytics-dashboard-example", 
      demoUrl: "", 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80&auto=format', // Analytics
      category: "Data Visualization",
      highlights: ["Interactive Charts", "Real-time Updates", "Responsive Design"]
    },
    {
      id: "cms",
      title: "College Management System",
      shortDescription: "MERN stack portal for students, faculty, and admin management.",
      description: `A comprehensive management system for colleges, providing separate portals for students, faculty, and admins to handle academic records, attendance, and communications.`,
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "HTML", "CSS", "JavaScript"],
      kaggleUrl: "",
      githubUrl: "https://github.com/Dineshbabu290904/CMS-Backend", // update with your actual repo link
      demoUrl: "https://dineshcms.vercel.app",
      image: "https://cdn.prod.website-files.com/65fabbf8f7f7323a634a308c/66c478f331c8f9c5995f02ba_Group%201171275868.png", // CMS/Portal related image
      category: "Web Development",
      highlights: ["MERN Stack", "Multi-Portal", "Role-Based Access"]
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 animate-gradient-shift -z-10" />
      
      {/* Particle Effect (Optional, if not handled by a global background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-70 dark:opacity-50">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/15 dark:bg-primary/20"
            style={{ width: particle.size, height: particle.size, left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{ 
                x: [`${particle.x}%`, `${particle.x + (Math.random() - 0.5) * 5}%`, `${particle.x}%`], // Subtle drift
                y: [`${particle.y}%`, `${particle.y + (Math.random() - 0.5) * 10}%`, `${particle.y}%`],
                opacity: [0, 0.5, 0] 
            }}
            transition={{ 
                duration: particle.duration, 
                delay: particle.delay, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionFadeIn}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-semibold text-sm shadow-sm"
          >
            <Code className="inline-block w-4 h-4 mr-2 align-text-bottom" />
            My Portfolio Showcase
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-5 leading-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projects</span>
          </h1>
          <div className="mt-3 mx-auto w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          
          <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A collection of my works demonstrating technical skills, creative problem-solving, and passion for building impactful solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} // Trigger when a little bit of the grid is visible
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
                         border border-gray-200/30 dark:border-gray-700/30
                         transition-all duration-400 ease-in-out group flex flex-col h-full relative"
            >
              <div className="relative">
                <Link to={`/projects/${project.id}`} className="block">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                </Link>
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/50 text-white rounded-full text-xs font-medium backdrop-blur-sm shadow">
                    {project.category}
                </span>
                {/* Link Icons Overlay - more subtle */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                           className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm shadow-sm transition-all" title="GitHub">
                           <Github size={16} />
                        </a>
                    )}
                    {project.kaggleUrl && (
                         <a href={project.kaggleUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm shadow-sm transition-all" title="Kaggle">
                            <FontAwesomeIcon icon={faKaggle} className="w-4 h-4" />
                         </a>
                    )}
                    {project.demoUrl && (
                         <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm shadow-sm transition-all" title="Live Demo">
                            <ExternalLink size={16} />
                         </a>
                    )}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <Link to={`/projects/${project.id}`} className="block mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 truncate">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                  {project.shortDescription}
                </p>
                
                <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Highlights:</h4>
                    <div className="flex flex-wrap gap-1.5">
                    {project.highlights.slice(0, 3).map((highlight) => ( // Show max 3 highlights on card
                        <span
                        key={highlight}
                        className="inline-flex items-center px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-xs"
                        >
                        <Zap className="w-3 h-3 mr-1 opacity-70" />
                        {highlight}
                        </span>
                    ))}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => ( // Show max 4 technologies
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2.5 py-1 text-gray-500 dark:text-gray-400 text-xs font-medium">
                            + {project.technologies.length - 4} more
                        </span>
                    )}
                  </div>
                </div>
                
                <Link 
                    to={`/projects/${project.id}`} 
                    className="block mt-5 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                        View Details
                        <ArrowRight size={16} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                </Link>
              </div>
              
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 dark:bg-primary/30 transform rotate-45 rounded-sm"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionFadeIn}
          transition={{ delay: 0.5 }} // Delay after cards appear
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/Dineshbabu290904/"
            target='_blank' // This should ideally link to a page showing ALL projects if you have more than featured
            className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-primary to-secondary hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <BookOpen className="mr-2.5 w-5 h-5" /> Explore All My Work
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </section>
  );
}

export default Projects;