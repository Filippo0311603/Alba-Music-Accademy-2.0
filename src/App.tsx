import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, Youtube, User, LogOut, Music, Users, BookOpen, Mic2 } from 'lucide-react';
import academyLogo from './assets/logo/logo_accademia.png';

import { AuthProvider, useAuth } from './lib/auth-context';
import BookingCalendar from './components/BookingCalendar';

// Pages
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import BookingActionPage from './pages/BookingActionPage';

// ============ MAIN HOME PAGE ============

function HomePage() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-brand-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <div className="flex items-center min-w-0">
            <a href="/" className="inline-flex items-center">
              <img
                src={academyLogo}
                alt="Logo Alba Music Academy"
                className={`w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-all duration-300 ${isScrolled ? 'h-8 md:h-9 max-w-[120px] md:max-w-[180px]' : 'h-9 md:h-11 max-w-[140px] md:max-w-[220px]'}`}
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="nav-link">Accademia <ChevronDown className="w-4 h-4" /></a>
            <a href="/" className="nav-link">Docenti</a>
            <a href="/" className="nav-link">Corsi <ChevronDown className="w-4 h-4" /></a>
            <a href="/" className="nav-link">Workshop <ChevronDown className="w-4 h-4" /></a>
            <a href="#booking" className="nav-link">Sala Prove</a>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-red/50 text-white/80 text-sm font-bold transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profilo
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-red text-sm py-2 px-5 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-block px-3 py-2 rounded-lg text-white/80 text-sm font-bold hover:text-brand-red transition-colors"
                >
                  Accedi
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-red text-sm py-2 px-5"
                >
                  <ArrowRight className="w-4 h-4" /> Iscriviti
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070" 
            alt="Music Studio" 
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 uppercase">
              Libera la tua <br />
              <span className="text-brand-red">musica</span> con noi
            </h1>
            <p className="text-xl text-white/60 max-w-xl mb-12">
              Da oltre 20 anni formiamo i talenti del domani. Unisciti alla nostra accademia e trasforma la tua passione in professione.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <button 
                onClick={() => navigate('/signup')}
                className="w-40 h-40 rounded-full bg-brand-red flex flex-col items-center justify-center gap-2 font-bold hover:scale-110 transition-transform group"
              >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <span>Scopri di più</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i+10}`} 
                      className="w-12 h-12 rounded-full border-2 border-dark-bg"
                      alt="Student"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold">+500 Studenti</p>
                  <p className="text-sm text-white/50">Soddisfatti in Italia</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-4">Prenota una Lezione</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Seleziona il giorno e l'orario che preferisci. Riceverai una email di conferma e potrai gestire la tua prenotazione dal tuo profilo.
            </p>
          </motion.div>
          <BookingCalendar />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, label: 'Supporto 24/7', desc: 'Assistenza sempre disponibile' },
              { icon: Mail, label: 'Email Automata', desc: 'Conferme e promemoria' },
              { icon: MapPin, label: 'Ubicazione', desc: 'Centro di Bologna' },
              { icon: Music, label: 'Strumenti', desc: 'Attrezzatura professionale' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center"
              >
                <item.icon className="w-12 h-12 text-brand-red mx-auto mb-4" />
                <h3 className="font-bold mb-2">{item.label}</h3>
                <p className="text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Link */}
      <div className="text-center py-8 border-t border-white/5">
        <a href="/admin" className="text-white/50 hover:text-brand-red text-sm transition-colors">
          Admin Panel
        </a>
      </div>
    </div>
  );
}

// ============ MAIN APP ============

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/booking/confirm/:token" element={<BookingActionPage />} />
      <Route path="/booking/cancel/:token" element={<BookingActionPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
