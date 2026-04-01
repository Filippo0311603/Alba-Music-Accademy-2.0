import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Music2, PhoneCall, Piano, MicVocal, Guitar, Drum, AudioLines, CalendarClock, Users, Star, ArrowRight, Sparkles, ArrowUpRight, Activity, Crosshair } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';
import cantoImage from '../assets/pages/corsi-musica/canto-optimized.webp';
import pianoforteClassicoImage from '../assets/pages/corsi-musica/pianoforte-classico-optimized.webp';
import pianoforteModernoImage from '../assets/pages/corsi-musica/pianoforte-moderno-optimized.webp';
import primoPassoImage from '../assets/pages/corsi-musica/primo-passo-optimized.webp';
import sassofonoImage from '../assets/pages/corsi-musica/sassofono-optimized.webp';
import batteriaImage from '../assets/pages/corsi-musica/batteria-optimized.webp';

const musicCourses = [
  {
    title: 'Pianoforte Moderno',
    description: 'Armonia moderna, accompagnamento, timing e repertorio live con approccio operativo.',
    icon: Piano,
    colSpan: 'md:col-span-8',
    image: pianoforteModernoImage,
  },
  {
    title: 'Pianoforte Classico',
    description: 'Tecnica, lettura, interpretazione e sviluppo del fraseggio sul repertorio classico.',
    icon: Piano,
    colSpan: 'md:col-span-4',
    image: pianoforteClassicoImage,
    bgClass: 'bg-[#050505] border-white/[0.05] hover:border-brand-red/50 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]',
  },
  {
    title: 'Canto Pop',
    description: 'Respirazione, sostegno, timbro, controllo e presenza scenica su brani contemporanei.',
    icon: MicVocal,
    colSpan: 'md:col-span-4',
    image: cantoImage,
    bgClass: 'bg-gradient-to-br from-[#0a0a0a] to-[#000000] border-white/[0.05] hover:border-brand-red/50',
  },
  {
    title: 'Chitarra',
    description: 'Dal livello base all avanzato: tecnica, stile, groove e costruzione del proprio suono.',
    icon: Guitar,
    colSpan: 'md:col-span-8',
    image: 'https://images.unsplash.com/photo-1511335513653-ce875f1c750e?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'Sassofono Jazz',
    description: 'Improvvisazione, linguaggio jazz e costruzione del fraseggio su progressioni reali.',
    icon: AudioLines,
    colSpan: 'md:col-span-6',
    image: sassofonoImage,
  },
  {
    title: 'Batteria',
    description: 'Coordinazione, precisione ritmica e dinamiche per studio, sala prove e palco.',
    icon: Drum,
    colSpan: 'md:col-span-6',
    image: batteriaImage,
  },
];

const trainingPlan = [
  {
    title: 'IN AULA - Lezioni',
    description: 'Tecnica, linguaggio musicale, armonia e analisi del repertorio con metodo progressivo.',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'IN SALA - Laboratorio',
    description: 'Applicazione diretta su brani e setup reali, con confronto costante con i docenti.',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'IL PALCO - Performance',
    description: 'Costruzione di un repertorio completo e preparazione alla performance finale.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'LO STUDIO - Materiali',
    description: 'Dispense, esercizi e materiali di studio selezionati per consolidare il lavoro in aula.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200',
  },
];

