import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/Components/App';

import './index.scss';

const app: HTMLDivElement = document.getElementById('app') as HTMLDivElement;

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
