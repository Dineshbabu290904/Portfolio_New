import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Command } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { openPalette } from '../lib/palette';
import {
  certifications, education, experiences, profile, projects, sections, sectionPath, skillGroups, type SectionId,
} from '../data/portfolio';

interface Line {
  id: number;
  input?: string;
  body?: ReactNode;
}

const PROMPT = 'dinesh@portfolio';

const commandHelp: [string, string][] = [
  ['whoami', 'Who is behind this terminal'],
  ['about', 'Short bio'],
  ['experience', 'Roles, newest first'],
  ['skills', 'Tech stack by area'],
  ['projects', 'Things I have built'],
  ['open <project>', 'Open a project case study (name or number)'],
  ['goto <section>', 'Scroll the site to a section'],
  ['education', 'Degrees and certifications'],
  ['contact', 'How to reach me'],
  ['resume', 'Open my resume'],
  ['theme <light|dark>', 'Switch the site theme'],
  ['search', 'Open the ⌘K command palette'],
  ['history', 'Commands you have run'],
  ['clear', 'Clear the screen'],
  ['exit', 'Leave the terminal'],
];

const commandNames = [...commandHelp.map(([c]) => c.split(' ')[0]), 'help', 'neofetch', 'socials', 'date', 'echo', 'sudo', 'ls', 'cd'];

const boot = [
  'booting portfolio shell v2.0',
  `[ ok ] mounted /experience  (${experiences.length} roles)`,
  `[ ok ] loaded /projects     (${projects.length} case studies)`,
  `[ ok ] indexed /skills      (${skillGroups.reduce((n, g) => n + g.skills.length, 0)} entries)`,
  '[ ok ] connected to DAZN India · Hyderabad',
];

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-secondary">{children}</span>;
}

function Dim({ children }: { children: ReactNode }) {
  return <span className="text-gray-500">{children}</span>;
}

