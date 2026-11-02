import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Code, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { SplitText } from './motion/Reveal';
import { Magnetic } from './motion/Atmosphere';
import { INTRO_HOLD, shouldPlayIntro } from '../lib/intro';
import { profile } from '../data/portfolio';

const roles = ['Software Engineer at DAZN', 'Full-Stack Developer', 'Data Scientist', 'Problem Solver'];
const ease = [0.16, 1, 0.3, 1] as const;

// Portrait as a live broadcast: signal rings radiate from it, a thin light ring orbits it, and a
// small "on air" card with a live equaliser floats beside it. A nod to building software for live sport.
function BroadcastPortrait({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92 }}
      transition={{ duration: 1.1, delay: 0.3, ease }}
      className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-[22rem] lg:h-[22rem]"
    >
      {/* Signal rings */}
      <div aria-hidden="true" className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <span key={i} className="hero-signal absolute inset-0 rounded-full border border-secondary/50" style={{ animationDelay: `${i * 1.2}s` }} />
        ))}
      </div>
      {/* Orbiting light ring */}
      <div aria-hidden="true" className="hero-orbit absolute -inset-3 rounded-full" />
      {/* Portrait */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white dark:border-gray-900 shadow-2xl shadow-primary/25 bg-gray-200 dark:bg-gray-800">
        <img
          src={`${import.meta.env.BASE_URL}asserts/profile.jpg`}
          alt={`Portrait of ${profile.name}`}
          width={352}
          height={352}
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
      </div>
      {/* On-air card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.7, delay: 1.0, ease }}
        className="absolute -left-4 sm:-left-10 bottom-4 sm:bottom-8"
      >
        <div className="hero-float flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-black/5 dark:ring-white/10 pl-3 pr-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-white">
            <span className="hero-live-dot w-1.5 h-1.5 rounded-full bg-white" /> Live
          </span>
          <span aria-hidden="true" className="flex items-end gap-[3px] h-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="hero-eq w-[3px] h-full rounded-full bg-gradient-to-t from-primary to-secondary" style={{ animationDelay: `${i * -0.22}s` }} />
            ))}
          </span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">Building for DAZN</span>
        </div>
      </motion.div>
      {/* Stack card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
        transition={{ duration: 0.7, delay: 1.15, ease }}
        className="absolute -right-2 sm:-right-6 top-6"
      >
        <div className="hero-float hero-float-alt rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl px-3 py-2 font-mono text-[0.7rem] font-semibold">
          {'</>'} full-stack · ml
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = useReducedMotion();
  // When the opening title sequence plays, hold the hero entrance until the curtain parts.
  const [hold] = useState(() => (shouldPlayIntro(false) ? INTRO_HOLD : 0));

  // Cursor spotlight: a fixed-size glow moved with transforms (cheap), following the pointer.
  const sectionRef = useRef<HTMLElement>(null);
  const spotX = useSpring(useMotionValue(-1000), { stiffness: 200, damping: 30 });
  const spotY = useSpring(useMotionValue(-1000), { stiffness: 200, damping: 30 });
  const handlePointer = (e: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(e.clientX - rect.left - 260);
    spotY.set(e.clientY - rect.top - 260);
  };

  // Parallax as the page scrolls away: the portrait drifts down while the copy lifts.
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, 70]);
  const copyY = useTransform(scrollY, [0, 700], [0, -40]);

  useEffect(() => {
    const reveal = setTimeout(() => setIsVisible(true), hold * 1000);
    const rotate = reduced ? undefined : setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => {
      clearTimeout(reveal);
      if (rotate) clearInterval(rotate);
    };
  }, [hold, reduced]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 18 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handlePointer}
      className="relative overflow-hidden min-h-[100svh] flex items-center pt-28 pb-16 lg:py-0"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: spotX, y: spotY }}
        className="pointer-events-none absolute left-0 top-0 hidden md:block w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgb(var(--c-secondary)/0.16),transparent_70%)] will-change-transform"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 dark:to-secondary/10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />

      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="grid items-center gap-14 lg:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <motion.div style={reduced ? undefined : { y: copyY }} className="min-w-0">
            <motion.p
              {...enter(0.05)}
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary/5 dark:bg-primary/15 text-sm font-medium text-primary dark:text-primary-light"
            >
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                {profile.role} at <span className="font-bold">{profile.company}</span>
              </span>
            </motion.p>

            <SplitText
              as="h1"
              onMount
              delay={hold + 0.15}
              className="font-display text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[0.95] text-gray-900 dark:text-white"
              segments={[
                { text: 'Dinesh Babu' },
                { text: 'Surapaneni', className: 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary' },
              ]}
            />

            {/* Rotating role: each title rolls up through a masked slot */}
            <motion.p {...enter(0.45)} className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 flex flex-wrap items-baseline gap-x-2">
              <span>I'm a</span>
              <span className="relative inline-grid overflow-hidden h-[1.35em] leading-[1.35]" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={roleIndex}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="block font-semibold leading-[1.35] text-primary dark:text-primary-light whitespace-nowrap"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.p {...enter(0.55)} className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-xl">
              Building software for DAZN, the global sports streaming platform. I enjoy turning data into insights and code into
              solutions, from full-stack web apps to machine learning.
            </motion.p>

            <motion.div {...enter(0.65)} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  View projects
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-white transition-transform duration-500 group-hover:-rotate-45">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </Magnetic>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 font-semibold hover:border-primary hover:text-primary dark:hover:border-secondary dark:hover:text-secondary transition-colors"
              >
                Resume <Download size={18} />
              </a>
              <div className="flex gap-2">
                {[
                  { href: profile.github, label: 'GitHub profile', icon: <Github size={20} /> },
                  { href: profile.linkedin, label: 'LinkedIn profile', icon: <Linkedin size={20} /> },
                  { href: `mailto:${profile.email}`, label: 'Send an email', icon: <Mail size={20} /> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center w-11 h-11 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:text-primary hover:border-primary/40 dark:hover:text-secondary transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.ul {...enter(0.75)} className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
              {[
                { icon: <Briefcase size={16} />, text: profile.company },
                { icon: <MapPin size={16} />, text: profile.location },
                { icon: <Code size={16} />, text: 'Full-stack · ML' },
              ].map((fact) => (
                <li key={fact.text} className="inline-flex items-center gap-2">
                  <span className="text-primary dark:text-primary-light">{fact.icon}</span>
                  {fact.text}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div style={reduced ? undefined : { y: portraitY }} className="flex justify-center lg:justify-end">
            <BroadcastPortrait visible={isVisible} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
