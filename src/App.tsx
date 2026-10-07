import { lazy, Suspense, type ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import OnePage from './components/OnePage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { FilmGrain, IntroCurtain, ScrollProgress } from './components/motion/Cinematic';
import { Aurora, Cursor } from './components/motion/Atmosphere';
import { ProjectDetailSkeleton, TerminalSkeleton, GenericPageSkeleton } from './components/ui/Skeleton';
import { isSectionPath } from './data/portfolio';
import './index.css';

// Separate pages are code-split so the main page loads faster.
const SingleProject = lazy(() => import('./components/SingleProject'));
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
      {pathname === '/' && <IntroCurtain />}
      <ScrollProgress />
      <FilmGrain />
      {/* Ambient backdrop and custom cursor; navigation always visible */}
      <Aurora />
      <Cursor />
      <Navigation />

      <main id="main-content" className="overflow-x-clip">
        {/* One scrolling page; each section also has its own URL (/about, /skills, ...).
            Rendered outside <Routes> so moving between sections never remounts it. */}
        {isSectionPath(pathname) ? (
          <OnePage />
        ) : (
          <Routes>
            <Route path="/projects/:projectId" element={withSkeleton(<SingleProject />, <ProjectDetailSkeleton />)} />
            <Route path="/terminal" element={withSkeleton(<TerminalPage />, <TerminalSkeleton />)} />
            <Route path="*" element={withSkeleton(<NotFound />, <GenericPageSkeleton />)} />
          </Routes>
        )}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
