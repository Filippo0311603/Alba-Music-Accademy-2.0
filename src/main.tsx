import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminPage from './pages/AdminPage.tsx';
import BookingActionPage from './pages/BookingActionPage.tsx';
import './index.css';

const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
const isBookingActionRoute = /^\/booking\/(confirm|cancel)\/[^/]+\/?$/i.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? <AdminPage /> : isBookingActionRoute ? <BookingActionPage /> : <App />}
  </StrictMode>,
);
