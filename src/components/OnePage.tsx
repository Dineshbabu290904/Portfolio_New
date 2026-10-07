import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from './Hero';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import Contact from './Contact';
import { HeroStage, ScrollStatement } from './motion/Scroll';
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
      lockedUntil.current = Date.now() + (how === 'smooth' ? 2500 : 300);
      if (target === 'home') window.scrollTo({ top: 0, behavior: how });
      else document.getElementById(target)?.scrollIntoView({ behavior: how, block: 'start' });
    };
    scroll(behavior);
    // On first load, fonts can shift the layout slightly; land on the section again once they are ready.
    if (first && target !== 'home') {
      document.fonts?.ready.then(() => scroll('instant' as ScrollBehavior));
    }
  }, [pathname, state]);

  // Scroll position -> route (keeps the nav highlight in sync). The current section is the one
  // crossing a reading line just above the middle of the screen; checked once per frame while scrolling.
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      if (Date.now() < lockedUntil.current) return;
      const line = window.innerHeight * 0.45;
      const current = sections.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect ? rect.top <= line && rect.bottom > line : false;
      });
      if (!current || current === activeRef.current) return;
      activeRef.current = current;
      navigate(sectionPath(current), { replace: true, state: { fromScroll: true } satisfies ScrollState });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    // When a programmatic scroll settles, release the lock and sync straight away.
    const onScrollEnd = () => {
      lockedUntil.current = 0;
      sync();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', onScrollEnd);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [navigate]);

  return (
    <>
      <HeroStage>
        <Hero />
      </HeroStage>
      <ScrollStatement
        eyebrow="In one line"
        segments={[
          { text: 'I build software behind' },
          { text: 'live sport', className: 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary' },
          { text: 'for millions of fans, and turn' },
          { text: 'data into decisions.', className: 'text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary' },
        ]}
      />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <Contact />
    </>
  );
}
