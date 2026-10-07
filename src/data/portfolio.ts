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
  summary: string;
  technologies: string[];
  highlights: string[];
  image: string;
  githubUrl?: string;
  kaggleUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'cms',
    title: 'College Management System',
    category: 'Full-stack web',
    summary: 'MERN-stack platform with separate student, faculty and admin portals for academic records, attendance and communication.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
    highlights: ['Role-based access', 'Multi-portal'],
    image: 'https://cdn.prod.website-files.com/65fabbf8f7f7323a634a308c/66c478f331c8f9c5995f02ba_Group%201171275868.png',
    githubUrl: 'https://github.com/Dineshbabu290904/CMS-Backend',
    demoUrl: 'https://dineshcms.vercel.app',
  },
  {
    id: 'bone-fracture-detection',
    title: 'Bone Fracture Detection',
    category: 'Machine learning',
    summary: 'Deep learning model that detects bone fractures in X-ray images using a CNN, reaching 92% accuracy on the test set.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Scikit-learn'],
    highlights: ['92% accuracy', 'Medical imaging'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&q=80&auto=format',
    kaggleUrl: 'https://www.kaggle.com/code/dineshbabusurapaneni/machine-learning-capstone-one-fracture',
  },
  {
    id: 'digimart',
    title: 'DigiMart',
    category: 'Full-stack web',
    summary: 'E-commerce platform that connects farmers directly with buyers, with real-time pricing and demand analysis.',
    technologies: ['Java', 'Servlets', 'JSP', 'MySQL', 'JavaScript'],
    highlights: ['Real-time pricing', 'Direct trade'],
    image: 'https://builtin.com/sites/www.builtin.com/files/styles/og/public/2022-09/ecommerce.png',
    githubUrl: 'https://github.com/Dineshbabu290904/DigiMart',
  },
  {
    id: 'data-analytics-dashboard',
    title: 'Interactive Analytics Dashboard',
    category: 'Data visualization',
    summary: 'Dashboard for exploring complex datasets with customizable views, filters and live-updating charts.',
    technologies: ['React', 'Node.js', 'MongoDB', 'D3.js'],
    highlights: ['Interactive charts', 'Live updates'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80&auto=format',
    githubUrl: 'https://github.com/Dineshbabu290904/data-analytics-dashboard-example',
  },
];

export const education = [
  {
    degree: 'B.Tech, Computer Science Engineering (Data Science)',
    institution: 'PVP Siddhartha Institute of Technology, Vijayawada',
    duration: '2022 – 2026',
    note: 'CGPA 8.5/10',
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
