import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { useToast, type ToastVariant } from '@/context/toastContext';
import { cn } from '@/lib/utils';

// Toasts are intentionally always dark — they're notifications that must
// stand out regardless of the current light/dark theme.
const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; iconClass: string; borderClass: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
  },
  error: {
    icon: XCircle,
    iconClass: 'text-rose-400',
    borderClass: 'border-rose-500/30',
  },
  info: {
    icon: Info,
    iconClass: 'text-zinc-400',
    borderClass: 'border-zinc-700',
  },
};

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 pb-[env(safe-area-inset-bottom)] md:bottom-6 md:right-6"
    >
      {toasts.map((t) => {
        const { icon: Icon, iconClass, borderClass } = variantConfig[t.variant];
        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl',
              'bg-zinc-950 text-zinc-100 animate-toast-in',
              borderClass,
            )}
          >
            <Icon className={cn('size-4 shrink-0', iconClass)} aria-hidden />
            <span className="text-[13px] font-medium tracking-[-0.005em]">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="ml-1 rounded p-0.5 text-zinc-500 transition-colors hover:text-zinc-200"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
