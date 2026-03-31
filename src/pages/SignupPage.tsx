import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/auth-context';
import SeoMeta from '../components/SeoMeta';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, error, clearError, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setLocalError('');
    setSuccessMessage('');
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

    if (!formData.phone.trim()) {
      setLocalError('Telefono è obbligatorio');
      return;
    }

    if (!/^\+?[0-9\s().-]{7,20}$/.test(formData.phone.trim())) {
      setLocalError('Numero di telefono non valido');
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
      const result = await signup(formData.email, formData.password, formData.fullName, formData.phone);
      setSuccessMessage(
        result.confirmationEmailSent
          ? 'Registrazione completata. Controlla la tua email e conferma l account prima di accedere.'
          : 'Registrazione completata, ma la mail di conferma non è stata inviata. Contatta la segreteria.',
      );
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      // Error already set in context
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050505] text-white selection:bg-brand-red selection:text-black">
      <SeoMeta
        title="Iscriviti | Alba Music Academy"
        description="Crea il tuo account Alba Music Academy per prenotare la sala prove e accedere ai servizi dedicati agli studenti."
        path="/signup"
        noIndex
      />

      {/* ========================================================
          LEFT SIDE: EDITORIAL BRANDING (Hidden on Mobile)
          ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black items-end justify-start p-16 xl:p-24">
        <img
          src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=2070"
          alt="Academy Vibe"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Gradiente per scurire la parte inferiore e far leggere il testo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          <h2 className="text-5xl xl:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6">
            Inizia il tuo <br />
            <span className="text-brand-red">Percorso.</span>
          </h2>
          <p className="text-lg xl:text-xl text-white/50 font-medium leading-relaxed">
            Unisciti all'Accademia. Crea il tuo account per accedere alle masterclass esclusive, prenotare le sale studio e costruire il tuo futuro.
          </p>
        </motion.div>
      </div>

      {/* ========================================================
          RIGHT SIDE: ULTRA-MINIMAL FUNCTIONAL FORM
          ======================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 py-12 relative overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:mx-0 py-12"
        >
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest mb-16 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Torna al sito
          </Link>

          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-3 text-white">
            Iscriviti
          </h1>
          <p className="text-white/40 text-base font-medium mb-12">
            Completa i campi sottostanti per creare il tuo profilo.
          </p>

          {/* IL FORM (Logica intatta, Stile Premium) */}
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* Input Nome Completo */}
            <div className="relative group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Es. Mario Rossi"
                className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                disabled={isLoading}
              />
            </div>

            {/* Input Email */}
            <div className="relative group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                Indirizzo Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="nome@esempio.com"
                className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                disabled={isLoading}
              />
            </div>

            {/* Input Telefono */}
            <div className="relative group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                Telefono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+39 333 1234567"
                className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                disabled={isLoading}
              />
            </div>

            {/* Grid per Password e Conferma Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Input Password */}
              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium tracking-widest placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                  disabled={isLoading}
                />
              </div>

              {/* Input Conferma Password */}
              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                  Conferma
                </label>
                <input
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium tracking-widest placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Messaggi di Errore Signup */}
            {(error || localError) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-l-2 border-brand-red px-3 py-2">
                <p className="text-brand-red font-bold text-sm uppercase tracking-wider">{error || localError}</p>
              </motion.div>
            )}

            {/* Messaggio di Successo Signup */}
            {successMessage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-l-2 border-green-500 px-3 py-2">
                <p className="text-green-400 font-bold text-sm uppercase tracking-wider">{successMessage}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-brand-red disabled:opacity-50 disabled:hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Elaborazione...
                  </>
                ) : (
                  'Crea il tuo Account'
                )}
              </button>
            </div>
          </form>

          {/* Link Login */}
          <div className="mt-16">
            <p className="text-white/40 text-sm font-medium">
              Fai già parte dell'Accademia?{' '}
              <Link to="/login" className="text-white hover:text-brand-red font-black uppercase tracking-widest ml-2 border-b border-transparent hover:border-brand-red transition-all">
                Accedi ora
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}