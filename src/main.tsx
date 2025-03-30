import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { registerSW } from 'virtual:pwa-register';

// Register service worker using virtual PWA register
// const updateSW = registerSW({
//   onNeedRefresh() {
//     if (confirm('New content available. Reload?')) {
//       updateSW(true);
//     }
//   },
//   onOfflineReady() {
//     console.log('App ready to work offline');
//   },
// });

// // Register service worker manually
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch(error => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
