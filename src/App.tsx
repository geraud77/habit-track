import { useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { useAppMode } from './context/appModeContext';
import { useOnboarding } from './context/onboardingContext';
import { useScrollLock } from './hooks/useScrollLock';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  const { mode } = useAppMode();
  const { isActive } = useOnboarding();

  useScrollLock(mode !== 'landing');

  useEffect(() => {
    document.documentElement.dataset.app = mode === 'landing' ? 'marketing' : 'product';
  }, [mode]);

  if (mode === 'landing') {
    return <LandingPage />;
  }

  if (isActive) {
    return <OnboardingFlow />;
  }

  return <AppShell />;
}
