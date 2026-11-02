// Single source of truth for the one-page portfolio content.

export const profile = {
  name: 'Dinesh Babu Surapaneni',
  role: 'Associate Software Engineer',
  company: 'DAZN India',
  location: 'Hyderabad, India',
  hometown: 'Vijayawada, Andhra Pradesh',
  email: 'dineshbabus309@gmail.com',
  phone: '+91 63005 75551',
  resumeUrl: 'https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view',
  github: 'https://github.com/Dineshbabu290904',
  linkedin: 'https://www.linkedin.com/in/dinesh-babu-surapaneni/',
  bio: [
    "I'm an Associate Software Engineer at DAZN India, the global sports streaming platform. I joined as a Software Developer Intern in January 2026 and moved into a full-time role six months later, working on production features and critical fixes.",
    'My background is in Computer Science Engineering with a focus on Data Science at PVP Siddhartha Institute of Technology. Alongside backend and full-stack work, I build machine learning projects and mentor others in data structures and algorithms.',
  ],
  interests: [
    'Distributed systems',
    'Machine learning',
    'Competitive programming',
    'Mentoring',
    'Landscape photography',
    'Hiking',
  ],
};

export const highlights = [
  { value: '6 mo', label: 'Intern to full-time at DAZN' },
  { value: '140+', label: 'Students mentored in DSA' },
  { value: '6407', label: 'Global rank, TCS CodeVita S12' },
  { value: '4', label: 'Featured projects shipped' },
];

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  summary: string;
  points: string[];
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    company: 'DAZN India',
    role: 'Associate Software Engineer',
    duration: 'Jul 2026 – Present',
    location: 'Hyderabad, India',
    summary: 'Building production features for DAZN, the global sports streaming platform, after converting from the internship to a full-time role.',
    points: [
      'Work on production features and critical fixes across services that serve millions of sports fans.',
      'Apply caching, context propagation and system architecture practices to keep services scalable and reliable.',
      'Debug real-world production issues by tracing how services communicate and how data flows through the system.',
      'Collaborate across teams through code reviews, design discussions and knowledge-sharing sessions.',
    ],
    achievements: ['Converted from Software Developer Intern to Associate Software Engineer after six months.'],
    technologies: [],
    current: true,
  },
  {
    company: 'DAZN India',
    role: 'Software Developer Intern',
    duration: 'Jan 2026 – Jul 2026',
    location: 'Hyderabad, India',
    summary: 'Started in a production-scale engineering team, learning how large streaming systems are built, reviewed and operated.',
    points: [
      'Contributed to production features and fixes alongside senior engineers.',
      'Learned business context, code review workflows and debugging in a production environment.',
      'Gained hands-on experience with caching, context propagation and service architecture.',
    ],
    achievements: [],
    technologies: [],
  },
  {
    company: 'Smart Interviews',
    role: 'DSA Student Mentor',
    duration: 'Mar 2025 – Jan 2026 · Part-time',
    location: 'PVPSIT, Vijayawada',
    summary: 'Mentored aspiring software engineers in data structures and algorithms, building problem-solving skills and algorithmic thinking.',
    points: [
      'Ran weekly mentoring sessions on advanced DSA topics.',
      'Designed coding challenges and practice problem sets.',
      'Gave code reviews with concrete optimization strategies.',
      'Organized competitive programming contests.',
    ],
    achievements: [
      'Guided 140+ students through technical interview preparation.',
      'Built a structured DSA curriculum that the department adopted.',
      'Completed the Smart Coder program with a top rating in the batch.',
    ],
    technologies: ['Data Structures', 'Algorithms', 'Java', 'C++', 'Python'],
  },
  {
    company: 'Eduskills (Google Virtual)',
    role: 'AI & Machine Learning Intern',
    duration: 'Jul 2024 – Sep 2024',
    location: 'Virtual',
    summary: "Google's virtual internship program focused on applying AI and ML to real-world problems.",
    points: [
      'Built predictive models with supervised and unsupervised learning algorithms.',
      'Applied deep learning to computer vision and natural language processing tasks.',
    ],
    achievements: ['Reached 96% accuracy on a BERT-based sentiment analysis model.'],
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLTK', 'Pandas'],
  },
];

export type SkillLevel = 'Intermediate' | 'Advanced';

