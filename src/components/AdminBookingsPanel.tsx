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
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [submittingManual, setSubmittingManual] = useState(false);
  const [manualMessage, setManualMessage] = useState('');
  const [manualError, setManualError] = useState('');
  const [manualForm, setManualForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    date: new Date().toISOString().slice(0, 10),
    time: '',
    notes: '',
  });

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
  ];

  const normalizeTimeLabel = (rawTime: string) => {
    const value = String(rawTime || '').trim();
    const match = value.match(/^(\d{1,2}):(\d{2})/);
    if (!match) {
      return value;
    }
    return `${match[1].padStart(2, '0')}:${match[2]}`;
  };

  const activeBookings = bookings
    .filter((booking) => booking.status === 'confirmed')
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return normalizeTimeLabel(a.time).localeCompare(normalizeTimeLabel(b.time));
    });

  const activeBookingsByDate = activeBookings.reduce<Record<string, Booking[]>>((acc, booking) => {
    if (!acc[booking.date]) {
      acc[booking.date] = [];
    }
    acc[booking.date].push(booking);
    return acc;
  }, {});

  const activeDates = Object.keys(activeBookingsByDate).sort((a, b) => a.localeCompare(b));

  const isPastSlot = (date: string, time: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
    return slotDate.getTime() <= Date.now();
  };

  const formatDateLabel = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    return localDate.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const loadSlots = async (date: string) => {
    try {
      const data = await adminAPI.getSlots(date);
      setBookedTimes(
        Array.isArray(data.bookedTimes)
          ? data.bookedTimes.map((time: string) => normalizeTimeLabel(time)).filter(Boolean)
          : [],
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore nel caricamento slot';
      if (message.includes('401')) {
        onSessionExpired?.();
      }
      setManualError(message);
      setBookedTimes([]);
    }
  };

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

  const createManualBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    setManualError('');
    setManualMessage('');

    const phonePattern = /^\+?[0-9\s().-]{7,20}$/;
    if (!manualForm.firstName.trim() || !manualForm.lastName.trim()) {
      setManualError('Nome e cognome sono obbligatori.');
      return;
    }

    if (!phonePattern.test(manualForm.phone.trim())) {
      setManualError('Numero di telefono non valido.');
      return;
    }

    if (!manualForm.date || !manualForm.time) {
      setManualError('Seleziona data e orario.');
      return;
    }

    setSubmittingManual(true);
    try {
      const response = await adminAPI.createManualBooking({
        firstName: manualForm.firstName.trim(),
        lastName: manualForm.lastName.trim(),
        phone: manualForm.phone.trim(),
        date: manualForm.date,
        time: manualForm.time,
        notes: manualForm.notes.trim(),
      });

      setManualMessage(response.message || 'Prenotazione inserita con successo.');
      setManualForm((prev) => ({
        ...prev,
        firstName: '',
        lastName: '',
        phone: '',
        time: '',
        notes: '',
      }));

      await fetchBookings();
      await loadSlots(manualForm.date);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore imprevisto durante l inserimento.';
      if (message.includes('401')) {
        onSessionExpired?.();
      }
      setManualError(message);
    } finally {
      setSubmittingManual(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    loadSlots(manualForm.date);
  }, [manualForm.date]);

  return (
    <div className="glass-card max-w-6xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-black uppercase">Pannello Prenotazioni</h3>
          <p className="text-sm text-white/50">Gestione segreteria: inserimento manuale prenotazioni e vista prenotazioni attive per giorno.</p>
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

      <div className="rounded-xl border border-white/10 bg-black/20 p-4 md:p-6 mb-8">
        <h4 className="text-lg font-black uppercase mb-2">Nuova Prenotazione Manuale</h4>
        <p className="text-xs text-white/50 mb-4">La prenotazione inserita dal pannello admin viene registrata subito come confermata, senza invio email.</p>

        <form onSubmit={createManualBooking} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              value={manualForm.firstName}
              onChange={(event) => setManualForm((prev) => ({...prev, firstName: event.target.value}))}
              placeholder="Nome"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
            <input
              value={manualForm.lastName}
              onChange={(event) => setManualForm((prev) => ({...prev, lastName: event.target.value}))}
              placeholder="Cognome"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
            <input
              value={manualForm.phone}
              onChange={(event) => setManualForm((prev) => ({...prev, phone: event.target.value}))}
              placeholder="Telefono"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="date"
              value={manualForm.date}
              onChange={(event) => setManualForm((prev) => ({...prev, date: event.target.value, time: ''}))}
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Orari disponibili</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {availableTimes.map((time) => {
                const normalizedTime = normalizeTimeLabel(time);
                const isBooked = bookedTimes.includes(normalizedTime);
                const isPast = isPastSlot(manualForm.date, normalizedTime);
                const unavailable = isBooked || isPast;

                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setManualForm((prev) => ({...prev, time: normalizedTime}))}
                    disabled={unavailable}
                    className={cn(
                      'py-2 text-xs rounded-md border border-white/10 transition-all',
                      manualForm.time === normalizedTime ? 'bg-brand-red text-black border-brand-red font-bold' : 'hover:bg-white/5',
                      unavailable && 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed hover:bg-white/5',
                    )}
                  >
                    {time} {isBooked ? '(occ.)' : isPast ? '(pass.)' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            value={manualForm.notes}
            onChange={(event) => setManualForm((prev) => ({...prev, notes: event.target.value}))}
            placeholder="Note interne (opzionale)"
            rows={2}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-red resize-none"
          />

          {manualMessage && <p className="text-green-300 text-sm">{manualMessage}</p>}
          {manualError && <p className="text-red-300 text-sm">{manualError}</p>}

          <button
            type="submit"
            disabled={submittingManual || !manualForm.time}
            className="px-4 py-2 rounded-lg bg-brand-red text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submittingManual ? 'Inserimento in corso...' : 'Inserisci prenotazione'}
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-4 md:p-6">
        <h4 className="text-lg font-black uppercase mb-4">Prenotazioni Attive per Giorno</h4>

        {!loading && activeDates.length === 0 && (
          <p className="text-white/50 text-sm">Nessuna prenotazione attiva al momento.</p>
        )}

        <div className="space-y-5">
          {activeDates.map((date) => (
            <div key={date} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h5 className="text-sm font-black uppercase text-brand-red mb-3">{formatDateLabel(date)}</h5>

              <div className="space-y-2">
                {activeBookingsByDate[date].map((booking) => {
                  const showEmail = Boolean(booking.email && !booking.email.endsWith('@alba.local'));
                  return (
                    <div key={booking.id} className="grid grid-cols-1 md:grid-cols-[90px_1fr_auto] gap-3 items-center rounded-md border border-white/10 px-3 py-3">
                      <div className="text-lg font-black text-white">{normalizeTimeLabel(booking.time)}</div>
                      <div>
                        <p className="font-bold text-white">{booking.fullName}</p>
                        <p className="text-xs text-white/60">Telefono: {booking.phone || '-'}</p>
                        {showEmail && <p className="text-xs text-white/60">Email: {booking.email}</p>}
                      </div>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="px-3 py-2 rounded text-xs font-bold bg-white/10 hover:bg-white/20 text-white"
                      >
                        Disdici
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
