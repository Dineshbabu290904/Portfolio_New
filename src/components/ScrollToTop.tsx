import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Resets scroll position on route change (unless navigating to an in-page #hash).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
