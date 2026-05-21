import { Code2, Sparkles } from 'lucide-react';
import { useAppMode } from '@/context/appModeContext';
import { FOOTER_LINKS } from '@/lib/landingContent';

export function LandingFooter() {
  const { enterApp } = useAppMode();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-violet-500/15">
                <Sparkles size={14} className="text-violet-400" aria-hidden />
              </div>
              <span className="text-[14px] font-semibold text-foreground">HabitFlow</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-subtle">
              A premium habit tracker built for portfolios and daily use. React 19,
              TypeScript, Tailwind v4, local-first.
            </p>
            <button
              type="button"
              onClick={enterApp}
              className="mt-4 text-[13px] font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Open the app →
            </button>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} external />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 sm:flex-row">
          <p className="text-[12px] text-subtle">
            © {year} HabitFlow. Built as an open portfolio project.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[12px] text-subtle transition-colors hover:text-foreground"
          >
            <Code2 size={14} aria-hidden />
            View source
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="label mb-3">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[13px] text-subtle transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
