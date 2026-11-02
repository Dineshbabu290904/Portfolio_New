import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase, Code, FileText, Github, Home, Layers, Linkedin, Mail, Menu, Moon, Phone, Search, Sun, Terminal, User, X,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { openPalette } from '../../lib/palette';
import { isActiveRoute } from '../../lib/routes';
import { profile } from '../../data/portfolio';
import ActionTile from './ActionTile';

const dock = [
  { name: 'Home', route: '/', icon: Home },
  { name: 'About', route: '/about', icon: User },
  { name: 'Work', route: '/experience', icon: Briefcase },
  { name: 'Skills', route: '/skills', icon: Layers },
  { name: 'Projects', route: '/projects', icon: Code },
  { name: 'Contact', route: '/contact', icon: Mail },
];

// Label shown in the top bar once the reader scrolls, so they always know where they are.
const sectionLabel: Record<string, string> = {
  '/about': '01 · About',
  '/experience': '02 · Experience',
  '/skills': '03 · Skills',
  '/projects': '04 · Projects',
  '/contact': '05 · Contact',
  '/terminal': 'Terminal',
};

export default function MobileNav() {
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // While the sheet is open: Escape closes it and the page behind stays still.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = pathname.startsWith('/projects/') ? 'Case study' : sectionLabel[pathname];
  const iconButton =
    'grid place-items-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 active:bg-gray-200/70 dark:active:bg-gray-800 transition-colors';

  return (
    <>
      {/* Top bar */}
      <header
        className={`lg:hidden fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 border-b ${
          scrolled || open
            ? 'bg-gray-50 dark:bg-gray-950 border-gray-200/80 dark:border-gray-800 shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto max-w-2xl h-14 px-3 flex items-center gap-2">
          <Link to="/" aria-label="Dinesh Babu, home" className="px-1 font-display font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
            D<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">B</span>
            <span className="text-secondary">.</span>
          </Link>
          <div className="flex-1 min-w-0 overflow-hidden h-5">
            <AnimatePresence mode="wait" initial={false}>
              {scrolled && label && (
                <motion.p
                  key={label}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 truncate"
                >
                  {label}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <button type="button" onClick={openPalette} className={iconButton} aria-label="Search">
            <Search size={20} />
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={iconButton}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={iconButton}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-sheet"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Floating dock */}
      <nav
        aria-label="Sections"
        className="lg:hidden fixed inset-x-3 z-40 mx-auto max-w-md bottom-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <ul className="flex items-stretch gap-1 p-1.5 rounded-2xl bg-white dark:bg-gray-900 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5 dark:ring-white/10">
          {dock.map(({ name, route, icon: Icon }) => {
            const active = isActiveRoute(pathname, route);
            return (
              <li key={name} className="flex-1">
                <Link
                  to={route}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex flex-col items-center justify-center gap-0.5 h-12 rounded-xl transition-colors ${
                    active ? 'text-primary dark:text-secondary' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="dock-active"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                      className="absolute inset-0 rounded-xl bg-primary/10 dark:bg-secondary/15"
                    />
                  )}
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} className="relative" />
                  <span className={`relative text-[0.65rem] leading-none ${active ? 'font-semibold' : 'font-medium'}`}>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* More sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="lg:hidden fixed inset-0 z-[60] bg-gray-950/50"
            />
            <motion.div
              key="sheet"
              id="mobile-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 40 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 600) setOpen(false);
              }}
              className="lg:hidden fixed inset-x-0 bottom-0 z-[61] mx-auto max-w-2xl rounded-t-3xl bg-white dark:bg-gray-900 shadow-2xl pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex justify-center pt-3 pb-2">
                <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
              <div className="px-5 pb-2 flex items-center gap-3">
                <img src={`${import.meta.env.BASE_URL}asserts/profile.jpg`} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="font-display font-extrabold text-lg leading-tight text-gray-900 dark:text-white truncate">{profile.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {profile.role} · {profile.company}
                  </p>
                </div>
              </div>

              <div className="px-5 pt-3 grid grid-cols-2 gap-3">
                <ActionTile href={profile.resumeUrl} icon={<FileText size={20} />} label="Resume" hint="Open PDF" />
                <ActionTile to="/terminal" icon={<Terminal size={20} />} label="Terminal" hint="Explore by command" />
                <ActionTile href={`mailto:${profile.email}`} icon={<Mail size={20} />} label="Email" hint="Write to me" />
                <ActionTile href={`tel:${profile.phone.replace(/\s/g, '')}`} icon={<Phone size={20} />} label="Call" hint={profile.phone} />
              </div>

              <div className="px-5 pt-4 flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-800 font-medium text-gray-800 dark:text-gray-100"
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-800 font-medium text-gray-800 dark:text-gray-100"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>

              <div className="px-5 pt-4 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Appearance</span>
                <div role="radiogroup" aria-label="Theme" className="flex p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
                  {(['light', 'dark'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={theme === t}
                      onClick={() => setTheme(t)}
                      className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium capitalize transition-colors ${
                        theme === t ? 'bg-white dark:bg-gray-950 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {t === 'light' ? <Sun size={15} /> : <Moon size={15} />} {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPalette();
                  }}
                  className="w-full inline-flex items-center gap-3 h-12 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left"
                >
                  <Search size={18} /> Search roles, projects, skills…
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
