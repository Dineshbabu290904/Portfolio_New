import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Check, Edit3, ExternalLink, LogOut, Play, RefreshCw, Share2, Sparkles, Terminal, TerminalSquare, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal as TerminalIconLucide,
    Github, Linkedin, FileText, HelpCircle, Info, Package, Code, Calendar, Clock,
    Cloud, History, Sun, Moon, Coffee, Gift, Users, Briefcase, Zap, Settings, Award, Search,
    ExternalLink as LinkExternal,
    MessageSquare
} from 'lucide-react';

// --- TypeScript Interfaces ---

interface CommandResponse {
  type: 'text' | 'error' | 'success' | 'component' | 'link' | 'code';
  content: string | React.ReactNode;
  meta?: any;
  id: string;
}

interface CommandHistoryItem {
  command: string;
  timestamp: Date;
}

type ThemeType = 'dark' | 'light' | 'matrix' | 'retro' | 'nord' | 'solarized' | 'oceanic';

interface ThemeConfig {
  hoverBg: string;
  background: string;
  headerBg?: string;
  text: string;
  primary: string;
  inputBg: string;
  borderColor: string;
  promptColor: string;
  errorColor: string;
  successColor: string;
  linkColor: string;
  codeBackground: string;
  windowTitleColor?: string;
  secondaryText?: string;
  accentColor?: string;
  scrollbarThumb?: string;
  scrollbarTrack?: string;
}

interface CommandHandlerProps {
  command: string;
  args: string[];
  theme: ThemeType;
  setOutput: React.Dispatch<React.SetStateAction<CommandResponse[]>>;
  clearOutput: () => void;
  setTheme: (theme: ThemeType) => void;
  setInputCommand: (command: string) => void;
  focusInput: () => void;
  commandHistory: CommandHistoryItem[];
}

interface CommandLineInterfaceProps {
  initialTheme?: ThemeType;
  welcomeMessage?: string[];
  width?: string;         // e.g., "100%", "600px"
  height?: string;        // e.g., "100%", "400px"
  className?: string;     // For additional custom styling
}

// --- Themes Configuration ---
const themes: Record<ThemeType, ThemeConfig> = {
    dark: {
        background: 'bg-slate-900', headerBg: 'bg-slate-800', text: 'text-slate-200', primary: 'text-sky-400',
        inputBg: 'bg-slate-800/50', borderColor: 'border-slate-600/50', promptColor: 'text-emerald-400',
        errorColor: 'text-red-400', successColor: 'text-lime-400', linkColor: 'text-cyan-400',
        codeBackground: 'bg-black/50', windowTitleColor: 'text-slate-300', secondaryText: 'text-slate-400',
        accentColor: 'text-indigo-400', scrollbarThumb: 'bg-slate-500/70', scrollbarTrack: 'bg-slate-700/30',
    },
    light: { // MODIFIED for better aesthetics
      background: 'bg-gray-50', // Was 'bg-gray'
      headerBg: 'bg-gray-100',
      text: 'text-gray-900',
      primary: 'text-blue-600',
      inputBg: 'bg-gray-100/70',
      borderColor: 'border-gray-300', // Was 'border-gray-900'
      promptColor: 'text-blue-700',
      errorColor: 'text-red-600',
      successColor: 'text-green-600',
      linkColor: 'text-cyan-600',
      codeBackground: 'bg-gray-200/80',
      windowTitleColor: 'text-gray-700',
      secondaryText: 'text-gray-500',
      accentColor: 'text-indigo-600',
      scrollbarThumb: 'bg-gray-400',
      scrollbarTrack: 'bg-gray-200/80',
  },
    matrix: {
        background: 'bg-black', headerBg: 'bg-black/90', text: 'text-green-400', primary: 'text-green-500',
        inputBg: 'bg-black', borderColor: 'border-green-700/50', promptColor: 'text-green-500',
        errorColor: 'text-red-500', successColor: 'text-green-400', linkColor: 'text-green-300',
        codeBackground: 'bg-black/80', windowTitleColor: 'text-green-400', secondaryText: 'text-green-600',
        accentColor: 'text-green-300', scrollbarThumb: 'bg-green-700/80', scrollbarTrack: 'bg-black/90',
    },
    retro: {
        background: 'bg-[#282a36]', headerBg: 'bg-[#1e1f29]', text: 'text-[#f8f8f2]', primary: 'text-[#bd93f9]',
        inputBg: 'bg-[#21222c]/80', borderColor: 'border-[#44475a]', promptColor: 'text-[#50fa7b]',
        errorColor: 'text-[#ff5555]', successColor: 'text-[#50fa7b]', linkColor: 'text-[#8be9fd]',
        codeBackground: 'bg-[#21222c]', windowTitleColor: 'text-[#ff79c6]', secondaryText: 'text-[#6272a4]',
        accentColor: 'text-[#ffb86c]', scrollbarThumb: 'bg-[#44475a]', scrollbarTrack: 'bg-[#21222c]/50',
    },
    nord: {
        background: 'bg-[#2E3440]', headerBg: 'bg-[#3B4252]', text: 'text-[#D8DEE9]', primary: 'text-[#88C0D0]',
        inputBg: 'bg-[#3B4252]/80', borderColor: 'border-[#4C566A]/60', promptColor: 'text-[#A3BE8C]',
        errorColor: 'text-[#BF616A]', successColor: 'text-[#A3BE8C]', linkColor: 'text-[#8FBCBB]',
        codeBackground: 'bg-[#3B4252]', windowTitleColor: 'text-[#ECEFF4]', secondaryText: 'text-[#E5E9F0]/80',
        accentColor: 'text-[#B48EAD]', scrollbarThumb: 'bg-[#4C566A]', scrollbarTrack: 'bg-[#3B4252]/80',
    },
    solarized: {
        background: 'bg-[#002b36]', headerBg: 'bg-[#073642]', text: 'text-[#839496]', primary: 'text-[#268bd2]',
        inputBg: 'bg-[#073642]/80', borderColor: 'border-[#586e75]/50', promptColor: 'text-[#859900]',
        errorColor: 'text-[#dc322f]', successColor: 'text-[#b58900]', linkColor: 'text-[#2aa198]',
        codeBackground: 'bg-[#073642]', windowTitleColor: 'text-[#93a1a1]', secondaryText: 'text-[#586e75]',
        accentColor: 'text-[#6c71c4]', scrollbarThumb: 'bg-[#586e75]', scrollbarTrack: 'bg-[#073642]/80',
    },
    oceanic: {
        background: 'bg-[#1e293b]', headerBg: 'bg-[#334155]', text: 'text-[#cbd5e1]', primary: 'text-[#60a5fa]',
        inputBg: 'bg-[#0f172a]/80', borderColor: 'border-[#475569]/60', promptColor: 'text-[#34d399]',
        errorColor: 'text-[#f87171]', successColor: 'text-[#a3e635]', linkColor: 'text-[#22d3ee]',
        codeBackground: 'bg-[#0f172a]', windowTitleColor: 'text-[#e2e8f0]', secondaryText: 'text-[#94a3b8]',
        accentColor: 'text-[#a78bfa]', scrollbarThumb: 'bg-[#475569]', scrollbarTrack: 'bg-[#334155]/80',
    }
};

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "circOut" }
};

