import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import ProjectCover from './ProjectCover';
import NotFound from './NotFound';
import { Reveal, SplitText } from './motion/Reveal';
import { Chip } from './sections/Section';
import { projects, profile } from '../data/portfolio';

const eyebrow = 'font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary dark:text-primary-light';

// One chapter of the case study: a mono number in the margin, a heading and its body.
function Chapter({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-3 sm:grid-cols-[4rem_minmax(0,1fr)] border-t border-gray-300/70 dark:border-gray-700 pt-6">
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400 tabular-nums pt-1.5">{String(index).padStart(2, '0')}</span>
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">{title}</h2>
          <div className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-[65ch]">{children}</div>
        </div>
      </section>
    </Reveal>
  );
}

export default function SingleProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const index = projects.findIndex((p) => p.id === projectId);
  const project = projects[index];
  const reduced = useReducedMotion();

  // The cover settles from a slight zoom as the page scrolls, like a camera easing back.
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] });
  const coverY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} · ${profile.name}`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];
  const links = [
    project.demoUrl && { href: project.demoUrl, label: 'Live demo', icon: <ExternalLink size={16} />, primary: true },
    project.githubUrl && { href: project.githubUrl, label: 'Source code', icon: <Github size={16} />, primary: !project.demoUrl },
    project.kaggleUrl && { href: project.kaggleUrl, label: 'Kaggle notebook', icon: <FontAwesomeIcon icon={faKaggle} className="w-4 h-4" />, primary: !project.demoUrl && !project.githubUrl },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode; primary: boolean }[];
  const { caseStudy } = project;

  return (
    <article key={project.id} className="relative">
      {/* Title block */}
      <header className="container mx-auto px-4 max-w-6xl pt-28 md:pt-36 pb-10 md:pb-14">
        <Link
          to="/projects"
          viewTransition
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors mb-10"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> All projects
        </Link>
        <p className={`${eyebrow} mb-5 flex flex-wrap items-center gap-x-3 gap-y-1`}>
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-primary to-secondary" />
          Case study {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          <span className="text-gray-400" aria-hidden="true">·</span>
          <span className="text-gray-600 dark:text-gray-400">{project.category}</span>
          <span className="text-gray-400" aria-hidden="true">·</span>
          <span className="text-gray-600 dark:text-gray-400 tabular-nums">{project.year}</span>
        </p>
        <SplitText
          as="h1"
          onMount
          delay={0.1}
          className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-gray-900 dark:text-white max-w-5xl"
          segments={[{ text: project.title }]}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl"
        >
          {project.summary}
        </motion.p>
        {links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  l.primary
                    ? 'bg-gray-900 text-white hover:bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-secondary'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-primary hover:text-primary dark:hover:border-secondary dark:hover:text-secondary'
                }`}
              >
                {l.icon} {l.label} <ArrowUpRight size={14} className="opacity-60" />
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* Cover: the same motion graphic as the card, morphed in by the view transition */}
      <div ref={coverRef} className="container mx-auto px-4 max-w-6xl">
        <div className="overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 ring-1 ring-black/5 dark:ring-white/10">
          <motion.div style={reduced ? undefined : { y: coverY, scale: 1.08 }}>
            <ProjectCover id={project.id} label={`Illustration of ${project.title}`} className="w-full aspect-[16/9]" />
          </motion.div>
        </div>
      </div>

      {/* Story + facts */}
      <div className="container mx-auto px-4 max-w-6xl py-16 md:py-24 grid gap-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <div className="flex flex-col gap-12 min-w-0">
          <Chapter index={1} title="Overview">
            <p>{caseStudy.overview}</p>
          </Chapter>
          <Chapter index={2} title="The problem">
            <p>{caseStudy.problem}</p>
          </Chapter>
          <Chapter index={3} title="The approach">
            <p>{caseStudy.solution}</p>
          </Chapter>
          <Chapter index={4} title="What it does">
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {caseStudy.features.map((feature) => (
                <li key={feature} className="flex gap-4 py-3">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gradient-to-r from-primary to-secondary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Chapter>
          <Chapter index={5} title="Challenges">
            <p>{caseStudy.challenges}</p>
          </Chapter>
          <Chapter index={6} title="What I learned">
            <p>{caseStudy.learnings}</p>
          </Chapter>
        </div>

        <aside className="lg:sticky lg:top-28 self-start flex flex-col gap-8">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <Chip key={h} tone="primary">
                  {h}
                </Chip>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </Reveal>
          {links.length > 0 && (
            <Reveal delay={0.1}>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">Links</h2>
              <ul className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        {l.icon} {l.label}
                      </span>
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </aside>
      </div>

      {/* Next project */}
      <nav aria-label="Next project" className="border-t border-gray-200/70 dark:border-gray-800">
        <Link
          to={`/projects/${next.id}`}
          viewTransition
          className="group block container mx-auto px-4 max-w-6xl py-16 md:py-24"
        >
          <p className={`${eyebrow} mb-4`}>Next project</p>
          <div className="flex items-end justify-between gap-6">
            <span className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary">
              {next.title}
            </span>
            <span className="shrink-0 grid place-items-center w-14 h-14 md:w-20 md:h-20 rounded-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-[transform,background-color,color,border-color] duration-500 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 dark:group-hover:bg-white dark:group-hover:text-gray-900 group-hover:-rotate-45">
              <ArrowRight size={28} />
            </span>
          </div>
        </Link>
      </nav>
    </article>
  );
}
