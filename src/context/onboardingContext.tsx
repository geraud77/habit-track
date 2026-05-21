import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useHabits } from '@/context/useHabits';

const STORAGE_KEY = 'habitflow-onboarding-v1';

interface OnboardingContextValue {
  isComplete: boolean;
  /** True when the full-screen onboarding should show */
  isActive: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { habits, isReady } = useHabits();
  const [isComplete, setIsComplete] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Users who already have habits (e.g. before onboarding existed) skip the flow
  useEffect(() => {
    if (!isReady || isComplete) return;
    if (habits.length > 0) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsComplete(true);
    }
  }, [isReady, isComplete, habits.length]);

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsComplete(true);
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsComplete(false);
  }, []);

  const isActive = isReady && !isComplete;

  return (
    <OnboardingContext
      value={{ isComplete, isActive, completeOnboarding, resetOnboarding }}
    >
      {children}
    </OnboardingContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
