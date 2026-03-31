import React from 'react';
import { motion } from 'motion/react';
import { Target, Heart, Award, Sparkles, ArrowRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';
import sectionUnaFamigliaImage from '../assets/pages/chi-siamo/sezione-una-famiglia.webp';

// Array per la sezione delle bolle fluttuanti
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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070"
            alt="Il nostro team"
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-center mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" /> Dal 2006
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-8 uppercase">
              La nostra <span className="text-brand-red">Storia</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Da oltre 20 anni trasformiamo la passione in professione. Alba Music Academy è il luogo dove il talento incontra l'eccellenza.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-24 space-y-32 md:space-y-40">
        
        {/* ========================================================
            PREMIUM SECTION 1: TYPOGRAPHIC SPLIT (Il nostro metodo) 
            ======================================================== */}
        <section className="border-t border-b border-white/5 py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-[800px] h-[400px] bg-brand-red/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-6 lg:col-span-5"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
                Il nostro metodo:<br />
                <span className="text-brand-red">imparare facendo</span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="md:col-span-6 lg:col-span-7"
            >
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                Il nostro metodo valorizza il talento personale e lo traduce in competenza professionale. Ogni percorso unisce conoscenze teoriche e applicazione pratica: qui in Accademia gli studenti lavorano in gruppo — come in una vera produzione audiovisiva o in studio di registrazione — e sviluppano progetti, imparando a gestire tempi, ruoli e strumenti. 
                <br /><br />
                Perché fare è il modo migliore per imparare, qui in Accademia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            PREMIUM SECTION 2: BUBBLE CONSTELLATION 
            ======================================================== */}
        <section className="py-20 flex flex-col items-center justify-center relative min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-[3rem] bg-[#0d0d0d] border border-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          
          <div className="absolute top-12 z-20 text-center w-full px-6 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
            >
              Alba Music & Film Academy
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-red tracking-tight max-w-5xl leading-tight"
            >
              Trasforma la passione in professione
            </motion.h2>
          </div>

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
                  animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: role.delay }}
                  className="w-full h-full rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-center p-6 text-center hover:bg-brand-red hover:border-brand-red/50 hover:scale-105 transition-all duration-500 cursor-default group shadow-2xl"
                >
                  <span className="text-white/80 group-hover:text-black font-black uppercase text-sm lg:text-base leading-snug tracking-wider transition-colors duration-300">
                    {role.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden relative z-10 flex flex-wrap justify-center gap-4 px-4 pt-64 pb-12">
             {floatingRoles.slice(0, 6).map((role, i) => (
                <div key={i} className="rounded-full bg-white/5 border border-white/10 px-6 py-4 flex items-center justify-center text-center shadow-lg">
                  <span className="text-white/80 font-black uppercase text-xs tracking-wider">
                    {role.name}
                  </span>
                </div>
             ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: EDITORIAL SPLIT (La Visione) 
            ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-[1.1]">
              Più di una scuola, <br />
              <span className="text-brand-red">Una Famiglia</span>
            </h2>
            <div className="w-20 h-1 bg-brand-red mb-8" />
            <p className="text-white/60 text-lg leading-relaxed mb-6 font-medium">
              Siamo nati con un'idea semplice: creare uno spazio dove i musicisti e i filmmaker potessero sentirsi a casa, sperimentare senza paura e imparare dai migliori professionisti del settore. 
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-medium">
              Non crediamo nei metodi accademici freddi e distaccati. Crediamo nel sudore in sala prove, nei calli sulle dita, nelle notti passate a montare un video. Crediamo nella pratica pura.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={sectionUnaFamigliaImage}
                alt="Visione Accademia"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            PREMIUM SECTION 4: I NOSTRI VALORI (Bento/Apple Style) 
            ======================================================== */}
        <section>
          <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
              I Nostri <br className="hidden md:block"/>
              <span className="text-brand-red">Pilastri</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* VALORE 1: Immagine Larga (Metodo Pratico) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/10 aspect-[4/3] md:aspect-auto md:min-h-[450px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" 
                alt="Metodo Pratico" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <Target className="w-10 h-10 text-brand-red mb-6" />
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 text-white leading-none">Metodo Pratico</h3>
                <p className="text-lg text-white/70 max-w-md font-medium">
                  Abbandona i banchi scolastici. Meno teoria sui libri, più ore in studio. Impari facendo, sbagliando e correggendo direttamente sul campo.
                </p>
              </div>
            </motion.div>

            {/* VALORE 2: Box Tipografico Compatto (Passione) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-red/20 to-brand-red/5 border border-brand-red/30 p-8 md:p-10 flex flex-col justify-between"
            >
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mb-12">
                <Heart className="w-8 h-8 text-brand-red" />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase mb-4 leading-none">Passione<br/>Pura</h3>
                <p className="text-base text-white/70 font-medium">
                  I nostri docenti non sono solo insegnanti, ma professionisti attivi nell'industria musicale e cinematografica che trasmettono il fuoco sacro dell'arte ogni giorno.
                </p>
              </div>
            </motion.div>

            {/* VALORE 3: Box Tipografico Minimale (Eccellenza) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-5 group relative overflow-hidden rounded-[2.5rem] bg-[#141414] border border-white/10 p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <Award className="w-10 h-10 text-white/40 mb-8" />
                <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-[0.9] text-white/30 group-hover:text-white transition-colors duration-500">
                  Eccellenza<br/>Senza Compromessi
                </h3>
              </div>
              <p className="text-base text-white/60 font-medium mt-12">
                Strumentazione all'avanguardia, studi acusticamente trattati e standard qualitativi altissimi per prepararti alle vere sfide del mondo del lavoro.
              </p>
            </motion.div>

            {/* FOTO FILLER: Per completare la griglia */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-7 relative overflow-hidden rounded-[2.5rem] border border-white/10 aspect-video md:aspect-auto md:min-h-[300px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio setup" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
            </motion.div>

          </div>
        </section>

      </div>
      </SiteLayout>
    </>
  );
}