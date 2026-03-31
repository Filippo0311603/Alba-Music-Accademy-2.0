import React from 'react';
import { motion } from 'motion/react';
import { Music2, PhoneCall, Piano, MicVocal, Guitar, Drum, AudioLines, CalendarClock, Users, Star } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

const musicCourses = [
  {
    title: 'Corso Pianoforte Moderno',
    description: 'Armonia moderna, accompagnamento, timing e repertorio live con approccio operativo.',
    icon: Piano,
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Corso Pianoforte Classico',
    description: 'Tecnica, lettura, interpretazione e sviluppo del fraseggio sul repertorio classico.',
    icon: Piano,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Corso di Canto Pop',
    description: 'Respirazione, sostegno, timbro, controllo e presenza scenica su brani contemporanei.',
    icon: MicVocal,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Corso di Chitarra',
    description: 'Dal livello base all avanzato: tecnica, stile, groove e costruzione del proprio suono.',
    icon: Guitar,
    image: 'https://images.unsplash.com/photo-1511335513653-ce875f1c750e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Corso di Sassofono Jazz',
    description: 'Improvvisazione, linguaggio jazz e costruzione del fraseggio su progressioni reali.',
    icon: AudioLines,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Corso di Batteria',
    description: 'Coordinazione, precisione ritmica e dinamiche per studio, sala prove e palco.',
    icon: Drum,
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1200'
  },
];

const trainingPlan = [
  {
    title: 'IN AULA - Lezioni teoriche',
    description: 'Tecnica, linguaggio musicale, armonia e analisi del repertorio con metodo progressivo.',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'IN SALA - Laboratorio pratico',
    description: 'Applicazione diretta su brani e setup reali, con confronto costante con i docenti.',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'OUTPUT FINALE - Performance',
    description: 'Costruzione di un repertorio completo e preparazione alla performance finale.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'MATERIALI DIDATTICI',
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
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=2070"
            alt="Dipartimento Musica"
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
              <Music2 className="w-3 h-3" /> Dipartimento Musica
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-8 uppercase">
              Dove impari tecnica, stile e <br className="hidden md:block"/>
              <span className="text-brand-red">identità artistica</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mb-12">
              Formiamo musicisti completi attraverso un percorso integrato tra lezione,
              laboratorio e performance, con un metodo chiaro e orientato a risultati concreti.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                <p className="text-3xl font-black text-brand-red">6</p>
                <p className="text-xs text-white/65 uppercase tracking-wider font-bold mt-1">Corsi principali</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                <p className="text-3xl font-black text-brand-red">Aula+Sala</p>
                <p className="text-xs text-white/65 uppercase tracking-wider font-bold mt-1">Metodo integrato</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                <p className="text-3xl font-black text-brand-red">100%</p>
                <p className="text-xs text-white/65 uppercase tracking-wider font-bold mt-1">Personalizzato</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-24">
        
        {/* Intro Section */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Il primo <span className="text-brand-red">Passo</span></h2>
            <div className="w-20 h-1 bg-brand-red mb-8" />
            <p className="text-lg text-white/60 leading-relaxed mb-6">
              Ogni studente parte da una valutazione iniziale per costruire un percorso efficace:
              tecnica, repertorio e direzione artistica vengono calibrati sul livello di partenza.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=1200"
              alt="Lezione di musica"
              className="w-full h-[400px] object-cover rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </section>

        {/* ========================================================
            STILE EDITORIALE: COSA IMPARI (Griglia Fotografica) 
            ======================================================== */}
        <section className="py-24">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Cosa <span className="text-brand-red">Impari</span></h2>
              <div className="w-20 h-1 bg-brand-red mb-6" />
              <p className="text-lg text-white/60 leading-relaxed">
                Tecnica strumentale e vocale, costruzione del repertorio, interpretazione, gestione del palco,
                ascolto critico e consapevolezza musicale.
              </p>
            </div>
          </div>

          {/* Griglia a 2 colonne (oppure 3 su schermi molto grandi) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicCourses.map((course, i) => (
              <motion.article 
                key={course.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[16/9] border border-white/10 bg-dark-card"
              >
                {/* Immagine di Sfondo */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Contenuto Testuale */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <course.icon className="w-8 h-8 text-brand-red mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-black uppercase mb-2 text-white">
                    {course.title}
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed font-medium max-w-md transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {course.description}
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
            {trainingPlan.map((block, i) => (
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

        {/* Feature Highlights */}
        <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card flex flex-col items-center text-center">
            <CalendarClock className="w-8 h-8 text-brand-red mb-4" />
            <h3 className="text-base font-black uppercase mb-2">Calendario chiaro</h3>
            <p className="text-sm text-white/60">Programmazione regolare con obiettivi concreti e monitoraggio dei progressi.</p>
          </div>
          <div className="glass-card flex flex-col items-center text-center">
            <Users className="w-8 h-8 text-brand-red mb-4" />
            <h3 className="text-base font-black uppercase mb-2">Team docenti attivo</h3>
            <p className="text-sm text-white/60">Supporto continuo durante studio, laboratorio e preparazione performance.</p>
          </div>
          <div className="glass-card flex flex-col items-center text-center">
            <Star className="w-8 h-8 text-brand-red mb-4" />
            <h3 className="text-base font-black uppercase mb-2">Risultato garantito</h3>
            <p className="text-sm text-white/60">Ogni modulo è pensato per trasformare competenze in abilità utilizzabili da subito.</p>
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
            {teachers.map((teacher, i) => (
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
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4">Pronto a fare <span className="text-brand-red">musica?</span></h3>
            <p className="text-white/70 text-lg">
              Contatta ora la segreteria per disponibilità, costi, durata del percorso e orientamento didattico.
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