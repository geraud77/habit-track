import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from './context/toastContext.tsx';
import HabitProvider from './context/habitProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <HabitProvider>
        <App />
      </HabitProvider>
    </ToastProvider>
  </StrictMode>,
);
