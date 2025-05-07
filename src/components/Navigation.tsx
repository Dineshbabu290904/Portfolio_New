import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Home, User, Briefcase, Code, Award, Mail,
  ChevronRight, Star, Github, Linkedin, Twitter, ExternalLink,
  Clock, ArrowRight, Download, Moon, Sun, Search, Terminal,
  Activity
} from 'lucide-react';

export default function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, description: 'Welcome to my portfolio', color: 'from-blue-500 to-indigo-600', route: '/' },
    { name: 'About', icon: <User size={20} />, description: 'Learn more about me', color: 'from-emerald-500 to-teal-600', route: '/about' },
    { name: 'Skills', icon: <Award size={20} />, description: 'My technical expertise', color: 'from-amber-500 to-orange-600', route: '/skills' },
    { name: 'Experience', icon: <Briefcase size={20} />, description: 'My professional journey', color: 'from-purple-500 to-pink-600', route: '/experience' },
    { name: 'Projects', icon: <Code size={20} />, description: 'My latest work', color: 'from-red-500 to-rose-600', route: '/projects' },
    { name: 'Contact', icon: <Mail size={20} />, description: 'Get in touch with me', color: 'from-cyan-500 to-blue-600', route: '/contact' },
    { name: 'Terminal', icon: <Terminal size={20} />, description: 'Access the CLI', color: 'from-gray-500 to-slate-600', route: '/terminal'},
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/Dineshbabu290904' }, 
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/dinesh-babu-surapaneni/' },
    // { name: 'Twitter', icon: <Twitter size={18} />, url: '#' } 
  ];

  const quickActions = [
    { name: 'Resume', icon: <Download size={18} />, action: () => window.open("https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view", "_blank") },
    { name: 'Contact', icon: <Mail size={18} />, action: () => handleNavigate('/contact') },
    { name: 'CLI', icon: <Terminal size={18} />, action: () => handleNavigate('/terminal') },
  ];

  const searchableContent = [
    { title: 'About Me', section: 'About', keywords: ['background', 'education', 'profile'], route: '/about' },
    { title: 'My Skills', section: 'Skills', keywords: ['technical', 'expertise', 'proficiencies'], route: '/skills' },
    { title: 'Work Experience', section: 'Experience', keywords: ['job', 'career', 'professional journey'], route: '/experience' },
    { title: 'Portfolio Projects', section: 'Projects', keywords: ['portfolio', 'showcase', 'demos', 'work'], route: '/projects' },
    { title: 'Contact Information', section: 'Contact', keywords: ['email', 'phone', 'message', 'get in touch'], route: '/contact' },
    { title: 'Command Line', section: 'Terminal', keywords: ['cli', 'console', 'shell', 'command prompt'], route: '/terminal' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  const handleNavigate = (route: string) => {
    navigate(route);
    setIsOpen(false); 
    setShowSearch(false);
  };

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  const searchResults = searchQuery.length > 1
    ? searchableContent.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  const SearchIconSvg = ({size = 20}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  return (
    <>
      <div className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        {/* Desktop Navigation - UPDATED LAYOUT */}
        <div className={`hidden lg:block max-w-7xl mx-auto transition-all duration-300 ${scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-lg rounded-full px-6'
            : 'bg-transparent px-8'
          }`}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 z-10 flex items-center">
              <Link to="/" className={`font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                DevPortfolio
              </Link>
            </div>

            {/* Navigation Items - USING FLEX LAYOUT INSTEAD OF ABSOLUTE POSITIONING */}
            <div className="flex-grow flex items-center justify-center mx-4">
              <div className={`flex items-center space-x-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full transition-all duration-300 ${scrolled ? 'px-2 py-1' : 'px-3 py-2'}`}>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.route}
                    className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${location.pathname === item.route
                        ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/50'
                      }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors"
                aria-label="Search"
              >
                <SearchIconSvg size={20} />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => handleNavigate('/contact')}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - No changes needed here */}
        <div className={`lg:hidden mx-4 transition-all duration-300 ${scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-lg rounded-2xl'
            : 'bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl'
          }`}>
          <div className="flex justify-between items-center p-4">
            <Link to="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              DP
            </Link>
            <div className="flex items-center space-x-2">
              <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors" aria-label="Search">
                <SearchIconSvg size={18} />
              </button>
              <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-gray-200/80 dark:bg-gray-700/80 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/70'}`} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar (first 5 items) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.1)] border-t border-gray-200/80 dark:border-gray-800/80 backdrop-blur-md py-2 px-4 sm:px-6 lg:hidden">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navItems.slice(0, 6).map((item) => ( // Display first 5 items or adjust as needed
              <Link key={item.name} to={item.route} className="flex flex-col items-center justify-center w-1/5 p-1 group" aria-label={item.name} onClick={() => setIsOpen(false)}>
                <div className={`p-2 rounded-full transition-all duration-200 group-hover:scale-110 ${location.pathname === item.route ? `bg-gradient-to-r ${item.color} text-white shadow-md` : 'text-gray-500 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}`}>
                  {React.cloneElement(item.icon, { size: 22 })}
                </div>
                <span className={`text-xs mt-1 transition-colors duration-200 ${location.pathname === item.route ? 'font-semibold text-primary dark:text-secondary' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} aria-hidden="true" />

      {/* Mobile Slide-in Menu */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-xs sm:max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
        <div className="flex flex-col h-full">
          <div className="p-5 sm:p-6 border-b border-gray-200/80 dark:border-gray-800/80">
            <div className="flex justify-between items-center">
              <Link to="/" id="mobile-menu-title" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary" onClick={() => setIsOpen(false)}>
                DevPortfolio
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Navigation</h3>
                {navItems.map((item) => (
                  <Link key={item.name} to={item.route} onClick={() => setIsOpen(false)} className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${location.pathname === item.route ? `bg-gradient-to-r ${item.color} text-white shadow-sm` : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:pl-4'}`}>
                    <div className="flex items-center gap-3">
                      {React.cloneElement(item.icon, { size: 18 })}
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-80">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight size={18} className={`transition-transform ${location.pathname === item.route ? 'translate-x-0.5' : ''}`} />
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button key={index} onClick={action.action} className="flex items-center gap-2 p-3 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 rounded-lg transition-colors text-gray-700 dark:text-gray-300 backdrop-blur-sm text-sm font-medium">
                      {action.icon}
                      <span>{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connect</h3>
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} className="flex-1 p-3 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 rounded-lg transition-colors text-gray-700 dark:text-gray-300 backdrop-blur-sm flex justify-center items-center" target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t border-gray-200/80 dark:border-gray-800/80">
            <button onClick={() => handleNavigate('/contact')} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <Mail size={18} />
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-start justify-center pt-16 sm:pt-24 transition-opacity duration-300 ${showSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowSearch(false)}>
        <div className="w-full max-w-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform mx-4" style={{ maxHeight: '70vh', transform: showSearch ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)', opacity: showSearch ? 1 : 0 }} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
          <div className="p-4 border-b border-gray-200/80 dark:border-gray-800/80">
            <div className="flex items-center gap-3">
              <div className="text-gray-500 dark:text-gray-400"><SearchIconSvg size={20} /></div>
              <input id="search-modal-title" type="text" placeholder="Search portfolio..." className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus={showSearch} />
              <button onClick={() => setShowSearch(false)} className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors" aria-label="Close search"><X size={20} /></button>
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 70px)' }}>
            {searchQuery.length > 1 && (
              <div className="p-2">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <button key={index} className="flex items-center gap-3 w-full p-3 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 rounded-lg transition-colors text-left" onClick={() => handleNavigate(result.route)}>
                      <div className="flex-shrink-0 p-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-full text-gray-600 dark:text-gray-300">
                        {React.cloneElement(navItems.find(item => item.name === result.section)?.icon || <Home size={20}/>, { size: 18 })}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{result.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">In section: {result.section}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</div>
                )}
              </div>
            )}
            {searchQuery.length <= 1 && (
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <button key={item.name} className="flex items-center gap-3 p-3 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 rounded-lg transition-colors backdrop-blur-sm" onClick={() => handleNavigate(item.route)}>
                      <div className={`p-2 rounded-full bg-gradient-to-r ${item.color} text-white`}>{React.cloneElement(item.icon, {size: 18})}</div>
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-200">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden h-20"></div> {/* Spacer for mobile bottom nav */}
    </>
  );
}