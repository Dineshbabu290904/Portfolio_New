import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Award, ChevronDown, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone,
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { CountUp, Reveal, SplitText } from '../motion/Reveal';
import { Marquee } from '../motion/Atmosphere';
import ProjectCover from '../ProjectCover';
import { ContactForm } from '../Contact';
import ActionTile from './ActionTile';
import { INTRO_HOLD, shouldPlayIntro } from '../../lib/intro';
import {
  certifications, education, experiences, highlights, profile, projects, skillGroups, type Experience,
} from '../../data/portfolio';

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

// A collapsible panel with an animated height. Used for long lists that most readers skim past.
function Disclosure({ title, children, defaultOpen = false }: { title: ReactNode; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left font-semibold text-gray-900 dark:text-white"
      >
        {title}
        <ChevronDown size={18} className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const pill = 'inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium';
const pillNeutral = `${pill} bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700`;
const pillPrimary = `${pill} bg-primary/10 text-primary border-primary/15 dark:bg-primary/15 dark:text-primary-light`;

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

// ---------- About ----------

function MobileAbout() {
  const [lead, ...rest] = profile.bio;
  const reduced = useReducedMotion();
  return (
    <MobileSection id="about" index="01" eyebrow="About" title="Engineer by trade," highlight="data nerd at heart">
      {/* Profile card: photo with name overlaid, unmasking as it scrolls in */}
      <motion.figure
        initial={reduced ? false : { clipPath: 'inset(12% 8% 12% 8% round 28px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden rounded-[28px] aspect-[4/5] max-h-[68svh] w-full bg-gray-900"
      >
        <img
          src={`${import.meta.env.BASE_URL}asserts/about.webp`}
          alt={profile.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
          <p className="font-display text-2xl font-extrabold leading-tight">{profile.name}</p>
          <p className="text-sm text-white/80">
            {profile.role} · {profile.company}
          </p>
        </figcaption>
      </motion.figure>

      <Reveal>
        <p className="mt-8 font-display text-[1.35rem] font-semibold leading-snug text-gray-900 dark:text-white">{lead}</p>
      </Reveal>
      {rest.map((p) => (
        <Reveal key={p.slice(0, 16)}>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-300">{p}</p>
        </Reveal>
      ))}

      <dl className="mt-8 grid grid-cols-2 gap-3">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <dd className="font-display text-3xl font-extrabold tracking-tight tabular-nums text-gray-900 dark:text-white">
              <CountUp value={item.value} />
            </dd>
            <dt className="mt-1 text-xs leading-snug text-gray-500 dark:text-gray-400">{item.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-8 mb-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Off the clock</p>
      <div className="flex flex-wrap gap-2">
        {profile.interests.map((i) => (
          <span key={i} className={pillNeutral}>
            {i}
          </span>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-800">
        <Disclosure title={<span>Education</span>}>
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="font-semibold text-gray-900 dark:text-white">{e.degree}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{e.institution}</p>
                <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {e.duration}
                  {e.note && ` · ${e.note}`}
                </p>
              </li>
            ))}
          </ul>
        </Disclosure>
        <Disclosure title={<span>Certifications</span>}>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4">
                <span className="min-w-0">
                  <span className="block font-semibold text-gray-900 dark:text-white">{c.name}</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">{c.issuer}</span>
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400 shrink-0">{c.year}</span>
              </li>
            ))}
          </ul>
        </Disclosure>
      </div>
    </MobileSection>
  );
}

// ---------- Experience ----------

function Role({ job, defaultOpen }: { job: Experience; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();
  const detailsId = `role-${job.company}-${job.role}`.replace(/\W+/g, '-').toLowerCase();
  return (
    <li className="relative pl-7 pb-9 last:pb-0">
      <span aria-hidden="true" className="absolute left-0 top-1.5 -translate-x-1/2 grid place-items-center w-4 h-4">
        {job.current && <span className="absolute inset-0 rounded-full bg-emerald-500/40 motion-safe:animate-ping" />}
        <span className={`relative w-3 h-3 rounded-full ring-4 ring-gray-50 dark:ring-gray-950 ${job.current ? 'bg-emerald-500' : 'bg-gradient-to-br from-primary to-secondary'}`} />
      </span>
      <Reveal>
        <p className="font-mono text-[0.7rem] text-gray-500 dark:text-gray-400">{job.duration}</p>
        <h3 className="mt-1 font-display text-xl font-extrabold leading-tight text-gray-900 dark:text-white">{job.role}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-primary dark:text-primary-light">
          {job.company}
          {job.current && (
            <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              Current
            </span>
          )}
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-gray-700 dark:text-gray-300">{job.summary}</p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={detailsId}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary dark:text-secondary"
        >
          {open ? 'Hide details' : 'Show details'}
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </Reveal>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-secondary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {job.achievements.length > 0 && (
              <ul className="mt-4 space-y-2">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm font-medium text-gray-800 dark:text-gray-200">
                    <Award size={16} className="mt-0.5 text-amber-500 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            )}
            {job.technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {job.technologies.map((t) => (
                  <span key={t} className={pillPrimary}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileExperience() {
  return (
    <MobileSection
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where I've"
      highlight="worked"
      intro="From mentoring and internships to shipping production features at DAZN India."
      tinted
    >
      <ol className="relative ml-2 border-l border-gray-300/80 dark:border-gray-700">
        {experiences.map((job, i) => (
          <Role key={`${job.company}-${job.role}`} job={job} defaultOpen={i === 0} />
        ))}
      </ol>
    </MobileSection>
  );
}

// ---------- Skills ----------

function MobileSkills() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const group = skillGroups[active];
  const marqueeWords = skillGroups.filter((g) => g.title !== 'Ways of working').flatMap((g) => g.skills.map((s) => s.name));

  return (
    <>
      <div aria-hidden="true" className="py-6 -rotate-2 select-none overflow-hidden">
        <Marquee baseVelocity={-0.6}>
          {marqueeWords.map((w) => (
            <span key={w} className="flex items-center">
              <span className="font-display font-extrabold tracking-tight text-3xl px-4 text-gray-900 dark:text-white">{w}</span>
              <span className="text-secondary text-xl">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
      <MobileSection id="skills" index="03" eyebrow="Skills" title="What I" highlight="work with" intro="Pick an area. A filled dot marks the tools I'm most fluent in.">
        <div role="tablist" aria-label="Skill areas" className="-mx-5 px-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {skillGroups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.title}
                type="button"
                role="tab"
                id={`skill-tab-${i}`}
                aria-selected={selected}
                aria-controls="skill-panel"
                onClick={() => setActive(i)}
                className={`relative shrink-0 h-10 px-4 rounded-full text-sm font-semibold transition-colors ${
                  selected ? 'text-white dark:text-gray-900' : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white"
                  />
                )}
                <span className="relative">{g.title}</span>
              </button>
            );
          })}
        </div>

        <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} className="mt-5 min-h-[12rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={group.title}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-2.5"
            >
              {group.skills.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3.5 py-3 text-sm font-medium text-gray-800 dark:text-gray-100"
                >
                  <span className="min-w-0">{s.name}</span>
                  {s.level && (
                    <span
                      role="img"
                      aria-label={`${s.level} proficiency`}
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        s.level === 'Advanced' ? 'bg-primary dark:bg-primary-light' : 'border-2 border-primary/60 dark:border-primary-light/60'
                      }`}
                    />
                  )}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </MobileSection>
    </>
  );
}

// ---------- Projects ----------

function MobileProjects() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = [...el.children] as HTMLElement[];
        const left = el.scrollLeft + el.clientWidth * 0.3;
        let current = 0;
        cards.forEach((c, i) => {
          if (c.offsetLeft <= left) current = i;
        });
        setIndex(current);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: 'smooth' });
  };

  return (
    <MobileSection id="projects" index="04" eyebrow="Projects" title="Things I've" highlight="built" intro="Swipe through. Tap a card for the full case study." tinted>
      <div
        ref={scroller}
        className="-mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Projects"
        role="region"
      >
        {projects.map((p, i) => (
          <article
            key={p.id}
            aria-label={`${i + 1} of ${projects.length}: ${p.title}`}
            className="snap-start shrink-0 w-[84%] max-w-[22rem] flex flex-col rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
          >
            <Link to={`/projects/${p.id}`} viewTransition aria-label={`${p.title} case study`} className="block">
              <ProjectCover id={p.id} label={`Illustration of ${p.title}`} className="w-full aspect-[16/10]" />
            </Link>
            <div className="flex-1 flex flex-col p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                {p.category} · {p.year}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-extrabold leading-tight text-gray-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.highlights.map((h) => (
                  <span key={h} className={pillPrimary}>
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-5 flex items-center gap-2">
                <Link
                  to={`/projects/${p.id}`}
                  viewTransition
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-semibold"
                >
                  Case study <ArrowUpRight size={16} />
                </Link>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="grid place-items-center w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                    <Github size={18} />
                  </a>
                )}
                {p.kaggleUrl && (
                  <a href={p.kaggleUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on Kaggle`} className="grid place-items-center w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                    <FontAwesomeIcon icon={faKaggle} className="w-4 h-4" />
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className="grid place-items-center w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-xs tabular-nums text-gray-500 dark:text-gray-400">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-1">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show project ${i + 1}: ${p.title}`}
              aria-current={i === index ? 'true' : undefined}
              className="grid place-items-center w-6 h-6"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-primary dark:bg-secondary' : 'w-1.5 bg-gray-300 dark:bg-gray-700'}`} />
            </button>
          ))}
        </div>
      </div>
    </MobileSection>
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

// The phone and tablet layout of the one-page site: same sections and ids, designed for thumbs.
export default function MobileHome() {
  return (
    <>
      <MobileHero />
      <MobileAbout />
      <MobileExperience />
      <MobileSkills />
      <MobileProjects />
      <MobileContact />
    </>
  );
}
