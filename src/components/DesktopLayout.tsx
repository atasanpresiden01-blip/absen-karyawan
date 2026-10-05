import React, { useState, useEffect } from 'react';
import { 
  Home, 
  QrCode, 
  Calendar, 
  History, 
  User, 
  Users, 
  Building2, 
  Bell, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Smartphone, 
  Monitor, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ScreenType } from '../types';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  const { 
    currentScreen, 
    navigateTo, 
    currentUser, 
    switchUser, 
    officeConfig, 
    activeOfficeLocation,
    darkMode, 
    setDarkMode, 
    notifications,
    viewMode,
    setViewMode,
    todayRecord
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>('');
  const unreadNotifs = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) +
        ' • ' +
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Dashboard Utama', icon: Home, desc: 'Ringkasan harian & kehadiran' },
    { id: 'checkin', label: 'Presensi & Scanner', icon: QrCode, desc: 'Clock-in & Clock-out' },
    { id: 'schedule', label: 'Jadwal & Shift Kerja', icon: Calendar, desc: 'Agenda dan shift mingguan' },
    { id: 'history', label: 'Riwayat Presensi', icon: History, desc: 'Log absensi bulanan' },
    { id: 'supervisor', label: 'Tim HR & Approval', icon: Users, desc: 'Kelola tim & persetujuan cuti' },
    { id: 'office-settings', label: 'Setting Kantor & Geofence', icon: Building2, desc: 'Radius GPS & kebijakan kantor', badge: 'Setting' },
    { id: 'notifications', label: 'Notifikasi', icon: Bell, count: unreadNotifs, desc: 'Pemberitahuan masuk' },
    { id: 'profile', label: 'Profil Karyawan', icon: User, desc: 'Data diri & sisa cuti' },
    { id: 'settings', label: 'Pengaturan Akun', icon: Settings, desc: 'Preferensi sistem' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Enterprise Web Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Building2 size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
                    Absen<span className="text-blue-600">Karyawan</span>
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Enterprise Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {officeConfig.companyName}
                </p>
              </div>
            </div>
          </div>

          {/* Center Office & Geofence Status Pill (Desktop only) */}
          <div className="hidden md:flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
              <Clock size={14} className="text-blue-600" />
              <span>{currentTime || 'Memuat waktu...'}</span>
            </div>
            <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700" />
            <div 
              onClick={() => navigateTo('office-settings')}
              className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              title="Klik untuk ubah radius & koordinat kantor"
            >
              <MapPin size={14} />
              <span className="truncate max-w-[180px]">{activeOfficeLocation.name}</span>
              <span className="text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded-md">
                {activeOfficeLocation.radiusMeters}m
              </span>
            </div>
          </div>

          {/* Right Controls: View Switcher, Dark Mode, Notifications, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle: Desktop Portal vs Mobile Simulator */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  viewMode === 'desktop'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Tampilan Web Dashboard Luas"
              >
                <Monitor size={14} />
                <span>Web Portal</span>
              </button>

              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  viewMode === 'mobile'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Simulasi Layar Smartphone (Mobile Frame)"
              >
                <Smartphone size={14} />
                <span>Simulasi HP</span>
              </button>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={darkMode ? 'Ganti ke Tema Terang (Light Mode)' : 'Ganti ke Tema Gelap (Dark Mode)'}
            >
              {darkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
            </button>

            {/* Notifications Quick Icon */}
            <button
              onClick={() => navigateTo('notifications')}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Notifikasi"
            >
              <Bell size={19} />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* User Profile Mini Badge */}
            <div 
              onClick={() => navigateTo('profile')}
              className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-85 transition"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/40">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Web Sidebar (Active in Desktop View) */}
        {viewMode === 'desktop' && (
          <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 space-y-6 min-h-[calc(100vh-65px)]">
            {/* Active Office Quick Card */}
            <div className="p-3.5 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-800/90 dark:to-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1">
                  <Building2 size={12} />
                  Lokasi Presensi
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {activeOfficeLocation.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Radius Geofence: <span className="font-bold text-blue-600 dark:text-blue-400">{activeOfficeLocation.radiusMeters} Meter</span>
              </p>
              <button
                onClick={() => navigateTo('office-settings')}
                className="mt-2 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Ubah Setting Kantor</span>
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Sidebar Navigation Links */}
            <div className="space-y-1 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Menu Utama
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id as ScreenType)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition group ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'} />
                      <span className="text-xs">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Role Switcher & User Card */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Role Aktif</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    {currentUser.isSupervisor ? 'Supervisor / HR' : 'Karyawan Biasa'}
                  </p>
                </div>
                <button
                  onClick={() => switchUser(currentUser.isSupervisor ? 'employee' : 'supervisor')}
                  className="px-2 py-1 text-[10px] font-bold bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-500 transition shadow-2xs"
                >
                  Ganti
                </button>
              </div>

              <button
                onClick={() => navigateTo('login')}
                className="w-full py-2 px-3 flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition"
              >
                <LogOut size={15} />
                <span>Keluar Akun</span>
              </button>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-950">
          {viewMode === 'desktop' ? (
            /* Wide Desktop Content View */
            <div className="w-full p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          ) : (
            /* Centered Mobile Phone Simulator View with realistic bezel */
            <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-200/70 dark:bg-slate-900/80">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Smartphone size={16} />
                <span>Simulasi Tampilan Mobile App (Android / iOS)</span>
              </div>

              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[38px] shadow-2xl border-8 border-slate-800 dark:border-slate-700 overflow-hidden relative min-h-[750px]">
                {/* Mobile Camera Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 dark:bg-slate-700 rounded-full z-50 pointer-events-none" />
                <div className="pt-2">
                  {children}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
