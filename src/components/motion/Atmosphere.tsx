import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

// Fixed backdrop for the whole site: slow-drifting aurora light in the brand colors over a faint
// engineering dot grid. It drifts on its own (CSS transforms only) and does no work while scrolling.
export function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-[-20%]">
        <div className="aurora-blob aurora-a" />
        <div className="aurora-blob aurora-b" />
        <div className="aurora-blob aurora-c" />
      </div>
      <div className="absolute inset-0 dot-grid" />
    </div>
  );
}

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Cursor follower for mouse users: the system pointer stays visible and a ring trails behind it.
// Over links and buttons the ring grows; elements with data-cursor="View" show that label inside it.
// It sits above every overlay and uses difference blending, so it reads on light and dark backgrounds.
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled] = useState(finePointer);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor], input, textarea, select, label');
      setHovering(!!target && !target.matches('input, textarea, select'));
      setLabel(target?.dataset.cursor ?? '');
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = label ? 84 : hovering ? 46 : 28;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: reduced ? x : ringX, y: reduced ? y : ringY }}
      className={`pointer-events-none fixed left-0 top-0 z-[200] ${label ? '' : 'mix-blend-difference'}`}
    >
      <motion.div
        animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${
          label ? 'bg-primary dark:bg-secondary text-white dark:text-gray-900 shadow-lg' : hovering ? 'border-2 border-white' : 'border border-white/70'
        }`}
      >
        {label && <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em]">{label}</span>}
      </motion.div>
    </motion.div>
  );
}

// Pulls its child gently toward the pointer while hovered, then springs back.
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  if (reduced) return <span className={`inline-block ${className}`}>{children}</span>;
  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r || e.pointerType !== 'mouse') return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Endless marquee row. It drifts on its own and speeds up (and flips direction) with scroll velocity.
export function Marquee({ children, baseVelocity = -2, className = '' }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  // Scroll speed nudges the marquee a little (at most 1.5x faster) instead of whipping it along.
  const factor = useTransform(velocity, [-2000, 0, 2000], [-1.5, 0, 1.5]);
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x: reduced ? 0 : x }} className="flex w-max">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} aria-hidden={i > 0} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
