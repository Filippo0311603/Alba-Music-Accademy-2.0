import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Calendar, Clock, User, Mail, Phone, FileText, Loader, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/auth-context';
import { bookingAPI } from '../lib/api';
import SeoMeta from '../components/SeoMeta';

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  notes?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  confirmed_at?: string;
  confirmation_sent_at?: string;
  reminder_sent_at?: string;
  canceled_at?: string;
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelingBookingId, setCancelingBookingId] = useState<string | null>(null);
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed');

  const formatBookingDateItalian = (rawDate: string) => {
    const value = String(rawDate || '').trim();
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]);
      const day = Number(match[3]);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('it-IT');
    }

    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString('it-IT');
    }

    return value;
  };

  const formatBookingTimeItalian = (rawTime: string) => {
    const value = String(rawTime || '').trim();
    const match = value.match(/^(\d{1,2}):(\d{2})/);

    if (!match) {
      return value;
    }

    const hours = String(Number(match[1])).padStart(2, '0');
    return `${hours}:${match[2]}`;
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch user bookings
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await bookingAPI.getMyBookings();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    setError('');
    setCancelingBookingId(bookingId);

    try {
      const data = await bookingAPI.cancelMyBooking(bookingId);
      const canceledAt = data?.booking?.canceled_at || new Date().toISOString();

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: 'cancelled',
                canceled_at: canceledAt,
              }
            : booking,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossibile disdire la prenotazione.');
    } finally {
      setCancelingBookingId(null);
    }
  };

  // Stile elegante per i badge di stato
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      default:
        return 'bg-white/5 border-white/10 text-white/60';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confermata';
      case 'pending':
        return 'In attesa';
      case 'cancelled':
        return 'Annullata';
      default:
        return status;
    }
  };

  // Loading State Elegante
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="text-center">
          <Loader className="w-8 h-8 animate-spin text-brand-red mx-auto mb-6" />
          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Accesso in corso...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-brand-red selection:text-black relative font-sans pb-24">
      <SeoMeta
        title="Profilo | Alba Music Academy"
        description="Area personale Alba Music Academy per consultare e gestire le tue prenotazioni."
        path="/profile"
        noIndex
      />

      {/* Bagliore ambientale di classe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        
        {/* ========================================================
            HEADER DASHBOARD (Premium & Minimal)
            ======================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-10"
        >
          <div>
            <button
              onClick={() => navigate('/')}
              className="group inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Torna al sito
            </button>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
              Area <br />
              <span className="text-brand-red">Personale</span>
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="group px-6 py-3 rounded-full bg-[#0a0a0a] border border-white/10 hover:border-brand-red/50 hover:text-brand-red text-white/80 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Esci
          </button>
        </motion.div>

        {/* ========================================================
            LAYOUT A GRIGLIA: PROFILO (SX) & PRENOTAZIONI (DX)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* --- COLONNA SINISTRA: SCHEDA PROFILO --- */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-32 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center text-3xl font-black mb-8">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3 h-3 text-brand-red" /> Studente Iscritto
                </div>
                
                <h2 className="text-3xl font-black uppercase mb-10 text-white tracking-tight">
                  {user.fullName}
                </h2>

                <div className="space-y-6 border-t border-white/5 pt-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-bold">Email Registrata</p>
                    <div className="flex items-center gap-3 text-white/80 font-medium">
                      <Mail className="w-4 h-4 text-white/40" />
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-bold">Telefono</p>
                    <div className="flex items-center gap-3 text-white/80 font-medium">
                      <Phone className="w-4 h-4 text-white/40" />
                      {user.phone || 'Non impostato'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- COLONNA DESTRA: LE MIE PRENOTAZIONI --- */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-brand-red" />
                  <h2 className="text-3xl font-black uppercase tracking-tight">Le Tue Sessioni</h2>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Totale Prenotazioni</p>
                  <p className="text-2xl font-black text-brand-red">{confirmedBookings.length}</p>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 mb-8 flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* LOADING STATE PRENOTAZIONI */}
              {isLoading ? (
                <div className="rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] p-16 flex flex-col items-center justify-center text-center">
                  <Loader className="w-8 h-8 animate-spin text-brand-red mb-4" />
                  <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Caricamento sessioni...</p>
                </div>
              ) 
              
              /* EMPTY STATE */
              : confirmedBookings.length === 0 ? (
                <div className="rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] p-16 text-center shadow-inner">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-3 tracking-tight">Nessuna Prenotazione</h3>
                  <p className="text-white/50 mb-8 max-w-md mx-auto font-medium">Non hai ancora prenotato le nostre sale. Inizia subito a organizzare il tuo tempo in studio.</p>
                  <a
                    href="/#booking"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    Prenota Ora
                  </a>
                </div>
              ) 
              
              /* LISTA PRENOTAZIONI: TICKET PREMIUM */
              : (
                <div className="space-y-6">
                  {confirmedBookings.map((booking, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      key={booking.id}
                      className="group relative rounded-[2rem] border border-white/5 bg-[#0a0a0a] overflow-hidden flex flex-col md:flex-row hover:border-brand-red/30 transition-all duration-500 shadow-xl"
                    >
                      {/* Left Side: Data e Ora */}
                      <div className="md:w-1/3 bg-[#111] p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center relative">
                        <p className="text-[10px] uppercase tracking-widest text-brand-red font-bold mb-3">Data e Ora</p>
                        <h3 className="text-4xl font-black leading-none mb-3 tracking-tighter text-white">{formatBookingDateItalian(booking.date)}</h3>
                        
                        <div className="flex items-center gap-2 text-white font-black text-2xl">
                          <Clock className="w-5 h-5 text-brand-red" /> {formatBookingTimeItalian(booking.time)}
                        </div>
                      </div>

                      {/* Right Side: Dettagli e Azioni */}
                      <div className="md:w-2/3 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">A Nome Di</p>
                              <h3 className="font-black uppercase text-2xl text-white tracking-tight">{booking.full_name}</h3>
                              <p className="text-white/50 text-sm font-medium flex items-center gap-2 mt-2">
                                <MapPin className="w-3.5 h-3.5 text-white/30" /> Sede Centrale
                              </p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border whitespace-nowrap h-fit ${getStatusColor(booking.status)}`}>
                              {getStatusLabel(booking.status)}
                            </span>
                          </div>

                          {/* Notes */}
                          {booking.notes && (
                            <div className="bg-[#111] rounded-xl p-5 mb-8 border border-white/5">
                              <div className="flex items-start gap-3">
                                <FileText className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Note aggiuntive</p>
                                  <p className="text-sm text-white/70 italic leading-relaxed">"{booking.notes}"</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Footer Ticket: Timeline e Cancel Action */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/5">
                          <div className="space-y-1.5">
                            {booking.created_at && (
                              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                Inserito il: <span className="text-white/80">{new Date(booking.created_at).toLocaleDateString('it-IT')}</span>
                              </p>
                            )}
                            {booking.confirmed_at && (
                              <p className="text-[10px] uppercase tracking-widest text-green-400 font-bold">
                                Conferma System: {new Date(booking.confirmed_at).toLocaleString('it-IT')}
                              </p>
                            )}
                            {booking.canceled_at && (
                              <p className="text-[10px] uppercase tracking-widest text-red-400 font-bold">
                                Annullata System: {new Date(booking.canceled_at).toLocaleString('it-IT')}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancelingBookingId === booking.id}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            {cancelingBookingId === booking.id ? (
                              <><Loader className="w-4 h-4 animate-spin" /> Attendere</>
                            ) : (
                              'Annulla Prenotazione'
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}