import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PhoneCall, Clock3, Ruler, Music2, Drum, Mic2, Guitar, Piano, Star, ArrowRight } from 'lucide-react';
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
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
            HERO PARALLAX
            ======================================================== */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-10 lg:-mt-20">
          <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=2000"
              alt="Le nostre sale prove"
              className="w-full h-full object-cover opacity-40 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/50 to-transparent" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-brand-red text-xs font-bold uppercase tracking-widest mb-8 shadow-2xl">
                <Music2 className="w-3.5 h-3.5" /> Sale Prove & Studi
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                Le Nostre <br />
                <span className="text-brand-red relative inline-block">
                  Sale
                  <motion.div 
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                    className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-brand-red origin-left" 
                  />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium leading-relaxed">
                Ambienti professionali, acustica impeccabile e strumentazione top tier per artisti, band e produzioni esigenti.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-32 md:space-y-40">
          
          {/* ========================================================
              SALE PROVE - EDITORIAL SPLIT
              ======================================================== */}
          <section>
            <div className="mb-20 max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none tracking-tight">
                Specifiche e <br/> <span className="text-brand-red">Dotazioni</span>
              </h2>
              <div className="w-24 h-1 bg-brand-red mb-8" />
              <p className="text-white/60 text-xl font-medium leading-relaxed">
                Ogni sala è stata concepita, misurata e trattata per rispondere a esigenze reali. Niente rimbombi, niente frequenze fastidiose. Solo tu, il tuo strumento e il suono perfetto.
              </p>
            </div>

            <div className="space-y-24 md:space-y-32">
              {rooms.map((room, index) => (
                <div 
                  key={room.name} 
                  className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                >
                  {/* Foto Sala */}
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 1 ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full lg:w-7/12 relative aspect-[4/3] lg:aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl"
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    
                    {/* Badge Prezzo Sovrapposto */}
                    <div className="absolute bottom-8 left-8">
                      <div className="inline-flex items-center gap-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <Clock3 className="w-5 h-5 text-brand-red" />
                        <span className="text-xl font-black">{room.hourlyPrice} <span className="text-sm text-white/50 font-bold uppercase tracking-wider">EUR/ora</span></span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Testo e Dettagli */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full lg:w-5/12 flex flex-col justify-center"
                  >
                    <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-none tracking-tight">
                      {room.name}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-white/90 mb-8 border-b border-white/10 pb-6">
                      <Ruler className="w-5 h-5 text-brand-red" /> 
                      <span className="tracking-widest uppercase">{room.mq} Metri Quadri</span>
                    </div>

                    <p className="text-white/60 text-lg leading-relaxed mb-10 font-medium">
                      {room.description}
                    </p>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5 font-bold">Backline Incluso</p>
                      <ul className="space-y-4">
                        {room.equipment.map((equipment) => (
                          <li key={equipment} className="flex items-start gap-4 text-white/80 font-medium">
                            <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Star className="w-3 h-3 text-brand-red" />
                            </div>
                            <span>{equipment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================
              PACCHETTI CONVENIENZA - SAAS STYLE PRICING
              ======================================================== */}
          <section className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none tracking-tight">
                Piani & <span className="text-brand-red">Pacchetti</span>
              </h2>
              <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto">
                Assicurati la tua sala, blocca il tuo orario preferito e abbatti il costo orario. Progettati per dare continuità al tuo suono.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {packageOffers.map((offer, index) => {
                const savings = getSavingsPercent(rooms[1].hourlyPrice, offer);
                // Evidenziamo il pacchetto centrale
                const isPopular = index === 1;

                return (
                  <motion.article 
                    key={offer.name} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative overflow-hidden rounded-[2.5rem] p-10 flex flex-col ${
                      isPopular 
                      ? 'bg-gradient-to-b from-brand-red/20 to-[#111] border border-brand-red/50 shadow-[0_0_50px_rgba(97,222,227,0.15)] transform md:-translate-y-4' 
                      : 'bg-[#111]/80 backdrop-blur-xl border border-white/10'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-0 w-full py-2 bg-brand-red text-black text-center text-[10px] font-black uppercase tracking-widest">
                        Scelta più Popolare
                      </div>
                    )}
                    
                    <div className={`mt-${isPopular ? '6' : '0'} mb-8`}>
                      <h3 className="text-2xl font-black uppercase mb-2">{offer.name}</h3>
                      <p className="text-white/50 text-sm font-medium h-10">Ideale per {offer.idealFor}</p>
                    </div>

                    <div className="mb-10 pb-10 border-b border-white/10">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-black text-white leading-none">{offer.packagePrice}</span>
                        <span className="text-white/40 font-bold uppercase tracking-wider text-sm">EUR</span>
                      </div>
                      <p className="text-brand-red font-bold text-sm tracking-wider uppercase">
                        {offer.hours} Ore Totali
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-white/80 font-medium flex items-start gap-3 mb-6">
                        <ArrowRight className="w-5 h-5 text-brand-red shrink-0" />
                        {offer.includes}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">
                        Risparmi il {savings}%
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* ========================================================
              BACKLINE BOXES
              ======================================================== */}
          <section>
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-center md:text-left">
                Il Nostro <span className="text-brand-red">Hardware</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 text-center hover:bg-brand-red/10 hover:border-brand-red/30 transition-all duration-300 group">
                <Guitar className="w-10 h-10 mx-auto text-white/40 group-hover:text-brand-red transition-colors mb-4" />
                <span className="block text-sm font-bold uppercase tracking-wider text-white/80">Amps & Cab</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 text-center hover:bg-brand-red/10 hover:border-brand-red/30 transition-all duration-300 group">
                <Drum className="w-10 h-10 mx-auto text-white/40 group-hover:text-brand-red transition-colors mb-4" />
                <span className="block text-sm font-bold uppercase tracking-wider text-white/80">Drum Kits</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 text-center hover:bg-brand-red/10 hover:border-brand-red/30 transition-all duration-300 group">
                <Mic2 className="w-10 h-10 mx-auto text-white/40 group-hover:text-brand-red transition-colors mb-4" />
                <span className="block text-sm font-bold uppercase tracking-wider text-white/80">Microfoni</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 text-center hover:bg-brand-red/10 hover:border-brand-red/30 transition-all duration-300 group">
                <Piano className="w-10 h-10 mx-auto text-white/40 group-hover:text-brand-red transition-colors mb-4" />
                <span className="block text-sm font-bold uppercase tracking-wider text-white/80">Keyboards</span>
              </motion.div>
            </div>
          </section>

          {/* ========================================================
              CTA - CONTATTI
              ======================================================== */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] border border-brand-red/30 bg-gradient-to-br from-brand-red/20 via-[#0a0a0a] to-transparent p-10 md:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative overflow-hidden shadow-[0_0_50px_rgba(97,222,227,0.1)]"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="max-w-2xl relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-none tracking-tight">
                Prenotazioni solo tramite <br/><span className="text-brand-red">Segreteria</span>
              </h2>
              <p className="text-white/70 text-xl font-medium leading-relaxed mb-4">
                Non usiamo bot. Ti consigliamo la sala e l'orario migliore in base al tuo progetto e alle tue esigenze reali.
              </p>
              <p className="text-brand-red font-bold text-xs uppercase tracking-widest">
                *Disponibilità soggetta a calendario interno
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
              <a
                href="tel:+393701497361"
                className="btn-red relative whitespace-nowrap text-black hover:text-black py-5 px-8 text-sm rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(97,222,227,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <PhoneCall className="w-5 h-5" /> Chiama Ora
              </a>
              <a
                href="mailto:albamusicacademy@gmail.com"
                className="px-8 py-5 rounded-2xl border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center"
              >
                Invia Email
              </a>
            </div>
          </motion.section>

        </div>
      </SiteLayout>
    </>
  );
}