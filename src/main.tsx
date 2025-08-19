import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
// import store from './app/store'; 
import '../src/assets/styles/layoutStyles/sidebar.css';
import '../src/assets/styles/layoutStyles/navbar.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
);