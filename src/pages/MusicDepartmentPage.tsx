import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Music2, PhoneCall, Piano, MicVocal, Guitar, Drum, AudioLines, CalendarClock, Users, Star, ArrowRight, Sparkles } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';

const musicCourses = [
  {
    title: 'Pianoforte Moderno',
    description: 'Armonia moderna, accompagnamento, timing e repertorio live con approccio operativo.',
    icon: Piano,
    colSpan: 'md:col-span-8',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'Pianoforte Classico',
    description: 'Tecnica, lettura, interpretazione e sviluppo del fraseggio sul repertorio classico.',
    icon: Piano,
    colSpan: 'md:col-span-4',
    bgClass: 'bg-gradient-to-br from-brand-red/20 to-brand-red/5 border-brand-red/30'
  },
  {
    title: 'Canto Pop',
    description: 'Respirazione, sostegno, timbro, controllo e presenza scenica su brani contemporanei.',
    icon: MicVocal,
    colSpan: 'md:col-span-4',
    bgClass: 'bg-[#141414] border-white/10'
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
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Batteria',
    description: 'Coordinazione, precisione ritmica e dinamiche per studio, sala prove e palco.',
    icon: Drum,
    colSpan: 'md:col-span-6',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1200'
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
      {/* Hero Section Parallax */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=2070"
            alt="Dipartimento Musica"
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/50 to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-brand-red text-xs font-bold uppercase tracking-wider mb-8">
              <Music2 className="w-3.5 h-3.5" /> Dipartimento Musica
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Forgia la tua <br />
              <span className="text-brand-red relative inline-block">
                Identità
                <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                  className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-brand-red origin-left" 
                />
              </span>
              <br /> Artistica
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium leading-relaxed mb-12">
              Formiamo musicisti completi attraverso un percorso che unisce tecnica rigorosa, lavoro in studio e l'adrenalina del palcoscenico.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-md px-6 py-5 hover:border-brand-red/50 transition-colors">
                <p className="text-4xl font-black text-brand-red mb-1">6</p>
                <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Corsi principali</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-md px-6 py-5 hover:border-brand-red/50 transition-colors">
                <p className="text-4xl font-black text-brand-red mb-1">Live</p>
                <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Metodo integrato</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-md px-6 py-5 hover:border-brand-red/50 transition-colors">
                <p className="text-4xl font-black text-brand-red mb-1">100%</p>
                <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Personalizzato</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-32 space-y-32 md:space-y-40">
        
        {/* Intro Section - Editorial Split */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-[0.9] tracking-tight">
              Il Primo <br />
              <span className="text-brand-red">Passo</span>
            </h2>
            <div className="w-20 h-1 bg-brand-red mb-8" />
            <p className="text-white/60 text-xl leading-relaxed mb-6 font-medium">
              Ogni studente parte da una valutazione iniziale per costruire un percorso efficace: tecnica, repertorio e direzione artistica vengono calibrati sul livello reale di partenza.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(97,222,227,0.15)]">
              <Sparkles className="w-4 h-4" /> Focus sul talento
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=1200"
              alt="Lezione di musica"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </section>

        {/* ========================================================
            PREMIUM SECTION: BENTO GRID CORSI 
            ======================================================== */}
        <section>
          <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
              Cosa <br className="hidden md:block"/>
              <span className="text-brand-red">Impari</span>
            </h2>
            <p className="text-lg text-white/60 mt-6 max-w-2xl font-medium">
              Tecnica strumentale e vocale, costruzione del repertorio, interpretazione, gestione del palco e ascolto critico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {musicCourses.map((course, i) => (
              <motion.div 
                key={course.title}
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className={`${course.colSpan} group relative overflow-hidden rounded-[2.5rem] border border-white/10 ${course.bgClass || 'bg-[#111]'} ${course.image ? 'aspect-[4/3] md:aspect-auto md:min-h-[400px]' : 'aspect-square md:aspect-auto md:min-h-[350px]'} flex flex-col justify-end p-8 md:p-10`}
              >
                {course.image && (
                  <>
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
                  </>
                )}
                
                <div className={`relative z-10 ${!course.image && 'h-full flex flex-col justify-between'}`}>
                  {course.icon && (
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${course.image ? 'bg-white/10 backdrop-blur border border-white/20 text-white' : 'bg-brand-red/10 text-brand-red mb-8'}`}>
                      <course.icon className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className={`text-3xl md:text-4xl font-black uppercase mb-3 leading-none ${course.image ? 'text-white' : 'text-white'}`}>
                      {course.title}
                    </h3>
                    <p className={`text-base font-medium leading-relaxed ${course.image ? 'text-white/70' : 'text-white/60'} max-w-sm`}>
                      {course.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            STILE EDITORIALE: PIANO DIDATTICO (Griglia Fotografica) 
            ======================================================== */}
        <section className="relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none z-0">
            <h2 className="text-[120px] md:text-[250px] lg:text-[300px] font-black uppercase text-white/[0.02] text-center whitespace-nowrap leading-none select-none">
              METODO
            </h2>
          </div>

          <div className="relative z-10 mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-center md:text-left">Il Piano <span className="text-brand-red">Didattico</span></h2>
            <div className="w-20 h-1 bg-brand-red mb-12 mx-auto md:mx-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {trainingPlan.map((block, i) => (
              <motion.article 
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-dark-card aspect-[4/5]"
              >
                <img
                  src={block.image}
                  alt={block.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-black uppercase mb-3 leading-tight text-white">{block.title}</h3>
                  <p className="text-sm text-white/60 font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{block.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ========================================================
            PREMIUM SECTION: L'ECOSISTEMA (Borderless / Sticky Scroll / Typography)
            ======================================================== */}
        <section className="py-24 relative border-t border-white/5">
          {/* Bagliore ambientale leggerissimo di sfondo */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
            
            {/* Colonna di sinistra (Sticky) */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 text-brand-red" /> L'Esperienza
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6">
                    Il Nostro <br />
                    <span className="text-brand-red">Impegno</span>
                  </h2>
                  <p className="text-xl text-white/50 font-medium leading-relaxed max-w-sm">
                    Non ci limitiamo a insegnare. Costruiamo un ecosistema in cui il tuo talento è supportato, misurato e spinto al massimo in ogni singola fase.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Colonna di destra (Lista Tipografica a scorrimento) */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Feature 01 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="group relative border-b border-white/10 py-16 first:pt-0 md:first:pt-0 last:border-0"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  {/* Numero gigante in filigrana che si accende all'hover */}
                  <div className="text-7xl md:text-8xl font-black text-white/5 group-hover:text-brand-red/20 transition-colors duration-500 select-none">
                    01
                  </div>
                  <div className="mt-2 md:mt-4">
                    <div className="flex items-center gap-4 mb-4">
                      <CalendarClock className="w-8 h-8 text-brand-red opacity-80 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-brand-red transition-colors duration-300">
                        Calendario Chiaro
                      </h3>
                    </div>
                    <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
                      Programmazione regolare con obiettivi concreti e monitoraggio continuo dei progressi in aula. Zero perdite di tempo, massimo focus sul tuo obiettivo.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 02 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="group relative border-b border-white/10 py-16 last:border-0"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="text-7xl md:text-8xl font-black text-white/5 group-hover:text-brand-red/20 transition-colors duration-500 select-none">
                    02
                  </div>
                  <div className="mt-2 md:mt-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Users className="w-8 h-8 text-brand-red opacity-80 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-brand-red transition-colors duration-300">
                        Team Attivo
                      </h3>
                    </div>
                    <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
                      Supporto continuo durante lo studio, nei laboratori di musica d'insieme e nella preparazione delle performance. Veri professionisti sempre al tuo fianco.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 03 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                className="group relative py-16 last:pb-0"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="text-7xl md:text-8xl font-black text-white/5 group-hover:text-brand-red/20 transition-colors duration-500 select-none">
                    03
                  </div>
                  <div className="mt-2 md:mt-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Star className="w-8 h-8 text-brand-red opacity-80 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-brand-red transition-colors duration-300">
                        Risultato Garantito
                      </h3>
                    </div>
                    <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
                      Ogni modulo è pensato per trasformare le tue competenze teoriche in abilità utilizzabili da subito sul palco. Strumenti reali per la tua futura carriera.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Teachers Section */}
        <section>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tight text-center md:text-left">
                Il Nostro <br className="hidden md:block"/>
                <span className="text-brand-red">Team</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teachers.map((teacher, i) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] aspect-[3/4] border border-white/10"
              >
                <img
                  src={teacher.img}
                  alt={teacher.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-black mb-1 uppercase text-white leading-none">{teacher.name}</h3>    
                  <p className="text-brand-red text-xs font-bold uppercase tracking-widest">{teacher.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section Immersiva */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[3rem] border border-brand-red/30 bg-gradient-to-br from-brand-red/20 via-[#0a0a0a] to-transparent p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10 relative overflow-hidden shadow-[0_0_50px_rgba(97,222,227,0.1)]"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-none tracking-tight">Pronto a fare <br/><span className="text-brand-red">Musica?</span></h3>
            <p className="text-white/60 text-xl font-medium">
              Contatta ora la segreteria per disponibilità, costi, durata del percorso e orientamento didattico.
            </p>
          </div>

          <a
            href="tel:+393701497361"
            className="btn-red relative z-10 whitespace-nowrap text-black hover:text-black py-5 px-10 text-lg rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(97,222,227,0.5)] transition-all duration-300"
          >
            <PhoneCall className="w-6 h-6" /> Chiama ora
          </a>
        </motion.section>

      </div>
      </SiteLayout>
    </>
  );
}