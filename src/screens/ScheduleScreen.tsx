import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Briefcase, 
  Users, 
  PlusCircle, 
  Coffee,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const ScheduleScreen: React.FC = () => {
  const { schedules, setLeaveModalOpen } = useApp();
  const [selectedDay, setSelectedDay] = useState(5); // 5 Oct

  const weekDays = [
    { dayNumber: 5, dayName: 'Sen', fullDate: '05 Okt 2026', isToday: true },
    { dayNumber: 6, dayName: 'Sel', fullDate: '06 Okt 2026', isToday: false },
    { dayNumber: 7, dayName: 'Rab', fullDate: '07 Okt 2026', isToday: false },
    { dayNumber: 8, dayName: 'Kam', fullDate: '08 Okt 2026', isToday: false },
    { dayNumber: 9, dayName: 'Jum', fullDate: '09 Okt 2026', isToday: false },
    { dayNumber: 10, dayName: 'Sab', fullDate: '10 Okt 2026', isToday: false },
    { dayNumber: 11, dayName: 'Min', fullDate: '11 Okt 2026', isToday: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 w-full max-w-4xl mx-auto">
      <HeaderBar title="Jadwal & Shift Kerja" backTo="home" />

      <div className="p-5 space-y-4">
        {/* Horizontal Calendar Strip - Matching screen 6 in mockup */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Oktober 2026</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              Pekan ke-1
            </span>
          </div>

          <div className="flex justify-between gap-1 overflow-x-auto pb-1">
            {weekDays.map((d) => {
              const isSelected = selectedDay === d.dayNumber;
              return (
                <button
                  key={d.dayNumber}
                  onClick={() => setSelectedDay(d.dayNumber)}
                  className={`flex flex-col items-center justify-center min-w-[42px] py-2.5 rounded-2xl transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-medium opacity-80">{d.dayName}</span>
                  <span className="text-sm font-extrabold mt-0.5">{d.dayNumber}</span>
                  {d.isToday && (
                    <span className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-blue-600'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Header */}
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Agenda: {weekDays.find(d => d.dayNumber === selectedDay)?.fullDate}
          </h4>
          <span className="text-xs text-slate-400">3 Agenda Terjadwal</span>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedules.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3.5"
            >
              <div className={`p-3 rounded-2xl ${item.color} mt-0.5`}>
                {idx === 0 ? <Briefcase size={20} /> : idx === 1 ? <Users size={20} /> : <Clock size={20} />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                  <Clock size={13} className="text-blue-600" />
                  <span>{item.timeRange}</span>
                </p>

                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{item.location}</span>
                </p>
              </div>
            </div>
          ))}

          {/* Break & Rest Time Card */}
          <div className="bg-slate-100/70 dark:bg-slate-800/50 rounded-2xl p-3.5 border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Coffee size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Waktu Istirahat & Ishoma</p>
              <p className="text-[11px] text-slate-500">12:00 - 13:00 WIB (Kantin Lantai 3 / Musholla)</p>
            </div>
          </div>
        </div>

        {/* Quick Overtime / Leave Request Button */}
        <div className="pt-2">
          <button
            onClick={() => setLeaveModalOpen(true)}
            className="w-full py-3 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={16} />
            <span>Ajukan Pertukaran Shift / Lembur</span>
          </button>
        </div>
      </div>
    </div>
  );
};
