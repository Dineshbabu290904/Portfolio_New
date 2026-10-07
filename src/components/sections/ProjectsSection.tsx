import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import Section, { Chip, SectionHeader, bandClass, card } from './Section';
import SkeletonImage from '../ui/SkeletonImage';
import { RevealGroup, RevealItem } from '../motion/Reveal';
import { ChapterNumber } from '../motion/Scroll';
import { projects, type Project } from '../../data/portfolio';

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors';

const heading = {
  id: 'projects',
  eyebrow: 'Projects',
  title: "Things I've",
  highlight: 'built',
  intro: 'A mix of full-stack products and machine learning work.',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <Link to={`/projects/${project.id}`} data-cursor="View" className="block relative" aria-label={`${project.title} details`}>
        <SkeletonImage src={project.image} alt={project.title} className="w-full h-48" />
        <span className="absolute top-3 left-3 font-mono text-xs tabular-nums px-2 py-1 rounded-md bg-black/55 text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </Link>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 mb-1">{project.category}</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            <Link to={`/projects/${project.id}`} className="hover:text-primary dark:hover:text-primary-light transition-colors">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <Chip key={h} tone="primary">
              {h}
            </Chip>
          ))}
          {project.technologies.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200/70 dark:border-gray-700/60 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link to={`/projects/${project.id}`} className={`${linkClass} text-primary dark:text-primary-light`}>
            Case study <ArrowUpRight size={16} />
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Github size={16} /> Code
            </a>
          )}
          {project.kaggleUrl && (
            <a href={project.kaggleUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <FontAwesomeIcon icon={faKaggle} className="w-4 h-4" /> Kaggle
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <ExternalLink size={16} /> Live demo
            </a>
          )}
        </div>
      </div>
    </>
  );
}

const cardClass = `${card} overflow-hidden flex flex-col group transition-[box-shadow,border-color] duration-500 hover:shadow-2xl hover:border-primary/30`;

// Phones, tablets and reduced motion: a regular grid.
function ProjectsGrid() {
  return (
    <Section {...heading} chapter="04" band>
      <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.12}>
        {projects.map((project, i) => (
          <RevealItem as="article" key={project.id} lift={6} className={cardClass}>
            <ProjectCard project={project} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

// Desktop: the section pins and vertical scrolling slides the cards sideways like a film strip.
function ProjectsFilmStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const x = useTransform(progress, [0, 1], [0, -distance]);
  const barScale = useTransform(progress, [0, 1], [0.04, 1]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      // Extra height sets the pace: the strip pans across 1.6x its travel distance for a slower camera move.
      style={{ height: `calc(100vh + ${Math.round(distance * 1.6)}px)` }}
      className={`relative ${bandClass}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-20">
        <div className="relative container mx-auto px-4 max-w-6xl flex items-end justify-between gap-8">
          <ChapterNumber value="04" className="absolute right-4 -top-24" />
          <SectionHeader {...heading} className="mb-8" />
          <div className="hidden lg:flex flex-col items-end gap-2 mb-10 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">Scroll to explore</span>
            <div className="h-0.5 w-40 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div style={{ scaleX: barScale }} className="h-full origin-left bg-gradient-to-r from-primary to-secondary" />
            </div>
          </div>
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 w-max pl-[max(1rem,calc((100vw-72rem)/2+1rem))] pr-[max(1rem,calc((100vw-72rem)/2+1rem))] will-change-transform"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`${cardClass} w-[min(30rem,40vw)] shrink-0`}
            >
              <ProjectCard project={project} index={i} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export default function ProjectsSection() {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 1024px) and (min-height: 700px)');
  return desktop && !reduced ? <ProjectsFilmStrip /> : <ProjectsGrid />;
}
