import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

// Shared layout for every section on the one-page site: anchor target, heading block, content.
export default function Section({ id, eyebrow, title, highlight, intro, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-10 md:mb-14 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-3">
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
            {title}
            {highlight && (
              <>
                {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{highlight}</span>
              </>
            )}
          </h2>
          {intro && <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

// Shared surface for cards inside sections.
export const card =
  'rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm';

export function Chip({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'primary' }) {
  const styles =
    tone === 'primary'
      ? 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light border-primary/15'
      : 'bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-200 border-gray-200/80 dark:border-gray-600/60';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}
