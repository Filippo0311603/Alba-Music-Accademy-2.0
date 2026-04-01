import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mic2, SlidersHorizontal, AudioLines, PhoneCall, Headphones, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';
import fotoAttrezzDj from '../assets/pages/hollywood-recording-studio/foto-attrezz-dj-optimized.webp';
import hollywodPostazione from '../assets/pages/hollywood-recording-studio/hollywod-postazione-optimized.webp';
import hollywoodPostaz from '../assets/pages/hollywood-recording-studio/hollywood-postaz-optimized.webp';
import hollywoodStudioOptimized from '../assets/pages/hollywood-recording-studio/hollywood-studio-optimized.webp';

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: 'Control Room Trattata',
    description: 'Ambiente calibrato millimetricamente per un ascolto chirurgico. Perfetta per mix e produzioni moderne con risposta in frequenza lineare.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Vocal Booth Dedicata',
    description: 'Cabina isolata "box-in-a-box" per recording vocale, podcast, doppiaggio e tracking di strumenti solisti senza rientri.',
    icon: Mic2,
  },
  {
    title: 'Outboard e Plug-in Pro',
    description: 'Catena ibrida analogico/digitale. Preamplificatori hardware per il calore analogico uniti alla flessibilità dell\'editing digitale avanzato.',
    icon: Cpu,
  },
  {
    title: 'Sound Engineer',
    description: 'Supporto tecnico continuo. Un nostro operatore gestirà il setup della sessione, il gain staging e garantirà un workflow fluido e rapido.',
    icon: Headphones,
  },
];

