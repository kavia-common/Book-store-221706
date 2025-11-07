import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

/**
 * PUBLIC_INTERFACE
 * Bootstrap the React app by mounting the root component into the DOM.
 * Uses React 18 concurrent root API.
 */
function bootstrap() {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App
        // Expose basic build-time info for verification
        envMode={import.meta.env.MODE}
        nodeEnv={import.meta.env.DEV ? 'development' : 'production'}
        viteVersion={import.meta.env.VITE_APP_VERSION || 'n/a'}
      />
    </React.StrictMode>
  );
}

bootstrap();
