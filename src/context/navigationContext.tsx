import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { VIEW_ORDER, type View } from '@/config/navigation';

export type { View };
export type NavDirection = 'forward' | 'back' | 'none';

interface NavContextValue {
  view: View;
  direction: NavDirection;
  navigate: (v: View) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('dashboard');
  const [direction, setDirection] = useState<NavDirection>('none');
  const prevViewRef = useRef<View>('dashboard');

  const navigate = useCallback((next: View) => {
    if (next === prevViewRef.current) return;

    const prevIdx = VIEW_ORDER.indexOf(prevViewRef.current);
    const nextIdx = VIEW_ORDER.indexOf(next);

    if (prevIdx >= 0 && nextIdx >= 0 && prevIdx !== nextIdx) {
      setDirection(nextIdx > prevIdx ? 'forward' : 'back');
    } else {
      setDirection('none');
    }

    prevViewRef.current = next;
    setView(next);
  }, []);

  return (
    <NavContext value={{ view, direction, navigate }}>{children}</NavContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}
