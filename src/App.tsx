import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronDown, ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, User, LogOut, Users, Mic2, Menu, X, Sparkles, Loader } from 'lucide-react';
import academyLogo from './assets/logo/logo_accademia.png';
import heroHomepageImage from './assets/pages/home/hero-homepage.jpg';

import { AuthProvider, useAuth } from './lib/auth-context';
import BookingCalendar from './components/BookingCalendar';
import SeoMeta from './components/SeoMeta';

const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const BookingActionPage = React.lazy(() => import('./pages/BookingActionPage'));
const MusicDepartmentPage = React.lazy(() => import('./pages/MusicDepartmentPage'));
const CinemaDepartmentPage = React.lazy(() => import('./pages/CinemaDepartmentPage'));
const ChiSiamoPage = React.lazy(() => import('./pages/ChiSiamoPage'));
const LaSedePage = React.lazy(() => import('./pages/LaSedePage'));
const LeNostreSalePage = React.lazy(() => import('./pages/LeNostreSalePage'));
const HollywoodRecordingStudioPage = React.lazy(() => import('./pages/HollywoodRecordingStudioPage'));

// ============ HELPER COMPONENTS PER EFFETTI PREMIUM ============

const WordReveal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"]
  });
  const color = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.05)", "rgba(255,255,255,1)"]);
  
  return (
    <motion.span ref={ref} style={{ color }} className="relative inline-block mr-3 md:mr-4 mb-2 transition-colors duration-200">
      {children}
    </motion.span>
  );
};

type Teacher = {
  name: string;
  role: string;
  img: string;
};

