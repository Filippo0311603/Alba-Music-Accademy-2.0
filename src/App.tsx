import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, Youtube, User, LogOut, Users, Mic2, Menu, X } from 'lucide-react';
import academyLogo from './assets/logo/logo_accademia.png';

import { AuthProvider, useAuth } from './lib/auth-context';
import BookingCalendar from './components/BookingCalendar';

// Pages
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import BookingActionPage from './pages/BookingActionPage';
import MusicDepartmentPage from './pages/MusicDepartmentPage';
import CinemaDepartmentPage from './pages/CinemaDepartmentPage';

// ============ MAIN HOME PAGE ============

function HomePage() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const welcomeAnimatedWords = [
    "Alba",
    "Music",
    "Academy",
    "e",
    "una",
    "scuola",
    "di",
    "riferimento,",
    "apprezzata",
    "in",
    "Italia",
    "e",
    "all'estero",
    "da",
    "chi",
    "vuole",
    "fare",
    "Musica.",
    "Il",
    "nostro",
    "metodo",
    "si",
    "basa",
    "sulla",
    "pratica",
    "costante",
    "e",
    "sul",
    "confronto",
    "con",
    "i",
    "migliori",
    "professionisti",
    "del",
    "settore.",
  ];
  const welcomeTitleLineOneWords = ["Benvenuti", "in", "Accademia:"];
  const welcomeTitleLineTwoWords = ["l'identità,", "il", "metodo,", "la", "visione."];
  const navItems = [
    { label: 'Accademia', href: '#accademia' },
    { label: 'Docenti', href: '#docenti' },
    { label: 'Workshop', href: '#docenti' },
    { label: 'Sala Prove', href: '#booking' },
  ];

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMobileCoursesOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    setIsMobileCoursesOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-brand-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-24 md:h-28' : 'h-28 md:h-36'}`}>
          <div className="flex items-center min-w-0">
            <a href="/" className="inline-flex items-center">
              <img
                src={academyLogo}
                alt="Logo Alba Music Academy"
                className={`w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-all duration-300 ${isScrolled ? 'h-14 md:h-20 max-w-[220px] md:max-w-[360px]' : 'h-20 md:h-28 max-w-[300px] md:max-w-[520px]'}`}
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#accademia" className="nav-link">Accademia <ChevronDown className="w-4 h-4" /></a>
            <a href="#docenti" className="nav-link">Docenti</a>
            <div className="relative group">
              <button className="nav-link">
                Corsi <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 min-w-[260px] rounded-xl border border-white/10 bg-dark-bg/95 backdrop-blur-md shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                <a
                  href="/corsi/musica"
                  className="block rounded-lg px-3 py-2 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-brand-red transition-colors"
                >
                  Dipartimento Musica
                </a>
                <a
                  href="/corsi/cinema"
                  className="block rounded-lg px-3 py-2 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-brand-red transition-colors"
                >
                  Dipartimento Cinema
                </a>
              </div>
            </div>
            <a href="#docenti" className="nav-link">Workshop <ChevronDown className="w-4 h-4" /></a>
            <a href="#booking" className="nav-link">Sala Prove</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
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

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen((prev) => {
                if (prev) {
                  setIsMobileCoursesOpen(false);
                }
                return !prev;
              });
            }}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-white hover:border-brand-red/50 transition-colors"
            aria-label={isMobileMenuOpen ? 'Chiudi menu navigazione' : 'Apri menu navigazione'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-dark-bg/95 backdrop-blur-md">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <button
                  type="button"
                  onClick={() => setIsMobileCoursesOpen((prev) => !prev)}
                  className="w-full px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors flex items-center justify-between"
                  aria-expanded={isMobileCoursesOpen}
                >
                  <span>Corsi</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileCoursesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileCoursesOpen && (
                  <div className="mt-1 pl-2 border-l border-white/10">
                    <a
                      href="/corsi/musica"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileCoursesOpen(false);
                      }}
                      className="block px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                    >
                      Dipartimento Musica
                    </a>
                    <a
                      href="/corsi/cinema"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileCoursesOpen(false);
                      }}
                      className="block px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                    >
                      Dipartimento Cinema
                    </a>
                  </div>
                )}
              </div>

              <div className="h-px bg-white/10 my-1" />

              {user ? (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                  >
                    Profilo
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 rounded-lg bg-brand-red text-black font-bold text-sm hover:bg-brand-red/90 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                  >
                    Accedi
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-brand-red text-black font-bold text-sm hover:bg-brand-red/90 transition-colors"
                  >
                    Iscriviti
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-36 md:pt-36 overflow-hidden">
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

      {/* Welcome Section */}
      <section id="accademia" className="py-24 bg-dark-bg relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase"
            >
              {welcomeTitleLineOneWords.map((word, index) => (
                <motion.span
                  key={`title-line-1-${word}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
                  }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <span className="text-white/40 italic">
                {welcomeTitleLineTwoWords.map((word, index) => (
                  <motion.span
                    key={`title-line-2-${word}-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h2>
            <div className="w-20 h-1 bg-brand-red mx-auto mb-12" />
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-xl text-white/60 leading-relaxed"
            >
              {welcomeAnimatedWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.28,
                        delay: index * 0.04,
                      },
                    },
                  }}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="docenti" className="py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="w-3 h-3" /> Eccellenza
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase">I nostri <span className="text-brand-red">Docenti</span></h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm">
              Impara dai migliori professionisti del panorama musicale internazionale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Marco Rossi", role: "Chitarra Elettrica", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=800" },
              { name: "Elena Bianchi", role: "Canto Moderno", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
              { name: "Luca Verdi", role: "Batteria & Percussioni", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
              { name: "Sofia Neri", role: "Pianoforte Classico", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" },
            ].map((teacher, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={teacher.img}
                  alt={teacher.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>    
                  <p className="text-brand-red text-xs font-bold uppercase tracking-wider">{teacher.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-4">
                <Mic2 className="w-3 h-3" /> Prenotazioni
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase">Prenota la tua <span className="text-brand-red">Sala Prove</span></h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm">
              Scegli il giorno e l'ora che preferisci. Le nostre sale sono equipaggiate con strumentazione professionale di alta gamma.
            </p>
          </div>

          <BookingCalendar />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg pt-24 pb-12 border-t border-white/5">       
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">        
            <div className="col-span-1 md:col-span-2">
              <div className="mb-8">
                <img
                  src={academyLogo}
                  alt="Logo Alba Music Academy"
                  className="w-auto h-16 sm:h-20 md:h-24 max-w-[280px] sm:max-w-[340px] md:max-w-[420px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                />
              </div>
              <p className="text-white/40 max-w-sm mb-8">
                La tua accademia di musica nel cuore della città. Formazione professionale, sale prove e workshop con i migliori artisti.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Contatti</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-brand-red" /> Via delle Note, 12 - Bologna</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-red" /> +39 051 1234567</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-red" /> info@albamusic.it</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Link Rapidi</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><a href="#" className="hover:text-brand-red transition-colors">Corsi di Strumento</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Masterclass</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Lavora con noi</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/20 font-medium uppercase tracking-widest">
            <p>© 2026 Alba Music Academy. Tutti i diritti riservati.</p>        
            <p>Made with ❤️ for Music</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============ MAIN APP ============

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/corsi/musica" element={<MusicDepartmentPage />} />
      <Route path="/corsi/cinema" element={<CinemaDepartmentPage />} />
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
