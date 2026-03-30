import React, {useEffect, useMemo, useState} from 'react';
import {format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval} from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { bookingAPI } from '../lib/api';

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error' | 'warning'; message: string} | null>(null);
  const [confirmationPopup, setConfirmationPopup] = useState<{title: string; message: string} | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const times = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const selectedDateKey = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isPastSlot = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(selectedDate);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate.getTime() <= Date.now();
  };

  const loadBookedTimes = async () => {
    setIsLoadingSlots(true);
    try {
      const data = await bookingAPI.getSlots(selectedDateKey);
      setBookedTimes(Array.isArray(data.bookedTimes) ? data.bookedTimes : []);
    } catch (error) {
      setBookedTimes([]);
      setFeedback({type: 'error', message: 'Errore nel caricamento disponibilita. Riprova tra poco.'});
    } finally {
      setIsLoadingSlots(false);
    }
  };

  useEffect(() => {
    setSelectedTime(null);
    loadBookedTimes();
  }, [selectedDateKey]);

  const onFormChange = (field: 'fullName' | 'email' | 'phone' | 'notes', value: string) => {
    setFormData((prev) => ({...prev, [field]: value}));
  };

  const submitBooking = async () => {
    if (!selectedTime) {
      setFeedback({type: 'error', message: 'Seleziona prima un orario disponibile.'});
      return;
    }
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setFeedback({type: 'error', message: 'Nome e email sono obbligatori.'});
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const data = await bookingAPI.createBooking({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
        date: selectedDateKey,
        time: selectedTime,
      });

      setFeedback({
        type: data.emailSent === false ? 'warning' : 'success',
        message: data.message || 'Richiesta inviata. Controlla la tua email e conferma la prenotazione.',
      });

      const destinationEmail =
        typeof data.email === 'string' && data.email.trim()
          ? data.email.trim()
          : formData.email.trim();

      setConfirmationPopup({
        title: data.emailSent === false ? 'Richiesta salvata' : 'Controlla la tua email',
        message: data.emailSent === false
          ? `La richiesta e stata salvata, ma non siamo riusciti a inviare la email a ${destinationEmail}. Riprova tra poco o contatta l'accademia.`
          : `Per completare la prenotazione devi cliccare il bottone "Conferma prenotazione" nella email inviata a ${destinationEmail}.`,
      });

      setFormData({fullName: '', email: '', phone: '', notes: ''});
      setSelectedTime(null);
      await loadBookedTimes();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Errore imprevisto durante la prenotazione.';
      setFeedback({type: 'error', message});
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: it })}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, i) => (
          <div key={i} className="text-center text-xs font-bold text-white/40 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(day)}
            className={cn(
              "h-12 flex items-center justify-center rounded-lg text-sm transition-all",
              !isSameMonth(day, monthStart) ? "text-white/10" : "text-white",
              isSameDay(day, selectedDate) ? "bg-brand-red font-bold" : "hover:bg-white/5",
              isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && "border border-brand-red/50"
            )}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-red" />
            Orari Disponibili
          </h3>
          <p className="text-sm text-white/60 mb-6">
            Seleziona un orario per il {format(selectedDate, 'd MMMM', { locale: it })}
          </p>
          <p className="text-xs text-white/45 mb-6">
            Dopo "Prenota Ora" riceverai una email con il bottone "Conferma prenotazione". Il reminder verrà inviato automaticamente entro le 24h precedenti solo dopo la conferma.
          </p>

          {isLoadingSlots && (
            <p className="text-xs text-white/40 mb-4">Caricamento disponibilita...</p>
          )}
          
          <div className="grid grid-cols-3 gap-2 mb-8">
            {times.map((time) => (
              (() => {
                const unavailable = bookedTimes.includes(time) || isPastSlot(time);
                return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={unavailable}
                className={cn(
                  "py-2 text-sm rounded-md border border-white/10 transition-all",
                  selectedTime === time ? "bg-brand-red border-brand-red font-bold" : "hover:bg-white/5",
                  unavailable && "bg-white/5 text-white/25 border-white/5 cursor-not-allowed hover:bg-white/5"
                )}
              >
                {time} {unavailable ? '(occupato)' : ''}
              </button>
                );
              })()
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <input
              type="text"
              value={formData.fullName}
              onChange={(event) => onFormChange('fullName', event.target.value)}
              placeholder="Nome e cognome"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(event) => onFormChange('email', event.target.value)}
              placeholder="Email"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => onFormChange('phone', event.target.value)}
              placeholder="Telefono (opzionale)"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand-red"
            />
            <textarea
              value={formData.notes}
              onChange={(event) => onFormChange('notes', event.target.value)}
              placeholder="Note (opzionale)"
              rows={3}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand-red resize-none"
            />
          </div>

          {feedback && (
            <p
              className={cn(
                'mb-4 rounded-lg border px-3 py-2 text-sm',
                feedback.type === 'success' && 'border-green-400/30 bg-green-500/10 text-green-300',
                feedback.type === 'warning' && 'border-yellow-400/30 bg-yellow-500/10 text-yellow-200',
                feedback.type === 'error' && 'border-red-400/30 bg-red-500/10 text-red-300',
              )}
            >
              {feedback.message}
            </p>
          )}

          <button 
            onClick={submitBooking}
            disabled={!selectedTime || isSubmitting}
            className={cn(
              "mt-auto w-full py-4 rounded-xl font-bold transition-all",
              selectedTime && !isSubmitting
                ? "bg-brand-red hover:scale-[1.02] active:scale-95" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            {isSubmitting ? 'Invio in corso...' : 'Prenota Ora'}
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL - Overlay con backdrop */}
      {confirmationPopup && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setConfirmationPopup(null)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="w-full max-w-md rounded-2xl border-2 border-brand-red bg-dark-card p-8 shadow-2xl animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setConfirmationPopup(null)}
                className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>

              {/* Title */}
              <h4 className="text-2xl font-black uppercase mb-4 text-brand-red pr-8">
                {confirmationPopup.title}
              </h4>

              {/* Message */}
              <p className="text-base text-white/80 leading-relaxed mb-8 font-medium">
                {confirmationPopup.message}
              </p>

              {/* Action Button */}
              <button
                onClick={() => setConfirmationPopup(null)}
                className="w-full py-4 rounded-xl bg-brand-red text-black font-bold text-lg hover:bg-brand-red/90 transition-all active:scale-95"
              >
                Ho capito
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