type TeacherCardProps = {
  teacher: Teacher;
  index: number;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallasse sfalsato: le colonne pari salgono, le dispari scendono leggermente
  const y = useSpring(useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [50, -50] : [-50, 50]), { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className={`group relative rounded-[2.5rem] overflow-hidden aspect-[3/4] border border-white/5 bg-[#111] shadow-[0_0_40px_rgba(0,0,0,0.8)] ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
    >
      <img src={teacher.img} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" alt={teacher.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl lg:text-3xl font-black uppercase text-white mb-2 leading-none">{teacher.name}</h3>
        <p className="text-brand-red text-[10px] font-black uppercase tracking-[0.2em]">{teacher.role}</p>
      </div>
    </motion.div>
  );
};

// ============ MAIN HOME PAGE ============

function HomePage() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isTouchViewport, setIsTouchViewport] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileAcademyOpen, setIsMobileAcademyOpen] = React.useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = React.useState(false);
  const [isDesktopAcademyOpen, setIsDesktopAcademyOpen] = React.useState(false);
  const desktopAcademyDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Parallax Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], isTouchViewport ? ['0%', '14%'] : ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], isTouchViewport ? ['0%', '36px'] : ['0%', '100px']);
  const opacityText = useTransform(scrollYProgress, [0, 1], isTouchViewport ? [1, 0.18] : [1, 0]);

  const welcomeAnimatedWords = [
    "Alba", "Music", "Academy", "è", "una", "scuola", "di", "riferimento,",
    "apprezzata", "in", "Italia", "e", "all'estero", "da", "chi", "vuole",
    "fare", "Musica.", "Il", "nostro", "metodo", "si", "basa", "sulla",
    "pratica", "costante", "e", "sul", "confronto", "con", "i", "migliori",
    "professionisti", "del", "settore.",
  ];
  const welcomeTitleLineOneWords = ["Benvenuti", "in", "Accademia:"];
  const welcomeTitleLineTwoWords = ["l'identità,", "il", "metodo,", "la", "visione."];
  const navItems = [
    { label: 'Docenti', href: '/#docenti' },
    { label: 'Workshop', href: '/#docenti' },
    { label: 'Sala Prove', href: '/#booking' },
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
        setIsMobileAcademyOpen(false);
        setIsMobileCoursesOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px), (hover: none), (pointer: coarse)');
    const applyViewportMode = () => setIsTouchViewport(mediaQuery.matches);
    applyViewportMode();
    mediaQuery.addEventListener('change', applyViewportMode);
    return () => mediaQuery.removeEventListener('change', applyViewportMode);
  }, []);

  React.useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      if (
        isDesktopAcademyOpen &&
        desktopAcademyDropdownRef.current &&
        !desktopAcademyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDesktopAcademyOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, [isDesktopAcademyOpen]);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    setIsMobileAcademyOpen(false);
    setIsMobileCoursesOpen(false);
    setIsDesktopAcademyOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#030303] selection:bg-brand-red selection:text-black font-sans">
      <SeoMeta
        title="Alba Music Academy | Scuola di Musica a Ladispoli (RM)"
        description="Alba Music Academy a Ladispoli (RM): corsi di musica e cinema, workshop e prenotazione sala prove in Via delle Orchidee 13A."
        path="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'MusicSchool',
          name: 'Alba Music Academy',
          telephone: '+39 370 149 7361',
          email: 'albamusicacademy@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via delle Orchidee 13A',
            postalCode: '00055',
            addressLocality: 'Ladispoli',
            addressRegion: 'RM',
            addressCountry: 'IT',
          },
        }}
        breadcrumbs={[{ name: 'Home', path: '/' }]}
      />
      
      {/* ========================================================
          NAVIGATION ULTRA-GLASS
          ======================================================== */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100 bg-[#030303]/70 backdrop-blur-3xl border-b border-white/5' : 'opacity-0'}`} />
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10 transition-all duration-500 ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-32'}`}>
          <div className="flex items-center min-w-0">
            <a href="/" className="inline-flex items-center">
              <img
                src={academyLogo}
                alt="Logo Alba Music Academy"
                className={`w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-500 ${isScrolled ? 'h-10 md:h-12 max-w-[170px] md:max-w-[280px]' : 'h-12 md:h-20 max-w-[200px] md:max-w-[360px]'}`}
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
            <a href="/" className="hover:text-brand-red transition-colors">Home</a>
            <div className="relative" ref={desktopAcademyDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDesktopAcademyOpen((prev) => !prev)}
                className="hover:text-brand-red transition-colors flex items-center gap-1 uppercase tracking-[0.2em]"
                aria-expanded={isDesktopAcademyOpen}
                aria-haspopup="menu"
              >
                Accademia <ChevronDown className={`w-3 h-3 transition-transform ${isDesktopAcademyOpen ? 'rotate-180 text-brand-red' : ''}`} />
              </button>
              {isDesktopAcademyOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 min-w-[220px] rounded-[1.5rem] border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] p-3 transition-all duration-300 z-50">
                  <a href="/chi-siamo" onClick={() => setIsDesktopAcademyOpen(false)} className="block rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors">Chi Siamo</a>
                  <a href="/la-sede" onClick={() => setIsDesktopAcademyOpen(false)} className="block rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors">La Sede</a>
                  <a href="/hollywood-recording-studio" onClick={() => setIsDesktopAcademyOpen(false)} className="block rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors">Hollywood Studio</a>
                </div>
              )}
            </div>
            <a href="/le-nostre-sale" className="hover:text-brand-red transition-colors">Le Nostre Sale</a>
            <a href="/#docenti" className="hover:text-brand-red transition-colors">Docenti</a>
            <div className="relative group">
              <button className="hover:text-brand-red transition-colors flex items-center gap-1 uppercase tracking-[0.2em]">
                Corsi <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[240px] rounded-[1.5rem] border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-50">
                <a href="/corsi/musica" className="block rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors">Dipartimento Musica</a>
                <a href="/corsi/cinema" className="block rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors">Dipartimento Cinema</a>
              </div>
            </div>
            <a href="/#booking" className="hover:text-brand-red transition-colors">Sala Prove</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-red/50 text-white text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg"
                >
                  <User className="w-3.5 h-3.5" /> Profilo
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-full bg-brand-red text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(97,222,227,0.2)] flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-block px-4 py-2 text-white/70 text-[10px] font-black uppercase tracking-widest hover:text-brand-red transition-colors"
                >
                  Accedi
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-brand-red hover:shadow-[0_0_30px_rgba(97,222,227,0.4)] transition-all duration-300 shadow-2xl flex items-center gap-2"
                >
                   Iscriviti <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen((prev) => {
                if (prev) {
                  setIsMobileAcademyOpen(false);
                  setIsMobileCoursesOpen(false);
                }
                return !prev;
              });
            }}
            className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white hover:border-brand-red/50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-3xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-6 py-6 flex flex-col gap-3">
              <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-2xl text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/5 hover:text-brand-red transition-colors border border-white/5">Home</a>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-2">
                <button
                  type="button"
                  onClick={() => setIsMobileAcademyOpen((prev) => !prev)}
                  className="w-full px-3 py-3 rounded-xl text-white font-black uppercase tracking-widest text-[11px] hover:text-brand-red transition-colors flex items-center justify-between"
                >
                  <span>Accademia</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileAcademyOpen ? 'rotate-180 text-brand-red' : ''}`} />
                </button>
                {isMobileAcademyOpen && (
                  <div className="mt-2 pl-4 border-l border-brand-red/30 space-y-1 mb-2">
                    <a href="/chi-siamo" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-white/50 font-bold text-[10px] uppercase tracking-widest hover:text-brand-red">Chi Siamo</a>
                    <a href="/la-sede" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-white/50 font-bold text-[10px] uppercase tracking-widest hover:text-brand-red">La Sede</a>
                    <a href="/hollywood-recording-studio" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-white/50 font-bold text-[10px] uppercase tracking-widest hover:text-brand-red">Hollywood Studio</a>
                  </div>
                )}
              </div>

              <a href="/le-nostre-sale" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-2xl text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/5 hover:text-brand-red transition-colors border border-white/5">Le Nostre Sale</a>

              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-2xl text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/5 hover:text-brand-red transition-colors border border-white/5">
                  {item.label}
                </a>
              ))}

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-2">
                <button
                  type="button"
                  onClick={() => setIsMobileCoursesOpen((prev) => !prev)}
                  className="w-full px-3 py-3 rounded-xl text-white font-black uppercase tracking-widest text-[11px] hover:text-brand-red transition-colors flex items-center justify-between"
                >
                  <span>Corsi</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileCoursesOpen ? 'rotate-180 text-brand-red' : ''}`} />
                </button>
                {isMobileCoursesOpen && (
                  <div className="mt-2 pl-4 border-l border-brand-red/30 space-y-1 mb-2">
                    <a href="/corsi/musica" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-white/50 font-bold text-[10px] uppercase tracking-widest hover:text-brand-red">Dipartimento Musica</a>
                    <a href="/corsi/cinema" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-white/50 font-bold text-[10px] uppercase tracking-widest hover:text-brand-red">Dipartimento Cinema</a>
                  </div>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

              {user ? (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }} className="w-full py-4 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2">
                    <User className="w-4 h-4" /> Profilo
                  </button>
                  <button onClick={handleLogout} className="w-full py-4 rounded-2xl bg-brand-red text-black font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(97,222,227,0.2)]">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="w-full py-4 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest text-[11px]">
                    Accedi
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }} className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Iscriviti Ora
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ========================================================
          HERO SECTION: OVERSIZED TYPOGRAPHY & PARALLAX MASKING
          ======================================================== */}
      <section ref={heroRef} className="relative h-[100svh] lg:h-screen flex items-center overflow-hidden bg-[#030303] pt-28 sm:pt-24 md:pt-20">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
          <img 
            src={heroHomepageImage}
            alt="Music Studio" 
            className="w-full h-full object-cover opacity-50 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10 w-full"
        >
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl"
          >
            
            
            <h1 className="text-[2.35rem] sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.88] tracking-tighter text-white z-20 relative max-w-[15ch] sm:max-w-none">
              Formazione <br />
              d'eccellenza <br />
              per le <span className="text-brand-red">arti <br />
              dello spettacolo</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-5 text-[13px] sm:text-sm md:text-lg text-white/55 max-w-[28rem] md:max-w-2xl font-medium leading-relaxed"
            >
              Da oltre 20 anni formiamo i talenti del domani. Unisciti all'accademia e trasforma la tua passione nella tua professione.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 sm:mt-8 md:mt-10 flex flex-wrap gap-4 justify-start"
            >
              <button 
                onClick={() => navigate('/chi-siamo')}
                className="w-[7.75rem] h-[7.75rem] md:w-40 md:h-40 rounded-full bg-brand-red flex flex-col items-center justify-center gap-2 font-black uppercase tracking-widest text-black text-[9px] md:text-[10px] hover:scale-105 active:scale-105 transition-transform duration-500 group shadow-[0_0_40px_rgba(97,222,227,0.2)] hover:shadow-[0_0_80px_rgba(97,222,227,0.5)]"
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-500" />
                <span>Scopri di più</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 w-px h-8 md:h-16 bg-gradient-to-b from-brand-red/90 to-transparent z-20"
        />
      </section>

      {/* ========================================================
          WELCOME SECTION: SCROLL REVEAL TYPOGRAPHY
          ======================================================== */}
      <section id="accademia" className="py-24 md:py-40 bg-[#030303] relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center md:text-left max-w-6xl mx-auto">
            
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-[80px] font-black mb-12 md:mb-16 leading-[0.9] tracking-tight uppercase"
            >
              {welcomeTitleLineOneWords.map((word, index) => (
                <motion.span key={`l1-${index}`} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="inline-block mr-3 md:mr-5">
                  {word}
                </motion.span>
              ))}
              <br className="hidden md:block"/>
              <span className="text-brand-red">
                {welcomeTitleLineTwoWords.map((word, index) => (
                  <motion.span key={`l2-${index}`} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="inline-block mr-3 md:mr-5">
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h2>
            
            <div className="w-16 md:w-24 h-1 bg-brand-red mx-auto md:mx-0 mb-12 md:mb-24" />
            
            {/* Scroll Reveal Component in Action */}
            <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
              {welcomeAnimatedWords.map((word, index) => (
                <WordReveal key={`reveal-${index}`}>{word}</WordReveal>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          TEACHERS SECTION: ASYMMETRIC PARALLAX GALLERY
          ======================================================== */}
      <section id="docenti" className="py-24 md:py-32 bg-[#030303] relative border-t border-white/5 scroll-mt-28 md:scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl lg:text-[120px] font-black uppercase leading-none tracking-tighter text-white/[0.07] md:text-white/5 absolute -top-8 md:-top-20 left-0 select-none pointer-events-none">
                Masterclass
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
                <Users className="w-3.5 h-3.5" /> L'Eccellenza
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight relative">
                I nostri <br/><span className="text-brand-red">Docenti</span>
              </h2>
            </div>
            <p className="text-white/50 md:text-white/40 max-w-sm text-base md:text-lg font-medium leading-relaxed pb-2 md:pb-4">
              Impara la tecnica e i segreti del mestiere dai migliori professionisti del panorama musicale e cinematografico.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 h-auto md:h-[800px] items-center">
            {[
              { name: "Marco Rossi", role: "Chitarra Elettrica", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=800" },
              { name: "Elena Bianchi", role: "Canto Moderno", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
              { name: "Luca Verdi", role: "Batteria & Percussioni", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
              { name: "Sofia Neri", role: "Pianoforte Classico", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" },
            ].map((teacher, i) => (
              <TeacherCard key={i} teacher={teacher} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BOOKING SECTION: FLOATING MODULE
          ======================================================== */}
      <section id="booking" className="py-24 md:py-32 relative overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-red/10 border border-brand-red/30 flex items-center justify-center mb-8 transform rotate-12 shadow-[0_0_30px_rgba(97,222,227,0.2)]">
              <Mic2 className="w-8 h-8 text-brand-red -rotate-12" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-5 md:mb-6">
              Prenota la tua <br/><span className="text-brand-red">Sala Prove</span>
            </h2>
            <p className="text-white/50 md:text-white/40 max-w-xl text-base md:text-lg font-medium leading-relaxed">
              Gestisci il tuo tempo creativo. Il nostro sistema di booking sincronizzato ti permette di bloccare le sale in tempo reale.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[3rem] bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 p-4 sm:p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Sottile highlight superiore */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
            
            <BookingCalendar />
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          FOOTER: MASSIVE BRUTALIST
          ======================================================== */}
      <footer className="bg-[#030303] pt-40 pb-12 border-t border-white/5 relative overflow-hidden">      
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-brand-red/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-32">
            
            <div className="md:col-span-5 relative">
              <h4 className="text-[100px] md:text-[140px] font-black text-white/[0.02] absolute -mt-20 md:-mt-32 left-0 select-none pointer-events-none uppercase leading-none tracking-tighter">Music</h4>
              <div className="mb-12 relative z-10">
                <img
                  src={academyLogo}
                  alt="Logo Alba Music Academy"
                  className="w-auto h-16 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                />
              </div>
              <p className="text-white/40 text-xl font-medium max-w-md mb-12 leading-relaxed relative z-10">
                Coltiviamo il talento, definiamo lo stile, lanciamo carriere. Formazione d'eccellenza nel cuore del litorale romano.
              </p>
              <div className="flex gap-4 relative z-10">
                <a href="https://www.instagram.com/alba_music_academy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Alba Music Academy" className="w-14 h-14 rounded-[1.5rem] border border-white/10 bg-[#0a0a0a] flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-black transition-all duration-500 text-white/40 shadow-xl"><Instagram className="w-6 h-6" /></a>
                <a href="https://www.facebook.com/cechidicekomtrio/?locale=it_IT" target="_blank" rel="noopener noreferrer" aria-label="Facebook Alba Music Academy" className="w-14 h-14 rounded-[1.5rem] border border-white/10 bg-[#0a0a0a] flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-black transition-all duration-500 text-white/40 shadow-xl"><Facebook className="w-6 h-6" /></a>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-brand-red">Contatti Diretti</h4>
              <ul className="space-y-8 text-white/60 font-medium">
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-red shrink-0" /> 
                  <span className="text-lg">Via delle Orchidee 13A <br/> 00055 Ladispoli (RM)</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-brand-red shrink-0" /> 
                  <a href="tel:+393701497361" className="text-lg hover:text-white transition-colors">+39 370 149 7361</a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-brand-red shrink-0" /> 
                  <a href="mailto:albamusicacademy@gmail.com" className="text-lg hover:text-white transition-colors">albamusicacademy@gmail.com</a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-brand-red">Esplora</h4>
              <ul className="space-y-5 text-white/50 font-medium">
                <li><a href="/corsi/musica" className="text-lg hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-red transition-all duration-300" /> Corsi di Strumento</a></li>
                <li><a href="/#docenti" className="text-lg hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-red transition-all duration-300" /> Masterclass</a></li>
                <li><a href="/hollywood-recording-studio" className="text-lg hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-red transition-all duration-300" /> Recording Studio</a></li>
                <li><a href="#" className="text-lg hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-red transition-all duration-300" /> Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">
            <p>© 2026 Alba Music Academy.</p>        
            <p>Digital Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============ MAIN APP CONTAINER ============

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.replace('#', '');
    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const animationFrame = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [location.hash, location.pathname]);

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-center">
            <Loader className="w-12 h-12 text-brand-red mx-auto mb-8 animate-spin-slow" style={{ animationDuration: '3s' }} />
            <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-black">
              Inizializzazione Accademia
            </p>
          </motion.div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chi-siamo" element={<ChiSiamoPage />} />
        <Route path="/la-sede" element={<LaSedePage />} />
        <Route path="/hollywood-recording-studio" element={<HollywoodRecordingStudioPage />} />
        <Route path="/le-nostre-sale" element={<LeNostreSalePage />} />
        <Route path="/corsi/musica" element={<MusicDepartmentPage />} />
        <Route path="/corsi/cinema" element={<CinemaDepartmentPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/booking/confirm/:token" element={<BookingActionPage />} />
        <Route path="/booking/cancel/:token" element={<BookingActionPage />} />
      </Routes>
    </React.Suspense>
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