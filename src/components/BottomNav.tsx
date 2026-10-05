import React from 'react';
import { Home, QrCode, Calendar, History, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, viewMode } = useApp();

  // Screens that should show bottom navigation
  const visibleScreens: ScreenType[] = ['home', 'checkin', 'history', 'schedule', 'profile', 'supervisor'];
  if (!visibleScreens.includes(currentScreen)) {
    return null;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'checkin', label: 'Absen', icon: QrCode },
    { id: 'schedule', label: 'Jadwal', icon: Calendar },
    { id: 'history', label: 'Riwayat', icon: History },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-lg ${viewMode === 'desktop' ? 'lg:hidden' : ''}`}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as ScreenType)}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors duration-200 relative ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                  : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              <div className={`p-1 rounded-full transition-all ${isActive ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
