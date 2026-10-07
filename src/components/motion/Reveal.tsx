import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

// Cinematic "focus pull": content rises slightly and sharpens from a blur as it enters the viewport.
const focusPull: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const viewport = { once: true, amount: 0.15 } as const;

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={focusPull}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Staggers its RevealItem children one after another.
export function RevealGroup({
  children,
  className = '',
  stagger = 0.09,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className = '',
  as = 'div',
  lift = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
  /** Pixels the item rises on hover (handled by Motion, since it owns this element's transform). */
  lift?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={focusPull}
      whileHover={lift ? { y: -lift, transition: { type: 'spring', stiffness: 300, damping: 22 } } : undefined}
    >
      {children}
    </Tag>
  );
}

const wordRise: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

interface SplitTextProps {
  /** Text segments; a segment with a className (e.g. a gradient) keeps that styling per word. */
  segments: { text: string; className?: string }[];
  className?: string;
  as?: 'h1' | 'h2' | 'p';
  id?: string;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
  delay?: number;
}

// Headline reveal: each word rises out of its own mask, staggered like film titles.
export function SplitText({ segments, className = '', as = 'h2', id, onMount = false, delay = 0 }: SplitTextProps) {
  const Tag = motion[as];
  const words = segments.flatMap((segment) =>
    segment.text.split(' ').filter(Boolean).map((word) => ({ word, className: segment.className }))
  );
  const trigger = onMount ? { animate: 'visible' } : { whileInView: 'visible', viewport };

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
      aria-label={segments.map((s) => s.text).join(' ')}
    >
      {words.map(({ word, className: wordClass }, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={wordRise} className={`inline-block ${wordClass ?? ''}`}>
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}

// Counts the leading number of a value like "140+", "6407" or "6 mo" up from zero when it scrolls into view.
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const hasNumber = match !== null;
  const [display, setDisplay] = useState(hasNumber && !reduced ? 0 : target);

  useEffect(() => {
    if (!hasNumber || !inView || reduced) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: target > 1000 ? 1.8 : 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, target, hasNumber]);

  if (!hasNumber) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
      {suffix}
    </span>
  );
}
