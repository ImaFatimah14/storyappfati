// CSS imports
import '../styles/styles.css';
import '../styles/leaflet.css';

import App from './pages/app';
import { subscribePush } from './utils/push';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});

window.addEventListener('load', () => {
  subscribePush();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/src/service-worker.js');
  }
});
