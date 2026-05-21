import { PRIMARY_NAV, SETTINGS_NAV } from '@/config/navigation';
import { ViewRenderer } from '@/config/views';
import { useNav } from '@/context/navigationContext';
import { useHabits } from '@/context/useHabits';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { PageTransition } from '@/components/PageTransition';
import { ViewSkeleton } from '@/components/skeletons/ViewSkeleton';
import { ToastContainer } from '@/components/ToastContainer';
import { CommandPalette } from '@/components/CommandPalette';
import { GlobalKeyboardBridge } from '@/components/GlobalKeyboardBridge';
import { NavLinkButton } from '@/components/layout/NavLinkButton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const MOBILE_TABS = [...PRIMARY_NAV.slice(0, 4), SETTINGS_NAV];

function MainContent() {
  const { view } = useNav();
  const { isReady } = useHabits();

  if (!isReady) {
    return <ViewSkeleton view={view} />;
  }

  return (
    <PageTransition>
      <ViewRenderer view={view} />
    </PageTransition>
  );
}

export function AppShell() {
  const { view, navigate } = useNav();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <GlobalKeyboardBridge />
      <CommandPalette />

      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-edge md:flex">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto scroll-smooth outline-none"
        >
          <ErrorBoundary>
            <MainContent />
          </ErrorBoundary>
        </main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-edge bg-background/95 backdrop-blur-sm md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex h-[60px] items-stretch pb-[env(safe-area-inset-bottom)]">
          {MOBILE_TABS.map((item) => (
            <NavLinkButton
              key={item.id}
              label={item.mobileLabel ?? item.label}
              icon={item.icon}
              isActive={view === item.id}
              onClick={() => navigate(item.id)}
              layout="mobile"
            />
          ))}
        </div>
      </nav>

      <ToastContainer />
    </div>
  );
}
