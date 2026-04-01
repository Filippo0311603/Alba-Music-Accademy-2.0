import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Clapperboard, PhoneCall, Camera, Film, Video, Layers, Users, Mic2, ArrowRight, Star, Activity, Crosshair, ArrowUpRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';
import fotoCinemaImage from '../assets/pages/corsi-cinema/foto-cinema-optimized.webp';
import fotoCinema2Image from '../assets/pages/corsi-cinema/foto-cinema2-optimized.webp';
import fotoCinema3Image from '../assets/pages/corsi-cinema/foto-cinema3-optimized.webp';

const cinemaTracks = [
  {
    title: 'Regia e messa in scena',
    description: 'Analisi scena, visual storytelling e direzione del set con approccio professionale.',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cbc5c9?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Direzione della fotografia',
    description: 'Luce, ottiche, composizione e gestione del linguaggio visivo in ripresa.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1590634331662-65f57a075253?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Ripresa e gestione camera',
    description: 'Movimenti macchina, copertura scene e pianificazione operativa sul set.',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1527011045974-e1b1220a2e7c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Montaggio e ritmo narrativo',
    description: 'Struttura del racconto, continuità e costruzione del ritmo in post-produzione.',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1574717024220-3023fb271966?auto=format&fit=crop&q=80&w=1200'
  },
];

const mainCourses = [
  {
    title: 'Recitazione Cinematografica',
    subtitle: 'Il metodo davanti alla macchina da presa',
    description: 'Dimentica l\'impostazione teatrale. Impara le tecniche di acting per il grande schermo: micro-espressioni, continuità emotiva nei ciak, gestione dei mark e interazione con l\'obiettivo.',
    icon: Star,
    colSpan: 'md:col-span-8',
    image: fotoCinema2Image,
  },
  {
    title: 'Doppiaggio',
    subtitle: 'L\'arte della voce',
    description: 'Sincronismo labiale (sync), dizione, intenzione drammatica e caratterizzazione vocale. Esercitazioni pratiche al leggio in sale di registrazione professionali.',
    icon: Mic2,
    colSpan: 'md:col-span-4',
    bgClass: 'bg-[#050505] border-white/[0.05] hover:border-brand-red/50 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]'
  },
  {
    title: 'Regia',
    subtitle: 'La visione prende forma',
    description: 'Dalla sceneggiatura allo storyboard, dalla direzione degli attori alla scelta delle inquadrature. Guida il set e trasforma la tua idea in un\'opera audiovisiva completa.',
    icon: Clapperboard,
    colSpan: 'md:col-span-12',
    image: fotoCinema3Image,
    tall: true
  }
];

const cinemaPlan = [
  {
    title: 'IN AULA - Fondamenti teorici',
    description: 'Linguaggio audiovisivo, grammatica dell immagine e metodologia di progetto.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'SUL SET - Laboratorio',
    description: 'Esercitazioni pratiche su set reale con ruoli, tempi e workflow di troupe.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'MONTAGGIO - Finalizzazione',
    description: 'Costruzione narrativa del progetto, rifinitura tecnica e output finale.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'MATERIALI DIDATTICI',
    description: 'Dispense, schede operative e supporti didattici per consolidare l apprendimento.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
  },
];

const initiatives = [
  { title: 'Masterclass con professionisti', desc: 'Incontri diretti con registi, DOP e montatori ospiti di calibro internazionale.' },
  { title: 'Workflow di produzione', desc: 'Seminari approfonditi sulle pipeline operative usate oggi nell\'industria cinematografica.' },
  { title: 'Analisi guidate', desc: 'Visione e decostruzione tecnica di film, sequenze e scelte registiche iconiche.' },
  { title: 'Eventi e Premiere', desc: 'Accesso speciale a proiezioni, festival partner e iniziative riservate al dipartimento.' },
];

