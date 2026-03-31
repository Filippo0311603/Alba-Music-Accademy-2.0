import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, error, clearError, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [localError, setLocalError] = useState('');
  const emailConfirmed = searchParams.get('emailConfirmed');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email.trim()) {
      setLocalError('Email è obbligatoria');
      return;
    }

    if (!formData.password) {
      setLocalError('Password è obbligatoria');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      // Error already set in context
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md glass-card">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-red text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Torna al sito
        </Link>

        <h1 className="text-3xl font-black uppercase mb-2">Accedi</h1>
        <p className="text-white/50 text-sm mb-8">Inserisci le tue credenziali per accedere al tuo profilo.</p>

        {emailConfirmed === '1' && (
          <div className="rounded-lg bg-green-300/10 border border-green-300/40 px-3 py-2 mb-4">
            <p className="text-green-300 text-sm">Email confermata con successo. Ora puoi accedere.</p>
          </div>
        )}

        {emailConfirmed === '0' && (
          <div className="rounded-lg bg-red-300/10 border border-red-300/40 px-3 py-2 mb-4">
            <p className="text-red-300 text-sm">Link di conferma non valido o scaduto. Ripeti la registrazione.</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="tuo.email@example.com"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Inserisci la tua password"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red transition-colors"
              disabled={isLoading}
            />
          </div>

          {(error || localError) && (
            <div className="rounded-lg bg-red-300/10 border border-red-300/40 px-3 py-2">
              <p className="text-red-300 text-sm">{error || localError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-brand-red text-black font-extrabold uppercase text-sm hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm text-center">
            Non hai un account?{' '}
            <Link to="/signup" className="text-brand-red hover:underline font-bold">
              Crea account qui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
