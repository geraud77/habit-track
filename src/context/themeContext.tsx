import { createContext, useContext, type ReactNode } from 'react';
import { useTheme, type Theme } from '@/hooks/useTheme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
