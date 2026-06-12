import {StrictMode} from 'react';
// @ts-ignore: react-dom/client has no declaration file in this setup
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// @ts-ignore: allow importing CSS as a side effect without type declarations
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
