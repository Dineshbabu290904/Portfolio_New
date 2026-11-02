import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SplitText } from '../motion/Reveal';
import { ContactForm } from '../Contact';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ActionTile from './ActionTile';
import { INTRO_HOLD, shouldPlayIntro } from '../../lib/intro';
import { profile } from '../../data/portfolio';

const ease = [0.16, 1, 0.3, 1] as const;
const roles = ['Software Engineer at DAZN', 'Full-Stack Developer', 'Data Scientist', 'Problem Solver'];
const gradientText = 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary';

// ---------- Shared pieces ----------

function MobileSection({
  id, index, eyebrow, title, highlight, intro, children, tinted = false,
}: {
  id: string; index: string; eyebrow: string; title: string; highlight?: string; intro?: string; children: ReactNode; tinted?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-14 px-5 py-14 ${tinted ? 'bg-white/60 dark:bg-gray-900/40 border-y border-gray-200/70 dark:border-gray-800' : ''}`}
    >
      <div className="mx-auto max-w-xl">
        <header className="mb-8">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-primary to-secondary" />
            {index} · {eyebrow}
          </p>
          <SplitText
            id={`${id}-title`}
            className="font-display text-[2.15rem] font-extrabold leading-[1.02] tracking-tight text-gray-900 dark:text-white"
            segments={[{ text: title }, ...(highlight ? [{ text: highlight, className: gradientText }] : [])]}
          />
          {intro && <p className="mt-3 text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-400">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

// ---------- Hero ----------

function Equalizer() {
  return (
    <span aria-hidden="true" className="flex items-end gap-[3px] h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="hero-eq w-[3px] h-full rounded-full bg-gradient-to-t from-primary to-secondary" style={{ animationDelay: `${i * -0.22}s` }} />
      ))}
    </span>
  );
}

function MobileHero() {
  const reduced = useReducedMotion();
  const [hold] = useState(() => (shouldPlayIntro(false) ? INTRO_HOLD : 0));
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [reduced]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: hold + delay, ease },
  });

  return (
    <section id="home" className="relative overflow-hidden flex flex-col px-5 pt-20 pb-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent dark:from-primary/25"
      />
      <div className="mx-auto max-w-xl w-full flex flex-col">
        {/* Identity row */}
        <motion.div {...enter(0)} className="flex items-center gap-4">
          <div className="relative w-[4.5rem] h-[4.5rem] shrink-0">
            {[0, 1].map((i) => (
              <span key={i} aria-hidden="true" className="hero-signal absolute inset-0 rounded-full border border-secondary/60" style={{ animationDelay: `${i * 1.6}s` }} />
            ))}
            <span aria-hidden="true" className="hero-orbit absolute -inset-1.5 rounded-full" />
            <img
              src={`${import.meta.env.BASE_URL}asserts/profile.jpg`}
              alt={`Portrait of ${profile.name}`}
              width={72}
              height={72}
              fetchPriority="high"
              className="relative w-full h-full rounded-full object-cover border-[3px] border-white dark:border-gray-900 shadow-lg"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white leading-snug">{profile.role}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              {profile.company} · Hyderabad
            </p>
          </div>
        </motion.div>

        <SplitText
          as="h1"
          onMount
          delay={hold + 0.1}
          className="mt-7 font-display text-[3.15rem] min-[400px]:text-[3.5rem] sm:text-7xl font-extrabold leading-[0.92] tracking-tight text-gray-900 dark:text-white"
          segments={[{ text: 'Dinesh Babu' }, { text: 'Surapaneni', className: gradientText }]}
        />

        <motion.p {...enter(0.35)} className="mt-5 text-lg text-gray-600 dark:text-gray-300 flex flex-wrap items-baseline gap-x-2">
          <span>I'm a</span>
          <span className="relative inline-grid overflow-hidden h-[1.35em] leading-[1.35]" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={roleIndex}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="block font-semibold leading-[1.35] text-primary dark:text-primary-light whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.p {...enter(0.45)} className="mt-4 text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-300">
          Building software for DAZN, the global sports streaming platform, and turning data into decisions with full-stack and
          machine learning work.
        </motion.p>

        <motion.div {...enter(0.55)} className="mt-7 grid grid-cols-2 gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
          >
            View projects <ArrowRight size={18} />
          </Link>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 font-semibold text-gray-900 dark:text-white active:scale-[0.98] transition-transform"
          >
            Resume <Download size={18} />
          </a>
        </motion.div>

        <motion.div {...enter(0.65)} className="mt-5 flex items-center gap-2">
          {[
            { href: profile.github, label: 'GitHub profile', icon: <Github size={19} /> },
            { href: profile.linkedin, label: 'LinkedIn profile', icon: <Linkedin size={19} /> },
            { href: `mailto:${profile.email}`, label: 'Send an email', icon: <Mail size={19} /> },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid place-items-center w-11 h-11 rounded-full border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200"
            >
              {s.icon}
            </a>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <MapPin size={14} /> {profile.location}
          </span>
        </motion.div>
      </div>

      {/* On-air card: the one-line pitch, with a live equaliser */}
      <motion.div {...enter(0.8)} className="mx-auto max-w-xl w-full mt-7">
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-4 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-white">
              <span className="hero-live-dot w-1.5 h-1.5 rounded-full bg-white" /> Live
            </span>
            <Equalizer />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">In one line</span>
          </div>
          <p className="font-display text-xl font-bold leading-snug text-gray-900 dark:text-white">
            I build software behind <span className={gradientText}>live sport</span> for millions of fans.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ---------- Contact ----------

function MobileContact() {
  return (
    <MobileSection id="contact" index="05" eyebrow="Contact" title="Let's" highlight="talk." intro="Open to conversations about engineering, collaborations and interesting problems.">
      <div className="grid grid-cols-2 gap-3">
        <ActionTile href={`mailto:${profile.email}`} icon={<Mail size={20} />} label="Email" hint={profile.email} />
        <ActionTile href={`tel:${profile.phone.replace(/\s/g, '')}`} icon={<Phone size={20} />} label="Call" hint={profile.phone} />
        <ActionTile href={profile.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" hint="Connect" />
        <ActionTile href={profile.github} icon={<Github size={20} />} label="GitHub" hint="See my code" />
      </div>

      <div className="mt-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
        <h3 className="font-display text-xl font-extrabold text-gray-900 dark:text-white mb-4">Send a message</h3>
        <ContactForm compact />
      </div>

      <p className="mt-5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <MapPin size={15} /> {profile.location}
      </p>
    </MobileSection>
  );
}

// The phone and tablet layout of the one-page site: a touch-first hero and contact around the
// shared About, Experience, Skills and Projects sections (same ids, so routes and scroll spy work).
export default function MobileHome() {
  return (
    <>
      <MobileHero />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <MobileContact />
    </>
  );
}
