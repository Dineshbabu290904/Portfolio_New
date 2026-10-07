import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

const springy = { stiffness: 120, damping: 30, mass: 0.4 };

// Pins the hero while the page scrolls past it and pulls the camera back:
// the frame shrinks, rounds its corners, softens out of focus and fades as the next scene arrives.
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, springy);
  const scale = useTransform(progress, [0, 1], [1, 0.82]);
  const radius = useTransform(progress, [0, 1], [0, 48]);
  const opacity = useTransform(progress, [0.15, 0.95], [1, 0]);
  const blurPx = useTransform(progress, [0.2, 1], [0, 10]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  if (reduced) return <>{children}</>;

  return (
    <div ref={ref} className="relative h-[160vh]">
      <motion.div
        style={{ scale, opacity, filter, borderRadius: radius }}
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, springy);
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
    <section ref={ref} aria-label={eyebrow} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-primary to-secondary" />
            {eyebrow}
          </p>
          <p className={statementClass} aria-label={text}>
            {words.map(({ w, className }, i) => {
              // Words light up across the middle 70% of the pinned scroll.
              const start = 0.1 + (i / words.length) * 0.7;
              const end = start + 0.7 / words.length + 0.04;
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

// Scroll-linked entrance for a whole section: it tilts up from a little depth and settles flat
// as its top edge travels into view, scrubbing back if the reader scrolls up.
export function SectionStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 45%'] });
  const progress = useSpring(scrollYProgress, springy);
  const rotateX = useTransform(progress, [0, 1], [10, 0]);
  const scale = useTransform(progress, [0, 1], [0.93, 1]);
  const y = useTransform(progress, [0, 1], [90, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0.35, 1]);

  if (reduced) return <div>{children}</div>;

  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, scale, y, opacity, transformOrigin: '50% 0%' }}>{children}</motion.div>
    </div>
  );
}
