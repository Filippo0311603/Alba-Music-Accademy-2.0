import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, eachDayOfInterval } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

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
          
          <div className="grid grid-cols-3 gap-2 mb-8">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-2 text-sm rounded-md border border-white/10 transition-all",
                  selectedTime === time ? "bg-brand-red border-brand-red font-bold" : "hover:bg-white/5"
                )}
              >
                {time}
              </button>
            ))}
          </div>

          <button 
            disabled={!selectedTime}
            className={cn(
              "mt-auto w-full py-4 rounded-xl font-bold transition-all",
              selectedTime 
                ? "bg-brand-red hover:scale-[1.02] active:scale-95" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            Prenota Ora
          </button>
        </div>
      </div>
    </div>
  );
}
