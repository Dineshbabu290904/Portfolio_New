import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';

const pages = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/Dineshbabu290904', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dinesh-babu-surapaneni/', icon: Linkedin },
  { label: 'Email', href: 'mailto:dineshbabus309@gmail.com', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 md:items-start">
        <div className="space-y-2">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Dinesh Babu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Surapaneni</span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            Associate Software Engineer at DAZN India
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 md:justify-center">
          {pages.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              {p.label}
            </Link>
          ))}
          <Link
            to="/terminal"
            className="text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors inline-flex items-center gap-1"
          >
            <Terminal size={14} /> terminal
          </Link>
        </nav>

        <div className="flex gap-3 md:justify-end">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:border-primary/40 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200/70 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            © {new Date().getFullYear()} Dinesh Babu Surapaneni · Built with React, TypeScript &amp; Tailwind CSS
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <ArrowUp size={14} /> Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
