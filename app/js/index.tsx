import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

globalThis.onload = () => {
  const rootElement = globalThis.document.querySelector('#root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
  }
};
