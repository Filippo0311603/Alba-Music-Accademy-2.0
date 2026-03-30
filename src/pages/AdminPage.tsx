import React, {useEffect, useState} from 'react';
import {ArrowLeft, LogOut, MailCheck, ShieldCheck} from 'lucide-react';
import AdminBookingsPanel from '../components/AdminBookingsPanel';
import { adminAPI } from '../lib/api';

type AuthMeResponse = {
  authenticated: boolean;
  username?: string;
};

export default function AdminPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState('');
  const [authError, setAuthError] = useState('');

  const [smtpTo, setSmtpTo] = useState('');
  const [smtpMessage, setSmtpMessage] = useState('');
  const [smtpError, setSmtpError] = useState('');
  const [smtpLoading, setSmtpLoading] = useState(false);

  const checkSession = async () => {
    setCheckingAuth(true);
    try {
      const data = await adminAPI.getSession();
      if (data.authenticated) {
        setAuthenticated(true);
        setLoggedUser(data.username || 'admin');
      } else {
        setAuthenticated(false);
        setLoggedUser('');
      }
    } catch {
      setAuthenticated(false);
      setLoggedUser('');
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError('');

    try {
      const data = await adminAPI.login(username, password);
      setAuthenticated(true);
      setLoggedUser(data.username || username);
      setPassword('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Errore imprevisto';
      setAuthError(message);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
    } catch (error) {
      console.error('Logout error', error);
    }
    setAuthenticated(false);
    setLoggedUser('');
    setPassword('');
    setSmtpMessage('');
    setSmtpError('');
  };

  const sendSmtpTest = async () => {
    setSmtpError('');
    setSmtpMessage('');
    setSmtpLoading(true);

    try {
      const data = await adminAPI.testSmtp();
      setSmtpMessage(data.message || 'Email di test inviata');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Errore imprevisto';
      setSmtpError(message);
    } finally {
      setSmtpLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-6">
        <p className="text-white/60">Verifica sessione admin in corso...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md glass-card">
          <a href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-red text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Torna al sito
          </a>

          <h1 className="text-3xl font-black uppercase mb-2">Admin Login</h1>
          <p className="text-white/50 text-sm mb-8">Accesso riservato alla gestione prenotazioni.</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
                required
              />
            </div>

            {authError && <p className="text-red-300 text-sm">{authError}</p>}

            <button type="submit" className="w-full px-4 py-3 rounded-lg bg-brand-red text-black font-extrabold uppercase text-sm">
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-red text-sm mb-3">
              <ArrowLeft className="w-4 h-4" /> Torna al sito
            </a>
            <h1 className="text-3xl md:text-4xl font-black uppercase flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-brand-red" /> Admin Prenotazioni
            </h1>
            <p className="text-white/50 text-sm mt-2">Sessione attiva come {loggedUser}</p>
          </div>

          <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-white/20 hover:border-brand-red/50 text-white/80 text-sm font-bold inline-flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="glass-card mb-8">
          <h2 className="text-xl font-black uppercase mb-4 inline-flex items-center gap-2">
            <MailCheck className="w-5 h-5 text-brand-red" /> Test SMTP reale
          </h2>
          <p className="text-sm text-white/50 mb-4">
            Invia una mail di test per verificare immediatamente che la configurazione SMTP funzioni davvero.
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              value={smtpTo}
              onChange={(event) => setSmtpTo(event.target.value)}
              placeholder="Destinatario test (es. tuo@email.it)"
              className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
            <button
              onClick={sendSmtpTest}
              disabled={smtpLoading || !smtpTo.trim()}
              className="px-4 py-2 rounded-lg bg-brand-red text-black font-bold disabled:opacity-50"
            >
              {smtpLoading ? 'Invio...' : 'Invia test SMTP'}
            </button>
          </div>

          {smtpMessage && <p className="text-green-300 text-sm mt-3">{smtpMessage}</p>}
          {smtpError && <p className="text-red-300 text-sm mt-3">{smtpError}</p>}
        </div>

        <AdminBookingsPanel onSessionExpired={handleLogout} />
      </div>
    </div>
  );
}
