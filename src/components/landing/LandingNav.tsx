import { useEffect, useState } from 'react';
import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react';
import { useThemeContext } from '@/context/themeContext';
import { useAppMode } from '@/context/appModeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

export function LandingNav() {
  const { theme, toggleTheme } = useThemeContext();
  const { enterApp } = useAppMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-edge/80 bg-background/90 shadow-sm shadow-black/5 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/15 ring-1 ring-violet-500/25">
            <Sparkles size={15} className="text-violet-400" aria-hidden />
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
            HabitFlow
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Marketing">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-subtle transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="rounded-lg p-2 text-subtle transition-colors hover:bg-surface hover:text-foreground"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Button
            variant="ghost"
            size="sm"
            className="hidden text-[13px] sm:inline-flex"
            onClick={enterApp}
          >
            Sign in
          </Button>
          <Button
            size="sm"
            className="hidden h-9 bg-violet-600 px-4 text-white shadow-md shadow-violet-500/20 hover:bg-violet-500 sm:inline-flex"
            onClick={enterApp}
          >
            Get started
          </Button>

          <button
            type="button"
            className="rounded-lg p-2 text-subtle md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'border-t border-edge bg-background/95 backdrop-blur-md md:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile marketing">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-foreground hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-edge pt-4">
            <Button variant="outline" onClick={() => { enterApp(); setMobileOpen(false); }}>
              Sign in
            </Button>
            <Button
              className="bg-violet-600 text-white hover:bg-violet-500"
              onClick={() => { enterApp(); setMobileOpen(false); }}
            >
              Get started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
