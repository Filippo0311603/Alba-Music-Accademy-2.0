import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import academyLogo from './assets/logo/logo_accademia.png';
import { 
  Music, 
  Users, 
  BookOpen, 
  Mic2, 
  ChevronDown, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';
import BookingCalendar from './components/BookingCalendar';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-brand-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <div className="flex items-center min-w-0">
            <a href="#" className="inline-flex items-center">
              <img
                src={academyLogo}
                alt="Logo Alba Music Academy"
                className={`w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-all duration-300 ${isScrolled ? 'h-8 md:h-9 max-w-[120px] md:max-w-[180px]' : 'h-9 md:h-11 max-w-[140px] md:max-w-[220px]'}`}
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="nav-link">Accademia <ChevronDown className="w-4 h-4" /></a>
            <a href="#" className="nav-link">Docenti</a>
            <a href="#" className="nav-link">Corsi <ChevronDown className="w-4 h-4" /></a>
            <a href="#" className="nav-link">Workshop <ChevronDown className="w-4 h-4" /></a>
            <a href="#booking" className="nav-link">Sala Prove</a>
          </div>

          <button className="btn-red text-sm py-2 px-5">
            <ArrowRight className="w-4 h-4" /> Contatti
          </button>
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
              <button className="w-40 h-40 rounded-full bg-brand-red flex flex-col items-center justify-center gap-2 font-bold hover:scale-110 transition-transform group">
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
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold backdrop-blur-sm border-2 border-dark-bg">
                    +2k
                  </div>
                </div>
                <span className="text-sm text-white/40 font-medium max-w-[120px]">Studenti diplomati con successo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-dark-bg relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {[
              { label: "Anni di esperienza", value: "20", icon: Music },
              { label: "Docenti professionisti", value: "45", icon: Users },
              { label: "Studenti formati", value: "12.000", icon: BookOpen },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex flex-col items-start gap-4 group hover:border-brand-red/50 transition-colors"
              >
                <span className="text-5xl font-black text-white group-hover:text-brand-red transition-colors">{stat.value}</span>
                <span className="text-sm text-white/40 uppercase tracking-widest font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase">
              Benvenuti in Accademia: <br />
              <span className="text-white/40 italic">l'identità, il metodo, la visione.</span>
            </h2>
            <div className="w-20 h-1 bg-brand-red mx-auto mb-12" />
            <p className="text-xl text-white/60 leading-relaxed">
              Alba Music Academy è una scuola di riferimento, apprezzata in Italia e all'estero da chi vuole fare Musica. Il nostro metodo si basa sulla pratica costante e sul confronto con i migliori professionisti del settore.
            </p>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-24 bg-dark-bg">
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
              <div className="flex items-center mb-8 min-w-0">
                <img
                  src={academyLogo}
                  alt="Logo Alba Music Academy"
                  className="h-14 md:h-16 w-auto max-w-[240px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
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
