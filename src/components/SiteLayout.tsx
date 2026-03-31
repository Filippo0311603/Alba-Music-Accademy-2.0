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
    setIsDesktopAcademyOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-red selection:text-white">
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
            
            {/* DROPDOWN ACCADEMIA */}
            <div className="relative" ref={desktopAcademyDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDesktopAcademyOpen((prev) => !prev)}
                className="nav-link"
                aria-expanded={isDesktopAcademyOpen}
                aria-haspopup="menu"
              >
                Accademia <ChevronDown className={`w-4 h-4 transition-transform ${isDesktopAcademyOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDesktopAcademyOpen && (
                <div className="absolute left-0 top-full mt-2 min-w-[200px] rounded-xl border border-white/10 bg-dark-bg/95 backdrop-blur-md shadow-xl p-2 transition-all duration-200 z-50">
                  <a
                    href="/chi-siamo"
                    onClick={() => setIsDesktopAcademyOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-brand-red transition-colors"
                  >
                    Chi Siamo
                  </a>
                  <a
                    href="/la-sede"
                    onClick={() => setIsDesktopAcademyOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-brand-red transition-colors"
                  >
                    La Sede
                  </a>
                </div>
              )}
            </div>

            <a href="/#docenti" className="nav-link">Docenti</a>
            
            {/* DROPDOWN CORSI */}
            <div className="relative group">
              <button className="nav-link">
                Corsi <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 min-w-[260px] rounded-xl border border-white/10 bg-dark-bg/95 backdrop-blur-md shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                <a href="/corsi/musica" className="block rounded-lg px-3 py-2 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-brand-red transition-colors">Dipartimento Musica</a>
                <a href="/corsi/cinema" className="block rounded-lg px-3 py-2 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-brand-red transition-colors">Dipartimento Cinema</a>
              </div>
            </div>
            
            <a href="/#docenti" className="nav-link">Workshop <ChevronDown className="w-4 h-4" /></a>
            <a href="/#booking" className="nav-link">Sala Prove</a>
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
                  setIsMobileAcademyOpen(false);
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

        {/* MENU MOBILE */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-dark-bg/95 backdrop-blur-md max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-6 py-4 flex flex-col gap-3">
              
              {/* ACCADEMIA GROUP MOBILE */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <button
                  type="button"
                  onClick={() => setIsMobileAcademyOpen((prev) => !prev)}
                  className="w-full px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors flex items-center justify-between"
                  aria-expanded={isMobileAcademyOpen}
                >
                  <span>Accademia</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileAcademyOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileAcademyOpen && (
                  <div className="mt-1 pl-2 border-l border-white/10">
                    <a
                      href="/chi-siamo"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileAcademyOpen(false);
                      }}
                      className="block px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                    >
                      Chi Siamo
                    </a>
                    <a
                      href="/la-sede"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileAcademyOpen(false);
                      }}
                      className="block px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                    >
                      La Sede
                    </a>
                  </div>
                )}
              </div>

              <a href="/#docenti" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors">Docenti</a>

              {/* CORSI GROUP MOBILE */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <p className="px-2 pb-1 text-[11px] uppercase tracking-wider text-white/45 font-bold">Corsi</p>
                <a href="/corsi/musica" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors">Dipartimento Musica</a>
                <a href="/corsi/cinema" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors">Dipartimento Cinema</a>
              </div>

              <a href="/#docenti" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors">Workshop</a>
              <a href="/#booking" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-white/85 font-bold text-sm hover:bg-white/5 hover:text-brand-red transition-colors">Sala Prove</a>

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

      <main className="pt-28 md:pt-36">{children}</main>

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
                La tua accademia di musica nel cuore della citta. Formazione professionale, sale prove e workshop con i migliori artisti.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Contatti</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-brand-red" /> Via delle Orchidee 13A - Ladispoli (RM)</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-red" /> +39 370 149 7361</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-red" /> albamusicacademy@gmail.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Link Rapidi</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><a href="/corsi/musica" className="hover:text-brand-red transition-colors">Dipartimento Musica</a></li>
                <li><a href="/corsi/cinema" className="hover:text-brand-red transition-colors">Dipartimento Cinema</a></li>
                <li><a href="/#booking" className="hover:text-brand-red transition-colors">Sala Prove</a></li>
                <li><a href="/admin" className="hover:text-brand-red transition-colors">Admin</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/20 font-medium uppercase tracking-widest">
            <p>© 2026 Alba Music Academy. Tutti i diritti riservati.</p>
            <p>Made for Music</p>
          </div>
        </div>
      </footer>
    </div>
  );
}