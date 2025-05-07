import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Github, ExternalLink, Zap, ArrowLeft, Code as CodeIcon, Tag, ListChecks, Star as StarIcon,
  CheckCircle, AlertTriangle, Layers, Share2, CalendarDays, Activity, Box, Palette, Briefcase, Cpu
} from 'lucide-react'; // Added more icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Static Project Data (Keep as is) ---
const projectsData = [
  {
    id: "bone-fracture-detection",
    title: "Bone Fracture Detection System",
    category: "Machine Learning",
    date: "Sept 2023",
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop&q=80&auto=format',
    shortDescription: "AI-powered system for rapid and accurate bone fracture detection from X-ray images using CNNs.",
    description: "This project focuses on leveraging deep learning, specifically Convolutional Neural Networks (CNNs), to automatically detect bone fractures from X-ray images. The system aims to assist medical professionals by providing a rapid and accurate preliminary assessment, potentially improving diagnostic efficiency and patient outcomes. The model was trained on a diverse dataset of X-ray images and achieved a promising 92% accuracy on the unseen test set.",
    detailedInfo: {
      problemStatement: "Radiologists often face a high workload, leading to potential fatigue and diagnostic errors. An automated system can serve as a valuable second opinion or a triaging tool for prioritizing critical cases.",
      solution: "A Convolutional Neural Network (CNN), inspired by architectures like ResNet, was meticulously trained to classify X-ray images into 'fractured' or 'non-fractured' categories. Advanced image augmentation techniques (rotation, zoom, flip, brightness adjustment) were employed to expand the dataset and enhance model robustness against variations in image quality and presentation.",
      keyFeatures: [
        "Achieved 92% accuracy on the unseen test dataset.",
        "Utilizes a robust CNN architecture optimized for medical imaging.",
        "Comprehensive preprocessing pipeline including image normalization and augmentation.",
        "Clear visualization of model predictions and areas of interest using techniques like Grad-CAM.",
        "Designed with potential for future integration into clinical diagnostic workflows."
      ],
      challenges: "Acquiring a large, diverse, and well-annotated dataset. Handling class imbalance. Ensuring model interpretability for medical professionals. Optimizing for computational efficiency.",
      learnings: "In-depth understanding of CNN architectures and backpropagation. Advanced medical image processing techniques. Mastery of TensorFlow/Keras. Critical evaluation of model performance metrics beyond simple accuracy (e.g., precision, recall, F1-score) in imbalanced datasets."
    },
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Scikit-learn", "NumPy", "Matplotlib", "Pandas"],
    highlights: ["92% Test Accuracy", "CNN Implementation", "Medical Imaging AI", "Image Augmentation", "Model Interpretability"],
    githubUrl: "",
    kaggleUrl: "https://www.kaggle.com/code/dineshbabusurapaneni/machine-learning-capstone-one-fracture",
    demoUrl: "",
  },
  {
    id: "digimart",
    title: "DigiMart: Farmer-Buyer E-commerce Platform",
    category: "Web Development",
    date: "June 2023",
    image: 'https://builtin.com/sites/www.builtin.com/files/styles/og/public/2022-09/ecommerce.png',
    shortDescription: "Full-stack e-commerce platform connecting farmers directly with buyers for fair trade.",
    description: "DigiMart is a full-stack e-commerce application designed to bridge the gap between farmers and buyers. It provides a transparent marketplace with features like real-time produce pricing, demand aggregation, and direct communication channels, aiming to empower farmers and ensure fair trade by minimizing intermediaries.",
    detailedInfo: {
      problemStatement: "Farmers often lack direct market access and real-time price information, leading to reliance on intermediaries and consequently reduced profit margins. Buyers, on the other hand, face challenges in consistently sourcing fresh, quality produce directly from the source.",
      solution: "A robust web platform built using Java Servlets and JSP for the backend business logic and dynamic content generation, coupled with HTML, CSS, and JavaScript for an interactive frontend. A MySQL relational database stores user profiles, product listings, order details, and transaction histories. Key platform features include distinct user roles (Farmer, Buyer, Admin), secure registration/login, comprehensive product listing with search/filter, and an integrated order management system.",
      keyFeatures: [
        "Dedicated portals for Farmers and Buyers with role-specific functionalities.",
        "Secure user authentication, authorization, and session management.",
        "Dynamic product catalog supporting rich media, detailed descriptions, and pricing.",
        "Streamlined order processing workflow from cart to (simulated) payment and confirmation.",
        "Administrator panel for user management, product oversight, and platform analytics."
      ],
      challenges: "Ensuring data integrity and consistency across a relational schema. Designing a scalable architecture for potentially numerous users and product listings. Implementing secure and reliable transaction processing (even if simulated). Crafting an intuitive and responsive user experience for diverse user groups.",
      learnings: "End-to-end full-stack web development lifecycle. In-depth application of Java web technologies (Servlets, JSP, JSTL). Relational database design principles and SQL mastery with MySQL. Frontend development fundamentals (HTML, CSS, JavaScript) for user interface creation. Adherence to MVC (Model-View-Controller) architectural pattern."
    },
    technologies: ["Java", "Servlets", "JSP", "HTML5", "CSS3", "JavaScript", "MySQL", "Apache Tomcat", "Bootstrap"],
    highlights: ["Full-Stack Java", "E-commerce Solution", "Database Management", "MVC Architecture", "User Authentication"],
    githubUrl: "https://github.com/Dineshbabu290904/DigiMart",
    kaggleUrl: "",
    demoUrl: "",
  },
  {
    id: "data-analytics-dashboard",
    title: "Interactive Data Analytics Dashboard",
    category: "Data Visualization",
    date: "Dec 2022",
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80&auto=format',
    shortDescription: "Dynamic dashboard for CSV data exploration with interactive charts and filters.",
    description: "This project showcases an interactive data analytics dashboard built with modern web technologies (React, Node.js, D3.js). It empowers users to upload datasets (CSV format), explore data through various dynamic chart types, apply granular filters, and derive actionable insights through an intuitive, responsive interface, thereby democratizing complex data interpretation.",
    detailedInfo: {
      problemStatement: "Traditional static reports and spreadsheets often prove insufficient for comprehensive data exploration and pattern discovery. Interactive dashboards offer a more fluid and intuitive methodology for users to engage with their data and unearth underlying trends.",
      solution: "A React-based single-page application (SPA) serves as the frontend, providing a rich user interface. This frontend communicates with a Node.js/Express backend API for data processing and management tasks. D3.js is employed for rendering sophisticated and customizable data visualizations. MongoDB, a NoSQL document database, is utilized for storing user-specific dashboard configurations, uploaded dataset metadata, or potentially pre-aggregated data summaries.",
      keyFeatures: [
        "Seamless CSV data uploading and client-side/server-side parsing.",
        "Wide array of interactive chart types (e.g., bar, line, pie, scatter, heatmaps).",
        "Advanced interactive filtering, sorting, and drill-down capabilities across multiple dimensions.",
        "Conceptual support for customizable dashboard layouts using drag-and-drop widget functionality.",
        "Framework for potential real-time data updates via WebSockets or server-sent events."
      ],
      challenges: "Efficiently handling and rendering potentially large datasets in the browser without performance degradation. Ensuring cross-browser compatibility and responsiveness for diverse visualizations. Designing an intuitive and discoverable user experience for complex data interaction and customization. Managing application state effectively in a feature-rich React application.",
      learnings: "Advanced React concepts including hooks, context API, and component-based architecture for frontend development. Building RESTful APIs with Node.js and Express.js. Mastering data visualization principles and techniques using D3.js. Understanding NoSQL database paradigms with MongoDB. Implementing robust state management strategies (e.g., Redux Toolkit, Zustand, or React Context) for complex SPAs."
    },
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "D3.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"],
    highlights: ["Interactive Visualizations", "Data-Driven UI", "RESTful APIs", "Responsive Design", "Scalable Architecture"],
    githubUrl: "https://github.com/Dineshbabu290904/", // Assuming this is a general link, replace if specific
    demoUrl: "",
  },
  { // <-- NEW PROJECT ADDED HERE -->
    id: "cms",
    title: "College Management System",
    category: "Web Development",
    date: "Jan 2024", // Example date, please update
    image: "https://cdn.prod.website-files.com/65fabbf8f7f7323a634a308c/66c478f331c8f9c5995f02ba_Group%201171275868.png", // Replace with a relevant CMS image or screenshot
    description: "A comprehensive management system built with the MERN stack, providing dedicated portals for students, faculty, and administrators to streamline academic record management, attendance tracking, and institutional communication.",
    detailedInfo: {
      problemStatement: "Educational institutions often struggle with disparate systems for managing student information, faculty tasks, and administrative duties, leading to inefficiencies and communication breakdowns.",
      solution: "Developed a MERN stack (MongoDB, Express.js, React, Node.js) application featuring role-based access control. Separate dashboards allow students to view grades/attendance, faculty to manage courses/assignments, and admins to oversee user management and system settings.",
      keyFeatures: [
        "Role-based dashboards (Student, Faculty, Admin).",
        "Secure authentication using JWT (JSON Web Tokens).",
        "Student module: View profile, courses, grades, attendance.",
        "Faculty module: Manage courses, upload materials, track attendance, grade assignments.",
        "Admin module: User management, course creation, system configuration.",
        "RESTful API backend with Express.js and MongoDB.",
        "Responsive frontend built with React."
      ],
      challenges: "Implementing robust role-based access control (RBAC), designing intuitive interfaces for different user types, ensuring data security and privacy, managing complex data relationships in MongoDB.",
      learnings: "Full MERN stack development proficiency. API design and integration. Secure authentication practices. Database modeling with NoSQL (MongoDB). State management in React (e.g., Context API or Redux). Frontend routing with React Router."
    },
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Tailwind CSS", "HTML5", "CSS3"], // Added JWT, Tailwind
    highlights: ["MERN Stack", "Multi-Portal System", "Role-Based Access Control", "RESTful API", "Secure Auth"],
    githubUrl: "https://github.com/Dineshbabu290904/CMS-frontend",
    kaggleUrl: "", // Leave empty if not applicable
    demoUrl: "https://dineshcms.vercel.app",
  },
];


