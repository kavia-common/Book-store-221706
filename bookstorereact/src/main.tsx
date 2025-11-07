import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// PUBLIC_INTERFACE
function bootstrap(): void {
  /** Bootstraps the React application by mounting <App /> to #root within a BrowserRouter. */
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container #root not found');
  }
  const root = createRoot(container);

  // Log a simple status message once after mount
  function StartupLogger() {
    useEffect(() => {
      // Align log with preview/dev port 3001
      const port = 3001;
      // eslint-disable-next-line no-console
      console.log(`Frontend started and mounted. Vite server expected on port ${port}`);
    }, []);
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }

  root.render(
    <React.StrictMode>
      <StartupLogger />
    </React.StrictMode>
  );
}

bootstrap();
