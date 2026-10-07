import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Self-hosted variable fonts (bundled by Vite, no third-party font requests)
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.startsWith('/') ? import.meta.env.BASE_URL : '/'}>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
