import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Clapperboard, PhoneCall, Camera, Film, Video, Layers, Users, Mic2, ArrowRight, Star } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';

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
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'Doppiaggio',
    subtitle: 'L\'arte della voce',
    description: 'Sincronismo labiale (sync), dizione, intenzione drammatica e caratterizzazione vocale. Esercitazioni pratiche al leggio in sale di registrazione professionali.',
    icon: Mic2,
    colSpan: 'md:col-span-4',
    bgClass: 'bg-gradient-to-br from-brand-red/20 to-brand-red/5 border-brand-red/30'
  },
  {
    title: 'Regia',
    subtitle: 'La visione prende forma',
    description: 'Dalla sceneggiatura allo storyboard, dalla direzione degli attori alla scelta delle inquadrature. Guida il set e trasforma la tua idea in un\'opera audiovisiva completa.',
    icon: Clapperboard,
    colSpan: 'md:col-span-12',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000',
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
      {/* Hero Section Parallax */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2070"
            alt="Dipartimento Cinema"
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
              <Clapperboard className="w-3.5 h-3.5" /> Dipartimento Cinema
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Progetta, gira <br /> e monta come un <br className="hidden md:block"/>
              <span className="text-brand-red relative inline-block">
                Professionista
                <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                  className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-brand-red origin-left" 
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium leading-relaxed mb-12">
              Un percorso immersivo nei mestieri del set. Dalla recitazione davanti all'obiettivo fino alla color correction finale in sala montaggio.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-32 space-y-32 md:space-y-40">

        {/* ========================================================
            PREMIUM SECTION: I CORSI PRINCIPALI (Bento Grid Asimmetrica) 
            ======================================================== */}
        <section>
          <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
              I Corsi <br className="hidden md:block"/>
              <span className="text-brand-red">Principali</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {mainCourses.map((course, i) => (
              <motion.div 
                key={course.title}
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className={`${course.colSpan} group relative overflow-hidden rounded-[2.5rem] border border-white/10 ${course.bgClass || 'bg-[#111]'} ${course.tall ? 'aspect-[4/3] md:aspect-[21/9] md:min-h-[600px]' : 'aspect-square md:aspect-auto md:min-h-[450px]'} flex flex-col justify-end p-8 md:p-12`}
              >
                {course.image && (
                  <>
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
                  </>
                )}
                
                <div className={`relative z-10 ${!course.image && 'h-full flex flex-col justify-between'}`}>
                  {course.icon && (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${course.image ? 'bg-white/10 backdrop-blur border border-white/20 text-white' : 'bg-brand-red/10 text-brand-red mb-12'}`}>
                      <course.icon className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <h3 className={`text-4xl md:text-5xl font-black uppercase mb-2 leading-none ${course.image ? 'text-white' : 'text-white'}`}>
                      {course.title}
                    </h3>
                    <p className="text-brand-red font-bold uppercase tracking-wider text-sm mb-6">
                      {course.subtitle}
                    </p>
                    <p className={`text-lg font-medium leading-relaxed max-w-xl ${course.image ? 'text-white/70' : 'text-white/60'}`}>
                      {course.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            STILE EDITORIALE: COMPETENZE TECNICHE (Griglia Fotografica) 
            ======================================================== */}
        <section className="relative">
           {/* Background Typography */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none z-0">
            <h2 className="text-[120px] md:text-[250px] lg:text-[300px] font-black uppercase text-white/[0.02] text-center whitespace-nowrap leading-none select-none">
              SKILLS
            </h2>
          </div>

          <div className="relative z-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Competenze <br/><span className="text-brand-red">Tecniche</span></h2>
              <div className="w-20 h-1 bg-brand-red mb-6" />
              <p className="text-lg text-white/60 leading-relaxed">
                I laboratori orizzontali fondamentali per padroneggiare il mezzo tecnico: dalla luce al montaggio, per un controllo totale sull'immagine.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {cinemaTracks.map((track, i) => (
              <motion.article 
                key={track.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/3] lg:aspect-[16/9] border border-white/10 bg-dark-card"
              >
                <img
                  src={track.image}
                  alt={track.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                  <track.icon className="w-10 h-10 text-brand-red mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-3xl font-black uppercase mb-3 text-white leading-none">
                    {track.title}
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed font-medium max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    {track.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Metodo Section */}
        <section>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-center md:text-left">Piano <span className="text-brand-red">Didattico</span></h2>
          <div className="w-20 h-1 bg-brand-red mb-12 mx-auto md:mx-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cinemaPlan.map((block, i) => (
              <motion.article 
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-dark-card aspect-square"
              >
                <img
                  src={block.image}
                  alt={block.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-xl font-black uppercase mb-3 leading-tight text-white">{block.title}</h3>
                  <p className="text-sm text-white/60 font-medium">{block.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ========================================================
            STILE EDITORIALE: VANTAGGI ESCLUSIVI (Split Layout) 
            ======================================================== */}
        <section className="relative py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Colonna Foto Imponente (Sinistra) */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200"
                  alt="Masterclass Cinema"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="inline-flex px-4 py-1.5 bg-brand-red text-black text-xs font-black uppercase tracking-widest rounded-full mb-4">
                    Accesso Premium
                  </div>
                  <p className="text-white/90 font-medium text-lg">Eventi riservati esclusivamente agli iscritti dell'Accademia</p>
                </div>
              </div>
            </motion.div>

            {/* Colonna Testo ed Elenco (Destra) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-[0.9] tracking-tight">
                Vantaggi <br />
                <span className="text-brand-red">Esclusivi</span>
              </h2>
              <div className="w-20 h-1 bg-brand-red mb-10" />
              <p className="text-white/60 text-xl leading-relaxed mb-12 font-medium">
                Non ti offriamo solo lezioni, ma l'ingresso in un ecosistema produttivo reale. Gli studenti del Dipartimento Cinema sbloccano benefit pensati per vivere il set a 360 gradi.
              </p>

              <div className="flex flex-col">
                {initiatives.map((item, i) => (
                  <div key={i} className="group border-t border-white/10 py-6 first:border-t-0 flex items-start gap-6 cursor-default">
                    <div className="mt-1 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300 shrink-0">
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase mb-2 text-white/90 group-hover:text-brand-red transition-colors">{item.title}</h4>
                      <p className="text-white/50 text-base leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

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
            {cinemaTeachers.map((teacher, i) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] aspect-[3/4] border border-white/10"
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
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-none tracking-tight">Pronto a dare <br/><span className="text-brand-red">Azione?</span></h3>
            <p className="text-white/60 text-xl font-medium">
              Chiama ora la segreteria per disponibilità dei corsi, orientamento e dettagli del percorso formativo.
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