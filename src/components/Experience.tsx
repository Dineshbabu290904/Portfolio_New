import React, { useState, useMemo } from 'react'; // Removed useEffect as it wasn't used directly
import { 
  Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, Award,
  CheckCircle, Zap, Sparkles, GraduationCap, GitBranch, Monitor, Link as LinkIcon // Added LinkIcon for resume
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Timeline data
const timelineData = [ // Renamed to avoid conflict with experiences 'timeline' component
  {
    year: "2024",
    title: "Data Science Specialization & Advanced Projects",
    detail: "Deepening expertise in Data Science, working on complex ML applications, and exploring MLOps.",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    color: "bg-blue-500",
    borderColor: "border-blue-500"
  },
  {
    year: "2023",
    title: "Deep Learning Focus", // Slightly rephrased
    detail: "Intensive work on AI/ML, specializing in Deep Learning frameworks (TensorFlow, PyTorch) and advanced neural network architectures.",
    icon: <GitBranch className="w-5 h-5 text-white" />, 
    color: "bg-purple-500",
    borderColor: "border-purple-500"
  },
  {
    year: "2022",
    title: "Foundations in Development & Analytics", // Slightly rephrased
    detail: "Initiated journey into software development, mastering core programming concepts and fundamental data analytics techniques.",
    icon: <Monitor className="w-5 h-5 text-white" />, 
    color: "bg-green-500",
    borderColor: "border-green-500"
  }
];

const experiencesData = [ // Renamed to avoid conflict
  {
    company: 'Eduskills (Google Virtual)',
    role: 'Artificial Intelligence & Machine Learning Intern',
    duration: 'Jul 2024 - Sep 2024', // More readable format
    location: 'Virtual Program',
    description: 'Engaged in Google\'s immersive virtual internship, focusing on cutting-edge AI and ML technologies to solve real-world problems.',
    responsibilities: [
      'Developed practical expertise in AI/ML concepts and tools via hands-on projects.',
      'Learned the concepts on complex machine learning challenges.',
      'Engineered predictive models using diverse supervised and unsupervised learning algorithms.',
      'Applied deep learning for computer vision and natural language processing tasks.'
    ],
    achievements: [
      'Achieved 96% accuracy on a sentiment analysis model utilizing BERT architecture.',
      'Successfully completed all program modules and certification requirements with distinction.'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLTK', 'Pandas', 'Python'],
    featured: true
  },
  {
    company: 'Smart Interviews',
    role: 'Data Structures & Algorithms Mentor',
    duration: 'Feb 2025 - Jun 2025(Curently Working) - Part Time',
    location: 'PVPSIT, Vijayawada',
    description: 'Mentored aspiring software engineers in Data Structures and Algorithms, fostering problem-solving skills and algorithmic thinking.',
    responsibilities: [
      'Conducted weekly, in-depth mentoring sessions on advanced DSA topics.',
      'Designed and curated coding challenges and comprehensive practice problem sets.',
      'Provided constructive code reviews and actionable optimization strategies.',
      'Organized and facilitated competitive programming contests to enhance practical skills.'
    ],
    achievements: [
      'Guided 140+ students to successfully navigate and clear technical interviews at leading tech firms.',
      'Developed a structured DSA curriculum that was subsequently adopted by the department.'
    ],
    technologies: ['Data Structures', 'Algorithms', 'Problem Solving', 'Java', 'C++', 'Python', 'Competitive Programming'],
    featured: true
  },
  
];

// Animation Variants
const sectionFadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const listStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger for list items
      delayChildren: 0.2    // Delay after container becomes visible
    }
  }
};

const listItemFadeInUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};


