'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>('theme', 'dark');
  const [theme, setThemeState] = useState<Theme>(storedTheme);

  // Set theme on initial load
  useEffect(() => {
    setThemeState(storedTheme);
  }, [storedTheme]);

  // Update theme and local storage
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  }, [setStoredTheme]);

  // Apply theme class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
}
