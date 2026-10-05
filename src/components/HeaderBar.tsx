import React from 'react';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ScreenType } from '../types';

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
  backTo?: ScreenType;
  showNotification?: boolean;
  showSettings?: boolean;
  rightAction?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBack = true,
  backTo = 'home',
  showNotification = false,
  showSettings = false,
  rightAction
}) => {
  const { navigateTo, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigateTo(backTo)}
            className="p-1.5 -ml-1.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {rightAction}

        {showNotification && (
          <button
            onClick={() => navigateTo('notifications')}
            className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            )}
          </button>
        )}

        {showSettings && (
          <button
            onClick={() => navigateTo('settings')}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
