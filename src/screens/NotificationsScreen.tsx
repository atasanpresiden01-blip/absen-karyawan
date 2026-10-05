import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Megaphone, 
  CalendarCheck, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'reminder':
        return <Clock size={18} className="text-blue-500" />;
      case 'announcement':
        return <Megaphone size={18} className="text-purple-500" />;
      case 'leave':
        return <CalendarCheck size={18} className="text-amber-500" />;
      default:
        return <Bell size={18} className="text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 w-full max-w-2xl mx-auto">
      <HeaderBar 
        title="Notifikasi" 
        backTo="home"
        rightAction={
          <button
            onClick={markAllNotificationsAsRead}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Check size={14} />
            <span>Baca Semua</span>
          </button>
        }
      />

      <div className="p-5 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={40} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-500">Belum ada notifikasi baru</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                item.read 
                  ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80' 
                  : 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 shadow-xs'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-bold leading-tight ${item.read ? 'text-slate-800 dark:text-slate-200' : 'text-blue-900 dark:text-blue-200'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {!item.read && (
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
