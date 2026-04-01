import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Mic2, MonitorPlay, Users, Coffee, ArrowUpRight, Music, Film, Activity, HardDrive, Maximize2 } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';
import heroLaSede from '../assets/pages/la-sede/hero-lasede-optimized.webp';
import hollywoodStudio from '../assets/pages/la-sede/hollywood-studio-optimized.webp';
import fotoSalaPrincipale from '../assets/pages/la-sede/foto-salaprincipale-optimized.webp';

export default function LaSedePage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const googleMapsUrl = 'https://www.google.com/maps?q=Via+delle+Orchidee+13A,+Ladispoli,+RM';

  return (
    <>
      <SeoMeta
        title="La Sede | Alba Music Academy a Ladispoli (RM)"
        description="Visita la sede di Alba Music Academy in Via delle Orchidee 13A, Ladispoli (RM): spazi didattici, studio, sale prova e aree comuni."
        path="/la-sede"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'La Sede', path: '/la-sede' },
        ]}
      />
      <SiteLayout>
        
      {/* ========================================================
          HERO SECTION (Mantenuta come da tua richiesta)
          ======================================================== */}
      <section className="relative h-[100svh] flex items-center overflow-hidden -mt-20 md:-mt-24 bg-[#030303]">
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
        >
          <img
            src={heroLaSede}
            alt="La nostra sede"
            className="w-full h-full object-cover opacity-40 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
           
            
            <h1 className="text-[14vw] md:text-[11vw] lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              <span className="text-transparent stroke-text select-none drop-shadow-2xl" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
                I Nostri
              </span>
              <br />
              <span className="text-brand-red relative inline-block">
                Spazi
                <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                  className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-brand-red origin-left" 
                />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/50 max-w-xl font-medium leading-relaxed drop-shadow-lg">
              1200 metri quadri interamente dedicati all'arte, progettati con la massima attenzione all'acustica e all'ispirazione.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#030303] relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-32 space-y-56">

          {/* ========================================================
              SECTION 1: THE TECHNICAL HUB (Studio A&B)
              Design: Technical Module with Floating UI elements
              ======================================================== */}
          <section className="relative">
            <div className="absolute -top-40 right-0 pointer-events-none opacity-[0.03] select-none">
              <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-none">Acoustic</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                className="lg:col-span-7 relative rounded-[4rem] overflow-hidden group shadow-2xl border border-white/5"
              >
                <div className="absolute top-8 left-8 z-20 flex gap-2">
                  <div className="px-3 py-1 rounded-md bg-brand-red text-black text-[9px] font-black uppercase tracking-widest">Live Feed</div>
                  <div className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest">4K Cam 01</div>
                </div>
                <img
                  src={hollywoodStudio}
                  alt="Hollywood Recording Studio"
                  className="w-full aspect-[16/10] object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#030303] via-transparent to-transparent opacity-80" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="lg:col-span-5 space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-brand-red">
                    <Activity className="w-6 h-6 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Engineered for Excellence</span>
                  </div>
                  <h3 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">Hollywood Recording<br /><span className="text-white/20">Studio</span></h3>
                </div>
                
                <p className="text-white/40 text-xl font-medium leading-relaxed italic border-l-2 border-brand-red/30 pl-6">
                  "Il silenzio è il nostro strumento più prezioso. Lo abbiamo scolpito con regie gemelle Dolby Atmos e console SSL di ultima generazione."
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-red/30 transition-colors group">
                    <Maximize2 className="w-5 h-5 text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] uppercase font-black text-white/30 tracking-widest mb-1">Superficie</p>
                    <p className="text-2xl font-black text-white">85MQ</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-red/30 transition-colors group">
                    <HardDrive className="w-5 h-5 text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] uppercase font-black text-white/30 tracking-widest mb-1">Protocollo</p>
                    <p className="text-2xl font-black text-white">ATMOS</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ========================================================
              SECTION 2: ACOUSTIC ENGINEERING (Sale Prove)
              Design: Brutalist Stacking with Oversized Labels
              ======================================================== */}
          <section className="relative">
             <div className="flex flex-col lg:flex-row gap-20">
               <div className="lg:w-1/3 space-y-12 lg:sticky lg:top-40 h-fit">
                  <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white">
                    Sale <br />
                    <span className="text-brand-red">Prove</span>
                  </h2>
                  <p className="text-white/40 text-xl font-medium leading-relaxed">
                    Un complesso di 15 unità indipendenti. <br />
                    Isolamento <span className="text-white">box-in-a-box</span> per una purezza sonora senza compromessi.
                  </p>
                  <div className="flex flex-col gap-4">
                    {['Tama Starclassic', 'Marshall JCM', 'Yamaha DZR', 'Steinway & Sons'].map((gear, i) => (
                      <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-default">
                        <span className="text-[11px] font-black uppercase tracking-widest text-white/30 group-hover:text-brand-red transition-colors">{gear}</span>
                        <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-brand-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                    ))}
                  </div>
               </div>

               <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="rounded-[3rem] overflow-hidden aspect-[3/4] relative group border border-white/10"
                  >
                    <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" alt="Sala 1" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10">
                       <span className="text-5xl font-black text-white/10 uppercase tracking-tighter group-hover:text-brand-red transition-colors">Unit 01</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="rounded-[3rem] overflow-hidden aspect-[3/4] relative group md:mt-24 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  >
                    <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" alt="Sala 2" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10">
                       <span className="text-5xl font-black text-white/10 uppercase tracking-tighter group-hover:text-brand-red transition-colors">Unit 05</span>
                    </div>
                  </motion.div>
               </div>
             </div>
          </section>

          {/* ========================================================
              SECTION 3: SOCIAL DNA (Bento Architecture)
              Design: Glass Dashboard with inner glows
              ======================================================== */}
          <section className="relative">
            <div className="mb-24 flex justify-between items-end">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Social<br /><span className="text-brand-red text-4xl md:text-6xl">Atmosphere</span></h2>
              <div className="hidden md:block text-right">
                
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -10 }}
                className="md:col-span-2 relative h-[500px] rounded-[4rem] overflow-hidden border border-white/10 group shadow-2xl"
              >
                <img src={fotoSalaPrincipale} className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-40 group-hover:scale-105 transition-all duration-[2s]" alt="Auditorium" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                   <div className="mb-6 flex gap-2">
                      <Users className="w-10 h-10 text-brand-red" />
                      <div className="h-px w-20 bg-white/10 self-center" />
                   </div>
                   <h3 className="text-5xl font-black uppercase text-white mb-4">L'Auditorium</h3>
                   <p className="text-white/40 text-lg max-w-md font-medium leading-relaxed">Showcase e masterclass prendono vita in un ambiente da 150 posti con regia video dedicata.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="relative h-[500px] rounded-[4rem] bg-[#0a0a0a] border border-white/10 p-12 flex flex-col justify-between group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-brand-red opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
                <div className="space-y-6 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-brand-red/10 flex items-center justify-center border border-brand-red/20 shadow-[0_0_40px_rgba(97,222,227,0.1)]">
                    <Coffee className="w-10 h-10 text-brand-red" />
                  </div>
                  <h3 className="text-4xl font-black uppercase leading-tight">Creative<br />Lounge</h3>
                </div>
                <div className="space-y-6 relative z-10">
                  <p className="text-white/40 text-lg font-medium">Il networking è parte della didattica. Bar interno e Wi-Fi 6G per connettere idee e persone.</p>
                  <div className="flex gap-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-brand-red/30" />)}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ========================================================
              SECTION 4: GEOSPATIAL MODULE (Map)
              Design: Cyber-HUD Map with Neon Pin
              ======================================================== */}
          <section className="relative">
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="rounded-[4rem] bg-[#0a0a0a] border border-white/5 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row min-h-[700px]"
            >
              <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col justify-between relative z-10">
                 <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[1px] bg-brand-red" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red">Dove Siamo</span>
                    </div>
                    <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">Vieni a<br /><span className="text-white/10">Trovarci</span></h2>
                 </div>

                 <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <p className="text-[9px] uppercase font-black text-white/30 tracking-widest">Indirizzo</p>
                          <p className="text-xl font-bold text-white/90">Via delle Orchidee 13A<br />00055 Ladispoli (RM)</p>
                       </div>
                       <div className="space-y-4">
                          <p className="text-[9px] uppercase font-black text-white/30 tracking-widest">Accesso</p>
                          <ul className="text-white/40 font-bold space-y-1 text-xs">
                            <li>STAZIONE FS 500M</li>
                            <li>Aperti 24/7</li>
                          </ul>
                       </div>
                    </div>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-red transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 group"
                    >
                       Dove ci trovi <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                 </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-1/2 relative bg-[#111] block"
                aria-label="Apri la posizione su Google Maps"
              >
                 <img 
                   src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
                   className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 contrast-150"
                   alt="Map"
                 />
                 <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-[#0a0a0a] lg:to-transparent opacity-90" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group cursor-pointer">
                      <motion.div 
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0.1, 0.5] }} 
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -inset-12 bg-brand-red/20 rounded-full blur-3xl"
                      />
                      <div className="w-24 h-24 rounded-[2rem] bg-brand-red text-black flex items-center justify-center relative z-10 shadow-[0_0_60px_rgba(97,222,227,0.4)] rotate-12 group-hover:rotate-0 transition-all duration-500">
                        <MapPin className="w-10 h-10" />
                      </div>
                    </div>
                 </div>
                 
                 {/* Decorative HUD lines */}
                 <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[20px] border-[#0a0a0a] z-20" />
                 <div className="absolute top-10 right-10 text-[8px] font-black text-white/20 uppercase tracking-widest z-30">
                    Lat: 41.9538 / Lon: 12.0734
                 </div>
                </a>
            </motion.div>
          </section>

        </div>
      </div>
      </SiteLayout>
    </>
  );
}