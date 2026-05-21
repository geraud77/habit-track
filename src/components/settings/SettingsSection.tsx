import type { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div>
      <span className="label mb-2.5 block px-0.5">{title}</span>
      <div className="overflow-hidden rounded-lg border border-edge shadow-card divide-y divide-edge">
        {children}
      </div>
    </div>
  );
}
