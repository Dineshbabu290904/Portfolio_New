import type { ReactNode } from 'react';
import { Reveal, SplitText } from '../motion/Reveal';
import { ChapterNumber, SectionStage } from '../motion/Scroll';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  /** Soft tinted band behind the section, used on alternating sections for rhythm. */
  band?: boolean;
  /** Chapter number shown as a large outlined numeral, e.g. "01". */
  chapter?: string;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  highlight,
  intro,
  className = 'mb-10 md:mb-14',
}: Pick<SectionProps, 'id' | 'eyebrow' | 'title' | 'highlight' | 'intro'> & { className?: string }) {
  return (
    <header className={`relative max-w-2xl ${className}`}>
      <Reveal>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-primary to-secondary" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitText
        id={`${id}-title`}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1]"
        segments={[
          { text: title },
          ...(highlight
            ? [{ text: highlight, className: 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary' }]
            : []),
        ]}
      />
      {intro && (
        <Reveal delay={0.25}>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}

export const bandClass = 'bg-white/50 dark:bg-gray-800/25 border-y border-gray-200/60 dark:border-gray-800';

// Shared layout for every section on the one-page site: anchor target, heading block, content.
// The content pushes in from a little depth as the section scrolls into view.
export default function Section({ id, eyebrow, title, highlight, intro, children, className = '', band = false, chapter }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-24 py-16 md:py-24 ${band ? bandClass : ''} ${className}`}
    >
      <div className="relative container mx-auto px-4 max-w-6xl">
        {chapter && <ChapterNumber value={chapter} className="absolute right-4 -top-6 md:-top-12" />}
        <SectionHeader id={id} eyebrow={eyebrow} title={title} highlight={highlight} intro={intro} />
        <SectionStage>{children}</SectionStage>
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
