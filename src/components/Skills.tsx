import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Code, Database, Brain, User, Users, Sparkles, Terminal, FileCode, Server, Layers,
  GitBranch, BookOpen, Workflow, Cpu, PieChart, Network, MessageSquare, Medal, Landmark,
  ChevronDown, ChevronUp, Zap, Star, CheckCircle, Briefcase, Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Using the data provided in your paste.txt file
const skillsData = {
  programmingLanguages: [
    { name: 'Python', level: 'Advanced', description: 'Extensive experience in machine learning, data analysis, automation, and backend development with Django/Flask.', years: 3, icon: <Terminal />, color: "text-green-500", bgColor: "bg-green-500/10" },
    { name: 'JavaScript', level: 'Advanced', description: 'Proficient in ES6+, React, Node.js for building dynamic UIs and robust server-side applications.', years: 0.5, icon: <Code />, color: "text-yellow-500", bgColor: "bg-yellow-500/10"  },
    { name: 'Java', level: 'Intermediate', description: 'Solid understanding for Android development and enterprise-level backend systems.', years: 1, icon: <Cpu />, color: "text-red-500", bgColor: "bg-red-500/10" },
    { name: 'C++', level: 'Intermediate', description: 'Applied in competitive programming, system-level tasks, and performance-critical modules.', years: 1, icon: <FileCode />, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { name: 'SQL', level: 'Advanced', description: 'Designing complex queries, database schemas, and optimizing performance for relational databases.', years: 2, icon: <Database />, color: "text-sky-500", bgColor: "bg-sky-500/10" },
  ],
  frameworksTools: [
    { name: 'React & Next.js', level: 'Advanced', description: 'Building interactive UIs, SPAs, and SSR applications with efficient state management.', years: 1, icon: <Layers />, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    { name: 'Node.js & Express', level: 'Intermediate', description: 'Developing scalable RESTful APIs and backend services.', years: 1, icon: <Server />, color: "text-lime-500", bgColor: "bg-lime-500/10" },
    { name: 'TensorFlow & Keras', level: 'Advanced', description: 'Designing, training, and deploying deep learning models for various AI tasks.', years: 2, icon: <Brain />, color: "text-orange-500", bgColor: "bg-orange-500/10" },
    { name: 'Scikit-learn', level: 'Advanced', description: 'Implementing classical machine learning algorithms and data preprocessing pipelines.', years: 2, icon: <PieChart />, color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { name: 'Git & GitHub', level: 'Advanced', description: 'Proficient in version control, branching strategies, and collaborative workflows.', years: 1.5, icon: <GitBranch />, color: "text-slate-500", bgColor: "bg-slate-500/10" },
    { name: 'Docker', level: 'Intermediate', description: 'Containerizing applications for consistent development and deployment environments.', years: 0.5, icon: <Briefcase />, color: "text-blue-600", bgColor: "bg-blue-600/10" },
  ],
  databases: [
    { name: 'PostgreSQL', level: 'Advanced', description: 'Expertise in relational database design, advanced SQL, and performance tuning.', years: 0.5, icon: <Database />, color: "text-blue-700", bgColor: "bg-blue-700/10" },
    { name: 'MySQL', level: 'Advanced', description: 'Solid experience in managing and querying MySQL databases for web applications.', years: 2, icon: <Database />, color: "text-orange-600", bgColor: "bg-orange-600/10" },
    { name: 'MongoDB', level: 'Intermediate', description: 'Working with NoSQL document stores for flexible data modeling and scalability.', years: 1, icon: <Layers />, color: "text-green-600", bgColor: "bg-green-600/10" },
    { name: 'Firebase Realtime DB', level: 'Intermediate', description: 'Utilizing Firebase for real-time data synchronization in web and mobile apps.', years: 1.5, icon: <Server />, color: "text-yellow-600", bgColor: "bg-yellow-600/10" },
  ],
  specializations: [
    { name: 'Machine Learning Engineering', level: 'Advanced', description: 'End-to-end ML model development, deployment (MLOps concepts), and monitoring.', years: 1.5, icon: <Brain />, color: "text-purple-600", bgColor: "bg-purple-600/10" },
    { name: 'Data Science & Analytics', level: 'Advanced', description: 'Extracting insights, statistical modeling, A/B testing, and data visualization.', years: 2, icon: <PieChart />, color: "text-teal-500", bgColor: "bg-teal-500/10" },
    { name: 'Deep Learning Applications', level: 'Intermediate', description: 'Focus on Computer Vision (CNNs) and Natural Language Processing (Transformers, RNNs).', years: 1.5, icon: <Network />, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
    { name: 'Full-Stack Development', level: 'Intermediate', description: 'Building complete web solutions from UI/UX to backend APIs and databases.', years: 1, icon: <Code />, color: "text-rose-500", bgColor: "bg-rose-500/10" },
  ],
  softSkills: [
    { name: 'Problem Solving', description: 'Analytical and creative approach to tackling complex challenges.', icon: <Lightbulb/>, color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { name: 'Team Collaboration', description: 'Effective communication and teamwork in agile environments.', icon: <Users/>, color: "text-green-500", bgColor: "bg-green-500/10" },
    { name: 'Adaptability', description: 'Quickly learning and applying new technologies and methodologies.', icon: <Zap/>, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    { name: 'Communication', description: 'Clearly articulating technical concepts to diverse audiences.', icon: <MessageSquare/>, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { name: 'Critical Thinking', description: 'Evaluating information objectively to make sound judgments.', icon: <BookOpen/>, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
    { name: 'Continuous Learning', description: 'Proactively seeking knowledge and skill development.', icon: <Sparkles/>, color: "text-pink-500", bgColor: "bg-pink-500/10" },
  ]
};

const getDefaultSkillIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'programmingLanguages': return <Terminal size={20} />;
    case 'frameworksTools': return <Workflow size={20} />;
    case 'databases': return <Database size={20} />;
    case 'specializations': return <Brain size={20} />;
    case 'softSkills': return <User size={20} />;
    default: return <Zap size={20} />;
  }
};

const getCategoryDisplayInfo = (categoryName: string) => {
  const info = {
    programmingLanguages: { title: 'Programming Languages', icon: <Terminal size={20} />, color: 'text-blue-500 dark:text-blue-400' },
    frameworksTools: { title: 'Frameworks & Tools', icon: <Workflow size={20} />, color: 'text-purple-500 dark:text-purple-400' },
    databases: { title: 'Databases', icon: <Database size={20} />, color: 'text-green-500 dark:text-green-400' },
    specializations: { title: 'Specializations', icon: <Brain size={20} />, color: 'text-indigo-500 dark:text-indigo-400' },
    softSkills: { title: 'Soft Skills', icon: <Users size={20} />, color: 'text-teal-500 dark:text-teal-400' },
  };
  return info[categoryName] || { title: categoryName, icon: <Code size={20} />, color: 'text-gray-500' };
};

const ProficiencyIndicator = ({ level }) => {
  const levelMap = {
    'Beginner': { stars: 2, color: 'text-amber-400', label: 'Beginner' },
    'Intermediate': { stars: 3, color: 'text-blue-400', label: 'Intermediate' },
    'Advanced': { stars: 4, color: 'text-green-400', label: 'Advanced' },
    'Expert': { stars: 5, color: 'text-emerald-400', label: 'Expert' },
  };
  const currentLevel = levelMap[level] || levelMap['Intermediate'];

  return (
    <div className="flex items-center" title={`${level} Proficiency`}>
      {Array(5).fill(0).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`mr-0.5 ${i < currentLevel.stars ? currentLevel.color : 'text-gray-300 dark:text-gray-600'}`}
          fill={i < currentLevel.stars ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

const BGShapes = () => { 
  const shapes = useMemo(() => Array(8).fill(0).map((_, i) => ({
    id: i,
    size: 30 + Math.random() * 90, 
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: 0.02 + Math.random() * 0.04,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 3,
    type: Math.random() > 0.5 ? 'circle' : 'squircle', 
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-70 dark:opacity-50">
      {shapes.map(shape => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.type === 'circle' ? 'rounded-full' : 'rounded-2xl'} bg-primary`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
          }}
          animate={{
            x: [0, Math.random() * 20 - 10, 0], 
            y: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 60 - 30, 0], 
            scale: [1, 1 + Math.random() * 0.1, 1], 
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// New compact skill card for the masonry layout
const SkillCard = ({ skill, index, isActive, onExpand }) => {
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          transition: { 
            delay: index * 0.05, 
            type: 'spring', 
            stiffness: 150, 
            damping: 20 
          } 
        }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => onExpand(skill)}
      className={`group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border ${isActive ? 'border-primary/50 dark:border-primary-light/50 shadow-lg ring-2 ring-primary/20' : 'border-gray-200/40 dark:border-gray-700/50'} overflow-hidden h-full`}
    >
      <div className="p-4 sm:p-5 h-full flex flex-col">
        <div className="flex items-center mb-3">
          <div className={`flex-shrink-0 p-2.5 rounded-lg mr-3 ${skill.bgColor || 'bg-gray-500/10'}`}>
            {React.cloneElement(skill.icon || getDefaultSkillIcon('default'), { size: 20, className: skill.color || 'text-gray-500' })}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">{skill.name}</h3>
            {skill.level && <ProficiencyIndicator level={skill.level} />}
          </div>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-3 flex-grow">
          {skill.description}
        </p>
        
        {skill.years && (
          <div className="mt-auto pt-2 text-xs text-primary dark:text-primary-light font-medium flex items-center">
            <Zap size={12} className="mr-1 opacity-80" />
            <span>{skill.years} {skill.years === 1 ? 'year' : 'years'} of experience</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Detailed skill modal
const SkillDetailModal = ({ skill, isOpen, onClose }) => {
  if (!skill) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center px-4 py-6 sm:p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 sm:p-3 rounded-xl mr-3 sm:mr-4 ${skill.bgColor || 'bg-gray-500/10'}`}>
                      {React.cloneElement(skill.icon || getDefaultSkillIcon(), { 
                        size: 20, 
                        className: skill.color || 'text-gray-500' 
                      })}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">{skill.name}</h3>
                      {skill.level && <ProficiencyIndicator level={skill.level} />}
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p className="text-sm leading-relaxed">{skill.description}</p>
                    
                    {skill.years && (
                      <div className="py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm flex items-center">
                        <Zap size={16} className="mr-2 text-blue-500 dark:text-blue-400" />
                        <span><span className="font-medium">{skill.years}</span> {skill.years === 1 ? 'year' : 'years'} of experience</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/80 flex justify-end">
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Category tab with more stylish design
const CategoryTab = ({ category, isActive, onClick }) => {
  const catInfo = getCategoryDisplayInfo(category);
  
  return (
    <motion.button
      whileHover={{ scale: isActive ? 1 : 1.05 }}
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
        ${isActive 
          ? 'text-white shadow-lg' 
          : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/90 hover:shadow-md border border-gray-200/50 dark:border-gray-600/50'
        }`}
    >
      {isActive && (
        <motion.div 
          layoutId="active-tab-bg"
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg"
          initial={false}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        {React.cloneElement(catInfo.icon, { className: isActive ? 'text-white' : catInfo.color, size: 18 })}
        <span>{catInfo.title}</span>
      </span>
    </motion.button>
  );
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('programmingLanguages');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const categories = Object.keys(skillsData);
  const currentSkills = skillsData[activeCategory] || [];

  useEffect(() => {
    const primaryColorValue = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
    if (primaryColorValue) {
      let r=59, g=130, b=246; 
      if (primaryColorValue.startsWith('#')) {
        r = parseInt(primaryColorValue.slice(1, 3), 16);
        g = parseInt(primaryColorValue.slice(3, 5), 16);
        b = parseInt(primaryColorValue.slice(5, 7), 16);
      } else if (primaryColorValue.startsWith('rgb')) {
        const parts = primaryColorValue.match(/(\d+),\s*(\d+),\s*(\d+)/);
        if (parts) { r = parseInt(parts[1]); g = parseInt(parts[2]); b = parseInt(parts[3]); }
      }
      document.documentElement.style.setProperty('--color-primary-rgb', `${r}, ${g}, ${b}`);
    } else {
      document.documentElement.style.setProperty('--color-primary-rgb', `59, 130, 246`);
    }
  }, []);
  
  const handleSkillClick = useCallback((skill: React.SetStateAction<null>) => {
    setSelectedSkill(skill);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  
  return (
    <section 
      id="skills" 
      className="py-20 md:py-28 relative overflow-hidden min-h-screen"
    >
      <BGShapes /> 
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light shadow-sm">
            <Zap className="inline-block w-4 h-4 mr-1.5 align-text-bottom" />
            My Technical Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Proficiencies</span>
          </h2>
          <div className="mt-4 mx-auto w-28 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"></div>
        </motion.div>
      
        {/* New vertical layout with sidebar categories and main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Category Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="sticky top-24 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg border border-gray-200/40 dark:border-gray-700/40 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <CategoryTab 
                    key={category}
                    category={category}
                    isActive={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  />
                ))}
              </div>
              
              {/* Category summary stats */}
              <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
                  <span>Skills in category</span>
                  <span className="font-medium">{currentSkills.length}</span>
                </div>
                {activeCategory !== 'softSkills' && (
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                    <span>Advanced level</span>
                    <span className="font-medium">
                      {currentSkills.filter((skill: { level: string; }) => skill.level === 'Advanced').length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Main Content - Skills Grid */}
          <motion.div 
            className="flex-grow"
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
            }}
          >
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg border border-gray-200/40 dark:border-gray-700/40 rounded-xl p-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  {getCategoryDisplayInfo(activeCategory).title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentSkills.length} skills
                </span>
              </div>
              
              {/* Masonry-style grid layout */}
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {currentSkills.map((skill: { name: any; }, index: any) => (
                  <SkillCard 
                    key={`${activeCategory}-${skill.name}`} 
                    skill={skill} 
                    index={index}
                    isActive={selectedSkill && selectedSkill.name === skill.name}
                    onExpand={handleSkillClick}
                  />
                ))}
                {currentSkills.length === 0 && (
                  <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                    No skills listed in this category yet.
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Skill Detail Modal */}
      <SkillDetailModal 
        skill={selectedSkill}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
}