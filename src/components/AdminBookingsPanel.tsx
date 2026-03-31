import React, {useEffect, useState} from 'react';
import {cn} from '../lib/utils';
import { adminAPI } from '../lib/api';

type Booking = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  confirmationSentAt: string | null;
  reminderSentAt: string | null;
  canceledAt: string | null;
};

type AdminBookingsPanelProps = {
  onSessionExpired?: () => void;
};

export default function AdminBookingsPanel({onSessionExpired}: AdminBookingsPanelProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminAPI.getBookings();
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore imprevisto';
      if (message.includes('401')) {
        onSessionExpired?.();
      }
      setError(message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      await adminAPI.cancelBooking(id);
      await fetchBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore imprevisto';
      if (message.includes('401')) {
        onSessionExpired?.();
      }
      setError(message);
    }
  };

  const runReminderWorker = async () => {
    try {
      await adminAPI.runReminders();
      await fetchBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore imprevisto';
      if (message.includes('401')) {
        onSessionExpired?.();
      }
      setError(message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="glass-card max-w-6xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-black uppercase">Pannello Prenotazioni</h3>
          <p className="text-sm text-white/50">Vista rapida stato prenotazioni, reminder e disdette. Conferma e reminder partono in automatico per gli utenti.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={fetchBookings}
            className="px-4 py-2 rounded-lg bg-brand-red text-black font-bold"
          >
            Aggiorna
          </button>
          <button
            onClick={runReminderWorker}
            className="px-4 py-2 rounded-lg border border-brand-red/40 text-brand-red font-bold"
          >
            Esegui reminder ora (solo test)
          </button>
        </div>
      </div>

      {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
      {loading && <p className="text-white/50 text-sm mb-4">Caricamento...</p>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10">
              <th className="py-3 pr-4">Data</th>
              <th className="py-3 pr-4">Ora</th>
              <th className="py-3 pr-4">Utente</th>
              <th className="py-3 pr-4">Email</th>
              <th className="py-3 pr-4">Telefono</th>
              <th className="py-3 pr-4">Stato</th>
              <th className="py-3 pr-4">Conferma</th>
              <th className="py-3 pr-4">Reminder</th>
              <th className="py-3 pr-4">Azione</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-white/5">
                <td className="py-3 pr-4">{booking.date}</td>
                <td className="py-3 pr-4">{booking.time}</td>
                <td className="py-3 pr-4">{booking.fullName}</td>
                <td className="py-3 pr-4">{booking.email}</td>
                <td className="py-3 pr-4">{booking.phone || '-'}</td>
                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs font-bold',
                      booking.status === 'confirmed'
                        ? 'bg-green-500/20 text-green-300'
                        : booking.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-200'
                          : 'bg-red-500/20 text-red-300',
                    )}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 pr-4">{booking.confirmationSentAt ? 'inviata' : 'no'}</td>
                <td className="py-3 pr-4">{booking.reminderSentAt ? 'inviato' : 'no'}</td>
                <td className="py-3 pr-4">
                  <button
                    disabled={booking.status === 'cancelled'}
                    onClick={() => cancelBooking(booking.id)}
                    className={cn(
                      'px-3 py-1 rounded text-xs font-bold',
                      booking.status === 'cancelled'
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-white/10 hover:bg-white/20 text-white',
                    )}
                  >
                    Disdici
                  </button>
                </td>
              </tr>
            ))}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={9} className="py-6 text-white/50">
                  Nessuna prenotazione trovata.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
