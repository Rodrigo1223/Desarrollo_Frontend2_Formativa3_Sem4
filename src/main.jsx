import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

async function prepararMock() {
  if (!import.meta.env.DEV) return;
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

prepararMock().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});