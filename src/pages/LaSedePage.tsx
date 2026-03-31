import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Mic2, MonitorPlay, Users, Coffee, ArrowUpRight, Music, Film } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';

export default function LaSedePage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
      {/* Hero Section Parallax */}
      <section className="relative h-[80vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2070"
            alt="La nostra sede"
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/80 via-transparent to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs font-bold uppercase tracking-widest mb-8">
              <MapPin className="w-3.5 h-3.5 text-brand-red" /> HQ Ladispoli, Roma
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              I Nostri <br />
              <span className="text-brand-red relative inline-block">
                Spazi
                <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                  className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-brand-red origin-left" 
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-xl font-medium leading-relaxed">
              1200 metri quadri interamente dedicati all'arte, progettati con la massima attenzione all'acustica e all'ispirazione.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-32 space-y-40">

        {/* ========================================================
            SHOWCASE 1: LO STUDIO DI REGISTRAZIONE (Full Width + Overlap) 
            ======================================================== */}
        <section className="relative mt-20">
          {/* Background Typography */}
          <div className="absolute -top-16 lg:-top-32 left-0 right-0 overflow-hidden pointer-events-none z-0">
            <h2 className="text-[100px] md:text-[200px] lg:text-[250px] font-black uppercase text-white/[0.02] whitespace-nowrap leading-none select-none">
              Control Room
            </h2>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-end gap-8 lg:gap-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-8/12 relative rounded-[3rem] overflow-hidden aspect-[4/3] border border-white/10 group"
            >
              <img
                src="https://images.unsplash.com/photo-1621609764049-6f9185a0349b?auto=format&fit=crop&q=80&w=1600"
                alt="Studio di Registrazione"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-5/12 lg:-ml-24 lg:mb-12 rounded-[2.5rem] bg-[#111]/95 backdrop-blur-2xl border border-white/10 p-10 md:p-14 shadow-2xl relative z-20"
            >
              <MonitorPlay className="w-12 h-12 text-brand-red mb-8" />
              <h3 className="text-4xl font-black uppercase mb-4 leading-none">Studio Pro<br/>A&B</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Due regie gemelle acusticamente trattate (certificazione Dolby Atmos). Console SSL AWS 948, outboard Neve e monitoraggio PMC. Il cuore pulsante delle nostre produzioni.
              </p>
              <div className="flex gap-4 border-t border-white/10 pt-6">
                <div className="flex-1">
                  <span className="block text-3xl font-black text-white">2</span>
                  <span className="text-xs uppercase font-bold text-white/40 tracking-widest">Regie gemelle</span>
                </div>
                <div className="flex-1 border-l border-white/10 pl-4">
                  <span className="block text-3xl font-black text-white">Atmos</span>
                  <span className="text-xs uppercase font-bold text-white/40 tracking-widest">Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            SHOWCASE 2: LE SALE PROVE (Split Asimmetrico Verticale) 
            ======================================================== */}
        <section className="relative">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-5/12 flex flex-col justify-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10 border border-brand-red/30 mb-8">
                <Mic2 className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-[0.9] tracking-tight">
                Sale Prove <br />
                <span className="text-brand-red">Premium</span>
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                15 sale prova di diverse metrature (dai 20 ai 45 mq). Completamente isolate "box-in-a-box", pavimento flottante, climatizzazione dedicata e ricambio d'aria forzato.
              </p>
              
              <ul className="space-y-4">
                {['Batterie Tama Starclassic & DW', 'Amplificatori Marshall JCM & Mesa Boogie', 'Impianti Voce Yamaha DZR', 'Pianoforti Mezza Coda Yamaha'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-7/12 aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200"
                alt="Sala Prove"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </motion.div>

          </div>
        </section>

        {/* ========================================================
            SHOWCASE 3: BENTO GRID (Auditorium & Area Relax) 
            ======================================================== */}
        <section>
          <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight">
              Aree <span className="text-brand-red">Comuni</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* AUDITORIUM (Col-span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/10 aspect-[4/3] md:aspect-auto md:min-h-[500px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1600" 
                alt="Auditorium" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <Users className="w-10 h-10 text-white mb-6" />
                <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 text-white leading-none">L'Auditorium</h3>
                <p className="text-lg text-white/70 max-w-lg font-medium">
                  Spazio live da 150 posti a sedere. Palco modulare da 30mq, lighting system professionale e regia video multicamera. Il luogo dove nascono le masterclass e gli showcase.
                </p>
              </div>
            </motion.div>

            {/* AREA RELAX (Col-span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="md:col-span-4 group relative overflow-hidden rounded-[2.5rem] bg-[#141414] border border-white/10 p-8 md:p-10 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <Coffee className="w-10 h-10 text-brand-red mb-8" />
                <h3 className="text-3xl font-black uppercase mb-4 leading-none">Lounge<br/>& Co-working</h3>
              </div>
              <div className="relative z-10 mt-12">
                <p className="text-base text-white/60 font-medium">
                  Non solo aule. Un grande open space con bar interno, wifi ultra-veloce e postazioni comode dove incontrare altri studenti, far nascere band e scrivere sceneggiature.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================
            MAP & INFO: IMMERSIVE CARD 
            ======================================================== */}
        <section className="relative pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden bg-[#0d0d0d] border border-white/10 flex flex-col lg:flex-row relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Info Box */}
            <div className="w-full lg:w-5/12 p-10 md:p-16 flex flex-col justify-center relative z-10 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d] to-transparent">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider mb-8 w-fit">
                <MapPin className="w-3 h-3" /> Campus
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                Vieni a <br/>
                <span className="text-brand-red">Trovarci</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Indirizzo</p>
                  <p className="text-xl font-medium text-white/90">Via delle Orchidee 13A<br/>00055 Ladispoli (RM), IT</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Servizi Extra</p>
                  <ul className="text-white/70 font-medium space-y-1">
                    <li>• Parcheggio interno gratuito</li>
                    <li>• A 5 minuti dalla Stazione Centrale</li>
                    <li>• Accesso disabili 100%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mappa Immersiva */}
            <div className="w-full lg:w-7/12 aspect-square lg:aspect-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
                alt="Mappa Ladispoli" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0d0d0d] to-transparent opacity-80" />
              
              {/* Pin Animato */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  {/* Radar effect */}
                  <motion.div 
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 bg-brand-red rounded-full"
                  />
                  <div className="w-16 h-16 rounded-full bg-brand-red text-black flex items-center justify-center relative z-10 shadow-2xl group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-4 px-4 py-2 rounded-xl bg-black/80 backdrop-blur border border-white/20 text-white text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Apri in Maps <ArrowUpRight className="w-4 h-4 inline ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
      </SiteLayout>
    </>
  );
}