export interface SkillGroup {
  title: string;
  skills: { name: string; level?: SkillLevel }[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Java', level: 'Intermediate' },
      { name: 'C++', level: 'Intermediate' },
    ],
  },
  {
    title: 'Backend & Cloud',
    skills: [
      { name: 'Node.js & Express', level: 'Intermediate' },
      { name: 'NestJS', level: 'Intermediate' },
      { name: 'AWS Lambda & IAM', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'Git & GitHub', level: 'Advanced' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React & Next.js', level: 'Advanced' },
      { name: 'Redux', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'HTML & CSS', level: 'Advanced' },
    ],
  },
  {
    title: 'Data & Machine Learning',
    skills: [
      { name: 'TensorFlow & Keras', level: 'Advanced' },
      { name: 'Scikit-learn', level: 'Advanced' },
      { name: 'Pandas', level: 'Advanced' },
      { name: 'Computer Vision', level: 'Intermediate' },
      { name: 'NLP', level: 'Intermediate' },
      { name: 'Data Visualization', level: 'Advanced' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MySQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'Firebase', level: 'Intermediate' },
    ],
  },
  {
    title: 'Ways of working',
    skills: [
      { name: 'Problem solving' },
      { name: 'Code reviews' },
      { name: 'Mentoring' },
      { name: 'Team collaboration' },
      { name: 'Communication' },
      { name: 'Continuous learning' },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  kaggleUrl?: string;
  demoUrl?: string;
  /** Long-form case study shown on the project page. */
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    challenges: string;
    learnings: string;
  };
}

export const projects: Project[] = [
  {
    id: 'cms',
    title: 'College Management System',
    category: 'Full-stack web',
    year: '2024',
    summary: 'MERN-stack platform with separate student, faculty and admin portals for academic records, attendance and communication.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
    highlights: ['Role-based access', 'Multi-portal'],
    githubUrl: 'https://github.com/Dineshbabu290904/CMS-Backend',
    demoUrl: 'https://dineshcms.vercel.app',
    caseStudy: {
      overview:
        'A management system built on the MERN stack, with dedicated portals for students, faculty and administrators to streamline academic records, attendance tracking and institutional communication.',
      problem:
        'Institutions often juggle separate systems for student information, faculty tasks and administration, which leads to inefficiency and communication gaps.',
      solution:
        'A MongoDB, Express, React and Node.js application with role-based access control. Students see grades and attendance, faculty manage courses and assignments, and admins oversee users and system settings.',
      features: [
        'Role-based dashboards for students, faculty and admins.',
        'Secure authentication with JSON Web Tokens.',
        'Student module: profile, courses, grades and attendance.',
        'Faculty module: courses, materials, attendance and grading.',
        'Admin module: user management, course creation and configuration.',
        'RESTful API backend with Express.js and MongoDB.',
      ],
      challenges:
        'Implementing robust role-based access control, designing clear interfaces for three very different user types, keeping data secure, and modelling complex relationships in MongoDB.',
      learnings:
        'End-to-end MERN development, API design and integration, secure authentication practices, NoSQL data modelling, React state management and client-side routing.',
    },
  },
  {
    id: 'bone-fracture-detection',
    title: 'Bone Fracture Detection',
    category: 'Machine learning',
    year: '2023',
    summary: 'Deep learning model that detects bone fractures in X-ray images using a CNN, reaching 92% accuracy on the test set.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Scikit-learn'],
    highlights: ['92% accuracy', 'Medical imaging'],
    kaggleUrl: 'https://www.kaggle.com/code/dineshbabusurapaneni/machine-learning-capstone-one-fracture',
    caseStudy: {
      overview:
        'A convolutional neural network that classifies X-ray images as fractured or not fractured, built to give clinicians a fast preliminary read. It reached 92% accuracy on an unseen test set.',
      problem:
        'Radiologists carry heavy workloads, and fatigue can lead to missed findings. An automated model can act as a second opinion or help triage critical cases.',
      solution:
        'A ResNet-inspired CNN trained to classify fractured versus non-fractured images. Augmentation (rotation, zoom, flips, brightness) expanded the dataset and made the model robust to variations in image quality.',
      features: [
        '92% accuracy on the unseen test set.',
        'CNN architecture tuned for medical imaging.',
        'Preprocessing pipeline with normalization and augmentation.',
        'Prediction visualisations that highlight areas of interest (Grad-CAM).',
      ],
      challenges:
        'Sourcing a large, well-annotated dataset, handling class imbalance, keeping the model interpretable for medical use, and keeping inference efficient.',
      learnings:
        'CNN architectures in depth, medical image processing, TensorFlow and Keras, and evaluating models beyond accuracy with precision, recall and F1 on imbalanced data.',
    },
  },
  {
    id: 'digimart',
    title: 'DigiMart',
    category: 'Full-stack web',
    year: '2023',
    summary: 'E-commerce platform that connects farmers directly with buyers, with real-time pricing and demand analysis.',
    technologies: ['Java', 'Servlets', 'JSP', 'MySQL', 'JavaScript'],
    highlights: ['Real-time pricing', 'Direct trade'],
    githubUrl: 'https://github.com/Dineshbabu290904/DigiMart',
    caseStudy: {
      overview:
        'A full-stack marketplace that connects farmers directly with buyers. It offers transparent, real-time produce pricing, demand aggregation and direct communication to cut out intermediaries.',
      problem:
        'Farmers often lack direct market access and live price information, so they rely on intermediaries and lose margin. Buyers struggle to source fresh produce reliably from the source.',
      solution:
        'Java Servlets and JSP for the business logic and dynamic pages, HTML, CSS and JavaScript on the front end, and MySQL for users, listings, orders and transactions, following an MVC structure.',
      features: [
        'Separate portals for farmers and buyers with role-specific tools.',
        'Secure authentication, authorization and session management.',
        'Product catalogue with descriptions, media and pricing.',
        'Order flow from cart to (simulated) payment and confirmation.',
        'Admin panel for users, listings and platform analytics.',
      ],
      challenges:
        'Keeping data consistent across a relational schema, designing for many users and listings, and building a clear experience for very different user groups.',
      learnings:
        'The full web development lifecycle, Java web technologies (Servlets, JSP, JSTL), relational design and SQL with MySQL, and the MVC pattern.',
    },
  },
  {
    id: 'data-analytics-dashboard',
    title: 'Interactive Analytics Dashboard',
    category: 'Data visualization',
    year: '2022',
    summary: 'Dashboard for exploring complex datasets with customizable views, filters and live-updating charts.',
    technologies: ['React', 'Node.js', 'MongoDB', 'D3.js'],
    highlights: ['Interactive charts', 'Live updates'],
    githubUrl: 'https://github.com/Dineshbabu290904/data-analytics-dashboard-example',
    caseStudy: {
      overview:
        'An interactive dashboard for exploring datasets: upload a CSV, explore it through dynamic charts, apply filters and draw insights through a responsive interface.',
      problem:
        'Static reports and spreadsheets make it hard to explore data and spot patterns. Interactive dashboards let people engage with their data directly.',
      solution:
        'A React single-page app backed by a Node.js and Express API, with D3.js for custom visualisations and MongoDB for dashboard configurations and dataset metadata.',
      features: [
        'CSV upload with client- and server-side parsing.',
        'Interactive bar, line, pie, scatter and heatmap charts.',
        'Filtering, sorting and drill-down across dimensions.',
        'Groundwork for live updates over WebSockets.',
      ],
      challenges:
        'Rendering large datasets in the browser without slowing down, keeping visualisations responsive across browsers, and making complex interactions discoverable.',
      learnings:
        'Advanced React patterns, building REST APIs with Express, D3.js visualisation techniques, MongoDB data modelling and state management in a feature-rich SPA.',
    },
  },
];

