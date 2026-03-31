import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const AdminPage = lazy(() => import('./pages/AdminPage.tsx'));
const BookingActionPage = lazy(() => import('./pages/BookingActionPage.tsx'));

const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
const isBookingActionRoute = /^\/booking\/(confirm|cancel)\/[^/]+\/?$/i.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-6">
          <p className="text-white/60">Caricamento pagina...</p>
        </div>
      }
    >
      {isAdminRoute ? <AdminPage /> : isBookingActionRoute ? <BookingActionPage /> : <App />}
    </Suspense>
  </StrictMode>,
);
