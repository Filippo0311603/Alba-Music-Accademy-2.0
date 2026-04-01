import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, User, LogOut, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import academyLogo from '../assets/logo/logo_accademia.png';
import { useAuth } from '../lib/auth-context';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileAcademyOpen, setIsMobileAcademyOpen] = React.useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = React.useState(false);
  const [isDesktopAcademyOpen, setIsDesktopAcademyOpen] = React.useState(false);
  const desktopAcademyDropdownRef = React.useRef<HTMLDivElement | null>(null);

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

  const navItems = [
    { label: 'Docenti', href: '/#docenti' },
    { label: 'Workshop', href: '/#docenti' },
    { label: 'Sala Prove', href: '/#booking' },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-brand-red selection:text-black font-sans">
      
      {/* ========================================================
          NAVIGATION ULTRA-GLASS (Styling from App.tsx)
          ======================================================== */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100 bg-[#030303]/70 backdrop-blur-3xl border-b border-white/5' : 'opacity-0'}`} />
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10 transition-all duration-500 ${isScrolled ? 'h-16 md:h-20' : 'h-24 md:h-32'}`}>
          <div className="flex items-center min-w-0">
            <a href="/" className="inline-flex items-center">
              <img
                src={academyLogo}
                alt="Logo Alba Music Academy"
                className={`w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-500 ${isScrolled ? 'h-10 md:h-12 max-w-[170px] md:max-w-[280px]' : 'h-14 md:h-20 max-w-[230px] md:max-w-[360px]'}`}
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
                  <a href="/hollywood-recording-studio" onClick={() => setIsDesktopAcademyOpen(false)} className="block rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors">Hollywood Recording Studio</a>
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

      {/* Aggiunto pt-0 perché la navbar è trasparente.
          Rimuovi o regola il padding-top a seconda se vuoi 
          che il contenuto parta da sotto la navbar o dall'inizio pagina */}
      <main className="pt-0">{children}</main>

      {/* ========================================================
          FOOTER: MASSIVE BRUTALIST (Styling from App.tsx)
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
                <a href="#" className="w-14 h-14 rounded-[1.5rem] border border-white/10 bg-[#0a0a0a] flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-black transition-all duration-500 text-white/40 shadow-xl"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="w-14 h-14 rounded-[1.5rem] border border-white/10 bg-[#0a0a0a] flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-black transition-all duration-500 text-white/40 shadow-xl"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="w-14 h-14 rounded-[1.5rem] border border-white/10 bg-[#0a0a0a] flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-black transition-all duration-500 text-white/40 shadow-xl"><Youtube className="w-6 h-6" /></a>
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