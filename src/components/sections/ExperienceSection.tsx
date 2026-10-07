import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Award, MapPin } from 'lucide-react';
import { RevealItem } from '../motion/Reveal';
import Section, { Chip, card } from './Section';
import { experiences } from '../../data/portfolio';

export default function ExperienceSection() {
  // The timeline line draws itself as the reader scrolls through the roles.
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });

  return (
    <Section
      id="experience"
      band
      eyebrow="Experience"
      title="Where I've"
      highlight="worked"
      intro="From mentoring and internships to shipping production features at DAZN India."
    >
      <ol ref={listRef} className="relative ml-2 md:ml-3 space-y-10">
        {/* Track and the animated line drawn over it */}
        <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="absolute left-0 top-0 bottom-0 w-0.5 -translate-x-1/2 origin-top bg-gradient-to-b from-secondary via-primary to-accent"
        />
        {experiences.map((job) => (
          <RevealItem as="li" key={`${job.company}-${job.role}`} className="relative pl-6 md:pl-10">
            {/* Timeline marker */}
            <span aria-hidden="true" className="absolute left-0 top-2 -translate-x-1/2 flex w-4 h-4">
              {job.current && <span className="absolute inset-0 rounded-full bg-emerald-500/60 animate-ping" />}
              <span
                className={`relative w-4 h-4 rounded-full border-4 border-gray-50 dark:border-gray-900 ${
                  job.current ? 'bg-emerald-500' : 'bg-primary dark:bg-primary-light'
                }`}
              />
            </span>

            <article className={`${card} p-6 md:p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30`}>
              <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                  <p className="mt-0.5 flex flex-wrap items-center gap-2 text-primary dark:text-primary-light font-semibold">
                    {job.company}
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Current
                      </span>
                    )}
                  </p>
                </div>
                <div className="font-mono text-xs text-gray-500 dark:text-gray-400 tabular-nums md:text-right shrink-0 space-y-1">
                  <p>{job.duration}</p>
                  <p className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {job.location}
                  </p>
                </div>
              </header>

              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed max-w-[70ch]">{job.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 max-w-[75ch]">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {job.achievements.length > 0 && (
                <ul className="mt-5 space-y-2 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 p-4">
                  {job.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <Award size={16} className="mt-0.5 text-amber-500 shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}

              {job.technologies.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <Chip key={tech} tone="primary">
                      {tech}
                    </Chip>
                  ))}
                </div>
              )}
            </article>
          </RevealItem>
        ))}
      </ol>
    </Section>
  );
}
