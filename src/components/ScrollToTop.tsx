import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isSectionPath } from '../data/portfolio';

// Resets scroll position when moving between separate pages. The one-page sections
// manage their own scrolling, so section routes are left alone.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash || isSectionPath(pathname)) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
