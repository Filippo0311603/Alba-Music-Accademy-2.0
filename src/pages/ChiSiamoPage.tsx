import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Heart, Award, Sparkles, ArrowRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';
import sectionUnaFamigliaImage from '../assets/pages/chi-siamo/sezione-una-famiglia-optimized.webp';
import heroChiSiamoImage from '../assets/pages/chi-siamo/hero-chisiamo-optimized.webp';

// Array per la sezione delle bolle fluttuanti (INTATTO)
const floatingRoles = [
  { name: 'Music Production', size: 'w-[180px] h-[180px]', pos: 'bottom-[5%] left-[2%]', delay: 0 },
  { name: 'Regia & Sceneggiatura', size: 'w-[220px] h-[220px]', pos: 'bottom-[15%] left-[18%]', delay: 1.2 },
  { name: 'Sound Engineer', size: 'w-[190px] h-[190px]', pos: 'bottom-[8%] left-[40%]', delay: 0.5 },
  { name: 'Cinematographer', size: 'w-[250px] h-[250px]', pos: 'bottom-[25%] left-[55%]', delay: 2.1 },
  { name: 'Masterclass', size: 'w-[160px] h-[160px]', pos: 'bottom-[5%] right-[25%]', delay: 0.8 },
  { name: 'Doppiaggio', size: 'w-[170px] h-[170px]', pos: 'bottom-[20%] right-[8%]', delay: 1.5 },
  { name: 'Film Editor', size: 'w-[150px] h-[150px]', pos: 'bottom-[-5%] left-[30%]', delay: 2.5 },
  { name: 'Vocal Coach', size: 'w-[140px] h-[140px]', pos: 'bottom-[-2%] right-[12%]', delay: 0.3 },
];