interface Project {
  id: string;
  title: string;
  category: string;
  date?: string;
  image: string;
  shortDescription: string; // Added for brevity in cards or lists
  description: string;
  detailedInfo?: {
    problemStatement?: string;
    solution?: string;
    keyFeatures?: string[];
    challenges?: string;
    learnings?: string;
  };
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  kaggleUrl?: string;
  demoUrl?: string;
}

// --- Reusable UI Components ---

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: JSX.Element;
  className?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, icon, className = "" }) => (
  <motion.div 
    className={`mb-8 md:mb-12 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="flex items-center mb-1">
      {icon && React.cloneElement(icon, { className: "w-6 h-6 mr-3 text-primary dark:text-primary-light" })}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
    </div>
    {subtitle && <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">{subtitle}</p>}
  </motion.div>
);

interface TechBadgeProps {
  tech: string;
}
const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => (
  <motion.span
    className="px-3 py-1.5 bg-primary/10 dark:bg-primary-light/15 text-primary dark:text-primary-light rounded-md text-xs font-medium hover:bg-primary/20 dark:hover:bg-primary-light/25 transition-colors duration-200"
    whileHover={{ scale: 1.05 }}
  >
    {tech}
  </motion.span>
);

interface InfoCardProps {
  title: string;
  icon: JSX.Element;
  children: React.ReactNode;
  color?: string; // e.g., "text-blue-500 dark:text-blue-400"
  className?: string;
}
const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, color = "text-primary dark:text-primary-light", className="" }) => (
  <motion.div
    className={`bg-white dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/30 dark:border-slate-700/50 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`flex items-center p-4 sm:p-5 border-b border-gray-200/50 dark:border-slate-700/60`}>
      {React.cloneElement(icon, { className: `w-5 h-5 mr-3 ${color}` })}
      <h3 className={`text-lg font-semibold text-gray-700 dark:text-gray-200 ${color}`}>{title}</h3>
    </div>
    <div className="p-4 sm:p-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed prose dark:prose-invert prose-sm max-w-none">
      {children}
    </div>
  </motion.div>
);

