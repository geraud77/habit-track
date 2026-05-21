import type { ReactNode } from 'react';

interface SettingsRowProps {
  label: string;
  description?: string;
  action: ReactNode;
}

export function SettingsRow({ label, description, action }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-surface px-4 py-3">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-foreground">{label}</div>
        {description && (
          <div className="mt-0.5 text-[11px] text-subtle">{description}</div>
        )}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export const SETTINGS_ROW_BTN =
  'flex items-center gap-1.5 rounded-lg border border-edge px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-surface';

// Re-export section for convenient settings imports
export { SettingsSection } from './SettingsSection';
