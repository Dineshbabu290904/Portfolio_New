import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Briefcase, GraduationCap, Code,
  Heart, Coffee, BookOpen, Lightbulb, Zap,
  Users, Award, Sparkles, Brain, Activity, ExternalLink, FolderCode,
  Download,
  FolderArchiveIcon
} from "lucide-react";
import { Link as RouterLink } from 'react-router-dom';

// Personal data (remains the same as your last provided version)
const personalInfo = {
  name: "Dinesh Babu Surapaneni",
  title: "Data Scientist & Full Stack Developer",
  location: "Vijayawada, AP, India",
  availability: "Open to Opportunities",
  currentFocus: "Data Science & Web Development",
  profileImage: "https://lh3.googleusercontent.com/pw/AP1GczO3WuHBOLUHiiEIeBy3lZSLLsKBko7p4RBTDQYt1v2Pt8urfHdKXvX6VqSjLGiwggtIW4t18WaIPyH3p4Y5WOahWbJeCA9nk0rZSNevSH3krUvGy-ur4qmuxU5zrlQW2jNiLTUXMMNY_t_EJbr5TPxO=w1544-h1469-s-no-gm?authuser=0?w=600&h=600&fit=crop&crop=faces",
  bio: "A Data Science student from Vijayawada, passionate about AI/ML and Full Stack Development. I transform data into insights and build intelligent applications, driven by curiosity and a love for lifelong learning.",
  resumeUrl: "https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view"
};

const skills = [
  { name: "Data Science & Analysis", level: 85, color: "bg-blue-500" },
  { name: "Machine Learning (Supervised & Unsupervised)", level: 80, color: "bg-purple-500" },
  { name: "Full Stack Web Development (React, Node.js)", level: 75, color: "bg-cyan-500" },
  { name: "Python (Data Science & Backend)", level: 88, color: "bg-green-500" },
  { name: "Algorithm Design & Problem Solving", level: 82, color: "bg-amber-500" }
];

