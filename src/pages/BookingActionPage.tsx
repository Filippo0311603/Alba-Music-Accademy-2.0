import React, {useEffect, useMemo, useRef, useState} from 'react';
import academyLogo from '../assets/logo/logo_accademia.png';
import SeoMeta from '../components/SeoMeta';

type ActionType = 'confirm' | 'cancel';

type ActionResult = {
  title: string;
  message: string;
  type?: string;
};

type Status = 'loading' | 'success' | 'warning' | 'error';

function getActionFromPathname(pathname: string): {action: ActionType; token: string} | null {
  const match = pathname.match(/^\/booking\/(confirm|cancel)\/([^/]+)\/?$/i);
  if (!match) {
    return null;
  }

  const action = match[1].toLowerCase() as ActionType;
  const token = match[2];
  return {action, token};
}

export default function BookingActionPage() {
  const route = useMemo(() => getActionFromPathname(window.location.pathname), []);
  const hasProcessedActionRef = useRef(false);
  const [status, setStatus] = useState<Status>('loading');
  const [result, setResult] = useState<ActionResult>({
    title: 'Elaborazione in corso',
    message: 'Stiamo processando la tua richiesta.',
  });

  useEffect(() => {
    if (!route) {
      setStatus('error');
      setResult({
        title: 'Link non valido',
        message: 'Il link aperto non e valido o e incompleto.',
      });
      return;
    }

    // In React StrictMode (dev) effects can run twice. This guard prevents
    // duplicate action calls that would turn a fresh confirmation into "already confirmed".
    if (hasProcessedActionRef.current) {
      return;
    }
    hasProcessedActionRef.current = true;

    const endpoint = `/api/bookings/action/${route.action}/${route.token}`;

    fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        const title = data?.title || (route.action === 'confirm' ? 'Conferma prenotazione' : 'Disdetta prenotazione');
        const message = data?.message || 'Operazione completata.';

        if (!response.ok) {
          setStatus(response.status >= 500 ? 'error' : 'warning');
          setResult({title, message, type: data?.type});
          return;
        }

        const type = String(data?.type || '');
        const isConfirmAlreadyConfirmed = route.action === 'confirm' && type === 'already-confirmed';
        const warningTypes = new Set(['already-cancelled']);
        setStatus(isConfirmAlreadyConfirmed ? 'success' : warningTypes.has(type) ? 'warning' : 'success');
        setResult({title, message, type: data?.type});
      })
      .catch(() => {
        setStatus('error');
        setResult({
          title: 'Errore di connessione',
          message: 'Non siamo riusciti a completare la richiesta. Riprova tra qualche minuto.',
        });
      });
  }, [route]);

  const accentClass =
    status === 'success'
      ? 'text-brand-red border-brand-red/40 bg-brand-red/10'
      : status === 'warning'
        ? 'text-yellow-300 border-yellow-300/40 bg-yellow-300/10'
        : status === 'error'
          ? 'text-red-300 border-red-300/40 bg-red-300/10'
          : 'text-white/70 border-white/20 bg-white/5';

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-red selection:text-white flex items-center justify-center px-6 py-12">
      <SeoMeta
        title="Conferma Prenotazione | Alba Music Academy"
        description="Pagina operativa per conferma o disdetta prenotazione Alba Music Academy."
        path={window.location.pathname}
        noIndex
      />
      <div className="w-full max-w-2xl glass-card border-white/15">
        <div className="flex items-center justify-center mb-8">
          <img
            src={academyLogo}
            alt="Logo Alba Music Academy"
            className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div className={`rounded-2xl border px-6 py-6 ${accentClass}`}>
          <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">{result.title}</h1>
          <p className="text-base md:text-lg leading-relaxed text-white/85">{result.message}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="btn-red text-sm md:text-base px-6 py-3 rounded-full">
            Torna al sito
          </a>
          <a href="/#booking" className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:border-brand-red/50 hover:text-brand-red transition-colors text-sm md:text-base">
            Nuova prenotazione
          </a>
        </div>
      </div>
    </div>
  );
}