const teachers = [
  { name: 'Marco Rossi', role: 'Pianista e arrangiatore', img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=800" },
  { name: 'Elena Bianchi', role: 'Vocal coach e performer', img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
  { name: 'Luca Verdi', role: 'Drummer e docente di ritmo', img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
  { name: 'Sofia Neri', role: 'Pianista classica e concertista', img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" },
];

export default function MusicDepartmentPage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <>
      <SeoMeta
        title="Dipartimento Musica | Alba Music Academy Ladispoli (RM)"
        description="Corsi di pianoforte, canto, chitarra, sassofono e batteria nel Dipartimento Musica di Alba Music Academy a Ladispoli (RM)."
        path="/corsi/musica"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Dipartimento Musica', path: '/corsi/musica' },
        ]}
      />
      <SiteLayout>
      
      {/* ========================================================
          HERO: IMMERSIVE EXCLUSION BLEND & TECHNICAL GRID
          ======================================================== */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden -mt-20 md:-mt-24 bg-[#000000]">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=2070"
            alt="Dipartimento Musica"
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
            
            
            <h1 className="text-[14vw] md:text-[12vw] font-black leading-[0.75] tracking-tighter uppercase text-white mix-blend-overlay drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              Vivi La
              <br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>
                Tua Musica
              </span>
            </h1>
            
            <p className="mt-12 text-lg md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed drop-shadow-xl">
              Un percorso che unisce tecnica rigorosa, ingegneria del suono e l'adrenalina pura del palcoscenico.
            </p>
          </motion.div>
        </div>

        {/* Cyberpunk Floating Stats */}
        <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end border-t border-white/[0.05] pt-6 z-20 hidden md:flex">
           <div>
             <p className="text-[9px] uppercase tracking-[0.3em] font-black text-brand-red mb-1">Status</p>
             <p className="text-white text-sm font-bold tracking-widest">ENROLLMENT OPEN</p>
           </div>
           <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-px h-16 bg-brand-red" />
           <div className="text-right">
             <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30 mb-1">Focus</p>
             <p className="text-white text-sm font-bold tracking-widest">100% LIVE READY</p>
           </div>
        </div>
      </section>

      <div className="bg-[#000000] relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-32 space-y-48 md:space-y-64">
          
          {/* ========================================================
              ASSESSMENT SECTION: OVERLAPPING GLASS ARCHITECTURE (CORRETTA)
              ======================================================== */}
          <section className="relative">
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none z-0">
              <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-none">Step.01</h2>
            </div>

            {/* MODIFICA QUI: Da grid a flexbox controllata per evitare lo "sbrodolamento" */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-7/12 relative aspect-video md:aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/[0.05] shadow-[0_0_100px_rgba(0,0,0,1)] group"
              >
                
                <img
                  src={primoPassoImage}
                  alt="Lezione di musica"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/40 to-transparent opacity-90" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-5/12 lg:-ml-16 xl:-ml-24 relative z-20 bg-[#050505]/80 backdrop-blur-3xl p-10 md:p-14 rounded-[2rem] border border-white/[0.05] shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:border-brand-red/30 transition-colors duration-500"
              >
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-[0.8] tracking-tighter">
                  Il Primo <br />
                  <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px #61dee3' }}>Passo</span>
                </h2>
                <div className="w-12 h-1 bg-brand-red mb-8" />
                <p className="text-white/50 text-lg leading-relaxed mb-10 font-medium">
                  Ogni studente parte da una valutazione iniziale rigorosa. Tecnica, repertorio e direzione artistica vengono calibrati sul livello reale. Niente teorie astratte, solo pratica mirata.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-brand-red flex items-center justify-center shrink-0">
                    <Crosshair className="w-4 h-4 text-brand-red" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Focus Sul Talento</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ========================================================
              COURSES BENTO: HIGH-CONTRAST NEON GRIDS
              ======================================================== */}
          <section className="relative">
            <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10 border-b border-white/[0.05] pb-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red mb-4">I Percorsi</p>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                  Cosa <br />
                  <span className="text-white">Impari</span>
                </h2>
              </div>
              <p className="text-lg text-white/40 max-w-md font-medium text-right hidden lg:block">
                Tecnica strumentale estrema, sound design e presenza scenica. Scegli la tua arma.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
              {musicCourses.map((course, i) => (
                <motion.div 
                  key={course.title}
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`${course.colSpan} group relative overflow-hidden rounded-[2rem] border border-white/[0.05] ${course.bgClass || 'bg-[#050505]'} ${course.image ? 'aspect-[4/3] md:aspect-auto md:min-h-[450px]' : 'aspect-square md:aspect-auto md:min-h-[300px]'} flex flex-col justify-end p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(97,222,227,0.1)] transition-all duration-700`}
                >
                  {course.image && (
                    <>
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-150 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s] ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent transition-opacity duration-500" />
                    </>
                  )}
                  
                  {/* Dettagli tecnici in alto a destra */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[8px] font-black text-brand-red tracking-[0.4em] uppercase">Mod. {i+1}</span>
                  </div>

                  <div className={`relative z-10 ${!course.image && 'h-full flex flex-col justify-between'}`}>
                    {course.icon && (
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 border transition-all duration-500 ${course.image ? 'bg-[#000000]/50 backdrop-blur-xl border-white/10 text-white group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-black' : 'bg-transparent border-white/10 text-brand-red group-hover:scale-110'}`}>
                        <course.icon className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 leading-[0.9] tracking-tighter text-white">
                        {course.title}
                      </h3>
                      <p className={`text-base font-medium leading-relaxed ${course.image ? 'text-white/50 group-hover:text-white/80' : 'text-white/40 group-hover:text-white/70'} max-w-sm transition-colors duration-500`}>
                        {course.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========================================================
              METHODOLOGY: STAGGERED MASONRY EFFECT
              ======================================================== */}
          <section className="relative">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 mb-20 text-center">
              <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">Il <span className="text-brand-red">Metodo</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {trainingPlan.map((block, i) => (
                <motion.article 
                  key={block.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  style={{ marginTop: i % 2 === 0 ? '0px' : '60px' }} // Sfalsamento asimmetrico via CSS inline
                  className="group relative overflow-hidden rounded-[2rem] border border-white/[0.03] bg-[#050505] aspect-[2/3] shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src={block.image}
                    alt={block.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale contrast-200 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[2s] ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
                  
                  {/* Tipografia verticale e numeri giganti */}
                  <div className="absolute top-6 left-6 text-6xl font-black text-white/[0.03] group-hover:text-brand-red/10 transition-colors duration-700 pointer-events-none select-none">
                    0{i + 1}
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-8 h-px bg-brand-red mb-6 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <h3 className="text-3xl font-black uppercase mb-4 leading-[0.9] text-white tracking-tighter">{block.title}</h3>
                    <p className="text-sm text-white/50 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {block.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ========================================================
              ECOSYSTEM: EDITORIAL STICKY SCROLL & GHOST TEXT
              ======================================================== */}
          <section className="relative pt-20 border-t border-white/[0.05]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
              
              {/* Sticky Heading */}
              <div className="lg:col-span-5 relative">
                <div className="lg:sticky lg:top-40">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-red/20 bg-brand-red/5 text-brand-red text-[9px] font-black uppercase tracking-[0.4em] mb-8">
                      <Star className="w-3 h-3" /> Ecosistema
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter mb-8">
                      Il Nostro <br />
                      <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #61dee3' }}>Impegno</span>
                    </h2>
                    <p className="text-lg text-white/40 font-medium leading-relaxed max-w-sm">
                      Non ci limitiamo a insegnare. Costruiamo un ecosistema in cui il tuo talento è supportato, misurato e spinto al massimo in ogni singola fase.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Scrolling List */}
              <div className="lg:col-span-7 flex flex-col relative">
                {/* HUD Decorator Line */}
                <div className="absolute left-[38px] top-0 bottom-0 w-px bg-white/[0.05] hidden md:block" />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative py-16 first:pt-0">
                  <div className="flex gap-10 items-start relative z-10">
                    <div className="w-20 h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-red group-hover:shadow-[0_0_30px_rgba(97,222,227,0.2)] transition-all duration-500 z-10">
                      <CalendarClock className="w-8 h-8 text-white/40 group-hover:text-brand-red transition-colors" />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Calendario Chiaro</h3>
                      <p className="text-lg text-white/40 font-medium leading-relaxed">Programmazione regolare con obiettivi concreti. Zero perdite di tempo, massimo focus.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative py-16">
                  <div className="flex gap-10 items-start relative z-10">
                    <div className="w-20 h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-red group-hover:shadow-[0_0_30px_rgba(97,222,227,0.2)] transition-all duration-500 z-10">
                      <Users className="w-8 h-8 text-white/40 group-hover:text-brand-red transition-colors" />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Team Attivo</h3>
                      <p className="text-lg text-white/40 font-medium leading-relaxed">Supporto continuo durante lo studio e nei laboratori. Veri professionisti sempre al tuo fianco.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative py-16 last:pb-0">
                  <div className="flex gap-10 items-start relative z-10">
                    <div className="w-20 h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-red group-hover:shadow-[0_0_30px_rgba(97,222,227,0.2)] transition-all duration-500 z-10">
                      <Star className="w-8 h-8 text-white/40 group-hover:text-brand-red transition-colors" />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Risultato Garantito</h3>
                      <p className="text-lg text-white/40 font-medium leading-relaxed">Ogni modulo trasforma le competenze in abilità da palco. Strumenti reali per la carriera.</p>
                    </div>
                  </div>
                </motion.div>

              </div>
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
              {teachers.map((teacher, i) => (
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
                  
                  {/* Dettagli tecnici verticiali */}
                  <div className="absolute top-6 right-6 text-[8px] font-black text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">
                    ID_DOC_{i}
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
              <h3 className="text-6xl md:text-8xl font-black uppercase mb-6 leading-[0.85] tracking-tighter text-white">Pronto a fare <br/><span className="text-brand-red drop-shadow-[0_0_20px_rgba(97,222,227,0.5)]">Musica?</span></h3>
              <p className="text-white/40 text-xl font-medium leading-relaxed border-l border-white/10 pl-6">
                Contatta la segreteria per bloccare il tuo slot. Orientamento, costi e piano didattico personalizzato in un'unica call.
              </p>
            </div>

            <a
              href="tel:+393701497361"
              className="relative z-10 flex items-center justify-center gap-4 py-8 px-12 bg-white text-black hover:bg-brand-red hover:text-black transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(97,222,227,0.6)] group"
            >
               <span className="text-[12px] font-black uppercase tracking-[0.4em]">Inizia Ora</span>
               <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.section>

        </div>
      </div>
      </SiteLayout>
    </>
  );
}