const coreCompetencies = [
  { name: "Python", icon: <Code className="w-5 h-5" />, color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
  { name: "React.js", icon: <Code className="w-5 h-5" />, color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
  { name: "Node.js", icon: <Code className="w-5 h-5" />, color: "bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400" },
  { name: "SQL", icon: <Code className="w-5 h-5" />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
  { name: "TensorFlow", icon: <Brain className="w-5 h-5" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
  { name: "Data Visualization", icon: <Activity className="w-5 h-5" />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { name: "Git & GitHub", icon: <Activity className="w-5 h-5" />, color: "bg-gray-200 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300" },
  { name: "REST APIs", icon: <Activity className="w-5 h-5" />, color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" }
];

const education = [
  {
    id: "btech",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "PVP Siddhartha Institute of Technology, Vijayawada",
    duration: "2022 - 2026 (Expected)",
    description: "Focus: Data Science, Machine Learning, Full Stack Development. CGPA: 8.5/10 (Current).",
    color: "bg-blue-500"
  }
];

const services = [
  {
    id: "data-analysis",
    title: "Data Analysis & Insights",
    description: "Uncover hidden patterns and trends in your data to drive informed business decisions.",
    icon: <Activity className="w-6 h-6" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500"
  },
  {
    id: "machine-learning",
    title: "Machine Learning Solutions",
    description: "Develop custom AI models to automate processes, predict outcomes, and enhance efficiency.",
    icon: <Brain className="w-6 h-6" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500"
  },
  {
    id: "web-development",
    title: "Full Stack Web Applications",
    description: "Build responsive, scalable, and user-friendly web applications from frontend to backend.",
    icon: <Code className="w-6 h-6" />,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500"
  }
];

const interestsAndValues = [
  "Data-Driven Innovation", "Algorithmic Problem Solving", "User-Centric Design", 
  "Landscape Photography", "Challenging Hikes", "Emerging Technologies",
  "Continuous Learning", "Empathetic Solutions", "Curiosity & Persistence", "Collaborative Growth"
];

const sectionIds = {
  about: "about-content-section",
  skills: "skills-content-section",
  education: "education-content-section",
  services: "services-content-section"
};

export default function RedesignedAboutPage() {
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  // sectionRefs are not strictly needed if IntersectionObserver directly uses IDs,
  // but can be useful if you need to interact with the DOM elements directly for other reasons.
  // For this version, direct ID usage in useEffect is sufficient.

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.15, rootMargin: "-100px 0px -100px 0px" } 
    );

    Object.values(sectionIds).forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      Object.values(sectionIds).forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleNavClick = (sectionKey: string) => {
    setActiveSection(sectionKey);
    const element = document.getElementById(sectionIds[sectionKey as keyof typeof sectionIds]);
    if (element) {
      const headerOffset = 120; // ADJUST THIS to your sticky header's height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const NavButton = ({ sectionKey, label, icon }: { sectionKey: string; label: string; icon: JSX.Element }) => (
    <button
      onClick={() => handleNavClick(sectionKey)}
      className={`px-3 sm:px-4 py-2 rounded-full flex items-center font-medium transition-all duration-300 text-xs sm:text-sm shadow-sm hover:shadow-md whitespace-nowrap
        ${activeSection === sectionKey
          ? "bg-gradient-to-r from-primary to-secondary text-white "
          : "bg-white/70 text-gray-600 hover:bg-gray-50 dark:bg-gray-700/70 dark:text-gray-300 dark:hover:bg-gray-600/70 border border-gray-200 dark:border-gray-600"
      }`}
    >
      {React.cloneElement(icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4"})}
      <span className="ml-1.5 sm:ml-2">{label}</span>
    </button>
  );

  return (
    // Main container for the page - NO explicit background color for transparency.
    // Text colors are set here for default text within this page.
    <div className="min-h-screen text-gray-800 dark:text-gray-200 relative">
      
      {/* Decorative Background Shapes - Intended to be subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            className="absolute -top-20 -left-20 w-72 h-72 bg-primary/3 dark:bg-primary/5 rounded-full filter blur-3xl opacity-30 dark:opacity-20" // Reduced opacity further
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/3 dark:bg-secondary/5 rounded-full filter blur-3xl opacity-20 dark:opacity-15" // Reduced opacity further
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }}
          />
           <motion.div 
            className="absolute top-1/3 left-1/3 w-60 h-60 bg-green-500/2 dark:bg-green-500/3 rounded-full filter blur-2xl opacity-15 dark:opacity-10" // Reduced opacity further
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
          />
      </div>

      {/* Sticky Header with semi-transparent background */}
      <header className="relative z-20 top-2 pt-16 pb-6 px-4 bg-white/30 dark:bg-gray-800/30 sticky top-0 shadow-sm border-b border-gray-200/30 dark:border-gray-700/30">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <span 
              className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-primary/10 text-primary dark:text-primary-light"
            >
              <Sparkles className="inline-block w-3.5 h-3.5 mr-1.5 align-text-bottom" />
              Developer & Data Scientist
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-center leading-tight text-gray-800 dark:text-white">
                {personalInfo.name}
            </h1>
            <p className="mt-1 text-sm sm:text-md text-primary dark:text-primary-light font-medium">{personalInfo.title}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mt-6 space-x-1.5 sm:space-x-2 overflow-x-auto pb-2 hide-scrollbar"
          >
            <NavButton sectionKey="about" label="Profile" icon={<Users />} />
            <NavButton sectionKey="skills" label="Skills" icon={<Zap />} />
            <NavButton sectionKey="education" label="Education" icon={<GraduationCap />} />
            <NavButton sectionKey="services" label="Services" icon={<Briefcase />} />
          </motion.div>
        </div>
      </header>

      {/* Main Content Area - This also has no explicit background */}
      <main className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        <AnimatePresence mode="wait">
          {/* About Section */}
          {activeSection === 'about' && (
            <motion.section 
                id={sectionIds.about}
                key="about"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isVisible[sectionIds.about] || activeSection === 'about' ? "visible" : "hidden"}
                className="max-w-5xl mx-auto"
              >
                {/* ... Rest of the About section content (Profile Card, Bio, Interests, etc.) ... */}
                {/* These inner cards have their own semi-transparent backgrounds */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <motion.div 
                    className="lg:col-span-2"
                    variants={itemVariants}
                  >
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200/40 dark:border-gray-700/40">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                          <motion.div 
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg bg-gray-200"
                          >
                            <img 
                              src={personalInfo.profileImage} 
                              alt={personalInfo.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </div>
                      </div>
                      <div className="pt-20 pb-8 px-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {personalInfo.name}
                        </h2>
                        <p className="text-primary dark:text-primary-light font-medium text-sm">
                          {personalInfo.title}
                        </p>
                        <div className="mt-6 space-y-2.5 text-sm">
                          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2 opacity-70" />
                            <span>{personalInfo.location}</span>
                          </div>
                          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            <Zap className="w-4 h-4 mr-2 opacity-70" /> 
                            <span>{personalInfo.availability}</span>
                          </div>
                          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            <Briefcase className="w-4 h-4 mr-2 opacity-70" />
                            <span>{personalInfo.currentFocus}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      className="mt-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200/40 dark:border-gray-700/40"
                      variants={itemVariants}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-3">
                        <Heart className="w-5 h-5 mr-2 text-red-500" />
                        Values & Interests
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {interestsAndValues.map((interest, index) => (
                          <span 
                            key={index}
                            className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="lg:col-span-3"
                    variants={itemVariants}
                  >
                    <motion.div 
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/40 dark:border-gray-700/40"
                        variants={itemVariants}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                          <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                          A Bit About Me
                        </h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {personalInfo.bio}
                      </p>
                      <motion.div 
                        className="mt-6 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20"
                        variants={itemVariants}
                      >
                        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
                          Core Focus Areas
                        </h3>
                        <ul className="space-y-2 text-xs">
                          {[
                            { text: "Develop data-driven applications to solve real-world problems.", icon: <Code /> },
                            { text: "Transform complex data into meaningful, visual insights.", icon: <Activity /> },
                            { text: "Create predictive machine learning models.", icon: <Brain /> },
                            { text: "Continuously learn and adapt to emerging technologies.", icon: <BookOpen /> },
                            { text: "Build the Full Stack Web Applications.", icon: <FolderArchiveIcon /> }
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                                <div className="mt-0.5 mr-2.5 text-primary/80 dark:text-primary-light/80 flex-shrink-0">
                                    {React.cloneElement(item.icon, {size: 16})}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                      variants={itemVariants}
                    >
                      <RouterLink
                        to="/contact" 
                        className="bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white py-3 px-6 rounded-xl font-medium text-center shadow-lg shadow-primary/30 flex items-center justify-center transition-all duration-300 text-sm"
                      >
                        Contact Me
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </RouterLink>
                      <a 
                        href={personalInfo.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 py-3 px-6 rounded-xl font-medium text-center shadow-md flex items-center justify-center transition-all duration-300 text-sm"
                      >
                        Download CV
                        <Download className="w-4 h-4 ml-2" />
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <motion.section 
                id={sectionIds.skills}
                key="skills"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                initial="hidden"
                animate={isVisible[sectionIds.skills] || activeSection === 'skills' ? "visible" : "hidden"}
                variants={containerVariants}
                className="max-w-5xl mx-auto"
              >
                 {/* ... Skills section content ... */}
                 <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/40 dark:border-gray-700/40">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mr-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      Technical Proficiencies
                    </h2>
                  </div>
                  <div className="space-y-5">
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="space-y-1.5"
                      >
                        <div className="flex justify-between items-center text-sm">
                          <h3 className="text-gray-700 dark:text-gray-300 font-medium">
                            {skill.name}
                          </h3>
                          <span className={`font-semibold ${skill.color.replace('bg-','text-')} dark:${skill.color.replace('bg-','text-').replace('500','400')}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full ${skill.color}`}
                            initial={{ width: 0 }}
                            animate={isVisible[sectionIds.skills] || activeSection === 'skills' ? { width: `${skill.level}%` } : {width: 0}}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease:"easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200/30 dark:border-gray-700/30" variants={itemVariants}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Tools & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {coreCompetencies.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          whileHover={{ y: -2, scale: 1.03 }}
                          className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border
                                      ${item.color.replace('bg-','border-opacity-30 border-')} 
                                      ${item.color} 
                                      dark:${item.color.replace('bg-','border-opacity-30 dark:border-')}`}
                        >
                          {React.cloneElement(item.icon, { className: `w-3.5 h-3.5 mr-1.5 opacity-80` })}
                          {item.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
             <motion.section 
                id={sectionIds.education}
                key="education"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                initial="hidden"
                animate={isVisible[sectionIds.education] || activeSection === 'education' ? "visible" : "hidden"}
                variants={containerVariants}
                className="max-w-5xl mx-auto"
              >
                 {/* ... Education section content ... */}
                 <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/40 dark:border-gray-700/40">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mr-3">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      Education & Qualifications
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        variants={itemVariants}
                        className="relative pl-8 pb-4 last:pb-0"
                      >
                        <div className={`absolute left-0 top-1 w-3 h-3 rounded-full ${edu.color} mt-1 ring-4 ring-white dark:ring-gray-800/80 shadow-md`}></div>
                        {index < education.length - 1 && (
                            <div className={`absolute left-[5px] top-5 bottom-[-1rem] w-0.5 ${edu.color}/30`}></div>
                        )}
                        <div className={`p-4 rounded-lg border-l-4 ${edu.color.replace('bg-','border-')} ${edu.color.replace('bg-','bg-')}/5 dark:${edu.color.replace('bg-','bg-')}/10 shadow-sm`}>
                          <div className="flex flex-wrap justify-between items-start mb-1">
                            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                              {edu.degree}
                            </h3>
                            <span className={`px-2.5 py-0.5 ${edu.color} text-white text-xs rounded-full font-medium shadow-sm`}>
                              {edu.duration}
                            </span>
                          </div>
                          <p className={`${edu.color.replace('bg-','text-')} dark:${edu.color.replace('bg-','text-').replace('500','400')} font-medium text-sm mb-1.5`}>
                            {edu.institution}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200/30 dark:border-gray-700/30" variants={itemVariants}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-amber-500" />
                      Key Certifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { name: "Machine Learning Specialization", provider: "NPTEL" },
                        { name: "Data Science Professional Certificate", provider: "Google Cloud" },
                        { name: "Full Stack Web Development Bootcamp", provider: "Codegnan" },
                        { name: "Python Specialization", provider: "Hackerrank" }
                      ].map((cert, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="p-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/60 border border-gray-200/50 dark:border-gray-600/50 shadow-sm"
                        >
                          <h4 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                            {cert.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {cert.provider}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          )}

          {/* Services Section */}
          {activeSection === 'services' && (
            <motion.section 
                id={sectionIds.services}
                key="services"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                initial="hidden"
                animate={isVisible[sectionIds.services] || activeSection === 'services' ? "visible" : "hidden"}
                variants={containerVariants}
                className="max-w-5xl mx-auto"
              >
                 {/* ... Services section content ... */}
                 <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/40 dark:border-gray-700/40">
                  <div className="flex items-center mb-6 sm:mb-8">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mr-3">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      What I Offer
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"}}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg h-full"
                      >
                        <div className={`p-3.5 rounded-full ${service.bgColor}/10 ${service.color} inline-block mb-3 shadow-sm`}>
                          {React.cloneElement(service.icon, {className: "w-7 h-7"})}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                          {service.description}
                        </p>
                         <motion.button 
                            className={`mt-4 px-3 py-1.5 text-xs font-medium rounded-full ${service.bgColor} text-white hover:brightness-110 transition-all`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale:0.95}}
                          >
                            Learn More
                          </motion.button>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    variants={itemVariants}
                    className="mt-10 sm:mt-12 p-6 rounded-xl bg-gradient-to-tr from-primary via-purple-600 to-secondary text-white shadow-xl"
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 opacity-90" />
                      Why Collaborate With Me?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                      {[
                        { title: "Data-Driven Solutions", description: "Informed decisions with evidence-based insights." },
                        { title: "Modern Technologies", description: "Leveraging the latest tools for optimal performance." },
                        { title: "Agile & Adaptive", description: "Flexible approach to meet evolving project needs." },
                        { title: "Collaborative Spirit", description: "Open communication for shared success." }
                      ].map((item, index) => (
                        <motion.div key={index} className="flex items-start" variants={itemVariants}>
                            <Sparkles size={16} className="mr-2 mt-0.5 flex-shrink-0 opacity-80"/>
                            <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-xs opacity-80">{item.description}</p>
                            </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}