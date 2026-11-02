import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { openPalette } from '../lib/palette';
import { isActiveRoute } from '../lib/routes';
import MobileNav from './mobile/MobileNav';

const navItems = [
  { name: 'Home', route: '/' },
  { name: 'About', route: '/about' },
  { name: 'Experience', route: '/experience' },
  { name: 'Skills', route: '/skills' },
  { name: 'Projects', route: '/projects' },
  { name: 'Contact', route: '/contact' },
  { name: 'Terminal', route: '/terminal' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconButton =
    'p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors';

  return (
    <>
      {/* Desktop */}
      <header className={`hidden lg:block fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg rounded-full px-6' : 'bg-transparent px-8'
          }`}
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 z-10 flex items-center">
              <Link
                to="/"
                className={`font-display font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}
              >
                Dinesh<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Babu</span>
                <span className="text-secondary">.</span>
              </Link>
            </div>

            <nav aria-label="Main" className="flex-grow flex items-center justify-center mx-4">
              <div className={`flex items-center space-x-1 bg-white/60 dark:bg-gray-800/60 rounded-full transition-all duration-300 ${scrolled ? 'px-2 py-1' : 'px-3 py-2'}`}>
                {navItems.map((item) => {
                  const active = isActiveRoute(pathname, item.route);
                  return (
                    <Link
                      key={item.name}
                      to={item.route}
                      aria-current={active ? 'page' : undefined}
                      className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        active
                          ? 'bg-primary text-white dark:text-gray-900 shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="flex-shrink-0 flex items-center space-x-2">
              <button onClick={openPalette} className={iconButton} aria-label="Search">
                <Search size={20} />
              </button>
              <button onClick={toggleTheme} className={iconButton} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Phones and tablets */}
      <MobileNav />
    </>
  );
}
