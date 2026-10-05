import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  XCircle, 
  Filter,
  Calendar,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import type { AttendanceStatus } from '../types';

export const HistoryScreen: React.FC = () => {
  const { historyRecords, todayRecord } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('Oktober 2026');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const allRecords = todayRecord 
    ? [todayRecord, ...historyRecords.filter(r => r.date !== todayRecord.date)]
    : historyRecords;

  const presentCount = allRecords.filter(r => r.status === 'present').length;
  const lateCount = allRecords.filter(r => r.status === 'late').length;
  const sickCount = allRecords.filter(r => r.status === 'sick' || r.status === 'leave').length;
  const absentCount = allRecords.filter(r => r.status === 'absent').length;

  const filteredRecords = allRecords.filter(item => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'present') return item.status === 'present';
    if (filterStatus === 'late') return item.status === 'late';
    if (filterStatus === 'leave') return item.status === 'leave' || item.status === 'sick';
    return true;
  });

  const getStatusBadge = (status: AttendanceStatus, label: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={12} />
            <span>{label || 'Hadir'}</span>
          </span>
        );
      case 'late':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            <Clock size={12} />
            <span>{label || 'Terlambat'}</span>
          </span>
        );
      case 'sick':
      case 'leave':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            <AlertCircle size={12} />
            <span>{label || 'Cuti / Sakit'}</span>
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800">
            <XCircle size={12} />
            <span>Alpa</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 max-w-md mx-auto">
      <HeaderBar title="Riwayat Kehadiran" backTo="home" />

      <div className="p-5 space-y-4">
        {/* Month Selector Bar - Exactly matching mockup Screen 5 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <button 
            onClick={() => setSelectedMonth('September 2026')}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800 dark:text-white">
            <Calendar size={16} className="text-blue-600" />
            <span>{selectedMonth}</span>
          </div>

          <button 
            onClick={() => setSelectedMonth('Oktober 2026')}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Attendance Summary Stat Cards (3 Pills like mockup) */}
        <div className="grid grid-cols-4 gap-2">
          <div 
            onClick={() => setFilterStatus(filterStatus === 'present' ? 'all' : 'present')}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition ${
              filterStatus === 'present'
                ? 'bg-emerald-100 border-emerald-400 dark:bg-emerald-950 dark:border-emerald-600'
                : 'bg-emerald-50/70 border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-900/40'
            }`}
          >
            <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Hadir</p>
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-300 mt-0.5">{presentCount}</p>
          </div>

          <div 
            onClick={() => setFilterStatus(filterStatus === 'late' ? 'all' : 'late')}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition ${
              filterStatus === 'late'
                ? 'bg-amber-100 border-amber-400 dark:bg-amber-950 dark:border-amber-600'
                : 'bg-amber-50/70 border-amber-200/80 dark:bg-amber-950/20 dark:border-amber-900/40'
            }`}
          >
            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Telat</p>
            <p className="text-xl font-extrabold text-amber-600 dark:text-amber-300 mt-0.5">{lateCount}</p>
          </div>

          <div 
            onClick={() => setFilterStatus(filterStatus === 'leave' ? 'all' : 'leave')}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition ${
              filterStatus === 'leave'
                ? 'bg-blue-100 border-blue-400 dark:bg-blue-950 dark:border-blue-600'
                : 'bg-blue-50/70 border-blue-200/80 dark:bg-blue-950/20 dark:border-blue-900/40'
            }`}
          >
            <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Cuti/Izin</p>
            <p className="text-xl font-extrabold text-blue-600 dark:text-blue-300 mt-0.5">{sickCount}</p>
          </div>

          <div 
            onClick={() => setFilterStatus(filterStatus === 'absent' ? 'all' : 'absent')}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition ${
              filterStatus === 'absent'
                ? 'bg-rose-100 border-rose-400 dark:bg-rose-950 dark:border-rose-600'
                : 'bg-rose-50/70 border-rose-200/80 dark:bg-rose-950/20 dark:border-rose-900/40'
            }`}
          >
            <p className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Alpa</p>
            <p className="text-xl font-extrabold text-rose-600 dark:text-rose-300 mt-0.5">{absentCount}</p>
          </div>
        </div>

        {/* Daily Attendance Records List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Tanggal</h4>
            {filterStatus !== 'all' && (
              <button 
                onClick={() => setFilterStatus('all')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Reset Filter
              </button>
            )}
          </div>

          {filteredRecords.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.formattedDate}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">({item.dayName})</span>
                </div>

                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  {item.clockIn ? (
                    <span>Masuk: <strong className="text-slate-700 dark:text-slate-200">{item.clockIn}</strong></span>
                  ) : (
                    <span>{item.note || 'Tidak ada jadwal absen'}</span>
                  )}

                  {item.clockOut && (
                    <span>Pulang: <strong className="text-slate-700 dark:text-slate-200">{item.clockOut}</strong></span>
                  )}
                </div>

                {item.location && (
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin size={10} />
                    {item.location}
                  </p>
                )}
              </div>

              <div>
                {getStatusBadge(item.status, item.statusLabel)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
