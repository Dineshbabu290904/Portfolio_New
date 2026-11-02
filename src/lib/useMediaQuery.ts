import { useEffect, useState } from 'react';

// Tracks a CSS media query, e.g. useMediaQuery('(min-width: 1024px)').
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// Large screens with room for pinned, scroll-driven scenes. Phones and tablets get a plain flow.
export const CINEMATIC_QUERY = '(min-width: 1024px) and (min-height: 640px)';