// --- Helper Functions ---
const generateId = () => `cmd-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// --- Main Component ---
const CommandLineInterface: React.FC<CommandLineInterfaceProps> = ({
  initialTheme = 'light', // MODIFIED: Default to oceanic for a richer initial look
  welcomeMessage,
  width = '90%',
  height = '600px',
  className = '',
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<CommandResponse[]>([]);
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const getInitialTheme = useCallback((): ThemeType => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeType | null;
      if (savedTheme && themes[savedTheme]) return savedTheme;
      if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) return 'dark';
    }
    return initialTheme && themes[initialTheme] ? initialTheme : 'light'; // Fallback to oceanic if prop is invalid
  }, [initialTheme]);

  const [theme, setThemeState] = useState<ThemeType>(getInitialTheme());
  const [isProcessingCommand, setIsProcessingCommand] = useState(false);

  const setTheme = useCallback((newTheme: ThemeType) => {
    if (themes[newTheme]) {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') localStorage.setItem('cliTheme', newTheme);
    }
  }, []);

  // ADDED: Effect to listen for localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'cliTheme' && event.newValue && event.newValue !== theme) {
        const newThemeFromStorage = event.newValue as ThemeType;
        if (themes[newThemeFromStorage]) {
          setThemeState(newThemeFromStorage); // Update local state, this will trigger re-render and apply new theme styles
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, [theme]); // Add `theme` as dependency to ensure `event.newValue !== theme` uses the current theme state

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const currentTheme = themes[theme]; // This is key: UI elements derive styles from here, which updates when `theme` state changes.

  const commandGroups = useMemo(() => ({
    "Navigation": ["about", "projects", "skills", "experience", "contact", "social"],
    "System": ["help", "clear", "history", "theme", "system-info", "exit"],
    "Tools": ["echo", "date", "time", "weather"],
    "Links": ["github", "linkedin", "resume"],
    "Fun": ["ascii-art", "joke", "fortune", "game", "coffee"]
  }), []);

  const availableCommands = useMemo(() => {
    return Object.values(commandGroups).flat().sort();
  }, [commandGroups]);

  const getCommandIcon = useCallback((cmd: string): JSX.Element | null => {
    const iconProps = { size: 12, className: `mr-1.5 ${currentTheme.secondaryText || 'opacity-70'} flex-shrink-0` };
    switch(cmd.toLowerCase()) {
      case 'help': return <HelpCircle {...iconProps} />;
      case 'clear': return <Zap {...iconProps} />;
      case 'echo': return <MessageSquare {...iconProps} />;
      case 'about': return <Info {...iconProps} />;
      case 'exit': return <LinkExternal {...iconProps} />;
      case 'projects': return <Package {...iconProps} />;
      case 'contact': return <Users {...iconProps} />;
      case 'skills': return <Award {...iconProps} />;
      case 'experience': return <Briefcase {...iconProps} />;
      case 'resume': return <FileText {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'theme': return ['dark', 'matrix', 'nord', 'oceanic', 'solarized', 'retro'].includes(theme) ? <Moon {...iconProps} /> : <Sun {...iconProps} />;
      case 'history': return <History {...iconProps} />;
      case 'date': return <Calendar {...iconProps} />;
      case 'time': return <Clock {...iconProps} />;
      case 'weather': return <Cloud {...iconProps} />;
      case 'system-info': return <Settings {...iconProps} />;
      case 'ascii-art': return <Code {...iconProps} />;
      case 'joke': case 'fortune': case 'game': return <Gift {...iconProps} />;
      case 'coffee': return <Coffee {...iconProps} />;
      case 'social': return <Users {...iconProps} />;
      default: return <TerminalIconLucide {...iconProps} />;
    }
  }, [theme, currentTheme.secondaryText]);

  useEffect(() => {
    const defaultWelcome = [
        `Dinesh's Portfolio CLI [Version 1.3.1]`,
        `(c) Dinesh Babu Surapaneni. Current Theme: ${theme}`, // Displays the theme active at the time of this message generation
        `Type "help" for available commands.`,
        ` `,
    ];
    setOutput(
        (welcomeMessage || defaultWelcome).map(msg => ({ type: 'text', content: msg, id: generateId() }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [welcomeMessage]); // Removed `theme` from dependencies. Welcome msg only shows initial theme.

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (outputRef.current) {
      setTimeout(() => {
         if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }, 60);
    }
  }, [output]);

  const clearOutput = useCallback(() => {
    setOutput([]);
    setTimeout(() => {
      setOutput([{ type: 'success', content: 'Console cleared.', id: generateId() }]);
    }, 50);
  }, []);

  const addToHistory = useCallback((command: string) => {
    if (history.length > 0 && history[0].command === command) return;
    setHistory(prev => [{ command, timestamp: new Date() }, ...prev.slice(0, 99)]);
    setHistoryIndex(-1);
  }, [history]);

  useEffect(() => {
    if (input.trim()) {
      const searchLower = input.trim().toLowerCase();
      const filtered = availableCommands.filter(cmd => cmd.startsWith(searchLower));
      setSuggestions(filtered.slice(0, 7));
      setShowSuggestions(filtered.length > 0);
      if(filtered.length > 0 && selectedSuggestion >= filtered.length) setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, availableCommands, selectedSuggestion]);

  const executeCommand = useCallback((props: CommandHandlerProps) => {
    const { command, args, theme: currentExecutingTheme, setOutput: appendOutput, setTheme: updateTheme, setInputCommand, focusInput, commandHistory } = props;
    let response: Partial<CommandResponse> = { id: generateId() };
    const currentThemeConfig = themes[currentExecutingTheme];
    
    const openLink = (url: string) => { 
        if (typeof window !== 'undefined') {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    switch (command) {
      case 'help':
        response = {
          type: 'component',
          content: (
            <div className="my-2 text-xs">
              <h3 className={`font-semibold ${currentThemeConfig.primary} mb-2 flex items-center gap-1.5`}>
                {getCommandIcon('help')} Available Commands:
              </h3>
              {Object.entries(commandGroups).map(([group, cmds]) => (
                <div key={group} className="mb-2 pl-1.5">
                  <div className={`${currentThemeConfig.accentColor || currentThemeConfig.primary} font-medium text-[0.7rem] opacity-90 capitalize`}>{group}:</div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 ml-2 mt-1">
                    {(cmds as string[]).map(cmd => (
                      <button
                        key={cmd}
                        onClick={() => {
                          setInputCommand(cmd);
                          focusInput();
                        }}
                        className={`flex items-center gap-1 hover:${currentThemeConfig.primary} transition-colors`}
                      >
                        {getCommandIcon(cmd)}
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className={`mt-3 text-[0.7rem] ${currentThemeConfig.secondaryText || 'opacity-75'} border-t ${currentThemeConfig.borderColor} pt-2`}>
                ℹ️ Type 'theme [name]' to switch themes ({Object.keys(themes).join(', ')}).<br />
                💡 Use Tab for completion, ↑/↓ arrows for history. Click any command to use it.
              </p>
            </div>
          )
        };
        break;
      case 'clear':
        clearOutput();
        return;
      case 'echo':
        response.type = 'text';
        response.content = args.length > 0 ? args.join(' ') : <span className={currentThemeConfig.secondaryText}>Usage: echo [text]</span>;
        break;
      case 'about': case 'projects': case 'skills': case 'experience': case 'contact': case 'social':
        // Enhanced portfolio page redirection
        const portfolioPagesMap = { // Renamed to avoid conflict with default case
          'about': { title: 'About Me', icon: 'User', description: 'Learn about my background, interests, and professional journey.' },
          'projects': { title: 'Projects', icon: 'Code', description: 'Explore my featured projects, applications, and development work.' },
          'skills': { title: 'Skills', icon: 'Zap', description: 'View my technical skills, tools, and development expertise.' },
          'experience': { title: 'Experience', icon: 'Briefcase', description: 'Check out my professional experience and work history.' },
          'contact': { title: 'Contact', icon: 'Mail', description: 'Get in touch with me for collaborations or opportunities.' },
          'social': { title: 'Social', icon: 'Share2', description: 'Connect with me on various social and professional platforms.' }  
        };
    
        const pageInfo = portfolioPagesMap[command];
        const icon = getCommandIcon(command);
    
        if (args[0] === 'view' || args[0] === 'open') {
          // Redirect to the actual page implementation
          response = {
            type: 'link',
            content: <>{icon} Redirecting to {pageInfo.title}...</>,
            meta: `/${command}`
          };
          openLink(response.meta);
        } else {
          response.type = 'component';
          response.content = (
            <div className={`my-2 p-3 rounded-md border ${currentThemeConfig.borderColor} ${currentThemeConfig.inputBg} text-xs`}>
              <div className="flex items-center gap-2 mb-2">
                {icon}
                <h3 className={`font-semibold ${currentThemeConfig.primary}`}>{pageInfo.title}</h3>
              </div>
    
              <p className="mb-3">{pageInfo.description}</p>
    
              {command === 'social' ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => executeCommand({...props, command: 'github', args: []})}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${currentThemeConfig.hoverBg || 'hover:bg-gray-700/30'} transition-colors`}
                  >
                    <Github size={12} /> GitHub
                  </button>
                  <button
                    onClick={() => executeCommand({...props, command: 'linkedin', args: []})}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${currentThemeConfig.hoverBg || 'hover:bg-gray-700/30'} transition-colors`}
                  >
                    <Linkedin size={12} /> LinkedIn
                  </button>
                  <button
                    onClick={() => executeCommand({...props, command: 'resume', args: []})}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${currentThemeConfig.hoverBg || 'hover:bg-gray-700/30'} transition-colors`}
                  >
                    <FileText size={12} /> Resume
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => openLink(`/${command}`)}
                    className={`flex items-center gap-1.5 ${currentThemeConfig.accentColor || currentThemeConfig.primary} hover:opacity-80 px-2 py-1 rounded-md border ${currentThemeConfig.borderColor} transition-colors`}
                  >
                    <ExternalLink size={12} /> Open Page
                  </button>
    
                  <button
                    onClick={() => executeCommand({...props, command: 'help', args: []})}
                    className={`flex items-center gap-1.5 ${currentThemeConfig.secondaryText} hover:opacity-90 px-2 py-1 rounded-md transition-colors`}
                  >
                    <HelpCircle size={12} /> See Commands
                  </button>
                </div>
              )}
            </div>
          );
        }
        break;
      case 'theme':
        if (args.length === 0) {
          response.type = 'component';
          response.content = (
            <div className="my-2 text-xs">
              <h3 className={`font-semibold ${currentThemeConfig.primary} mb-2 flex items-center gap-1.5`}>
                {getCommandIcon('theme')} Theme Settings
              </h3>
              <p className="mb-2">
                Current: <span className={`${currentThemeConfig.accentColor || currentThemeConfig.primary} font-semibold`}>{currentExecutingTheme}</span>
              </p>
    
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3">
                {Object.keys(themes).map((themeName) => {
                  const themeConfigPreview = themes[themeName as ThemeType];
                  const isActive = themeName === currentExecutingTheme;
    
                  return (
                    <button
                      key={themeName}
                      onClick={() => updateTheme(themeName as ThemeType)}
                      className={`p-1.5 rounded-md border ${themeConfigPreview.borderColor} ${isActive ? `ring-1 ring-offset-1 ${currentThemeConfig.inputBg.includes('black') || currentThemeConfig.background.includes('black') ? 'ring-offset-black/50':'ring-offset-white/50'} ${themeConfigPreview.primary.replace('text-', 'ring-')}` : ''} hover:opacity-80 transition-all text-left`}
                    >
                      <div className={`${themeConfigPreview.background} rounded-sm p-1.5 flex items-center justify-between`}>
                        <span className={`${themeConfigPreview.text} text-[0.65rem] font-medium`}>{themeName}</span>
                        <span className={`${themeConfigPreview.promptColor} ml-1`}>$</span>
                      </div>
                      {isActive && (
                        <div className={`mt-1 text-[0.6rem] text-center ${themeConfigPreview.accentColor || themeConfigPreview.primary}`}>
                          Active
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className={`mt-3 text-[0.65rem] ${currentThemeConfig.secondaryText}`}>Usage: theme [theme_name]</p>
            </div>
          );
        } else {
          const newThemeName = args[0]?.toLowerCase() as ThemeType;
          if (themes[newThemeName]) {
            updateTheme(newThemeName); // This calls the `setTheme` prop, which handles state and localStorage
            response.type = 'success';
            response.content = (
              <span className="flex items-center gap-1.5">
                <Check size={12} /> Theme changed to {newThemeName}.
              </span>
            );
          } else {
            response.type = 'error';
            response.content = (
              <>
                Invalid theme: "{args[0]}".<br />
                Available: {Object.keys(themes).join(', ')}.
              </>
            );
          }
        }
        break;
      case 'history':
        if (commandHistory.length === 0) {
          response = { type: 'text', content: 'No command history yet.' };
        } else {
          response = {
            type: 'component',
            content: (
              <div className="my-2 text-xs max-h-56 overflow-y-auto styled-scrollbar">
                <h3 className={`font-semibold ${currentThemeConfig.primary} mb-2 flex items-center gap-1.5`}>
                  {getCommandIcon('history')} Command History:
                </h3>
                <div className="border-l-2 pl-2 space-y-1 ml-1 border-gray-700/30">
                  {commandHistory.slice().reverse().map((item, index) => (
                    <div key={index} className="flex items-center gap-2 hover:bg-gray-500/10 rounded px-1 py-0.5 group transition-colors">
                      <span className={`${currentThemeConfig.secondaryText || 'opacity-60'} w-8 text-right text-[0.65rem]`}>
                        {commandHistory.length - index}.
                      </span>
                      <span className={`${currentThemeConfig.secondaryText || 'opacity-60'} text-[0.65rem]`}>
                        [{formatTime(item.timestamp)}]
                      </span>
                      <button
                        onClick={() => {
                          setInputCommand(item.command);
                          focusInput();
                        }}
                        className={`${currentThemeConfig.text} hover:${currentThemeConfig.primary} focus:${currentThemeConfig.primary} focus:outline-none rounded px-1 text-left flex-1`}
                      >
                        {item.command}
                      </button>
                      <button
                        onClick={() => executeCommand({...props, command: item.command.split(' ')[0], args: item.command.split(' ').slice(1)})}
                        className={`opacity-0 group-hover:opacity-100 ${currentThemeConfig.accentColor || currentThemeConfig.primary} hover:opacity-80 rounded-full p-0.5 focus:outline-none focus:ring-1`}
                        title="Execute command"
                      >
                        <Play size={10} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className={`mt-3 text-[0.65rem] ${currentThemeConfig.secondaryText}`}>Use ↑/↓ arrows to navigate input history.</p>
              </div>
            ),
          };
        }
        break;
      case 'date':
        response.type = 'text';
        response.content = <><Calendar size={12} className="inline mr-1.5" /> {new Date().toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</>;
        break;
      case 'time':
        response.type = 'text';
        response.content = <><Clock size={12} className="inline mr-1.5" /> {new Date().toLocaleTimeString()}</>;
        break;
      case 'weather':
        response.type = 'component';
        response.content = (
          <div className="flex items-center gap-2">
            <Cloud size={14} className="text-blue-400" />
            <div>
              <span className="font-medium">Weather service</span>
              <span className="text-xs block opacity-80">API not connected. Pretending it's sunny and 72°F!</span>
            </div>
          </div>
        );
        break;
      case 'github':
        response = {
          type: 'link',
          content: (
            <span className="flex items-center gap-1.5">
              <Github size={14} className="text-violet-400" />
              Opening GitHub profile...
            </span>
          ),
          meta: 'https://github.com/Dineshbabu290904'
        };
        openLink(response.meta);
        break;
      case 'linkedin':
        response = {
          type: 'link',
          content: (
            <span className="flex items-center gap-1.5">
              <Linkedin size={14} className="text-blue-500" />
              Opening LinkedIn profile...
            </span>
          ),
          meta: 'https://www.linkedin.com/in/dinesh-babu-surapaneni/'
        };
        openLink(response.meta);
        break;
      case 'resume':
        response = {
          type: 'link',
          content: (
            <span className="flex items-center gap-1.5">
              <FileText size={14} className="text-emerald-400" />
              Opening Resume...
            </span>
          ),
          meta: 'https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view'
        };
        openLink(response.meta);
        break;
      case 'ascii-art':
        const arts = [
          `
     .~~~~.
     i ---- i
     | \\__/ |
    {////////}
     --------
    ( creatively )
     --------
      ~~L~L~~
       | | |
      (_|_)`,
          `
       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
    /'\\_   _/\`\\
    \\___)=(___/
          `,
          `    (\\
       (\\-'-/)
       ((o o))
       ( >Y< )
       ,,---,,
      //|   |\\\\
     ((_|   |_))
       \`-'-\`
       rabbit
          `];
          response.type = 'component';
          response.content = (
            <div className="my-2">
              <h3 className={`font-semibold ${currentThemeConfig.primary} mb-2 flex items-center gap-1.5 text-xs`}>
                {getCommandIcon('ascii-art')} ASCII Art:
              </h3>
              <pre className={`font-mono text-xs whitespace-pre ${currentThemeConfig.accentColor || currentThemeConfig.primary}`}>
                {arts[Math.floor(Math.random() * arts.length)]}
              </pre>
              <button 
                onClick={() => executeCommand({...props, command: 'ascii-art', args: []})}
                className={`mt-2 text-xs ${currentThemeConfig.secondaryText} hover:${currentThemeConfig.primary} flex items-center gap-1`}
              >
                <RefreshCw size={10} /> Generate another
              </button>
            </div>
          );
          break;
      case 'joke':
        const jokes = [
          "Why don't programmers like nature? It has too many bugs.",
          "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
          "Why did the private classes break up? Because they never saw each other.",
          "Why do Java developers wear glasses? Because they don't C#.",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
          "What's a programmer's favorite place? The Foo Bar."
        ];
        response.type = 'component';
        response.content = (
          <div className="flex items-center gap-2">
            <Gift size={14} className="text-amber-400" />
            <div>
              <p>{jokes[Math.floor(Math.random() * jokes.length)]}</p>
              <button
                onClick={() => executeCommand({...props, command: 'joke', args: []})}
                className={`mt-1 text-xs ${currentThemeConfig.secondaryText} hover:${currentThemeConfig.primary} flex items-center gap-1`}
              >
                <RefreshCw size={10} /> Another joke
              </button>
            </div>
          </div>
        );
        break;
      case 'fortune':
        const fortunes = [
          "A thrilling new adventure is in your near future.",
          "Your code will compile on the first try today.",
          "An exciting opportunity lies ahead of you.",
          "You will find a bug you've been searching for.",
          "The best is yet to come. Keep coding!",
          "Your next pull request will be approved without any change requests.",
          "Someone will ask for your expert advice soon.",
          "A challenging problem will have a simple solution."
        ];
        response.type = 'component';
        response.content = (
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-300" />
            <div>
              <p>{fortunes[Math.floor(Math.random() * fortunes.length)]}</p>
              <button
                onClick={() => executeCommand({...props, command: 'fortune', args: []})}
                className={`mt-1 text-xs ${currentThemeConfig.secondaryText} hover:${currentThemeConfig.primary} flex items-center gap-1`}
              >
                <RefreshCw size={10} /> New fortune
              </button>
            </div>
          </div>
        );
        break;
      case 'game':
        response.type = 'component';
        response.content = (
          <div className={`my-2 p-3 rounded-md border ${currentThemeConfig.borderColor} ${currentThemeConfig.inputBg} text-xs`}>
            <div className="flex items-center gap-1.5 mb-2">
              {getCommandIcon('game')}
              <h3 className={`font-semibold ${currentThemeConfig.primary}`}>Game Zone</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => executeCommand({...props, command: 'ascii-art', args: []})}
                className={`p-2 rounded-md border ${currentThemeConfig.borderColor} hover:${currentThemeConfig.hoverBg || 'bg-gray-700/30'} flex flex-col items-center gap-1 transition-colors`}
              >
                <Terminal size={16} />
                <span>ASCII Art</span>
              </button>
              <button
                onClick={() => executeCommand({...props, command: 'fortune', args: []})}
                className={`p-2 rounded-md border ${currentThemeConfig.borderColor} hover:${currentThemeConfig.hoverBg || 'bg-gray-700/30'} flex flex-col items-center gap-1 transition-colors`}
              >
                <Sparkles size={16} />
                <span>Fortune</span>
              </button>
            </div>
            <p className={`text-[0.65rem] ${currentThemeConfig.secondaryText} italic`}>Coming soon: CLI-based typing game and number guess!</p>
          </div>
        );
        break;
      case 'system-info':
        const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'N/A';
        const platform = typeof window !== 'undefined' ? (navigator.platform || 'N/A') : 'N/A';
        response.type = 'component';
        response.content = (
          <div className="my-2 text-xs">
            <h3 className={`font-semibold ${currentThemeConfig.primary} mb-2 flex items-center gap-1.5`}>
              {getCommandIcon('system-info')} System Information:
            </h3>
            <div className={`p-3 rounded-md border ${currentThemeConfig.borderColor} ${currentThemeConfig.inputBg}`}>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5">
                <span className={`${currentThemeConfig.secondaryText || 'opacity-80'} font-medium`}>OS:</span>
                <span>{platform.includes('Win') ? 'Windows-like' : platform.includes('Mac') ? 'MacOS-like' : platform.includes('Linux') ? 'Linux-like' : platform} (Web Browser)</span>
    
                <span className={`${currentThemeConfig.secondaryText || 'opacity-80'} font-medium`}>Browser:</span>
                <span>{userAgent.split(') ').pop()?.split(' ')[0] || 'Unknown'}</span>
    
                <span className={`${currentThemeConfig.secondaryText || 'opacity-80'} font-medium`}>Theme:</span>
                <span className="flex items-center gap-1.5">
                  {currentExecutingTheme}
                  <button
                    onClick={() => executeCommand({...props, command: 'theme', args: []})}
                    className={`text-[0.65rem] ${currentThemeConfig.accentColor || currentThemeConfig.primary} hover:opacity-80 flex items-center gap-0.5`}
                  >
                    <Settings size={8} /> Change
                  </button>
                </span>
    
                <span className={`${currentThemeConfig.secondaryText || 'opacity-80'} font-medium`}>CLI Version:</span>
                <span>1.4.0</span>
    
                <span className={`${currentThemeConfig.secondaryText || 'opacity-80'} font-medium`}>Screen:</span>
                <span>{typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}</span>
    
                <span className={`${currentThemeConfig.secondaryText || 'opacity-80'} font-medium`}>Language:</span>
                <span>{typeof window !== 'undefined' ? navigator.language : 'N/A'}</span>
              </div>
            </div>
          </div>
        );
        break;
      case 'coffee':
        response.type = 'component';
        response.content = (
          <div className="my-2 text-xs">
            <div className={`p-3 rounded-md bg-gradient-to-br from-amber-800/30 to-amber-600/10 border border-amber-700/30 text-center`}>
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="w-12 h-10 bg-amber-800 rounded-b-2xl relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-2 bg-amber-700 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute inset-x-1 top-2 bottom-1 bg-gradient-to-br from-amber-600 to-amber-700 rounded-b-xl overflow-hidden">
                      <div className="absolute inset-x-0 top-0 h-1 bg-amber-500/40 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-2 w-3 h-4 bg-amber-700 rounded-r-lg"></div>
                </div>
              </div>
              <p className={`font-medium ${currentThemeConfig.text}`}>☕ Virtual coffee prepared!</p>
              <p className={`text-[0.65rem] mt-1 ${currentThemeConfig.secondaryText}`}>Sip, relax, and code on!</p>
            </div>
          </div>
        );
        break;
      case 'exit':
        response.type = 'component';
        response.content = (
          <div className="flex items-center gap-2">
            <LogOut size={14} className="text-red-400" />
            <div>
              <p>Exiting portfolio CLI... Just kidding!</p>
              <p className="text-xs opacity-80 mt-0.5">This is a web app, close the tab if you want. 😉</p>
            </div>
          </div>
        );
        break;
      case 'welcome':
        response.type = 'component';
        response.content = (
          <div className="my-2 text-xs">
            <div className={`p-3 rounded-md border ${currentThemeConfig.borderColor} ${currentThemeConfig.inputBg}`}>
              <h3 className={`font-semibold ${currentThemeConfig.primary} text-sm mb-2 flex items-center gap-1.5`}>
                <span className="text-emerald-400"><TerminalSquare size={16} /></span> Welcome to Dinesh's Portfolio CLI!
              </h3>
    
              <p className="mb-2">
                Explore my portfolio using command-line interface. Type <span className={`${currentThemeConfig.primary} font-mono`}>help</span> to see available commands.
              </p>
    
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                <button
                  onClick={() => executeCommand({...props, command: 'about', args: []})}
                  className={`p-2 rounded-md hover:${currentThemeConfig.hoverBg || 'bg-gray-700/30'} flex items-center gap-1.5 transition-colors`}
                >
                  <User size={12} />
                  <span>About Me</span>
                </button>
                <button
                  onClick={() => executeCommand({...props, command: 'projects', args: []})}
                  className={`p-2 rounded-md hover:${currentThemeConfig.hoverBg || 'bg-gray-700/30'} flex items-center gap-1.5 transition-colors`}
                >
                  <Code size={12} />
                  <span>Projects</span>
                </button>
                <button
                  onClick={() => executeCommand({...props, command: 'social', args: []})}
                  className={`p-2 rounded-md hover:${currentThemeConfig.hoverBg || 'bg-gray-700/30'} flex items-center gap-1.5 transition-colors`}
                >
                  <Share2 size={12} />
                  <span>Social</span>
                </button>
              </div>
    
              <p className={`text-[0.65rem] ${currentThemeConfig.secondaryText} border-t ${currentThemeConfig.borderColor} pt-2 mt-1`}>
                Try commands like <span className="font-mono">theme</span>, <span className="font-mono">system-info</span>, or <span className="font-mono">coffee</span> for fun!
              </p>
            </div>
          </div>
        );
        break;
      default:
        const cmdLower = command.toLowerCase();
        let bestMatch: string | null = null;
        const startsWithMatches = availableCommands.filter(c => c.startsWith(cmdLower));
        if (startsWithMatches.length === 1) {
          bestMatch = startsWithMatches[0];
        } else if (startsWithMatches.length > 1) {
          bestMatch = startsWithMatches.find(c => c === cmdLower) || startsWithMatches.sort((a,b) => a.length - b.length)[0];
        } else {
          const includesMatches = availableCommands.filter(c => c.includes(cmdLower));
          if (includesMatches.length > 0) {
            bestMatch = includesMatches.sort((a,b) => Math.abs(a.length - cmdLower.length) - Math.abs(b.length - cmdLower.length))[0];
          }
        }
    
        // Check if the command might be intended as a portfolio page navigation
        const portfolioPageNames = ['about', 'projects', 'skills', 'experience', 'contact']; // Renamed from portfolioPages to avoid conflict
        const potentialPage = portfolioPageNames.find(page =>
          command.toLowerCase().includes(page) ||
          (command.toLowerCase() === 'portfolio' && args[0]?.toLowerCase() === page)
        );
    
        if (potentialPage) {
          response.type = 'component';
          response.content = (
            <div className={`my-1 p-2 rounded border ${currentThemeConfig.borderColor} ${currentThemeConfig.inputBg} text-xs flex items-start gap-2`}>
              <Info size={14} className={`${currentThemeConfig.accentColor || currentThemeConfig.primary} flex-shrink-0 mt-0.5`} />
              <div>
                <p>Did you mean to navigate to the <span className="font-medium">{potentialPage}</span> page?</p>
                <div className="flex gap-2 mt-1.5">
                  <button
                    onClick={() => executeCommand({...props, command: potentialPage, args: []})}
                    className={`flex items-center gap-1 ${currentThemeConfig.accentColor || currentThemeConfig.primary} hover:opacity-80 px-2 py-1 rounded-md border ${currentThemeConfig.borderColor} text-xs transition-colors`}
                  >
                    <Check size={10} /> Yes, show {potentialPage}
                  </button>
                  <button
                    onClick={() => executeCommand({...props, command: 'help', args: []})}
                    className={`flex items-center gap-1 ${currentThemeConfig.secondaryText} hover:opacity-90 px-2 py-1 rounded-md text-xs transition-colors`}
                  >
                    <HelpCircle size={10} /> Show all commands
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (bestMatch && bestMatch !== cmdLower) {
          response.type = 'component';
          response.content = (
            <div className={`my-1 p-2 rounded border ${currentThemeConfig.borderColor} ${currentThemeConfig.inputBg} text-xs flex items-start gap-2`}>
              <Info size={14} className={`${currentThemeConfig.accentColor || currentThemeConfig.primary} flex-shrink-0 mt-0.5`} />
              <div>
                <p>Command <span className="font-mono">{command}</span> not found. Did you mean <span className={`${currentThemeConfig.primary} font-mono font-semibold`}>{bestMatch}</span>?</p>
                <div className="flex gap-2 mt-1.5">
                  <button
                    onClick={() => executeCommand({...props, command: bestMatch as string, args: []})}
                    className={`flex items-center gap-1 ${currentThemeConfig.accentColor || currentThemeConfig.primary} hover:opacity-80 px-2 py-1 rounded-md border ${currentThemeConfig.borderColor} text-xs transition-colors`}
                  >
                    <Check size={10} /> Yes, run {bestMatch}
                  </button>
                  <button
                    onClick={() => {
                      setInputCommand(bestMatch as string);
                      focusInput();
                    }}
                    className={`flex items-center gap-1 ${currentThemeConfig.secondaryText} hover:opacity-90 px-2 py-1 rounded-md text-xs transition-colors`}
                  >
                    <Edit3 size={10} /> Edit to {bestMatch}
                  </button>
                  <button
                    onClick={() => executeCommand({...props, command: 'help', args: []})}
                    className={`flex items-center gap-1 ${currentThemeConfig.secondaryText} hover:opacity-90 px-2 py-1 rounded-md text-xs transition-colors`}
                  >
                    <HelpCircle size={10} /> Show all commands
                  </button>
                </div>
              </div>
            </div>
          );
        } else {
          response.type = 'error';
          response.content = (
            <>
              Command not found: {command}.<br />
              Type '<span className={`${currentThemeConfig.primary} font-semibold`}>help</span>' for a list of available commands.
            </>
          );
        }
        break;
    }
    if (response?.content) appendOutput(prev => [...prev, response as CommandResponse]);
  }, [availableCommands, getCommandIcon, commandGroups, clearOutput, setTheme]); // `setTheme` is stable, `clearOutput` is stable.

  const handleCommandInternal = useCallback(async (fullCommandToExecute: string) => {
    if (isProcessingCommand || !fullCommandToExecute.trim()) {
        if (!fullCommandToExecute.trim()) setInput('');
        return;
    }
    setIsProcessingCommand(true);
    const trimmedCommand = fullCommandToExecute.trim();
    setOutput(prev => [...prev, { type: 'text', content: `$ ${trimmedCommand}`, id: generateId() }]);
    addToHistory(trimmedCommand);
    if (outputRef.current) setTimeout(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, 50);
    setInput('');
    setShowSuggestions(false);
    setSelectedSuggestion(0);
    await new Promise(resolve => setTimeout(resolve, 50));
    const [commandName, ...args] = trimmedCommand.split(/\s+/);
    const commandLower = commandName.toLowerCase();
    try {
        executeCommand({
            command: commandLower, args, theme, // Pass current global theme for execution context
            setOutput, clearOutput, setTheme,
            setInputCommand: setInput,
            focusInput: () => inputRef.current?.focus(),
            commandHistory: history,
        });
    } catch (error) {
        console.error("Error executing command:", error);
        setOutput(prev => [...prev, { type: 'error', content: `An unexpected error occurred executing "${commandLower}".`, id: generateId() }]);
    } finally {
        setTimeout(() => { 
            setIsProcessingCommand(false); 
            inputRef.current?.focus(); 
            if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }, 100); 
    }
  }, [isProcessingCommand, addToHistory, executeCommand, theme, setOutput, clearOutput, setTheme, history]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const val = e.target.value;
     setInput(val);
     const show = !!val.trim() && availableCommands.some(cmd => cmd.startsWith(val.trim().toLowerCase()));
     setShowSuggestions(show);
     if (!show) setSelectedSuggestion(0);
   };

   const handleTabCompletion = useCallback(() => {
    if (showSuggestions && suggestions.length > 0) {
        const suggestionToUse = suggestions[selectedSuggestion] || suggestions[0];
        if (suggestionToUse) {
            setInput(suggestionToUse + ' ');
            setShowSuggestions(false);
            setSelectedSuggestion(0);
            setTimeout(() => { if (inputRef.current) inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length; }, 0);
        }
    }
   }, [suggestions, selectedSuggestion, showSuggestions, availableCommands]);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isProcessingCommand && e.key !== 'Escape') return;
    switch(e.key) {
        case 'Enter':
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0 && selectedSuggestion >= 0 && selectedSuggestion < suggestions.length) {
                handleCommandInternal(suggestions[selectedSuggestion]);
            } else if (input.trim()) {
                handleCommandInternal(input.trim());
            } else {
                setOutput(prev => [...prev, { type: 'text', content: '$ ', id: generateId() }]);
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0) {
                setSelectedSuggestion(prev => Math.max(0, prev - 1));
            } else if (history.length > 0) {
                const newIndex = Math.min(history.length - 1, historyIndex + 1);
                setHistoryIndex(newIndex);
                const cmdToSet = history[newIndex]?.command || '';
                setInput(cmdToSet);
                setShowSuggestions(false);
                setTimeout(() => e.currentTarget.selectionStart = e.currentTarget.selectionEnd = cmdToSet.length, 0);
            }
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0) {
                setSelectedSuggestion(prev => Math.min(suggestions.length - 1, prev + 1));
            } else if (historyIndex > -1) {
                const newIndex = Math.max(-1, historyIndex - 1);
                setHistoryIndex(newIndex);
                const command = newIndex === -1 ? '' : (history[newIndex]?.command || '');
                setInput(command);
                setShowSuggestions(false);
                setTimeout(() => e.currentTarget.selectionStart = e.currentTarget.selectionEnd = command.length, 0);
            }
            break;
        case 'Tab': 
            e.preventDefault(); 
            handleTabCompletion(); 
            break;
        case 'Escape':
            e.preventDefault(); 
            if (showSuggestions) { 
                setShowSuggestions(false); 
                setSelectedSuggestion(0); 
            } else {
                setInput('');
            }
            break;
        default: 
            if (historyIndex !== -1 && e.key.length === 1) {
                setHistoryIndex(-1);
            }
            break;
    }
   };

   const selectSuggestion = (suggestion: string) => { 
       handleCommandInternal(suggestion); 
   };

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "circOut" }}
      className={`w-full rounded-lg shadow-xl ${currentTheme.background} ${currentTheme.text} font-mono text-xs sm:text-sm flex flex-col overflow-hidden ${className}`}
      style={{ width, height }} 
      onClick={() => inputRef.current?.focus()}
    >
      <div className={`h-7 flex-shrink-0 ${currentTheme.headerBg || currentTheme.background} flex items-center px-3 border-b ${currentTheme.borderColor} select-none`}>
        <div className="flex space-x-1.5 mr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/90"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/90"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/90"></div>
        </div>
        <span className={`text-[0.7rem] font-medium ${currentTheme.windowTitleColor || currentTheme.secondaryText} flex items-center gap-1.5`}>
          <TerminalIconLucide size={12}/> DS-Portfolio CLI
        </span>
      </div>
  
      <div
        ref={outputRef}
        className={`flex-grow overflow-y-auto p-3 styled-scrollbar focus:outline-none`}
        tabIndex={-1}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${currentTheme.scrollbarThumb || '#888'} ${currentTheme.scrollbarTrack || 'transparent'}`
        }}
      >
        <AnimatePresence initial={false}>
          {output.map((line) => (
            <motion.div
              key={line.id} 
              layout="position" 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={fadeInUp}
              className={`mb-1 whitespace-pre-wrap break-words leading-relaxed
                        ${line.type === 'error' ? currentTheme.errorColor : ''}
                        ${line.type === 'success' ? currentTheme.successColor : ''}
                        ${line.type === 'link' ? currentTheme.linkColor : ''}`}
            >
              {line.type === 'component' ? ( line.content ) :
              line.type === 'code' ? ( 
                <pre className={`p-2 rounded my-1 overflow-x-auto ${currentTheme.codeBackground} whitespace-pre text-[0.7rem] sm:text-xs leading-tight styled-scrollbar border-l-2 ${currentTheme.accentColor ? currentTheme.accentColor.replace('text-','border-') : currentTheme.primary.replace('text-','border-')} bg-opacity-70`}>
                  {String(line.content)}
                </pre> 
              ) :
              line.type === 'link' ? ( 
                <a href={String(line.meta)} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="underline hover:brightness-110 focus:outline focus:outline-1 focus:outline-offset-1 focus:rounded-sm transition-all duration-150">
                  {line.content}<LinkExternal size={10} className="inline ml-1 opacity-70"/>
                </a> 
              ) :
              ( React.isValidElement(line.content) ? line.content : <span dangerouslySetInnerHTML={{ __html: String(line.content) }} /> )
              }
            </motion.div>
          ))}
        </AnimatePresence>
        <div style={{ height: '1px' }} aria-hidden="true" />
      </div>
  
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{opacity:0, y:10, height: 0}} 
            animate={{opacity:1, y:0, height: 'auto'}} 
            exit={{opacity:0, y:10, height:0}}
            transition={{duration:0.2, ease: "easeOut"}}
            className={`absolute left-2 right-2 sm:left-3 sm:right-3 border ${currentTheme.borderColor} rounded-md shadow-lg max-h-28 sm:max-h-36 overflow-y-auto z-20 styled-scrollbar ${currentTheme.inputBg || currentTheme.background} p-1`}
            style={{ bottom: 'calc(2.5rem + 8px)'}}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion} 
                onClick={() => selectSuggestion(suggestion)} 
                onMouseEnter={() => setSelectedSuggestion(index)}
                className={`block w-full text-left px-3 py-1 sm:py-1.5 text-[0.7rem] sm:text-xs 
                          ${currentTheme.text}
                          ${selectedSuggestion === index ? `${currentTheme.inputBg ? currentTheme.inputBg.replace(/bg-(\w+)-(\d+)\/?(\d+)?/, 'bg-$1-$2/50') : 'bg-gray-700/50'} ${currentTheme.primary}` : ''}
                          hover:${currentTheme.inputBg ? currentTheme.inputBg.replace(/bg-(\w+)-(\d+)\/?(\d+)?/, 'bg-$1-$2/50') : 'bg-gray-700/50'} hover:${currentTheme.primary} 
                          transition-colors duration-100 rounded-sm flex items-center whitespace-nowrap gap-2`}
              >
                {getCommandIcon(suggestion)} <span className="truncate">{suggestion}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
  
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) handleCommandInternal(input.trim());
          else setOutput(prev => [...prev, { type: 'text', content: '$ ', id: generateId() }]);
        }}
        className={`p-2 sm:p-2.5 border-t ${currentTheme.borderColor} flex items-center relative flex-shrink-0 ${currentTheme.inputBg || currentTheme.background} z-10`}
        style={{ minHeight: '2.5rem' }}
      >
        <div className="flex items-center w-full">
          <span className={`${currentTheme.promptColor} text-sm mr-2 select-none font-bold`}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`flex-grow bg-transparent ${currentTheme.text} placeholder-${currentTheme.secondaryText ? currentTheme.secondaryText.replace('text-','') : 'gray-500'} 
                       focus:outline-none text-sm w-full transition-colors duration-200`}
            placeholder="Type a command... (Tab to complete)"
            spellCheck="false"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            aria-autocomplete="list"
            aria-haspopup={showSuggestions && suggestions.length > 0}
          />
        </div>
      </form>
  
      {currentTheme && <style>{`
        .styled-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .styled-scrollbar::-webkit-scrollbar-track { background: ${currentTheme.scrollbarTrack || 'transparent'}; border-radius: 3px; }
        .styled-scrollbar::-webkit-scrollbar-thumb { background-color: ${currentTheme.scrollbarThumb || '#888'}; border-radius: 3px; }
        .styled-scrollbar::-webkit-scrollbar-thumb:hover { filter: brightness(1.2); }
        .styled-scrollbar { scrollbar-width: thin; scrollbar-color: ${currentTheme.scrollbarThumb || '#888'} ${currentTheme.scrollbarTrack || 'transparent'}; }
      `}</style>}
    </motion.div>
  );
};

export default CommandLineInterface;