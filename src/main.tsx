import ReactDOM from 'react-dom/client';
import 'reset-css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import '@/assets/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