// --- Page Animation Variants ---
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
};

const contentStaggerVariants = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } // Smoother ease
};


// --- SingleProject Component ---
function SingleProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Renamed for clarity
  const [error, setError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const heroImageScale = useTransform(scrollYProgress, [0, 0.3], [1.1, 1]); // Parallax effect for hero image
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.15]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const foundProject = projectsData.find(p => p.id === projectId);
    
    // Simulate API delay for better loading state visibility
    const timer = setTimeout(() => {
      if (foundProject) {
        setProject(foundProject);
      } else {
        setError("Project not found. It seems you've ventured into uncharted territory!");
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-6">
          <motion.div
            className="w-16 h-16 mx-auto mb-6"
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Layers size={64} className="text-primary dark:text-primary-light opacity-75" />
          </motion.div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Conjuring project details...</p>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 text-center">
        <motion.div initial={{ opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
          <AlertTriangle size={64} className="mx-auto text-red-500 dark:text-red-400 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">Lost in Hyperspace!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {error || "The project you're seeking seems to have taken an unexpected detour. Let's get you back on track."}
          </p>
          <RouterLink
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <ArrowLeft size={20} className="mr-2" /> Return to Project Galaxy
          </RouterLink>
        </motion.div>
      </div>
    );
  }

  // --- Main Project Display ---
  return (
    <motion.div
      className="bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 overflow-x-hidden"
      key={project.id} // Ensures re-animation on project change
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Animated Gradient Blobs in Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-primary/20 to-secondary/10 dark:from-primary/15 dark:to-secondary/5 rounded-full filter blur-3xl opacity-50 dark:opacity-30"
          animate={{
            scale: [1, 1.2, 1.05, 1.1, 1],
            rotate: [0, 15, -10, 5, 0],
            x: [-50, 30, -20, 10, -50],
            y: [20, -40, 30, -10, 20],
          }}
          transition={{ duration: 45, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] bg-gradient-to-tl from-accent/20 to-green-500/10 dark:from-accent/15 dark:to-green-500/5 rounded-full filter blur-3xl opacity-60 dark:opacity-40"
          animate={{
            scale: [1, 0.9, 1.15, 0.95, 1],
            rotate: [0, -20, 10, -5, 0],
            x: [40, -20, 50, -30, 40],
            y: [-30, 50, -20, 40, -30],
          }}
          transition={{ duration: 55, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* Hero Section */}
      <motion.header
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center py-20 md:py-32 isolate"
        initial="initial"
        animate="animate"
        variants={contentStaggerVariants}
      >
        <div className="absolute inset-0 overflow-hidden -z-10">
          {project.image && (
            <motion.img
              src={project.image}
              alt={`${project.title} illustrative background`}
              className="w-full h-full object-cover"
              style={{ scale: heroImageScale, opacity: heroImageOpacity }} // Use transformed values
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants}>
            <RouterLink to="/projects" className="inline-flex items-center text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary font-medium mb-8 text-sm group transition-colors duration-200">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              View All Projects
            </RouterLink>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary dark:bg-primary-light/15 dark:text-primary-light shadow-sm"
          >
            <Tag size={14} className="inline mr-1.5 align-text-bottom" />{project.category}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 dark:text-white leading-tight mb-4 tracking-tight"
          >
            {project.title}
          </motion.h1>

          {project.date && (
            <motion.p variants={itemVariants} className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center mb-8">
              <CalendarDays size={14} className="mr-1.5 opacity-70" /> Completed: {project.date}
            </motion.p>
          )}

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {project.shortDescription} {/* Use shortDescription here for brevity */}
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <motion.div
        className="container mx-auto px-4 py-16 md:py-24 relative z-10"
        initial="initial"
        animate="animate"
        variants={contentStaggerVariants}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Project Details - Left Column */}
          <main className="lg:col-span-8 space-y-10 md:space-y-12">
            <InfoCard title="Project Overview" icon={<Box size={22} />} className="prose-p:my-2">
                <p>{project.description}</p>
            </InfoCard>

            {project.detailedInfo?.problemStatement && (
              <InfoCard title="The Challenge" icon={<Zap size={22} />} color="text-red-500 dark:text-red-400">
                {project.detailedInfo.problemStatement}
              </InfoCard>
            )}
            {project.detailedInfo?.solution && (
              <InfoCard title="Crafting The Solution" icon={<ListChecks size={22} />} color="text-green-500 dark:text-green-400">
                {project.detailedInfo.solution}
              </InfoCard>
            )}
            {project.detailedInfo?.keyFeatures && project.detailedInfo.keyFeatures.length > 0 && (
              <InfoCard title="Core Functionality" icon={<StarIcon size={22} />} color="text-yellow-500 dark:text-yellow-400">
                <ul className="list-none space-y-3 pl-0">
                  {project.detailedInfo.keyFeatures.map((feature, index) => (
                    <motion.li 
                        key={index} 
                        className="flex items-start"
                        variants={itemVariants}
                    >
                      <CheckCircle size={18} className="mr-3 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>
            )}
            {project.detailedInfo?.challenges && (
              <InfoCard title="Obstacles & Insights" icon={<Briefcase size={22} />} color="text-indigo-500 dark:text-indigo-400">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Navigating Hurdles:</h4>
                <p className="mb-4">{project.detailedInfo.challenges}</p>
                {project.detailedInfo.learnings && (
                  <>
                    <div className="my-3 border-t border-gray-200/50 dark:border-slate-700/60"></div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Key Takeaways:</h4>
                    <p>{project.detailedInfo.learnings}</p>
                  </>
                )}
              </InfoCard>
            )}
          </main>

          {/* Sidebar - Right Column */}
          <motion.aside 
            className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 self-start" // Sticky positioning
            initial={{ opacity:0, x: 20 }}
            animate={{ opacity:1, x: 0 }}
            transition={{ duration:0.6, delay: 0.4 }}
          >
            <div className="p-6 bg-white dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/30 dark:border-slate-700/50">
                <SectionTitle title="Project Vitals" icon={<Cpu size={20}/>} className="mb-4 !text-xl" />
                <div className="space-y-3">
                    {project.highlights.map((highlight, index) => (
                    <motion.div 
                        key={index} 
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        variants={itemVariants} // Stagger items in sidebar too
                    >
                        <Activity size={16} className="mr-2.5 text-primary dark:text-primary-light flex-shrink-0 opacity-80" />
                        {highlight}
                    </motion.div>
                    ))}
                </div>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/30 dark:border-slate-700/50">
                <SectionTitle title="Tech Stack" icon={<Palette size={20}/>} className="mb-4 !text-xl"/>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                    ))}
                </div>
            </div>

            {(project.githubUrl || project.kaggleUrl || project.demoUrl) && (
                <div className="p-6 bg-white dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/30 dark:border-slate-700/50">
                    <SectionTitle title="Explore Further" icon={<ExternalLink size={20}/>} className="mb-4 !text-xl"/>
                    <div className="space-y-3">
                    {project.githubUrl && (
                        <motion.a
                            href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="group flex items-center w-full px-4 py-3 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Github size={18} className="mr-2.5 group-hover:rotate-[12deg] transition-transform" /> View on GitHub
                        </motion.a>
                    )}
                    {project.kaggleUrl && (
                        <motion.a
                            href={project.kaggleUrl} target="_blank" rel="noopener noreferrer"
                            className="group flex items-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                        >
                            <FontAwesomeIcon icon={faKaggle} className="w-5 h-5 mr-2.5 group-hover:scale-110 transition-transform" /> View on Kaggle
                        </motion.a>
                    )}
                    {project.demoUrl && (
                        <motion.a
                            href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                            className="group flex items-center w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:brightness-110 text-white rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                        >
                            <ExternalLink size={18} className="mr-2.5 group-hover:translate-x-0.5 transition-transform" /> Launch Live Demo
                        </motion.a>
                    )}
                    </div>
                </div>
            )}
             {(!project.githubUrl && !project.kaggleUrl && !project.demoUrl) && (
                <div className="p-6 bg-white dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/30 dark:border-slate-700/50 text-center">
                    <Share2 size={24} className="mx-auto text-gray-400 dark:text-gray-500 mb-2"/>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No external links are available for this project at the moment.</p>
                </div>
            )}
          </motion.aside>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SingleProject;