// Full-screen portfolio console: boots like a real shell, then answers commands from the same data as the site.
export default function TerminalPage() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const { setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([]);
  const [booted, setBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = useCallback((line: Omit<Line, 'id'>) => {
    setLines((prev) => [...prev, { ...line, id: nextId.current++ }]);
  }, []);

  // Boot sequence, typed out line by line (instant with reduced motion; any key skips it)
  useEffect(() => {
    if (booted) return;
    if (reduced || bootStep >= boot.length) {
      setBooted(true);
      return;
    }
    const t = setTimeout(() => setBootStep((s) => s + 1), bootStep === 0 ? 350 : 260);
    return () => clearTimeout(t);
  }, [bootStep, booted, reduced]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines, bootStep]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const findProject = (arg: string) => {
    const n = Number(arg);
    if (Number.isInteger(n) && n >= 1 && n <= projects.length) return projects[n - 1];
    const q = arg.toLowerCase();
    return projects.find((p) => p.id === q || p.title.toLowerCase().includes(q) || p.id.includes(q));
  };

  const run = (raw: string): ReactNode => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/);
    const arg = args.join(' ');
    switch (cmd.toLowerCase()) {
      case '':
        return null;
      case 'help':
        return (
          <div className="grid gap-1 sm:grid-cols-[14rem_1fr]">
            {commandHelp.map(([c, d]) => (
              <div key={c} className="contents">
                <button type="button" onClick={() => submit(c.split(' ')[0])} className="text-left text-secondary hover:underline">
                  {c}
                </button>
                <Dim>{d}</Dim>
              </div>
            ))}
          </div>
        );
      case 'whoami':
      case 'neofetch':
        return (
          <div className="flex flex-col sm:flex-row gap-6">
            <img src={`${import.meta.env.BASE_URL}asserts/profile.jpg`} alt="" className="w-24 h-24 rounded-lg object-cover grayscale contrast-125 opacity-90" />
            <div className="space-y-0.5">
              <p>
                <Accent>{PROMPT}</Accent>
              </p>
              <p className="text-gray-600">{'-'.repeat(PROMPT.length)}</p>
              <dl className="grid grid-cols-[6rem_1fr] gap-x-2">
                {[
                  ['name', profile.name],
                  ['role', profile.role],
                  ['company', profile.company],
                  ['location', profile.location],
                  ['stack', 'Node.js · NestJS · React · Python · AWS'],
                  ['degree', 'B.Tech CSE (Data Science), PVPSIT'],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-secondary">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-1 flex gap-1" aria-hidden="true">
                {['bg-primary', 'bg-secondary', 'bg-accent', 'bg-emerald-500', 'bg-violet-500', 'bg-gray-400'].map((c) => (
                  <span key={c} className={`w-5 h-3 ${c}`} />
                ))}
              </p>
            </div>
          </div>
        );
      case 'about':
        return <div className="space-y-2 max-w-[75ch]">{profile.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>;
      case 'experience':
      case 'work':
        return (
          <div className="space-y-4">
            {experiences.map((job) => (
              <div key={job.role + job.company}>
                <p>
                  <Accent>{job.role}</Accent> @ {job.company} {job.current && <span className="text-emerald-400">● current</span>}
                </p>
                <Dim>{job.duration} · {job.location}</Dim>
                <ul className="mt-1">
                  {job.points.slice(0, 3).map((p) => (
                    <li key={p} className="text-gray-300">
                      <Dim>›</Dim> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <p><Accent>{g.title.toLowerCase().replace(/[^a-z]+/g, '_')}/</Accent></p>
                <p className="text-gray-300">{g.skills.map((s) => s.name).join('  ')}</p>
              </div>
            ))}
          </div>
        );
      case 'projects':
      case 'ls':
        return (
          <div className="space-y-1">
            {projects.map((p, i) => (
              <button key={p.id} type="button" onClick={() => submit(`open ${i + 1}`)} className="block text-left hover:bg-white/5 rounded px-1 -mx-1">
                <Dim>{String(i + 1).padStart(2, '0')}</Dim> <Accent>{p.id}</Accent> <span className="text-gray-300">{p.title}</span>{' '}
                <Dim>[{p.technologies.slice(0, 3).join(', ')}]</Dim>
              </button>
            ))}
            <p className="pt-1"><Dim>Tip: </Dim>open 1 · or click a project</p>
          </div>
        );
      case 'open': {
        const p = arg ? findProject(arg) : undefined;
        if (!p) return <span className="text-red-400">open: no project matches “{arg || '…'}”. Try `projects`.</span>;
        setTimeout(() => navigate(`/projects/${p.id}`), 500);
        return <span>Opening <Accent>{p.title}</Accent>…</span>;
      }
      case 'goto':
      case 'cd': {
        const target = arg.replace(/^[~/.]+/, '').toLowerCase() || 'home';
        if (!sections.includes(target as SectionId)) {
          return <span className="text-red-400">{cmd}: unknown section “{arg}”. Sections: {sections.join(', ')}</span>;
        }
        setTimeout(() => navigate(sectionPath(target as SectionId)), 450);
        return <span>Taking you to <Accent>{target}</Accent>…</span>;
      }
      case 'education':
        return (
          <div className="space-y-1">
            {education.map((e) => (
              <p key={e.degree}><Accent>{e.degree}</Accent> <Dim>· {e.institution} · {e.duration}{e.note && ` · ${e.note}`}</Dim></p>
            ))}
            <p className="pt-2"><Dim>certifications:</Dim></p>
            {certifications.map((c) => (
              <p key={c.name}>  {c.name} <Dim>· {c.issuer} · {c.year}</Dim></p>
            ))}
          </div>
        );
      case 'contact':
      case 'socials':
        return (
          <div className="space-y-0.5">
            <p><Accent>email</Accent>    <a className="underline hover:text-secondary" href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p><Accent>github</Accent>   <a className="underline hover:text-secondary" href={profile.github} target="_blank" rel="noopener noreferrer">{profile.github.replace('https://', '')}</a></p>
            <p><Accent>linkedin</Accent> <a className="underline hover:text-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin.replace('https://www.', '')}</a></p>
            <p><Accent>phone</Accent>    {profile.phone}</p>
          </div>
        );
      case 'resume':
        window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer');
        return <span>Opening resume in a new tab…</span>;
      case 'theme': {
        const t = arg.toLowerCase();
        if (t !== 'light' && t !== 'dark') return <span className="text-red-400">usage: theme light | theme dark</span>;
        setTheme(t);
        return <span>Site theme set to <Accent>{t}</Accent>.</span>;
      }
      case 'search':
      case 'palette':
        setTimeout(openPalette, 50);
        return <span>Opening the command palette… <Dim>(⌘K / Ctrl K works anywhere)</Dim></span>;
      case 'history':
        return history.length ? (
          <div>{history.map((h, i) => <p key={`${h}-${i}`}><Dim>{String(i + 1).padStart(3, ' ')}</Dim>  {h}</p>)}</div>
        ) : <Dim>No commands yet.</Dim>;
      case 'date':
        return <span>{new Date().toString()}</span>;
      case 'echo':
        return <span>{arg}</span>;
      case 'sudo':
        if (arg.toLowerCase().replace(/\s+/g, '-') === 'hire-me') {
          return (
            <span>
              <span className="text-emerald-400">[sudo] permission granted.</span> Drafting an email to {profile.name}…{' '}
              <a className="underline text-secondary" href={`mailto:${profile.email}?subject=Let's%20talk`}>open it</a>
            </span>
          );
        }
        return <span className="text-red-400">{PROMPT} is not in the sudoers file. Try `sudo hire-me`.</span>;
      case 'exit':
        setTimeout(() => navigate('/'), 500);
        return <span>Logging out… see you on the homepage.</span>;
      default:
        return (
          <span className="text-red-400">
            command not found: {cmd}. <Dim>Type</Dim> <button type="button" className="underline text-secondary" onClick={() => submit('help')}>help</button>
          </span>
        );
    }
  };

  const submit = (raw: string) => {
    const value = raw.trim();
    if (value.toLowerCase() === 'clear') {
      setLines([]);
    } else {
      const body = run(value);
      push({ input: value, body });
    }
    if (value) setHistory((h) => [...h, value]);
    setCursor(-1);
    setInput('');
    inputRef.current?.focus();
  };

  const completions = useMemo(() => {
    const [cmd, ...rest] = input.split(' ');
    if (rest.length === 0) return commandNames.filter((c) => c.startsWith(cmd.toLowerCase()));
    const arg = rest.join(' ').toLowerCase();
    if (cmd === 'open') return projects.map((p) => p.id).filter((id) => id.startsWith(arg)).map((id) => `open ${id}`);
    if (cmd === 'goto' || cmd === 'cd') return sections.filter((s) => s.startsWith(arg)).map((s) => `${cmd} ${s}`);
    if (cmd === 'theme') return ['light', 'dark'].filter((t) => t.startsWith(arg)).map((t) => `theme ${t}`);
    return [];
  }, [input]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (completions.length === 1) setInput(completions[0] + (completions[0].includes(' ') ? '' : ' '));
      else if (completions.length > 1) push({ body: <Dim>{completions.join('   ')}</Dim> });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput('');
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const skipBoot = () => {
    if (!booted) {
      setBootStep(boot.length);
      setBooted(true);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-28 lg:pb-10 bg-gray-950 text-gray-200 overflow-hidden"
      onKeyDown={skipBoot}
      onClick={() => {
        skipBoot();
        inputRef.current?.focus();
      }}
    >
      {/* Stage lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute right-[20%] bottom-0 w-[35vw] h-[35vw] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 h-11 border-b border-white/10 bg-white/[0.03]">
          <div className="flex gap-2">
            <button type="button" aria-label="Close terminal" onClick={() => navigate('/')} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500" />
            <span aria-hidden="true" className="w-3 h-3 rounded-full bg-amber-400" />
            <span aria-hidden="true" className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <p className="flex-1 text-center font-mono text-xs text-gray-400">{PROMPT}: ~</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openPalette();
            }}
            className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-gray-400 hover:text-white border border-white/10 rounded px-1.5 py-0.5"
          >
            <Command size={11} /> K
          </button>
        </div>

        {/* Screen */}
        <div
          ref={scrollRef}
          className="terminal-screen relative h-[min(68vh,560px)] overflow-y-auto px-5 py-4 font-mono text-[0.82rem] leading-relaxed"
          aria-live="polite"
        >
          <div className="space-y-0.5 text-gray-400">
            {boot.slice(0, booted ? boot.length : bootStep).map((l) => (
              <p key={l}>
                {l.startsWith('[ ok ]') ? (
                  <>
                    <span className="text-emerald-400">[ ok ]</span>
                    {l.slice(6)}
                  </>
                ) : (
                  l
                )}
              </p>
            ))}
          </div>

          {booted && (
            <div className="mt-4 mb-3">
              <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Dinesh Babu<span className="text-secondary">.</span>
              </p>
              <p className="text-gray-400">
                {profile.role} at {profile.company}. Type <button type="button" onClick={() => submit('help')} className="text-secondary underline">help</button> to look around, or try{' '}
                <button type="button" onClick={() => submit('whoami')} className="text-secondary underline">whoami</button>.
              </p>
            </div>
          )}

          {lines.map((line) => (
            <div key={line.id} className="mt-3">
              {line.input !== undefined && (
                <p>
                  <span className="text-emerald-400">{PROMPT}</span>
                  <span className="text-gray-500">:~$</span> <span className="text-white">{line.input}</span>
                </p>
              )}
              {line.body && <div className="mt-1 text-gray-200">{line.body}</div>}
            </div>
          ))}

          {booted && (
            <label className="mt-3 flex items-center gap-2">
              <span className="shrink-0">
                <span className="text-emerald-400">{PROMPT}</span>
                <span className="text-gray-500">:~$</span>
              </span>
              <span className="relative flex-1">
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                  className="w-full bg-transparent text-white caret-secondary focus:outline-none text-base sm:text-[inherit]"
                />
                {!input && <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 text-gray-600 text-base sm:text-[inherit]">type a command, Tab to complete</span>}
              </span>
            </label>
          )}
          {!booted && <span aria-hidden="true" className="inline-block w-2 h-4 bg-secondary animate-pulse align-middle" />}
        </div>

        {/* Quick commands for touch users */}
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5 border-t border-white/10 bg-white/[0.02]">
          {['whoami', 'experience', 'projects', 'skills', 'contact', 'help'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                skipBoot();
                submit(c);
              }}
              className="shrink-0 font-mono text-xs px-2.5 py-1 rounded-md border border-white/10 text-gray-300 hover:text-white hover:border-secondary/60 transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
