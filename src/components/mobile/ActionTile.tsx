import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Target = { to: string; href?: never } | { href: string; to?: never };

// A large, thumb-friendly action: icon, label and a short hint. Used in the mobile menu and contact.
export default function ActionTile({ icon, label, hint, to, href }: { icon: ReactNode; label: string; hint: string } & Target) {
  const className =
    'flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm active:scale-[0.98] transition-transform';
  const body = (
    <>
      <span className="grid place-items-center w-10 h-10 rounded-xl bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary">{icon}</span>
      <span className="min-w-0">
        <span className="block font-semibold text-gray-900 dark:text-white">{label}</span>
        <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">{hint}</span>
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={className}>
        {body}
      </Link>
    );
  }
  const external = href!.startsWith('http');
  return (
    <a href={href} target={external ? '_blank' : undefined} rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
}
