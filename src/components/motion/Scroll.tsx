import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

// Pins the hero briefly while the page scrolls past it and pulls the camera back:
// the frame shrinks, rounds its corners and fades as the next scene arrives.
// Driven directly by scroll (no spring) and only by transform/opacity, so it stays smooth.
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0.2, 1], [1, 0]);

  if (reduced) return <>{children}</>;

  return (
    <div ref={ref} className="relative h-[125vh]">
      <motion.div
        style={{ scale, opacity, borderRadius: radius }}
        className="sticky top-0 h-screen overflow-hidden origin-[50%_30%] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ScrubWord({
  word,
  progress,
  range,
  className,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block mr-[0.28em] ${className ?? ''}`}>
      {word}
    </motion.span>
  );
}

// A pinned statement whose words light up one by one as the reader scrolls through it.
export function ScrollStatement({
  segments,
  eyebrow,
}: {
  segments: { text: string; className?: string }[];
  eyebrow: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = segments.flatMap((s) => s.text.split(' ').filter(Boolean).map((w) => ({ w, className: s.className })));
  const text = segments.map((s) => s.text).join(' ');

  const statementClass =
    'font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-gray-900 dark:text-white max-w-5xl';

  if (reduced) {
    return (
      <section aria-label={eyebrow} className="container mx-auto px-4 py-24 max-w-6xl">
        <p className={statementClass}>{text}</p>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={eyebrow} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-primary to-secondary" />
            {eyebrow}
          </p>
          <p className={statementClass} aria-label={text}>
            {words.map(({ w, className }, i) => {
              // Words light up across the first 80% of the pinned scroll.
              const start = 0.05 + (i / words.length) * 0.75;
              const end = start + 0.75 / words.length + 0.04;
              return (
                <ScrubWord key={`${w}-${i}`} word={w} progress={progress} range={[start, end]} className={className} />
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

// Entrance for a section's content: a short fade-up the first time it comes into view.
export function SectionStage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Oversized outlined chapter number that drifts against the scroll, like a film chapter card.
export function ChapterNumber({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={reduced ? undefined : { y }}
      className={`pointer-events-none select-none font-display font-extrabold leading-none text-outline text-[7rem] sm:text-[10rem] lg:text-[13rem] tracking-tighter ${className}`}
    >
      {value}
    </motion.span>
  );
}
