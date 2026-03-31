import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, error, clearError, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [localError, setLocalError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // Validation
    if (!formData.fullName.trim()) {
      setLocalError('Nome completo è obbligatorio');
      return;
    }

    if (!formData.email.trim()) {
      setLocalError('Email è obbligatoria');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError('Email non valida');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password deve avere almeno 6 caratteri');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setLocalError('Le password non corrispondono');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.fullName);
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

        <h1 className="text-3xl font-black uppercase mb-2">Crea Account</h1>
        <p className="text-white/50 text-sm mb-8">Accedi per gestire le tue prenotazioni e il tuo profilo.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Nome Completo</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Inserisci il tuo nome"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red transition-colors"
              disabled={isLoading}
            />
          </div>

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
              placeholder="Minimo 6 caratteri"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Conferma Password</label>
            <input
              type="password"
              value={formData.passwordConfirm}
              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
              placeholder="Ripeti la password"
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
            {isLoading ? 'Creazione in corso...' : 'Crea Account'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm text-center">
            Hai già un account?{' '}
            <Link to="/login" className="text-brand-red hover:underline font-bold">
              Accedi qui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
