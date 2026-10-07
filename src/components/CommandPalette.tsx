import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, Award, Briefcase, Code, Copy, CornerDownLeft, FileText, FolderGit2, Github, Home,
  Linkedin, Mail, Moon, Search, Sparkles, Sun, Terminal, User,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { OPEN_PALETTE_EVENT } from '../lib/palette';
import { certifications, experiences, profile, projects, skillGroups } from '../data/portfolio';

type Group = 'Jump to' | 'Experience' | 'Projects' | 'Skills' | 'Certifications' | 'Links' | 'Actions';

interface Item {
  id: string;
  group: Group;
  title: string;
  subtitle?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
}

const groupOrder: Group[] = ['Jump to', 'Actions', 'Experience', 'Projects', 'Skills', 'Certifications', 'Links'];

function score(item: Item, q: string) {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.subtitle ?? ''} ${item.keywords ?? ''}`.toLowerCase();
  if (title.startsWith(q)) return 4;
  if (title.split(/\s+/).some((w) => w.startsWith(q))) return 3;
  if (title.includes(q)) return 2;
  if (hay.includes(q)) return 1;
  return 0;
}

// Site-wide command palette (⌘K / Ctrl+K or "/"): search every section, role, project, skill and
// link, plus quick actions. Fully keyboard driven.
export default function CommandPalette() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    (document.activeElement as HTMLElement | null)?.blur();
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const flash = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 1800);
  };

  const items = useMemo<Item[]>(() => {
    const go = (path: string) => () => navigate(path);
    const ext = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');
    const sectionIcon = { about: <User size={16} />, experience: <Briefcase size={16} />, skills: <Award size={16} />, projects: <Code size={16} />, contact: <Mail size={16} /> };
    return [
      { id: 's-home', group: 'Jump to', title: 'Home', subtitle: 'Back to the top', icon: <Home size={16} />, run: go('/') },
      { id: 's-about', group: 'Jump to', title: 'About', subtitle: 'Bio, education, certifications', keywords: 'profile background cgpa', icon: sectionIcon.about, run: go('/about') },
      { id: 's-experience', group: 'Jump to', title: 'Experience', subtitle: 'Roles and timeline', keywords: 'work job career dazn', icon: sectionIcon.experience, run: go('/experience') },
      { id: 's-skills', group: 'Jump to', title: 'Skills', subtitle: 'Languages, frameworks, tools', keywords: 'tech stack', icon: sectionIcon.skills, run: go('/skills') },
      { id: 's-projects', group: 'Jump to', title: 'Projects', subtitle: 'Things I have built', keywords: 'portfolio work', icon: sectionIcon.projects, run: go('/projects') },
      { id: 's-contact', group: 'Jump to', title: 'Contact', subtitle: 'Send a message', keywords: 'email phone hire', icon: sectionIcon.contact, run: go('/contact') },
      {
        id: 'a-theme', group: 'Actions', title: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        keywords: 'theme dark light mode appearance', icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />, run: toggleTheme,
      },
      { id: 'a-terminal', group: 'Actions', title: 'Open the terminal', subtitle: 'Explore the portfolio from a command line', keywords: 'cli shell console', icon: <Terminal size={16} />, run: go('/terminal') },
      {
        id: 'a-copy', group: 'Actions', title: 'Copy email address', subtitle: profile.email, keywords: 'email contact', icon: <Copy size={16} />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => flash('Email copied')).catch(() => flash(profile.email));
        },
      },
      ...experiences.map<Item>((job, i) => ({
        id: `e-${i}`, group: 'Experience', title: `${job.role}`, subtitle: `${job.company} · ${job.duration}`,
        keywords: `${job.company} ${job.technologies.join(' ')} ${job.points.join(' ')}`, icon: <Briefcase size={16} />, run: go('/experience'),
      })),
      ...projects.map<Item>((p) => ({
        id: `p-${p.id}`, group: 'Projects', title: p.title, subtitle: `${p.category} · ${p.technologies.slice(0, 3).join(', ')}`,
        keywords: `${p.summary} ${p.technologies.join(' ')} ${p.highlights.join(' ')}`, icon: <FolderGit2 size={16} />, run: go(`/projects/${p.id}`),
      })),
      ...skillGroups.flatMap((g) =>
        g.skills.map<Item>((s) => ({
          id: `k-${s.name}`, group: 'Skills', title: s.name, subtitle: `${g.title}${s.level ? ` · ${s.level}` : ''}`,
          icon: <Sparkles size={16} />, run: go('/skills'),
        }))
      ),
      ...certifications.map<Item>((c) => ({
        id: `c-${c.name}`, group: 'Certifications', title: c.name, subtitle: `${c.issuer} · ${c.year}`, icon: <Award size={16} />, run: go('/about'),
      })),
      { id: 'l-github', group: 'Links', title: 'GitHub', subtitle: 'Dineshbabu290904', icon: <Github size={16} />, run: ext(profile.github) },
      { id: 'l-linkedin', group: 'Links', title: 'LinkedIn', subtitle: 'dinesh-babu-surapaneni', icon: <Linkedin size={16} />, run: ext(profile.linkedin) },
      { id: 'l-resume', group: 'Links', title: 'Resume', subtitle: 'Opens in Google Drive', keywords: 'cv', icon: <FileText size={16} />, run: ext(profile.resumeUrl) },
      { id: 'l-email', group: 'Links', title: 'Email', subtitle: profile.email, keywords: 'mail', icon: <Mail size={16} />, run: () => { window.location.href = `mailto:${profile.email}`; } },
    ];
  }, [navigate, theme, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.filter((i) => i.group === 'Jump to' || i.group === 'Actions' || i.group === 'Links');
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || groupOrder.indexOf(a.item.group) - groupOrder.indexOf(b.item.group))
      .map((r) => r.item)
      .slice(0, 30);
  }, [items, query]);

  // Group for display while keeping a flat index for keyboard navigation.
  const grouped = useMemo(() => {
    const groups = new Map<Group, Item[]>();
    results.forEach((item) => groups.set(item.group, [...(groups.get(item.group) ?? []), item]));
    const ordered = query.trim() ? [...groups.keys()] : groupOrder.filter((g) => groups.has(g));
    const flat: Item[] = [];
    const sections = ordered.map((g) => {
      const list = groups.get(g)!;
      flat.push(...list);
      return { group: g, list };
    });
    return { sections, flat };
  }, [results, query]);

  const runItem = (item: Item) => {
    close();
    // Let the palette close before navigating so focus and scroll land correctly.
    setTimeout(item.run, 60);
  };

  // Global shortcuts and the open event from the navigation buttons
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest('input, textarea, [contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) close();
        else show();
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open, close, show]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    const count = grouped.flat.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (count ? (a + 1) % count : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (count ? (a - 1 + count) % count : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = grouped.flat[active];
      if (item) runItem(item);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  let index = -1;

  return (
    <>
      <AnimatePresence
        onExitComplete={() => {
          // Reset only once the close animation has finished, so the exiting dialog isn't re-rendered mid-exit.
          setQuery('');
          setActive(0);
        }}
      >
        {open && (
          <motion.div
            key="palette"
            className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gray-950/50 backdrop-blur-md" onClick={close} aria-hidden="true" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search the portfolio"
              initial={{ opacity: 0, y: -16, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, scale: 0.97, filter: 'blur(6px)', transition: { duration: 0.15, ease: 'easeIn' } }}
              // Spring for movement only: a spring on blur overshoots below zero, which browsers reject.
              transition={{ default: { type: 'spring', stiffness: 380, damping: 32 }, filter: { duration: 0.2, ease: 'easeOut' }, opacity: { duration: 0.18 } }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/85 dark:bg-gray-900/85 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
            >
              {/* Glow along the top edge */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />

              <div className="flex items-center gap-3 px-5 border-b border-gray-200/70 dark:border-white/10">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  id="palette-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Search roles, projects, skills… or type a command"
                  className="flex-1 bg-transparent py-4 text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-results"
                  aria-activedescendant={grouped.flat[active] ? `palette-${grouped.flat[active].id}` : undefined}
                  autoComplete="off"
                  spellCheck={false}
                />
                <kbd className="hidden sm:inline-flex font-mono text-[0.65rem] px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-gray-500">ESC</kbd>
              </div>

              <div ref={listRef} id="palette-results" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
                {grouped.flat.length === 0 && (
                  <div className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Nothing matches “{query}”. Try a skill like <span className="font-mono">react</span> or a company like{' '}
                    <span className="font-mono">dazn</span>.
                  </div>
                )}
                {grouped.sections.map(({ group, list }) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 pt-3 pb-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-gray-500">{group}</p>
                    {list.map((item) => {
                      index += 1;
                      const i = index;
                      const selected = i === active;
                      return (
                        <button
                          key={item.id}
                          id={`palette-${item.id}`}
                          data-index={i}
                          role="option"
                          aria-selected={selected}
                          onMouseMove={() => setActive(i)}
                          onClick={() => runItem(item)}
                          className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                            selected ? 'bg-primary/10 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className={`relative grid place-items-center w-8 h-8 rounded-lg shrink-0 ${selected ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>
                            {item.icon}
                          </span>
                          <span className="relative min-w-0 flex-1">
                            <span className="block font-medium truncate">{item.title}</span>
                            {item.subtitle && <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">{item.subtitle}</span>}
                          </span>
                          {selected && <ArrowRight size={16} className="relative text-primary dark:text-secondary shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-2.5 border-t border-gray-200/70 dark:border-white/10 font-mono text-[0.65rem] text-gray-500">
                <span className="flex items-center gap-3">
                  <span>↑↓ navigate</span>
                  <span className="inline-flex items-center gap-1"><CornerDownLeft size={11} /> open</span>
                </span>
                <span>⌘K / Ctrl K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-[96] px-4 py-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-medium shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