const cinemaTeachers = [
  { name: 'Guido Fiandra', role: 'Regista e sceneggiatore', img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
  { name: 'Mauro Marchetti', role: 'Direttore della fotografia', img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
  { name: 'Rocco Marra', role: 'Operatore e filmmaker', img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800" },
  { name: 'Marco Guelfi', role: 'Film editor', img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
];

export default function CinemaDepartmentPage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <>
      <SeoMeta
        title="Dipartimento Cinema | Alba Music Academy Ladispoli (RM)"
        description="Recitazione cinematografica, doppiaggio e regia nel Dipartimento Cinema di Alba Music Academy a Ladispoli (RM)."
        path="/corsi/cinema"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Dipartimento Cinema', path: '/corsi/cinema' },
        ]}
      />
      <SiteLayout>
      
      {/* ========================================================
          HERO: IMMERSIVE EXCLUSION BLEND & TECHNICAL GRID
          ======================================================== */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden -mt-20 md:-mt-24 bg-[#000000]">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2070"
            alt="Dipartimento Cinema"
            className="w-full h-full object-cover opacity-50 grayscale contrast-150 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000] opacity-90" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            
            
            <h1 className="text-[8vw] md:text-[6vw] font-black leading-[0.75] tracking-tighter uppercase text-white mix-blend-overlay drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              L'arte di emozionare
              <br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>
                attraverso l'obiettivo
              </span>
            </h1>
            
            <p className="mt-12 text-lg md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed drop-shadow-xl">
              Progetta, gira e monta come un professionista. Un percorso immersivo nei veri mestieri del set.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end border-t border-white/[0.05] pt-6 z-20 hidden md:flex">
           <div>
             <p className="text-[9px] uppercase tracking-[0.3em] font-black text-brand-red mb-1">Status</p>
             <p className="text-white text-sm font-bold tracking-widest">CASTING OPEN</p>
           </div>
           <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-px h-16 bg-brand-red" />
           <div className="text-right">
             <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30 mb-1">Focus</p>
             <p className="text-white text-sm font-bold tracking-widest">SET & POST-PROD</p>
           </div>
        </div>
      </section>

      <div className="bg-[#000000] relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-32 space-y-48 md:space-y-64">

          {/* ========================================================
              PREMIUM SECTION: I CORSI PRINCIPALI (Bento Grid Estrema) 
              ======================================================== */}
          <section className="relative">
            <div className="absolute -top-32 right-0 pointer-events-none opacity-[0.02] select-none">
              <h2 className="text-[25vw] font-black uppercase tracking-tighter leading-none">Focus</h2>
            </div>

            <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10 border-b border-white/[0.05] pb-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red mb-4">I Percorsi</p>
                <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                  Corsi <br />
                  <span className="text-white">Principali</span>
                </h2>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-white/40 max-w-md font-medium text-left lg:text-right block">
                Recitazione, doppiaggio, e padronanza del mezzo visivo. Scegli il tuo ruolo sul set.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
              {mainCourses.map((course, i) => (
                <motion.div 
                  key={course.title}
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`${course.colSpan} group relative overflow-hidden rounded-[2rem] border border-white/[0.05] ${course.bgClass || 'bg-[#050505]'} ${course.tall ? 'aspect-[5/4] md:aspect-[21/9] md:min-h-[500px]' : 'aspect-square md:aspect-auto md:min-h-[400px]'} flex flex-col justify-end p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(97,222,227,0.1)] active:shadow-[0_0_50px_rgba(97,222,227,0.1)] transition-all duration-700`}
                >
                  {course.image && (
                    <>
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-150 group-hover:grayscale-0 group-hover:scale-110 group-active:grayscale-0 group-active:scale-110 transition-all duration-[3s] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent transition-opacity duration-500" />
                    </>
                  )}
                  
                  <div className="absolute top-6 right-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[8px] font-black text-brand-red tracking-[0.4em] uppercase">Mod. {i+1}</span>
                  </div>

                  <div className={`relative z-10 ${!course.image && 'h-full flex flex-col justify-between'}`}>
                    {course.icon && (
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 border transition-all duration-500 ${course.image ? 'bg-[#000000]/50 backdrop-blur-xl border-white/10 text-white group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-black' : 'bg-transparent border-white/10 text-brand-red group-hover:scale-110'}`}>
                        <course.icon className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase mb-2 leading-[0.9] tracking-tighter text-white">
                        {course.title}
                      </h3>
                      <p className="text-brand-red font-black uppercase tracking-widest text-[9px] mb-6">
                        {course.subtitle}
                      </p>
                      <p className={`text-base font-medium leading-relaxed max-w-xl ${course.image ? 'text-white/70 md:text-white/50 md:group-hover:text-white/80' : 'text-white/70 md:text-white/40 md:group-hover:text-white/70'} transition-colors duration-500`}>
                        {course.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========================================================
              COMPETENZE TECNICHE: ASYMMETRIC MASONRY
              ======================================================== */}
          <section className="relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none z-0">
              <h2 className="text-[18vw] font-black uppercase text-white/[0.02] text-center whitespace-nowrap leading-none select-none tracking-tighter">
                SKILLS
              </h2>
            </div>

            <div className="relative z-10 mb-20 text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter">Competenze <br className="md:hidden"/><span className="text-brand-red">Tecniche</span></h2>
              <div className="w-12 h-1 bg-brand-red mb-6 mx-auto md:mx-0" />
              <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
                I laboratori orizzontali fondamentali per padroneggiare il mezzo tecnico: dalla luce al montaggio, per un controllo totale sull'immagine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {cinemaTracks.map((track, i) => (
                <motion.article 
                  key={track.title} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`group relative overflow-hidden rounded-[2rem] aspect-[4/3] lg:aspect-[16/9] border border-white/[0.03] bg-[#050505] shadow-[0_30px_80px_rgba(0,0,0,0.8)] ${i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-20'}`}
                >
                  <img
                    src={track.image}
                    alt={track.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 md:opacity-30 contrast-200 group-hover:grayscale-0 group-hover:opacity-60 group-active:grayscale-0 group-active:opacity-60 transition-all duration-[2s] ease-out group-hover:scale-110 group-active:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
                  
                  <div className="absolute top-6 left-6 text-6xl font-black text-white/[0.06] md:text-white/[0.03] group-hover:text-brand-red/10 group-active:text-brand-red/10 transition-colors duration-700 pointer-events-none select-none">
                    0{i + 1}
                  </div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <div className="w-8 h-px bg-brand-red mb-6 transform translate-x-0 md:-translate-x-full md:group-hover:translate-x-0 transition-transform duration-500" />
                    <track.icon className="w-8 h-8 text-brand-red mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-3xl font-black uppercase mb-3 text-white leading-[0.9] tracking-tighter">
                      {track.title}
                    </h3>
                    <p className="text-sm text-white/60 md:text-white/50 leading-relaxed font-medium max-w-sm opacity-100 md:opacity-0 transform translate-y-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out">
                      {track.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ========================================================
              PIANO DIDATTICO: EDITORIAL SCROLL
              ======================================================== */}
          <section>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-16 tracking-tighter text-center md:text-left">Piano <span className="text-brand-red">Didattico</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cinemaPlan.map((block, i) => (
                <motion.article 
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#050505] aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <img
                    src={block.image}
                    alt={block.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 md:opacity-30 grayscale contrast-125 group-hover:grayscale-0 group-hover:opacity-70 group-active:grayscale-0 group-active:opacity-70 transition-all duration-[2s] ease-out group-hover:scale-105 group-active:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
                  
                  <div className="absolute top-6 right-6 text-4xl font-black text-white/20 md:text-white/10 group-hover:text-brand-red/20 group-active:text-brand-red/20 transition-colors duration-500">
                    P.0{i + 1}
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-black uppercase mb-3 leading-none text-white tracking-tight">{block.title}</h3>
                    <div className="h-auto md:h-0 md:group-hover:h-auto overflow-hidden transition-all duration-500">
                      <p className="text-sm text-white/70 md:text-white/60 font-medium transform translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">{block.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ========================================================
              VANTAGGI ESCLUSIVI (Split Layout Orizzontale Dinamico) 
              ======================================================== */}
          <section className="relative py-12">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-6/12 relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.9)] group"
              >
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-brand-red text-black text-[9px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"/> REC
                  </div>
                </div>
                <img
                  src={fotoCinemaImage}
                  alt="Masterclass Cinema"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-[3s] group-hover:scale-105 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-90" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-6/12"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-red/20 bg-brand-red/5 text-brand-red text-[9px] font-black uppercase tracking-[0.4em] mb-6">
                  <Star className="w-3 h-3" /> Vip Access
                </div>
                <h2 className="text-6xl md:text-7xl font-black uppercase mb-8 leading-[0.85] tracking-tighter">
                  Vantaggi <br />
                  <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #61dee3' }}>Esclusivi</span>
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-12 font-medium">
                  Non ti offriamo solo lezioni, ma l'ingresso in un ecosistema produttivo reale. Gli studenti del Dipartimento Cinema sbloccano benefit pensati per vivere il set a 360 gradi.
                </p>

                <div className="flex flex-col">
                  {initiatives.map((item, i) => (
                    <div key={i} className="group border-t border-white/[0.05] py-6 first:border-t-0 flex items-start gap-6 cursor-default relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      <div className="mt-1 w-10 h-10 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-brand-red transition-colors duration-300 shrink-0 z-10 ml-2">
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-brand-red transition-colors" />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-2xl font-black uppercase mb-2 text-white/90 group-hover:text-brand-red transition-colors tracking-tight">{item.title}</h4>
                        <p className="text-white/40 text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </section>

          {/* ========================================================
              TEACHERS: MOVIE POSTER STYLE
              ======================================================== */}
          <section>
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.05] pb-8">
              <div>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                  Il Nostro <br />
                  <span className="text-brand-red">Team</span>
                </h2>
              </div>
              <div className="hidden md:block">
                 <button className="px-6 py-2 border-b border-white/20 text-[9px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-white hover:border-brand-red transition-all">Vedi Tutti i Docenti</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {cinemaTeachers.map((teacher, i) => (
                <motion.div
                  key={teacher.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative overflow-hidden aspect-[9/16] bg-[#050505] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/[0.05] hover:border-brand-red/30 transition-colors duration-500"
                >
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="w-full h-full object-cover grayscale contrast-150 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out mix-blend-luminosity group-hover:mix-blend-normal"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-transparent opacity-90" />
                  
                  <div className="absolute top-6 right-6 text-[8px] font-black text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">
                    DIR_{i}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col">
                    <h3 className="text-3xl font-black mb-1 uppercase text-white leading-none tracking-tighter">{teacher.name}</h3>    
                    <p className="text-brand-red text-[8px] font-black uppercase tracking-[0.3em]">{teacher.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========================================================
              CTA: CYBERPUNK TERMINAL
              ======================================================== */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 border-y border-brand-red/20 bg-[#050505] p-12 md:p-24 flex flex-col md:flex-row md:items-center md:justify-between gap-12 relative overflow-hidden shadow-[0_0_100px_rgba(97,222,227,0.05)]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-red/10 blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <Activity className="w-5 h-5 text-brand-red animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">System Override</span>
              </div>
              <h3 className="text-6xl md:text-8xl font-black uppercase mb-6 leading-[0.85] tracking-tighter text-white">Pronto a dare <br/><span className="text-brand-red drop-shadow-[0_0_20px_rgba(97,222,227,0.5)]">Azione?</span></h3>
              <p className="text-white/40 text-xl font-medium leading-relaxed border-l border-white/10 pl-6">
                Chiama ora la segreteria per disponibilità dei corsi, orientamento e dettagli del percorso formativo.
              </p>
            </div>

            <a
              href="tel:+393701497361"
              className="relative z-10 flex items-center justify-center gap-4 py-8 px-12 bg-white text-black hover:bg-brand-red hover:text-black transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(97,222,227,0.6)] group"
            >
               <span className="text-[12px] font-black uppercase tracking-[0.4em]">Chiama Ora</span>
               <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.section>

        </div>
      </div>
      </SiteLayout>
    </>
  );
}