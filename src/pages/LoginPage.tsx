import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/auth-context';
import SeoMeta from '../components/SeoMeta';

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
    <div className="min-h-screen w-full flex bg-[#050505] text-white selection:bg-brand-red selection:text-black">
      <SeoMeta
        title="Accedi | Alba Music Academy"
        description="Accedi al tuo profilo Alba Music Academy per gestire prenotazioni e dati personali."
        path="/login"
        noIndex
      />

      {/* ========================================================
          LEFT SIDE: EDITORIAL BRANDING (Hidden on Mobile)
          ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black items-end justify-start p-16 xl:p-24">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070"
          alt="Academy Vibe"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
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
            Bentornato <br />
            <span className="text-brand-red">A Casa.</span>
          </h2>
          <p className="text-lg xl:text-xl text-white/50 font-medium leading-relaxed">
            Accedi al tuo spazio personale. Prenota le sale prove, gestisci i tuoi corsi e continua il tuo percorso di crescita artistica.
          </p>
        </motion.div>
      </div>

      {/* ========================================================
          RIGHT SIDE: ULTRA-MINIMAL FUNCTIONAL FORM
          ======================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 py-12 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest mb-16 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Torna al sito
          </Link>

          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-3 text-white">
            Accedi
          </h1>
          <p className="text-white/40 text-base font-medium mb-12">
            Inserisci le tue credenziali per continuare.
          </p>

          {/* Messaggi di Conferma / Errore Sistema */}
          {emailConfirmed === '1' && (
            <div className="border-l-4 border-green-500 bg-green-500/10 px-4 py-3 mb-8">
              <p className="text-green-400 font-bold text-sm uppercase tracking-wide">Email confermata. Ora puoi accedere.</p>
            </div>
          )}

          {emailConfirmed === '0' && (
            <div className="border-l-4 border-red-500 bg-red-500/10 px-4 py-3 mb-8">
              <p className="text-red-400 font-bold text-sm uppercase tracking-wide">Link non valido. Ripeti la registrazione.</p>
            </div>
          )}

          {/* IL FORM (Logica intatta, Stile stravolto) */}
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* Input Email Stile "Material/Minimal" */}
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

            {/* Input Password Stile "Material/Minimal" */}
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

            {/* Messaggi di Errore Login */}
            {(error || localError) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-l-2 border-brand-red px-3 py-2">
                <p className="text-brand-red font-bold text-sm uppercase tracking-wider">{error || localError}</p>
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
                  'Entra nel Profilo'
                )}
              </button>
            </div>
          </form>

          {/* Link Sign Up */}
          <div className="mt-16">
            <p className="text-white/40 text-sm font-medium">
              Non hai un account?{' '}
              <Link to="/signup" className="text-white hover:text-brand-red font-black uppercase tracking-widest ml-2 border-b border-transparent hover:border-brand-red transition-all">
                Iscriviti ora
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}