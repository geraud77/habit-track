interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="label">{title}</span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
