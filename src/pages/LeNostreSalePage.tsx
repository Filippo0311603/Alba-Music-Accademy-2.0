import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PhoneCall, Clock3, Ruler, Music2, Drum, Mic2, Guitar, Piano, Star, ArrowRight, Sparkles } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import SeoMeta from '../components/SeoMeta';

type Room = {
  name: string;
  mq: number;
  hourlyPrice: number;
  description: string;
  image: string;
  equipment: string[];
};

type PackageOffer = {
  name: string;
  hours: number;
  packagePrice: number;
  idealFor: string;
  includes: string;
};

const rooms: Room[] = [
  {
    name: 'Sala Pulse',
    mq: 18,
    hourlyPrice: 18,
    description: 'Perfetta per duo/trio e studio tecnico, con acustica asciutta e setup essenziale professionale.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1400',
    equipment: ['Mixer digitale 12 canali', '2 monitor attivi', 'Amplificatore chitarra Marshall', 'Batteria Tama'],
  },
  {
    name: 'Sala Groove',
    mq: 28,
    hourlyPrice: 25,
    description: 'Spazio versatile per band complete, prove live e pre-produzione.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=1400',
    equipment: ['PA 2.1 Yamaha', '2 amplificatori chitarra', 'Amplificatore basso Ampeg', 'Microfoni Shure set completo'],
  },
  {
    name: 'Sala Stage Pro',
    mq: 42,
    hourlyPrice: 35,
    description: 'La sala premium per set complessi, pre-live e sessioni ad alta dinamica.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1600',
    equipment: ['Impianto FOH professionale', 'In-ear monitor setup', 'Piano digitale stage', 'Backline completo premium'],
  },
];

const packageOffers: PackageOffer[] = [
  {
    name: 'Pacchetto Start',
    hours: 5,
    packagePrice: 80,
    idealFor: 'artisti singoli e piccoli gruppi',
    includes: 'Validita 30 giorni, prenotazioni flessibili',
  },
  {
    name: 'Pacchetto Band',
    hours: 10,
    packagePrice: 150,
    idealFor: 'band in preparazione live',
    includes: 'Validita 60 giorni, priorita fasce serali',
  },
  {
    name: 'Pacchetto Pro',
    hours: 20,
    packagePrice: 280,
    idealFor: 'produzioni continuative e pre-tour',
    includes: 'Validita 90 giorni, supporto tecnico base incluso',
  },
];

function getSavingsPercent(hourlyPrice: number, packageOffer: PackageOffer) {
  const regularCost = hourlyPrice * packageOffer.hours;
  const discount = Math.max(0, regularCost - packageOffer.packagePrice);
  return Math.round((discount / regularCost) * 100);
}

