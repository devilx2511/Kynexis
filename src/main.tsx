import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { BrandProvider } from './context/BrandContext.tsx';
import { LiveDataProvider } from './context/LiveDataContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrandProvider>
        <LiveDataProvider>
          <App />
        </LiveDataProvider>
      </BrandProvider>
    </AuthProvider>
  </StrictMode>,
);
