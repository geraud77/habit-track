import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProvider } from "./context/toastContext.tsx";
import HabitProvider from "./context/habitProvider.tsx";
import { NavProvider } from "./context/navigationContext.tsx";
import { AppModeProvider } from "./context/appModeContext.tsx";
import { CommandPaletteProvider } from "./context/commandPaletteContext.tsx";
import { OnboardingProvider } from "./context/onboardingContext.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpeedInsights />
    <ThemeProvider>
      <ToastProvider>
        <HabitProvider>
          <AppModeProvider>
            <OnboardingProvider>
              <NavProvider>
                <CommandPaletteProvider>
                  <App />
                </CommandPaletteProvider>
              </NavProvider>
            </OnboardingProvider>
          </AppModeProvider>
        </HabitProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
