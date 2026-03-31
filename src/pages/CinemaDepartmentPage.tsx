import React from 'react';
import { motion } from 'motion/react';
import { Clapperboard, PhoneCall, Camera, Film, Video, Layers, Lightbulb, Users, ArrowRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

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
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2070"
            alt="Dipartimento Cinema"
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-6">
              <Clapperboard className="w-3 h-3" /> Dipartimento Cinema
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-8 uppercase">
              Progetta, gira e monta come un <br className="hidden md:block"/>
              <span className="text-brand-red">professionista</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mb-12">
              Un percorso integrato tra regia, fotografia, ripresa e montaggio,
              pensato per trasformare teoria e tecnica in competenze reali da set.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                <p className="text-3xl font-black text-brand-red">4</p>
                <p className="text-xs text-white/65 uppercase tracking-wider font-bold mt-1">Aree didattiche</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                <p className="text-3xl font-black text-brand-red">Aula+Set</p>
                <p className="text-xs text-white/65 uppercase tracking-wider font-bold mt-1">Metodo completo</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                <p className="text-3xl font-black text-brand-red">100%</p>
                <p className="text-xs text-white/65 uppercase tracking-wider font-bold mt-1">Progetti Reali</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-24">
        
        {/* Intro Section */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200"
              alt="Set cinematografico"
              className="w-full h-[400px] object-cover rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">L'approccio <span className="text-brand-red">Pratico</span></h2>
            <div className="w-20 h-1 bg-brand-red mb-8" />
            <p className="text-lg text-white/60 leading-relaxed mb-6">
              Lavori su tutte le fasi della produzione audiovisiva come in una pipeline reale:
              ideazione, pre-produzione, set e finalizzazione.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-red/10 border border-brand-red/30 text-brand-red text-sm font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" /> Orientato al risultato
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            STILE EDITORIALE: COSA IMPARI (Griglia Fotografica) 
            ======================================================== */}
        <section className="py-24">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Sviluppa le tue <span className="text-brand-red">Skill</span></h2>
              <div className="w-20 h-1 bg-brand-red mb-6" />
              <p className="text-lg text-white/60 leading-relaxed">
                Dalla messa in scena al montaggio: sviluppo della visione autoriale, controllo tecnico millimetrico e gestione professionale del workflow.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cinemaTracks.map((track, i) => (
              <motion.article 
                key={track.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] border border-white/10 bg-dark-card"
              >
                {/* Immagine di sfondo */}
                <img
                  src={track.image}
                  alt={track.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay scuro per far leggere il testo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Contenuto Testuale */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <track.icon className="w-8 h-8 text-brand-red mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-black uppercase mb-2 text-white">
                    {track.title}
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed font-medium max-w-md transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {track.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Metodo Section */}
        <section className="py-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Il Piano <span className="text-brand-red">Didattico</span></h2>
          <div className="w-20 h-1 bg-brand-red mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cinemaPlan.map((block, i) => (
              <motion.article 
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-card aspect-square"
              >
                <img
                  src={block.image}
                  alt={block.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-lg font-black uppercase mb-2 leading-tight">{block.title}</h3>
                  <p className="text-sm text-white/70">{block.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ========================================================
            STILE EDITORIALE: VANTAGGI ESCLUSIVI (Split Layout) 
            ======================================================== */}
        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Colonna Testo ed Elenco (Sinistra) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-[1.1]">
                Vantaggi <br />
                <span className="text-brand-red">Esclusivi</span>
              </h2>
              <div className="w-20 h-1 bg-brand-red mb-8" />
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                Non ti offriamo solo lezioni, ma l'ingresso in un ecosistema produttivo reale. Gli studenti del Dipartimento Cinema sbloccano benefit pensati per vivere il set a 360 gradi.
              </p>

              <div className="flex flex-col">
                {initiatives.map((item, i) => (
                  <div key={i} className="group border-t border-white/10 py-6 first:border-t-0 flex items-start gap-4">
                    <div className="mt-1">
                      <ArrowRight className="w-5 h-5 text-brand-red opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase mb-2 text-white/90 group-hover:text-brand-red transition-colors">{item.title}</h4>
                      <p className="text-white/50 text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Colonna Foto Imponente (Destra) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200"
                  alt="Masterclass Cinema"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex px-3 py-1 bg-brand-red text-black text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                    Accesso Premium
                  </div>
                  <p className="text-white/80 font-medium text-sm">Riservato agli iscritti dell'Accademia</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Teachers Section */}
        <section className="py-16">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="w-3 h-3" /> Il Team
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase">I nostri <span className="text-brand-red">Docenti</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {cinemaTeachers.map((teacher, i) => (
              <motion.div
                key={teacher.name}
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
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-1 uppercase">{teacher.name}</h3>    
                  <p className="text-brand-red text-xs font-bold uppercase tracking-wider">{teacher.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl border border-brand-red/30 bg-gradient-to-br from-brand-red/10 to-transparent p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4">Vuoi prenotare <span className="text-brand-red">il corso?</span></h3>
            <p className="text-white/70 text-lg">
              Chiama ora la segreteria per disponibilità, orientamento e dettagli del percorso.
            </p>
          </div>

          <a
            href="tel:+390511234567"
            className="btn-red relative z-10 whitespace-nowrap text-black hover:text-black py-4 px-8"
          >
            <PhoneCall className="w-5 h-5" /> Chiama ora
          </a>
        </motion.section>

      </div>
    </SiteLayout>
  );
}