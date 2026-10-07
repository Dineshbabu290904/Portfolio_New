import { lazy, Suspense, type ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import {
  ProfileSkeleton, SkillsPageSkeleton, TimelineSkeleton, ProjectsPageSkeleton,
  ProjectDetailSkeleton, ContactSkeleton, TerminalSkeleton, GenericPageSkeleton,
} from './components/ui/Skeleton';
import './index.css';

// Secondary pages are code-split so the home page loads faster.
const EnhancedAboutPage = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const SingleProject = lazy(() => import('./components/SingleProject'));
const Contact = lazy(() => import('./components/Contact'));
const TerminalPage = lazy(() => import('./components/TerminalPage'));
const NotFound = lazy(() => import('./components/NotFound'));

// Each lazy page gets a skeleton shaped like its own layout while its code loads.
const withSkeleton = (page: ReactNode, skeleton: ReactNode) => (
  <Suspense fallback={skeleton}>{page}</Suspense>
);

function App() {
  const { pathname } = useLocation();
  const showFooter = pathname !== '/terminal';

  return (
    <div className="relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-gray-900 focus:shadow-lg"
      >
        Skip to content
      </a>
      <ScrollToTop />
      {/* ParticlesBackground and Navigation always visible */}
      <ParticlesBackground />
      <Navigation />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={withSkeleton(<EnhancedAboutPage />, <ProfileSkeleton />)} />
          <Route path="/skills" element={withSkeleton(<Skills />, <SkillsPageSkeleton />)} />
          <Route path="/experience" element={withSkeleton(<Experience />, <TimelineSkeleton />)} />
          <Route path="/projects" element={withSkeleton(<Projects />, <ProjectsPageSkeleton />)} />
          <Route path="/projects/:projectId" element={withSkeleton(<SingleProject />, <ProjectDetailSkeleton />)} />
          <Route path="/contact" element={withSkeleton(<Contact />, <ContactSkeleton />)} />
          <Route path="/terminal" element={withSkeleton(<TerminalPage />, <TerminalSkeleton />)} />
          <Route path="*" element={withSkeleton(<NotFound />, <GenericPageSkeleton />)} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