export default function LeNostreSalePage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <SeoMeta
        title="Le Nostre Sale | Alba Music Academy Ladispoli (RM)"
        description="Scopri le sale prove di Alba Music Academy: foto, metrature, attrezzature, prezzi orari e pacchetti disponibili."
        path="/le-nostre-sale"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Le Nostre Sale', path: '/le-nostre-sale' },
        ]}
      />
      <SiteLayout>
        
        {/* ========================================================
            HERO PARALLAX: OVERSIZED TYPOGRAPHY
            ======================================================== */}
        <section className="relative h-screen flex items-center overflow-hidden -mt-10 lg:-mt-20 bg-[#030303]">
          
          <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
            <img
              src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=2500"
              alt="Le nostre sale prove"
              className="w-full h-full object-cover opacity-40 grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-brand-red mix-blend-overlay opacity-10" />
          </motion.div>

          <motion.div 
            style={{ y: yText, opacity: opacityText }} 
            className="relative z-10 w-full pt-32 flex flex-col items-center text-center px-6"
          >
            
            
            <h1 className="text-[13vw] leading-none font-black uppercase tracking-tighter text-transparent stroke-text select-none drop-shadow-2xl mix-blend-screen" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
              Le nostre sale
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white -mt-4 md:-mt-8 lg:-mt-12 z-20">
              Vieni a  <span className="text-brand-red">Trovarci</span>
            </h2>
            
            <p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
              Ambienti professionali, acustica impeccabile e strumentazione top tier. Per gli artisti, le band e le produzioni che non accettano compromessi.
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
                LE SALE PROVE - IMMERSIVE GLASSMORPHISM
                ======================================================== */}
            <section>
              <div className="mb-24 text-center">
                <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
                  Specifiche <br/> <span className="text-brand-red">& Spazi</span>
                </h2>
                <div className="w-24 h-1 bg-brand-red mx-auto mt-8 mb-8" />
                <p className="text-white/50 text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                  Ogni sala è stata concepita, misurata e trattata per rispondere a esigenze reali. Niente rimbombi, niente frequenze fastidiose. Solo tu, il tuo strumento e il suono perfetto.
                </p>
              </div>

              <div className="space-y-24 md:space-y-32">
                {rooms.map((room, index) => (
                  <motion.div 
                    key={room.name} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full rounded-[3rem] overflow-hidden border border-white/10 group bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                      
                      {/* Immagine di Fondo (Ocupa tutto su mobile, meta su desktop) */}
                      <div className={`absolute inset-0 lg:relative lg:col-span-7 h-full z-0 overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <img
                          src={room.image}
                          alt={room.name}
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 lg:opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#030303] via-[#030303]/80 lg:via-transparent to-transparent" />
                      </div>

                      {/* Contenuto in Glassmorphism */}
                      <div className={`relative z-10 lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <div className="inline-flex items-center gap-3 rounded-full bg-brand-red/10 border border-brand-red/30 px-4 py-2 mb-8 backdrop-blur-md w-fit">
                          <Clock3 className="w-4 h-4 text-brand-red" />
                          <span className="text-xl font-black text-brand-red leading-none">{room.hourlyPrice} <span className="text-[10px] text-white/70 uppercase tracking-widest">EUR / Ora</span></span>
                        </div>

                        <h3 className="text-5xl md:text-6xl font-black uppercase mb-4 leading-none tracking-tight text-white">
                          {room.name}
                        </h3>
                        
                        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-8 pb-6 border-b border-white/10">
                          <Ruler className="w-4 h-4 text-brand-red" /> {room.mq} Metri Quadri
                        </div>

                        <p className="text-white/70 text-lg leading-relaxed mb-10 font-medium">
                          {room.description}
                        </p>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5 font-black">Backline Incluso</p>
                          <div className="flex flex-wrap gap-2">
                            {room.equipment.map((equipment) => (
                              <span key={equipment} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium backdrop-blur-sm hover:border-brand-red/50 transition-colors">
                                {equipment}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ========================================================
                PACCHETTI CONVENIENZA - APPLE/SAAS PRICING
                ======================================================== */}
            <section className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-none tracking-tight">
                  Piani & <span className="text-brand-red">Pacchetti</span>
                </h2>
                <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto">
                  Abbatti il costo orario, dai continuità al tuo suono. Progettati per la massima resa.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-center">
                {packageOffers.map((offer, index) => {
                  const savings = getSavingsPercent(rooms[1].hourlyPrice, offer);
                  const isPopular = index === 1;

                  return (
                    <motion.article 
                      key={offer.name} 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative overflow-hidden rounded-[3rem] p-10 flex flex-col transition-all duration-500 ${
                        isPopular 
                        ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-brand-red/40 shadow-[0_0_60px_rgba(97,222,227,0.15)] lg:scale-105 z-20 py-16' 
                        : 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 hover:border-white/20 z-10'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute top-0 left-0 w-full py-2 bg-brand-red text-black text-center text-[10px] font-black uppercase tracking-[0.2em]">
                          Scelta più Popolare
                        </div>
                      )}
                      
                      <div className={`mt-${isPopular ? '4' : '0'} mb-8`}>
                        <h3 className="text-2xl lg:text-3xl font-black uppercase mb-2">{offer.name}</h3>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider h-8">Per {offer.idealFor}</p>
                      </div>

                      <div className="mb-10 pb-10 border-b border-white/10">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-6xl font-black text-white leading-none tracking-tighter">{offer.packagePrice}</span>
                          <span className="text-brand-red font-bold uppercase tracking-widest text-sm mt-2">EUR</span>
                        </div>
                        <p className="text-white/60 font-bold text-sm tracking-wider uppercase flex items-center gap-2 mt-4">
                          <Clock3 className="w-4 h-4 text-brand-red" /> {offer.hours} Ore Incluse
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <p className="text-white/80 font-medium flex items-start gap-4 mb-8 leading-relaxed text-sm">
                          <Star className="w-5 h-5 text-brand-red shrink-0 fill-brand-red/20" />
                          {offer.includes}
                        </p>
                        
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-[0.1em] w-full">
                          Risparmi il {savings}%
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            {/* ========================================================
                BACKLINE HARDWARE ECOSYSTEM
                ======================================================== */}
            <section className="py-12">
              <div className="mb-16 text-center">
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  Ecosistema <span className="text-brand-red">Hardware</span>
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-10 text-center hover:bg-[#111] hover:border-brand-red/30 transition-all duration-500 group shadow-xl">
                  <Guitar className="w-12 h-12 mx-auto text-white/20 group-hover:text-brand-red transition-colors mb-6" />
                  <span className="block text-xs font-black uppercase tracking-[0.1em] text-white/60 group-hover:text-white transition-colors">Amps & Cab</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-10 text-center hover:bg-[#111] hover:border-brand-red/30 transition-all duration-500 group shadow-xl">
                  <Drum className="w-12 h-12 mx-auto text-white/20 group-hover:text-brand-red transition-colors mb-6" />
                  <span className="block text-xs font-black uppercase tracking-[0.1em] text-white/60 group-hover:text-white transition-colors">Drum Kits</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-10 text-center hover:bg-[#111] hover:border-brand-red/30 transition-all duration-500 group shadow-xl">
                  <Mic2 className="w-12 h-12 mx-auto text-white/20 group-hover:text-brand-red transition-colors mb-6" />
                  <span className="block text-xs font-black uppercase tracking-[0.1em] text-white/60 group-hover:text-white transition-colors">Microfoni</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-10 text-center hover:bg-[#111] hover:border-brand-red/30 transition-all duration-500 group shadow-xl">
                  <Piano className="w-12 h-12 mx-auto text-white/20 group-hover:text-brand-red transition-colors mb-6" />
                  <span className="block text-xs font-black uppercase tracking-[0.1em] text-white/60 group-hover:text-white transition-colors">Keyboards</span>
                </motion.div>
              </div>
            </section>

            {/* ========================================================
                CTA GIGANTE - CONTATTI
                ======================================================== */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] border border-brand-red/30 bg-gradient-to-br from-brand-red/20 via-[#0a0a0a] to-transparent p-10 md:p-16 lg:p-24 flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative overflow-hidden shadow-[0_0_50px_rgba(97,222,227,0.1)]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <PhoneCall className="w-3 h-3" /> Solo via Segreteria
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-[0.9] tracking-tight">
                  Blocca ora la <br/><span className="text-brand-red">Tua Sala</span>
                </h2>
                <p className="text-white/60 text-xl font-medium leading-relaxed mb-4">
                  Non usiamo bot automatizzati. Preferiamo consigliarti la sala e l'orario migliore in base al tuo progetto e alle tue esigenze reali.
                </p>
                <p className="text-brand-red font-bold text-[10px] uppercase tracking-widest mt-6">
                  *Disponibilità soggetta a calendario interno
                </p>
              </div>

              <div className="flex flex-col gap-4 relative z-10 shrink-0 w-full lg:w-auto">
                <a
                  href="tel:+393701497361"
                  className="relative overflow-hidden w-full lg:w-auto px-10 py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-brand-red transition-colors duration-500 flex items-center justify-center gap-3 group/btn"
                >
                  <PhoneCall className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" /> 
                  Chiama Ora
                </a>
                <a
                  href="mailto:albamusicacademy@gmail.com"
                  className="w-full lg:w-auto px-10 py-6 rounded-[2rem] border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:border-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Invia Email <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.section>

          </div>
        </div>
      </SiteLayout>
    </>
  );
}