import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage'; // Import Homepage
import ParticlesBackground from './components/ParticlesBackground';
import SingleProject from './components/SingleProject';
import './index.css';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import EnhancedAboutPage from './components/About';
import TerminalPage from './components/TerminalPage';
function App() {
  const location = useLocation();
  // Check if the current route is a specific project page
  const isProjectRoute = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';

  return (
    <div className="relative">
      {/* ParticlesBackground and Navigation always visible */}
      <ParticlesBackground />
      <Navigation />

      {/* Routes for main content */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* If you have separate page components for these sections, use them here */}
            {/* Otherwise, Homepage already renders them. This is an example if you refactor. */}
            <Route path="/about" element={<EnhancedAboutPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<SingleProject />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terminal" element={<TerminalPage />} />
            {/* Add a fallback route for 404 if desired */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
    </div>
  );
}

export default App;
