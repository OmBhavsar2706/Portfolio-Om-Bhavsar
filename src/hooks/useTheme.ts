import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

// Global state for shared reactive theme
let globalTheme: Theme = (() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    return media.matches ? 'dark' : 'light';
  }
  return 'dark';
})();

const listeners = new Set<(theme: Theme) => void>();

function setGlobalTheme(newTheme: Theme) {
  if (globalTheme !== newTheme) {
    globalTheme = newTheme;
    listeners.forEach(listener => listener(newTheme));
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(globalTheme);

  useEffect(() => {
    const listener = (newTheme: Theme) => {
      setThemeState(newTheme);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme | ((prev: Theme) => Theme)) => {
    const nextTheme = typeof newTheme === 'function' ? newTheme(globalTheme) : newTheme;
    setGlobalTheme(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme, setTheme };
}
