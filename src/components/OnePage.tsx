import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from './Hero';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import Contact from './Contact';
import { sections, sectionFromPath, sectionPath, type SectionId } from '../data/portfolio';

interface ScrollState {
  fromScroll?: boolean;
}

// The whole portfolio on one scrolling page. Section routes (/about, /skills, ...) scroll to their
// section, and scrolling updates the route so the navigation highlights where the reader is.
export default function OnePage() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const firstScroll = useRef(true);
  const activeRef = useRef<SectionId>(sectionFromPath(pathname));
  // While the page scrolls itself (nav click, deep link), ignore scroll-spy updates.
  const lockedUntil = useRef(0);

  // Route -> scroll position (nav clicks, deep links)
  useEffect(() => {
    const target = sectionFromPath(pathname);
    activeRef.current = target;
    if ((state as ScrollState | null)?.fromScroll) return;

    const first = firstScroll.current;
    firstScroll.current = false;
    const behavior: ScrollBehavior = first ? ('instant' as ScrollBehavior) : 'smooth';
    const scroll = (how: ScrollBehavior) => {
      lockedUntil.current = Date.now() + (how === 'smooth' ? 1200 : 300);
      if (target === 'home') window.scrollTo({ top: 0, behavior: how });
      else document.getElementById(target)?.scrollIntoView({ behavior: how, block: 'start' });
    };
    scroll(behavior);
    // On first load, fonts can shift the layout slightly; land on the section again once they are ready.
    if (first && target !== 'home') {
      document.fonts?.ready.then(() => scroll('instant' as ScrollBehavior));
    }
  }, [pathname, state]);

  // Scroll position -> route (keeps the nav highlight in sync)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedUntil.current) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const id = visible.target.id as SectionId;
        if (id === activeRef.current) return;
        activeRef.current = id;
        navigate(sectionPath(id), { replace: true, state: { fromScroll: true } satisfies ScrollState });
      },
      // A section counts as current when it crosses a line just above the middle of the screen.
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navigate]);

  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <Contact />
    </>
  );
}
