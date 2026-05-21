import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render-phase errors and prevents a full white screen.
 * Place as high in the tree as possible.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production, pipe this to your error monitoring service (e.g. Sentry).
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-rose-500/10 ring-1 ring-rose-500/20">
              <span className="text-xl">⚠</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[15px] font-semibold text-foreground">Something went wrong</h2>
              <p className="max-w-sm text-[13px] text-muted-foreground">
                {this.state.error.message}
              </p>
            </div>
            <button
              onClick={() => this.setState({ error: null })}
              className="rounded-lg bg-surface-raised px-4 py-2 text-[13px] font-medium text-foreground ring-1 ring-edge-strong transition-colors hover:bg-surface-hover"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
