import { useGlobalKeyboard } from '@/hooks/useGlobalKeyboard';

/** Mounts app-wide keyboard listeners (must sit inside CommandPaletteProvider). */
export function GlobalKeyboardBridge() {
  useGlobalKeyboard();
  return null;
}
