
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import './App.css';
import { loadStyles } from './styles/index.ts';
import { LanguageProvider } from './context/LanguageContext';
import { AdvancedThemeProvider } from './context/AdvancedThemeContext';
import { AuthProvider } from './features/auth/hooks/useAuth';
import { CartProvider } from './features/pos/hooks/useCart';
import { Toaster } from "@/components/ui/sonner";

// Load all styles
loadStyles();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdvancedThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                <App />
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </AdvancedThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
