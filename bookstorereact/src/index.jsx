import { createRoot } from 'react-dom/client';
import App from './App';

// PUBLIC_INTERFACE
function bootstrap() {
  /** Mounts the React application to the DOM root element. */
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
}

bootstrap();