export default function ChiSiamoPage() {
  const containerRef = useRef(null);
  
  // Setup Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SeoMeta
        title="Chi Siamo | Alba Music Academy Ladispoli (RM)"
        description="Scopri la storia, il metodo e la visione di Alba Music Academy, scuola di musica e arti performative a Ladispoli (RM)."
        path="/chi-siamo"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Chi Siamo', path: '/chi-siamo' },
        ]}
      />
      <SiteLayout>
        
        {/* ========================================================
            HERO PARALLAX: OUTLINE TYPOGRAPHY
            ======================================================== */}
        <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden -mt-10 lg:-mt-20 bg-[#030303]">
          
          <motion.div style={{ y: yImage }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
            <img
              src={heroChiSiamoImage}
              alt="Il nostro team in studio"
              className="w-full h-full object-cover opacity-40 grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div 
            style={{ y: yText, opacity: opacityText }} 
            className="relative z-10 w-full pt-32 flex flex-col items-center text-center px-6"
          >
            
            
            <h1 className="text-[14vw] leading-none font-black uppercase tracking-tighter text-transparent stroke-text select-none drop-shadow-2xl mix-blend-screen" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
              La nostra
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tight text-brand-red -mt-6 md:-mt-10 lg:-mt-16 z-20">
              Storia
            </h2>
            
            <p className="mt-8 text-lg md:text-2xl text-white/50 max-w-2xl font-medium leading-relaxed">
              Da oltre 20 anni trasformiamo la passione in professione. Alba Music Academy è il luogo dove il talento incontra l'eccellenza.
            </p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-brand-red to-transparent z-20"
          />
        </section>

        <div className="bg-[#030303] relative z-20">
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32 md:space-y-48">
            
            {/* ========================================================
                TYPOGRAPHIC REVEAL: IL NOSTRO METODO
                ======================================================== */}
            <section className="relative">
              <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:col-span-5"
                >
                  <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight uppercase sticky top-40">
                    Il nostro <br />
                    <span className="text-brand-red">Metodo</span>
                  </h2>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-7 flex flex-col justify-center"
                >
                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-8 text-white">Imparare Facendo</h3>
                  <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium mb-8">
                    Valorizziamo il talento personale traducendolo in competenza professionale. Ogni percorso unisce conoscenze teoriche alla pura applicazione pratica.
                  </p>
                  <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium">
                    Qui gli studenti lavorano in gruppo — come in una vera produzione audiovisiva o in studio di registrazione — sviluppando progetti reali e imparando a gestire tempi, ruoli e strumenti. Perché fare è il modo migliore per imparare.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* ========================================================
                BUBBLE CONSTELLATION (Premium Glassmorphism)
                ======================================================== */}
            <section className="py-24 flex flex-col items-center justify-center relative min-h-[700px] lg:min-h-[800px] overflow-hidden rounded-[3rem] bg-[#0a0a0a] border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
              
              <div className="absolute top-16 z-20 text-center w-full px-6 flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="inline-flex items-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
                >
                  Alba Music & Film Academy
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  className="text-5xl md:text-7xl lg:text-[90px] font-black text-brand-red tracking-tighter max-w-5xl leading-[0.9] uppercase"
                >
                  Trasforma la passione in professione
                </motion.h2>
              </div>

              {/* Bolle per Desktop */}
              <div className="absolute inset-0 z-10 hidden md:block">
                {floatingRoles.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                    className={`absolute ${role.pos} ${role.size}`}
                  >
                    <motion.div
                      animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
                      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: role.delay }}
                      className="w-full h-full rounded-full bg-white/[0.02] backdrop-blur-2xl border border-white/10 flex items-center justify-center p-6 text-center hover:bg-brand-red hover:border-brand-red/50 hover:scale-110 transition-all duration-500 cursor-default group shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    >
                      <span className="text-white/70 group-hover:text-black font-black uppercase text-sm lg:text-base leading-none tracking-widest transition-colors duration-300">
                        {role.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Bolle per Mobile */}
              <div className="md:hidden relative z-10 flex flex-wrap justify-center gap-4 px-4 pt-72 pb-12">
                 {floatingRoles.slice(0, 6).map((role, i) => (
                    <div key={i} className="rounded-[2rem] bg-white/5 border border-white/10 px-6 py-4 flex items-center justify-center text-center shadow-xl backdrop-blur-md">
                      <span className="text-white/80 font-black uppercase text-[10px] tracking-widest">
                        {role.name}
                      </span>
                    </div>
                 ))}
              </div>
            </section>

            {/* ========================================================
                STICKY EDITORIAL SCROLL (La Visione) 
                ======================================================== */}
            <section className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* Testo Sticky a Sinistra */}
                <div className="lg:col-span-5 relative">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    className="lg:sticky lg:top-40"
                  >
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9] tracking-tight">
                      Più di una scuola, <br />
                      <span className="text-brand-red">Una Famiglia</span>
                    </h2>
                    <div className="w-24 h-1 bg-brand-red mb-10" />
                    <p className="text-white/50 text-xl leading-relaxed mb-6 font-medium">
                      Siamo nati con un'idea semplice: creare uno spazio dove i musicisti e i filmmaker potessero sentirsi a casa, sperimentare senza paura e imparare dai migliori professionisti. 
                    </p>
                    <p className="text-white/50 text-xl leading-relaxed font-medium">
                      Non crediamo nei metodi accademici freddi e distaccati. Crediamo nel sudore in sala prove, nei calli sulle dita, nelle notti passate a montare un video. Crediamo nella pratica pura.
                    </p>
                  </motion.div>
                </div>
                
                {/* Immagine a Destra */}
                <div className="lg:col-span-7">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    className="relative aspect-[3/4] lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                  >
                    <img
                      src={sectionUnaFamigliaImage}
                      alt="Visione Accademia"
                      className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </div>

              </div>
            </section>

            {/* ========================================================
                STICKY STACKING CARDS: I NOSTRI PILASTRI
                ======================================================== */}
            <section className="relative pb-32">
              <div className="mb-24 text-center">
                <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black uppercase leading-[0.85] tracking-tighter">
                  I Nostri <br className="hidden md:block"/>
                  <span className="text-brand-red">Pilastri</span>
                </h2>
              </div>

              {/* Contenitore per Stacking */}
              <div className="relative">
                
                {/* CARD 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                  style={{ top: '120px' }}
                  className="sticky w-full max-w-5xl mx-auto mb-10 md:mb-16"
                >
                  <div className="relative rounded-[3rem] bg-[#0a0a0a] border border-white/10 p-10 md:p-16 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] group hover:border-brand-red/30 transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 blur-[100px] rounded-full group-hover:bg-brand-red/10 transition-colors duration-700 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
                      <div className="w-24 h-24 shrink-0 rounded-[2rem] bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center border border-brand-red/20 group-hover:scale-110 transition-transform duration-500">
                        <Target className="w-12 h-12 text-brand-red" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-3">Valore 01</p>
                        <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 text-white tracking-tight">Metodo Pratico</h3>
                        <p className="text-xl text-white/50 font-medium leading-relaxed">
                          Abbandona i banchi scolastici. Meno teoria sui libri, più ore in studio. Impari facendo, sbagliando e correggendo direttamente sul campo con strumentazione reale.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CARD 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                  style={{ top: '160px' }}
                  className="sticky w-full max-w-5xl mx-auto mb-10 md:mb-16"
                >
                  <div className="relative rounded-[3rem] bg-[#0d0d0d] border border-white/10 p-10 md:p-16 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] group hover:border-brand-red/30 transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 blur-[100px] rounded-full group-hover:bg-brand-red/10 transition-colors duration-700 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
                      <div className="w-24 h-24 shrink-0 rounded-[2rem] bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center border border-brand-red/20 group-hover:scale-110 transition-transform duration-500">
                        <Heart className="w-12 h-12 text-brand-red" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-3">Valore 02</p>
                        <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 text-white tracking-tight">Passione Pura</h3>
                        <p className="text-xl text-white/50 font-medium leading-relaxed">
                          I nostri docenti non sono solo insegnanti, ma professionisti attivi nell'industria che trasmettono il fuoco sacro dell'arte ogni giorno.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CARD 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                  style={{ top: '200px' }}
                  className="sticky w-full max-w-5xl mx-auto"
                >
                  <div className="relative rounded-[3rem] bg-[#111] border border-white/10 p-10 md:p-16 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.9)] group hover:border-brand-red/30 transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 blur-[100px] rounded-full group-hover:bg-brand-red/10 transition-colors duration-700 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
                      <div className="w-24 h-24 shrink-0 rounded-[2rem] bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center border border-brand-red/20 group-hover:scale-110 transition-transform duration-500">
                        <Award className="w-12 h-12 text-brand-red" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-3">Valore 03</p>
                        <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 text-white tracking-tight">Eccellenza</h3>
                        <p className="text-xl text-white/50 font-medium leading-relaxed">
                          Strumentazione all'avanguardia e standard qualitativi altissimi per prepararti ad affrontare il vero mondo del lavoro ad armi pari.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </section>

          </div>
        </div>
      </SiteLayout>
    </>
  );
}