import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Section from './Section';
import { CountUp, Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import { Magnetic } from '../motion/Atmosphere';
import { certifications, education, highlights, profile } from '../../data/portfolio';

// Portrait that unmasks itself as the section scrolls in: the frame opens from the centre while the
// photo settles from a slow zoom (a Ken Burns move in reverse).
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 35%'] });
  const inset = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round 28px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={reduced ? { clipPath: 'inset(0 round 28px)' } : { clipPath }} className="overflow-hidden aspect-[4/5] bg-gray-200 dark:bg-gray-800">
        <motion.img
          src={`${import.meta.env.BASE_URL}asserts/about.jpg`}
          alt={profile.name}
          loading="lazy"
          style={reduced ? undefined : { scale }}
          className="w-full h-full object-cover object-[50%_25%]"
        />
      </motion.div>
      <span className="absolute -bottom-3 left-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900">
        Fig. 01 — Dinesh Babu
      </span>
    </div>
  );
}

export default function AboutSection() {
  const [lead, ...rest] = profile.bio;

  return (
    <Section id="about" chapter="01" eyebrow="About" title="Engineer by trade," highlight="data nerd at heart">
      <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Left: portrait stays in frame while the story scrolls past */}
        <div className="lg:sticky lg:top-28 self-start flex flex-col gap-8">
          <Portrait />
          <div className="flex flex-col gap-1">
            <p className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">{profile.name}</p>
            <p className="text-primary dark:text-primary-light font-semibold">
              {profile.role} · {profile.company}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={14} /> {profile.location}
            </p>
          </div>
          <Magnetic className="self-start">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold"
            >
              View resume
              <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </Magnetic>
        </div>

        {/* Right: the story in large type, then the numbers and credentials */}
        <div className="min-w-0 flex flex-col gap-14">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl md:text-[2.1rem] font-semibold leading-snug text-gray-900 dark:text-white max-w-[30ch]">
              {lead}
            </p>
          </Reveal>
          {rest.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 20)}>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-[60ch]">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">Off the clock</p>
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {profile.interests.map((interest, i) => (
                <span key={interest}>
                  {interest}
                  {i < profile.interests.length - 1 && <span className="mx-2 text-secondary">/</span>}
                </span>
              ))}
            </p>
          </Reveal>

          {/* Big figures */}
          <RevealGroup as="dl" className="grid grid-cols-2 gap-x-8 gap-y-10" stagger={0.1}>
            {highlights.map((item) => (
              <RevealItem key={item.label} className="flex flex-col gap-2 border-t border-gray-300/70 dark:border-gray-700 pt-4">
                <dd className="order-1 font-display text-5xl md:text-6xl font-extrabold tracking-tight tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">
                  <CountUp value={item.value} />
                </dd>
                <dt className="order-2 text-sm text-gray-500 dark:text-gray-400">{item.label}</dt>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Credentials as hairline lists */}
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 mb-4">Education</h3>
              <ul className="divide-y divide-gray-300/70 dark:divide-gray-700 border-y border-gray-300/70 dark:border-gray-700">
                {education.map((item) => (
                  <li key={item.degree} className="py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{item.degree}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.institution}</p>
                    <p className="font-mono text-xs text-gray-500 mt-1 tabular-nums">
                      {item.duration}
                      {item.note && ` · ${item.note}`}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 mb-4">Certifications</h3>
              <ul className="divide-y divide-gray-300/70 dark:divide-gray-700 border-y border-gray-300/70 dark:border-gray-700">
                {certifications.map((cert) => (
                  <li key={cert.name} className="py-4 flex items-baseline justify-between gap-4">
                    <span className="min-w-0">
                      <span className="block font-semibold text-gray-900 dark:text-white">{cert.name}</span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</span>
                    </span>
                    <span className="font-mono text-xs text-gray-500 tabular-nums shrink-0">{cert.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