const ExperienceItem = ({ experience, isLast, index }: { /* Props type from previous version */
  experience: {
    company: string; role: string; duration: string; location?: string; description: string;
    responsibilities: string[]; achievements?: string[]; technologies: string[]; featured?: boolean;
  };
  isLast: boolean; index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
        className={`relative ${!isLast ? 'pb-12 md:pb-16' : ''}`} // Adjusted padding
        variants={listItemFadeInUp} // Apply item animation
    >
      {/* Timeline line connecting items */}
      {!isLast && (
        <div className="absolute left-[1.1875rem] top-10 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 dark:from-primary-light/50 dark:to-primary-light/10" />
      )}
      
      <div className="relative z-10 flex items-start mb-4"> {/* items-start for better alignment if icon box is larger */}
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary-light/15 backdrop-blur-sm border border-primary/20 dark:border-primary-light/25 shadow-md">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary dark:text-primary-light" />
        </div>
        <div className="ml-4 pt-1 md:pt-2"> {/* Align text with icon center */}
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white leading-tight">
              {experience.role}
            </h3>
            <p className="text-md text-primary dark:text-primary-light font-medium">
              {experience.company}
            </p>
        </div>
      </div>
      
      <div 
        className={`ml-10 md:ml-12 pl-4 md:pl-6 relative overflow-hidden transition-all duration-500
                    bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg 
                    border border-gray-200/40 dark:border-gray-700/40
                    rounded-xl shadow-lg hover:shadow-2xl group/card
                    ${experience.featured ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-primary/50 dark:ring-primary-light/50' : ''}`}
      >
        {experience.featured && (
          <div className="absolute top-0 right-0 text-xs px-3 py-1 font-semibold rounded-bl-xl rounded-tr-lg 
                          bg-gradient-to-r from-primary to-secondary text-white shadow-md z-10">
            Featured
          </div>
        )}
        
        <div className="p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                <span>{experience.duration}</span>
              </div>
              {experience.location && (
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {experience.description}
          </p>
          
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Technologies:</h4>
            <div className="flex flex-wrap gap-1.5">
                {experience.technologies.map((tech) => (
                <span key={tech}
                    className="px-2.5 py-0.5 bg-primary/5 dark:bg-primary-light/10 text-primary dark:text-primary-light 
                            rounded-full text-xs font-medium border border-primary/10 dark:border-primary-light/20">
                    {tech}
                </span>
                ))}
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-xs sm:text-sm font-medium text-primary dark:text-primary-light hover:underline focus:outline-none group"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Show Less Details' : 'Show More Details'}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="ml-1">
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div 
                    key="details"
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }} // Animate marginTop for spacing
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} // Smoother ease
                    className="overflow-hidden"
                >
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-4">
                    <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" />
                        Key Responsibilities
                    </h4>
                    <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 pl-6 text-xs list-disc list-outside marker:text-primary dark:marker:text-primary-light">
                        {experience.responsibilities.map((item, idx) => (
                        <li key={idx} className="leading-snug">{item}</li>
                        ))}
                    </ul>
                    </div>
                    
                    {experience.achievements && experience.achievements.length > 0 && (
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-amber-500 dark:text-amber-400" />
                        Notable Achievements
                        </h4>
                        <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 pl-6 text-xs list-disc list-outside marker:text-primary dark:marker:text-primary-light">
                        {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="leading-snug">{achievement}</li>
                        ))}
                        </ul>
                    </div>
                    )}
                </div>
                </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable TimelineCard component
