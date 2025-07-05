
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { loadStyles } from './styles/index.ts'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AdvancedThemeProvider } from './context/AdvancedThemeContext.tsx'
import { AuthProvider } from './features/auth/hooks/useAuth.tsx'
import { CartProvider } from './features/pos/hooks/useCart.tsx'

// Load all styles
loadStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdvancedThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </AdvancedThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
