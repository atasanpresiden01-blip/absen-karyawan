import React from 'react';
import { Briefcase, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Top Header Logo */}
      <div className="pt-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
          <Briefcase size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-1.5">
          Absen<span className="text-blue-600">Karyawan</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs font-medium">
          Mudah, Cepat, Akurat Untuk Kehadiran Kerja
        </p>
      </div>

      {/* Hero Illustration / Graphic Card */}
      <div className="my-auto py-6">
        <div className="relative mx-auto w-64 h-64 bg-linear-to-tr from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-slate-800 rounded-3xl p-6 shadow-inner flex flex-col items-center justify-center border border-blue-200/50 dark:border-blue-900/40">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl mx-auto">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Karyawan"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating check badge */}
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-800 animate-bounce">
              <CheckCircle size={20} strokeWidth={3} />
            </div>
          </div>

          {/* Floating Pill Cards */}
          <div className="absolute -top-3 -left-3 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center gap-1.5">
            <Clock size={14} className="text-blue-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">07:55 WIB On Time</span>
          </div>

          <div className="absolute -bottom-3 -right-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">GPS Verified</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pb-8 space-y-3">
        <button
          onClick={() => navigateTo('login')}
          className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Mulai Sekarang</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sudah punya akun?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