const TimelineCard = ({ item, index }: { item: typeof timelineData[0], index: number}) => (
    <motion.div
        variants={listItemFadeInUp}
        className="mb-10 sm:mb-0 flex sm:items-center w-full"
    >
        <div className={`sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8 sm:ml-auto sm:text-right'}`}>
            <div className={`p-5 md:p-6 rounded-xl shadow-xl border-l-4 ${item.borderColor}
                            bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg 
                            relative hover:shadow-2xl transition-shadow duration-300 group/timeline`}>
                
                {/* Desktop timeline dot - visual connection */}
                <div className={`hidden sm:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${item.color} 
                                border-4 border-white dark:border-gray-800 shadow-md
                                ${index % 2 === 0 ? '-right-2 transform translate-x-1/2' : '-left-2 transform -translate-x-1/2'}`}>
                </div>
                
                <div className="flex items-center mb-2 sm:justify-start ${index % 2 !== 0 ? 'sm:flex-row-reverse sm:text-right' : ''}">
                    <div className={`sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full ${item.color} mr-3 text-white shadow-md`}>
                        {React.cloneElement(item.icon, { className: "w-4 h-4"})}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${item.color} shadow-sm`}>
                        {item.year}
                    </span>
                </div>
                <h3 className="text-md md:text-lg font-semibold text-gray-800 dark:text-white mb-1.5 group-hover/timeline:text-primary dark:group-hover/timeline:text-primary-light transition-colors">
                    {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
            </div>
        </div>
        {/* Desktop icon on the line */}
        <div className={`hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ${item.color} shadow-lg 
                        absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        border-4 border-white dark:border-gray-800`}>
            {item.icon}
        </div>
    </motion.div>
);


export default function Experience() {
  const [filter, setFilter] = useState('all');
  
  const filteredExperiences = filter === 'all' 
    ? experiencesData 
    : experiencesData.filter(exp => exp.featured);
  
  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-40 dark:opacity-30"> 
        <motion.div 
            className="absolute top-0 -left-1/4 w-1/2 h-3/4 bg-primary/5 dark:bg-primary/10 rounded-full filter blur-3xl"
            animate={{ x: [-50, 50, -50], y: [-30, 30, -30]}}
            transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "circInOut"}}
        />
        <motion.div 
            className="absolute bottom-0 -right-1/4 w-1/2 h-3/4 bg-secondary/5 dark:bg-secondary/10 rounded-full filter blur-3xl"
            animate={{ x: [50, -50, 50], y: [30, -30, 30]}}
            transition={{ duration: 45, repeat: Infinity, repeatType: "mirror", ease: "circInOut", delay: 5}}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Work Experience Section */}
        <div className="max-w-4xl mx-auto mb-20 md:mb-28"> {/* Increased bottom margin */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light shadow-sm">
              <Sparkles className="inline-block w-4 h-4 mr-1.5 align-text-bottom" />
              Career Milestones
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Experience</span>
            </h2>
            <div className="mt-4 mx-auto w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </motion.div>
          
          <motion.div 
            initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.3}}
            className="flex justify-center mb-10 md:mb-12"
           >
            <div className="inline-flex rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-1 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
              {['all', 'featured'].map(type => (
                <button 
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${filter === type 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/60'
                    }`}
                >
                    {type === 'all' ? 'All Experiences' : 'Featured Only'}
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="relative" 
            variants={listStaggerContainer} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }} // Trigger when a bit of the list is visible
          >
            {filteredExperiences.map((experience, index) => (
              <ExperienceItem 
                key={`${experience.company}-${index}`} 
                experience={experience} 
                isLast={index === filteredExperiences.length - 1}
                index={index}
              />
            ))}
             {filteredExperiences.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg"
              >
                No featured experiences to show at the moment.
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* "My Journey So Far" Timeline Section */}
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={sectionFadeInUp} // Use sectionFadeInUp for the heading
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-12 md:mb-16"
            >
                <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light shadow-sm">
                    <GitBranch className="inline-block w-4 h-4 mr-1.5 align-text-bottom" />
                    My Growth Path
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
                    Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Highlights</span>
                </h2>
                <div className="mt-4 mx-auto w-24 h-1.5 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
            </motion.div>

            <motion.div 
                className="relative"
                variants={listStaggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
            >
                {/* Desktop Timeline Line */}
                <div className="hidden sm:block absolute top-6 bottom-6 left-1/2 w-1 bg-gradient-to-b from-primary/30 via-secondary/30 to-primary/30 dark:from-primary-light/30 dark:via-secondary-light/30 dark:to-primary-light/30 transform -translate-x-1/2 rounded-full"></div>
                
                {timelineData.map((item, index) => (
                    <TimelineCard key={index} item={item} index={index} />
                ))}
            </motion.div>
        </div>
          
        <motion.div 
            className="mt-16 md:mt-20 text-center"
            initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.4}}
        >
            <p className="text-gray-600 dark:text-gray-400 mb-4">Interested in my full professional background?</p>
            <motion.a 
              href="https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0px 10px 20px rgba(var(--color-primary-rgb, 0,100,255),0.25)"}} // Using CSS var for shadow color
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:shadow-xl text-white font-semibold rounded-lg transition-all duration-300 shadow-lg transform"
            >
              <LinkIcon className="w-5 h-5 mr-2.5" /> {/* Changed icon */}
              View Full Resume
            </motion.a>
        </motion.div>
      </div>
      <style jsx global>{`
        /* Helper for primary color RGB value for shadow (can be set in global CSS or via JS) */
        /* :root { --color-primary-rgb: 59, 130, 246; } /* Example Blue */

        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slower { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 50% { opacity: .6; } }
      `}</style>
    </section>
  );
}