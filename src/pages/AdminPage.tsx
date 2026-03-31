import React, { useEffect, useState } from 'react';
import { ArrowLeft, LogOut, ShieldCheck, Loader } from 'lucide-react';
import { motion } from 'motion/react';
import AdminBookingsPanel from '../components/AdminBookingsPanel';
import { adminAPI } from '../lib/api';
import SeoMeta from '../components/SeoMeta';

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
  };

  // ========================================================
  // STATE 1: LOADING SESSION
  // ========================================================
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
        <SeoMeta
          title="Admin | Alba Music Academy"
          description="Pannello amministrativo Alba Music Academy."
          path="/admin"
          noIndex
        />
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="text-center">
          <Loader className="w-8 h-8 animate-spin text-brand-red mx-auto mb-6" />
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">
            Inizializzazione Sistema
          </p>
        </motion.div>
      </div>
    );
  }

  // ========================================================
  // STATE 2: LOGIN FORM
  // ========================================================
  if (!authenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#050505] text-white selection:bg-brand-red selection:text-black overflow-hidden px-6 py-16">
        <SeoMeta
          title="Admin Login | Alba Music Academy"
          description="Accesso riservato amministrazione Alba Music Academy."
          path="/admin"
          noIndex
        />
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[2.5rem] bg-[#111]/80 backdrop-blur-2xl border border-white/10 p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top Border Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

            <a href="/" className="group inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest mb-12 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Torna al sito
            </a>

            <div className="mb-12">
              <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-brand-red" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-3 text-white">
                System<br />Admin
              </h1>
              <p className="text-white/40 text-sm font-medium">Accesso riservato. Identificati per procedere.</p>
            </div>

            <form className="space-y-10" onSubmit={handleLogin}>
              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                  Codice Operatore
                </label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin"
                  className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                  required
                />
              </div>

              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 transition-colors group-focus-within:text-brand-red">
                  Chiave d'Accesso
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-0 border-b-2 border-white/10 py-2 px-0 text-white text-lg font-medium tracking-widest placeholder-white/20 focus:ring-0 focus:border-brand-red focus:outline-none transition-colors rounded-none"
                  required
                />
              </div>

              {authError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-l-2 border-brand-red px-3 py-2">
                  <p className="text-brand-red font-bold text-sm uppercase tracking-wider">{authError}</p>
                </motion.div>
              )}

              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-colors duration-300">
                  Inizializza Sessione
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // ========================================================
  // STATE 3: DASHBOARD
  // ========================================================
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-red selection:text-black relative overflow-hidden">
      <SeoMeta
        title="Dashboard Admin | Alba Music Academy"
        description="Gestione prenotazioni e operazioni segreteria Alba Music Academy."
        path="/admin"
        noIndex
      />
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        
        {/* Header Control Center */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-10"
        >
          <div>
            <a href="/" className="group inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Torna al sito
            </a>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
              Control <br />
              <span className="text-brand-red">Center</span>
            </h1>
            
            <div className="flex items-center gap-3 mt-8">
              <ShieldCheck className="w-5 h-5 text-brand-red" />
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
                Operatore attivo: <span className="text-white">{loggedUser}</span>
              </p>
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className="group px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-brand-red/10 hover:border-brand-red/30 hover:text-brand-red text-white/80 text-xs font-black uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Termina Sessione
          </button>
        </motion.div>

        {/* Panel View */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
        >
          <AdminBookingsPanel onSessionExpired={handleLogout} />
        </motion.div>
      </div>
    </div>
  );
}