import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'habitflow-app-mode';

export type AppMode = 'landing' | 'app';

interface AppModeContextValue {
  mode: AppMode;
  enterApp: () => void;
  showLanding: () => void;
}

const AppModeContext = createContext<AppModeContextValue | null>(null);

function readMode(): AppMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'app' ? 'app' : 'landing';
  } catch {
    return 'landing';
  }
}

export function AppModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>(readMode);

  const enterApp = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'app');
    setMode('app');
  }, []);

  const showLanding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMode('landing');
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <AppModeContext value={{ mode, enterApp, showLanding }}>
      {children}
    </AppModeContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppMode() {
  const ctx = useContext(AppModeContext);
  if (!ctx) throw new Error('useAppMode must be used within AppModeProvider');
  return ctx;
}
