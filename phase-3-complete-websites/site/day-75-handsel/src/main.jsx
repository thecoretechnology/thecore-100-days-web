import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const spaPath = sessionStorage.getItem('handsel:spa-path');
if (spaPath) {
  sessionStorage.removeItem('handsel:spa-path');
  history.replaceState(null, '', spaPath);
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