export const education = [
  {
    degree: 'B.Tech, Computer Science Engineering (Data Science)',
    institution: 'PVP Siddhartha Institute of Technology, Vijayawada',
    duration: '2022 – 2026',
    note: 'CGPA 8.0/10',
  },
  {
    degree: 'Intermediate Education',
    institution: 'Narayana Junior College',
    duration: '2020 – 2022',
    note: '',
  },
];

export const certifications = [
  { name: 'Smart Coder', issuer: 'Smart Interviews', year: '2025' },
  { name: 'BCG Data Science Job Simulation', issuer: 'Forage', year: '2024' },
  { name: 'SQL (Basic)', issuer: 'HackerRank', year: '2024' },
  { name: 'Data Analytics Process Automation', issuer: 'Eduskills × Alteryx SparkED', year: '2025' },
];

// Section ids double as routes: /about, /experience, ... all render the one-page layout.
export const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'] as const;
export type SectionId = (typeof sections)[number];

export const sectionPath = (id: SectionId) => (id === 'home' ? '/' : `/${id}`);

const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

export const isSectionPath = (pathname: string) => sections.some((id) => sectionPath(id) === normalize(pathname));

export const sectionFromPath = (pathname: string): SectionId =>
  sections.find((id) => sectionPath(id) === normalize(pathname)) ?? 'home';
