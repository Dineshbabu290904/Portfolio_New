import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { markIntroPlayed, shouldPlayIntro } from '../../lib/intro';

// Thin gradient bar along the top edge that tracks reading progress.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-gradient-to-r from-primary via-secondary to-accent"
    />
  );
}

// Opening title sequence: letterbox bars, the name rising in, then the bars part to reveal the page.
// Plays once per browser session, only when the visit starts on the home page, and never when
// reduced motion is requested. It stays mounted for the whole visit, so navigating (or the scroll
// spy changing the URL) can't interrupt it halfway or bring it back. Click or Escape skips it.
export function IntroCurtain() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(() => shouldPlayIntro(pathname === '/'));

  useEffect(() => {
    if (!show) return;
    markIntroPlayed();
    const timer = setTimeout(() => setShow(false), 1500);
    const skip = (e: KeyboardEvent) => e.key === 'Escape' && setShow(false);
    window.addEventListener('keydown', skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [show]);

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.4 }}
          onClick={() => setShow(false)}
        >
          {/* Letterbox bars that slide away on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-black"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.75, ease }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
            exit={{ y: '100%' }}
            transition={{ duration: 0.75, ease }}
          />

          <div className="relative text-center px-6">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
              >
                Dinesh Babu<span className="text-secondary">.</span>
              </motion.p>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.45 }}
              className="mx-auto mt-4 h-px w-40 origin-left bg-gradient-to-r from-primary via-secondary to-accent"
            />
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-4 font-mono text-[0.7rem] uppercase text-gray-400"
            >
              Associate Software Engineer · DAZN India
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
