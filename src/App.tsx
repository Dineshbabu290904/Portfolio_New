import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
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

function App() {
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<EnhancedAboutPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<SingleProject />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
