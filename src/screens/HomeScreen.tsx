import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  QrCode, 
  Calendar, 
  History, 
  User, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CalendarPlus, 
  Briefcase, 
  ShieldAlert, 
  ArrowRight,
  LogOut,
  Users,
  Building2,
  ShieldCheck as ShieldIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { 
    currentUser, 
    navigateTo, 
    todayRecord, 
    notifications, 
    schedules, 
    setLeaveModalOpen,
    switchUser,
    activeOfficeLocation,
    officeConfig
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>('');
  const unreadNotifs = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 w-full">
      {/* Top Profile Header */}
      <div className="bg-white dark:bg-slate-900 px-5 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => navigateTo('profile')}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Selamat Pagi,</p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {currentUser.name}
              </h2>
              <span className="inline-block text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full mt-0.5">
                {currentUser.department}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('notifications')}
              className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Notifikasi"
            >
              <Bell size={20} />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 mt-4 pb-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column (7 cols): Attendance & Quick Actions */}
          <div className="lg:col-span-7 space-y-4">
            {/* Today's Attendance Card - Exact design as mockup */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 text-white p-5 shadow-xl shadow-blue-500/20">
              <div className="flex items-center justify-between text-xs font-medium text-blue-100 mb-2">
                <span>Presensi Kehadiran</span>
                <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-full text-[11px]">
                  <Clock size={12} />
                  <span>{currentTime || '08:00 WIB'}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-tight">Senin, 05 Okt 2026</h3>

              {/* Status Badge */}
              <div className="mt-3.5 inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-md font-semibold text-sm">
                {todayRecord ? (
                  <>
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>{todayRecord.statusLabel} ({todayRecord.clockIn || 'Tercatat'})</span>
                  </>
                ) : (
                  <>
                    <Clock size={18} className="text-amber-500" />
                    <span>Belum Clock-In Hari Ini</span>
                  </>
                )}
              </div>

              {/* Clock In / Out Time Grid */}
              <div className="mt-4 pt-3.5 border-t border-white/20 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-blue-200 text-[11px]">Jam Masuk</p>
                  <p className="font-bold text-sm text-white mt-0.5">
                    {todayRecord?.clockIn || '-- : -- WIB'}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-[11px]">Jam Pulang</p>
                  <p className="font-bold text-sm text-white mt-0.5">
                    {todayRecord?.clockOut || '-- : -- WIB'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Grid (Check In, History, Profile, Leave) */}
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={() => navigateTo('checkin')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                  <QrCode size={22} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Scan Absen</span>
              </button>

              <button
                onClick={() => navigateTo('history')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                  <History size={22} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Riwayat</span>
              </button>

              <button
                onClick={() => setLeaveModalOpen(true)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                  <CalendarPlus size={22} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Cuti / Izin</span>
              </button>

              <button
                onClick={() => navigateTo('supervisor')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
                  <Users size={22} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Tim HR</span>
              </button>
            </div>

            {/* Big Action CTA to Clock In if not clocked in */}
            {!todayRecord?.clockIn && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500 text-white rounded-xl">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-200">Shift dimulai jam {officeConfig.workHoursStart}</p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">Lakukan Clock-In sekarang di {activeOfficeLocation.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('checkin')}
                  className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Absen
                </button>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Office Geofence Status Card & Today's Schedule */}
          <div className="lg:col-span-5 space-y-4">
            {/* Office Geofencing Live Status Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
                  <Building2 size={16} className="text-blue-600" />
                  <span>Lokasi Kantor Aktif</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                  <ShieldIcon size={11} />
                  GPS Terverifikasi
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {activeOfficeLocation.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  {activeOfficeLocation.address}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Radius Geofence</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{activeOfficeLocation.radiusMeters} Meter</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Toleransi Telat</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{officeConfig.lateToleranceMinutes} Menit</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('office-settings')}
                className="w-full py-2 px-3 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Building2 size={14} />
                <span>Atur Setting Kantor & Geofence</span>
              </button>
            </div>

            {/* Today's Schedule / Shifts Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Jadwal & Agenda Hari Ini</h4>
                <button
                  onClick={() => navigateTo('schedule')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="space-y-2.5">
                {schedules.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${item.color}`}>
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                          <Clock size={11} />
                          {item.timeRange}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={10} />
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
