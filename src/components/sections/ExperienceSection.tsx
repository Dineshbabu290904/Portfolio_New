import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, MapPin } from 'lucide-react';
import Section, { Chip } from './Section';
import { Reveal } from '../motion/Reveal';
import { experiences, type Experience } from '../../data/portfolio';

// One role as a full-width scene. Its start year is set huge in outline and fills with colour
// as the role scrolls up to the middle of the screen.
function Scene({ job }: { job: Experience }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 35%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(${fill}% 0 0 0)`;
  const year = job.duration.match(/\d{4}/)?.[0] ?? '';

  return (
    <li ref={ref} className="group relative grid gap-6 md:gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] py-12 md:py-16 border-t border-gray-300/70 dark:border-gray-700">
      {/* Year: outline underneath, gradient fill revealed bottom-up by scroll */}
      <div aria-hidden="true" className="relative font-display font-extrabold leading-none tracking-tighter text-7xl md:text-8xl select-none">
        <span className="text-outline">{year}</span>
        <motion.span
          style={reduced ? undefined : { clipPath }}
          className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary"
        >
          {year}
        </motion.span>
      </div>

      <Reveal className="min-w-0">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{job.role}</h3>
          <p className="font-mono text-xs text-gray-500 dark:text-gray-400 tabular-nums shrink-0">{job.duration}</p>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-primary dark:text-primary-light font-semibold">
          {job.company}
          {job.current && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              Current
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-mono text-xs font-normal text-gray-500 dark:text-gray-400">
            <MapPin size={12} /> {job.location}
          </span>
        </p>

        <p className="mt-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-[62ch]">{job.summary}</p>

        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 text-sm text-gray-600 dark:text-gray-400">
          {job.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-secondary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {job.achievements.length > 0 && (
          <ul className="mt-6 space-y-2">
            {job.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-2.5 text-sm font-medium text-gray-800 dark:text-gray-200">
                <Award size={16} className="mt-0.5 text-amber-500 shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}

        {job.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <Chip key={tech} tone="primary">
                {tech}
              </Chip>
            ))}
          </div>
        )}
      </Reveal>
    </li>
  );
}

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      chapter="02"
      band
      eyebrow="Experience"
      title="Where I've"
      highlight="worked"
      intro="From mentoring and internships to shipping production features at DAZN India."
    >
      <ol className="border-b border-gray-300/70 dark:border-gray-700">
        {experiences.map((job) => (
          <Scene key={`${job.company}-${job.role}`} job={job} />
        ))}
      </ol>
    </Section>
  );
}
