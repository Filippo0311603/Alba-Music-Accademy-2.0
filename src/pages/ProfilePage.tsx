import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Calendar, Clock, User, Mail, Phone, FileText, Loader } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { bookingAPI } from '../lib/api';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-300/10 border-green-300/40 text-green-300';
      case 'pending':
        return 'bg-yellow-300/10 border-yellow-300/40 text-yellow-300';
      case 'cancelled':
        return 'bg-red-300/10 border-red-300/40 text-red-300';
      default:
        return 'bg-white/5 border-white/10 text-white/60';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confermata';
      case 'pending':
        return 'In attesa di conferma';
      case 'cancelled':
        return 'Annullata';
      default:
        return status;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
          <p className="text-white/60">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-white/60 hover:text-brand-red text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Torna al sito
            </button>
            <h1 className="text-4xl font-black uppercase mb-2 flex items-center gap-3">
              <User className="w-8 h-8 text-brand-red" /> Il Mio Profilo
            </h1>
            <p className="text-white/50">Ciao, {user.fullName}!</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-white/20 hover:border-brand-red/50 text-white/80 hover:text-brand-red text-sm font-bold inline-flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* User Info Card */}
        <div className="glass-card mb-8">
          <h2 className="text-xl font-black uppercase mb-4">Informazioni Profilo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-brand-red" />
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">Nome Completo</p>
                <p className="text-sm font-bold">{user.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-red" />
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">Email</p>
                <p className="text-sm font-bold">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-red" />
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">Telefono</p>
                <p className="text-sm font-bold">{user.phone || 'Non disponibile'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="glass-card">
          <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-red" /> Le Mie Prenotazioni
          </h2>

          {error && (
            <div className="rounded-lg bg-red-300/10 border border-red-300/40 px-4 py-3 mb-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin text-brand-red mx-auto mb-2" />
                <p className="text-white/60">Caricamento prenotazioni...</p>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 mb-4">Non hai ancora nessuna prenotazione.</p>
              <a
                href="/#booking"
                className="inline-block px-6 py-2 rounded-lg bg-brand-red text-black font-bold text-sm hover:bg-opacity-90 transition-all"
              >
                Prenota Ora
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-lg border border-white/10 bg-white/2 p-4 hover:border-brand-red/50 transition-colors"
                >
                  {/* Status Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{booking.full_name}</h3>
                      <p className="text-white/60 text-sm">{booking.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Data</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Calendar className="w-4 h-4 text-brand-red" />
                        {booking.date}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Ora</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Clock className="w-4 h-4 text-brand-red" />
                        {booking.time}
                      </div>
                    </div>
                    {booking.phone && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Telefono</p>
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Phone className="w-4 h-4 text-brand-red" />
                          {booking.phone}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Prenotato il</p>
                      <p className="text-sm font-bold">
                        {new Date(booking.created_at).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <div className="bg-white/5 rounded border border-white/10 p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Note</p>
                          <p className="text-sm text-white/80">{booking.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="space-y-2 text-xs text-white/50">
                    {booking.confirmation_sent_at && (
                      <p>Email di conferma inviata: {new Date(booking.confirmation_sent_at).toLocaleString('it-IT')}</p>
                    )}
                    {booking.confirmed_at && (
                      <p className="text-green-300">Confermata il: {new Date(booking.confirmed_at).toLocaleString('it-IT')}</p>
                    )}
                    {booking.reminder_sent_at && (
                      <p>Promemoria inviato: {new Date(booking.reminder_sent_at).toLocaleString('it-IT')}</p>
                    )}
                    {booking.canceled_at && (
                      <p className="text-red-300">Annullata il: {new Date(booking.canceled_at).toLocaleString('it-IT')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