export default function HollywoodRecordingStudioPage() {
  const containerRef = useRef(null);
  
  // Setup degli scroll progress per i vari effetti di parallasse
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: galleryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallasse Hero
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Parallasse Galleria Fotografica (Scorrimento asincrono delle colonne)
  const yGalleryLeft = useTransform(galleryProgress, [0, 1], ['0%', '-20%']);
  const yGalleryRight = useTransform(galleryProgress, [0, 1], ['20%', '0%']);

  return (
    <>
      <SeoMeta
        title="Hollywood Recording Studio | Alba Music Academy"
        description="Pagina dedicata all'Hollywood Recording Studio dell'Accademia: dotazione tecnica, workflow e prenotazione via segreteria."
        path="/hollywood-recording-studio"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Hollywood Recording Studio', path: '/hollywood-recording-studio' },
        ]}
      />

      <SiteLayout>
        <div ref={containerRef} className="relative bg-[#030303]">
          
          {/* ========================================================
              HERO: OVERSIZED TYPOGRAPHY & EXTREME PARALLAX
              ======================================================== */}
          <section className="relative h-screen flex items-center overflow-hidden -mt-10 lg:-mt-20">
            
            {/* Sfondo Parallasse */}
            <motion.div style={{ y: yImage }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
              <img
                src="https://images.unsplash.com/photo-1621609764049-6f9185a0349b?auto=format&fit=crop&q=80&w=2500"
                alt="Hollywood Recording Studio"
                className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-brand-red mix-blend-overlay opacity-10" />
            </motion.div>

            {/* Testo in Parallasse inverso */}
            <motion.div 
              style={{ y: yText, opacity: opacityText }} 
              className="relative z-10 w-full pt-32 flex flex-col items-center text-center px-6"
            >
              
              
              {/* Outline Typography Style */}
              <h1 className="text-[12vw] leading-none font-black uppercase tracking-tighter text-transparent stroke-text select-none drop-shadow-2xl mix-blend-screen" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
                Hollywood
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white -mt-4 md:-mt-8 lg:-mt-12 z-20">
                Recording <span className="text-brand-red">Studio</span>
              </h2>
              
              <p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
                Il cuore produttivo dell'Accademia. Architettura acustica perfetta, strumentazione no-compromise e un workflow progettato per l'industria musicale.
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-brand-red to-transparent z-20"
            />
          </section>

          <div className="relative z-20">
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              
              {/* ========================================================
                  STICKY STACKING CARDS: L'ARSENALE TECNICO
                  ======================================================== */}
              <section className="relative pb-32">
                <div className="mb-20 text-center">
                  <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
                    L'Arsenale <br />
                    <span className="text-brand-red">Tecnico</span>
                  </h2>
                </div>

                <div className="relative">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      style={{ top: `calc(120px + ${index * 40}px)` }}
                      className="sticky w-full max-w-4xl mx-auto mb-10 md:mb-16"
                    >
                      <div className="relative rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-12 lg:p-16 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] group hover:border-brand-red/30 transition-colors duration-500">
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[100px] rounded-full group-hover:bg-brand-red/10 transition-colors duration-700 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center border border-brand-red/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-brand-red" />
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-3">Feature 0{index + 1}</p>
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 leading-none text-white tracking-tight">
                              {feature.title}
                            </h3>
                            <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ========================================================
                  INNOVATION: FLOATING GLASS PILLARS (Workflow)
                  ======================================================== */}
              <section className="py-24 relative z-30">
                <div className="mb-20 flex flex-col items-center">
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-brand-red to-transparent mb-8" />
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight text-center">
                    Il Nostro <br/> <span className="text-brand-red">Workflow</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pillar 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/5 p-8 md:p-10 min-h-[360px] md:min-h-[450px] flex flex-col justify-end transition-all duration-700 hover:border-brand-red/30 active:border-brand-red/30 hover:bg-[#0a0a0a] active:bg-[#0a0a0a]"
                  >
                    <div className="absolute top-4 right-4 text-[90px] md:text-[150px] font-black leading-none text-transparent stroke-text select-none group-hover:-translate-y-4 group-hover:translate-x-4 group-active:-translate-y-4 group-active:translate-x-4 transition-transform duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>
                      01
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black uppercase mb-4 text-white">Setup Rapido</h3>
                      <p className="text-white/50 text-lg font-medium leading-relaxed">
                        Registrazione, editing e bounce in un flusso lineare. Azzeriamo i tempi morti per permetterti di concentrarti esclusivamente sull'ispirazione.
                      </p>
                    </div>
                  </motion.div>

                  {/* Pillar 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/5 p-8 md:p-10 min-h-[360px] md:min-h-[450px] flex flex-col justify-end transition-all duration-700 hover:border-brand-red/30 active:border-brand-red/30 hover:bg-[#0a0a0a] active:bg-[#0a0a0a] lg:-translate-y-8"
                  >
                    <div className="absolute top-4 right-4 text-[90px] md:text-[150px] font-black leading-none text-transparent stroke-text select-none group-hover:-translate-y-4 group-hover:translate-x-4 group-active:-translate-y-4 group-active:translate-x-4 transition-transform duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>
                      02
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black uppercase mb-4 text-white">Standard Industry</h3>
                      <p className="text-white/50 text-lg font-medium leading-relaxed">
                        Catena audio ottimizzata per voci, strumenti acustici e produzioni urban/pop. Il risultato è un master con resa sonora competitiva sul mercato.
                      </p>
                    </div>
                  </motion.div>

                  {/* Pillar 3 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/5 p-8 md:p-10 min-h-[360px] md:min-h-[450px] flex flex-col justify-end transition-all duration-700 hover:border-brand-red/30 active:border-brand-red/30 hover:bg-[#0a0a0a] active:bg-[#0a0a0a] lg:-translate-y-16"
                  >
                    <div className="absolute top-4 right-4 text-[90px] md:text-[150px] font-black leading-none text-transparent stroke-text select-none group-hover:-translate-y-4 group-hover:translate-x-4 group-active:-translate-y-4 group-active:translate-x-4 transition-transform duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>
                      03
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black uppercase mb-4 text-white">Su Misura</h3>
                      <p className="text-white/50 text-lg font-medium leading-relaxed">
                        Nessun pacchetto standard. Studiamo le ore necessarie in base al tuo progetto: dal singolo provino vocale alla registrazione complessa di un disco.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* ========================================================
                  CINEMATIC STUDIO GALLERY (Scorrimento Asincrono)
                  ======================================================== */}
              <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="mb-12 md:mb-16 text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-white/20 select-none">
                    The <span className="text-brand-red/50">Gallery</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Colonna Sinistra - Si muove verso l'alto */}
                  <motion.div style={{ y: yGalleryLeft }} className="space-y-6">
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group">
                      <img 
                        src={hollywoodPostaz}
                        alt="Console analogica" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 transition-all duration-[2s]"
                      />
                    </div>
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
                      <img 
                        src={fotoAttrezzDj}
                        alt="Microfoni studio" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 transition-all duration-[2s]"
                      />
                    </div>
                  </motion.div>

                  {/* Colonna Destra - Si muove verso il basso (ritardo visuale) */}
                  <motion.div style={{ y: yGalleryRight }} className="space-y-6">
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
                      <img 
                        src={hollywodPostazione}
                        alt="Strumenti" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 transition-all duration-[2s]"
                      />
                    </div>
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group">
                      <img 
                        src={hollywoodStudioOptimized}
                        alt="Control Room" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 transition-all duration-[2s]"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* ========================================================
                  CTA GIGANTE: IMMERSIVE BOOKING
                  ======================================================== */}
              <section className="pt-16 md:pt-20 pb-10">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative rounded-[3rem] bg-[#0a0a0a] border border-white/10 p-10 md:p-16 lg:p-24 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-16">
                    
                    <div className="max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <PhoneCall className="w-3 h-3" /> Booking Diretto
                      </div>
                      <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6 md:mb-8">
                        Prenota la tua <br/> <span className="text-brand-red">Sessione.</span>
                      </h2>
                      <p className="text-white/50 text-base sm:text-lg md:text-2xl font-medium leading-relaxed">
                        La prenotazione dello studio va concordata direttamente con la segreteria. Analizzeremo il tuo progetto e assegneremo il sound engineer perfetto per le tue esigenze.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full xl:w-auto shrink-0">
                      <a
                        href="tel:+393701497361"
                        className="relative overflow-hidden w-full xl:w-auto px-10 py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-brand-red transition-colors duration-500 flex items-center justify-center gap-3 group/btn"
                      >
                        <PhoneCall className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" /> 
                        Chiama lo Studio
                      </a>
                      <a
                        href="mailto:albamusicacademy@gmail.com"
                        className="w-full xl:w-auto px-10 py-6 rounded-[2rem] border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:border-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        Richiedi Info via Email <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                  </div>
                </motion.div>
              </section>

            </div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}