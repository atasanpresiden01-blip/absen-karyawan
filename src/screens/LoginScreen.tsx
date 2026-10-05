import React, { useState } from 'react';
import { Briefcase, User, Lock, Eye, EyeOff, Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { navigateTo, switchUser } = useApp();
  const [identifier, setIdentifier] = useState('EMP-20240981');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: 'employee' | 'supervisor' = 'employee') => {
    setLoading(true);
    switchUser(role);
    setTimeout(() => {
      setLoading(false);
      navigateTo('home');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-6">
        <button
          onClick={() => navigateTo('splash')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4 inline-flex items-center gap-1 hover:underline"
        >
          ← Kembali ke Beranda
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/20">
            <Briefcase size={22} />
          </div>
          <span className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
            Absen<span className="text-blue-600">Karyawan</span>
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Masuk ke akun kehadiran karyawan Anda
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 my-auto">
        <form onSubmit={(e) => { e.preventDefault(); handleLogin('employee'); }} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              NIK atau Email Perusahaan
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="EMP-20240981"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
              <span>Ingat saya</span>
            </label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2.5">
            Akun Demo Cepat
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLogin('employee')}
              className="p-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-semibold border border-blue-200/60 dark:border-blue-800 text-left transition flex items-center gap-2"
            >
              <User size={15} />
              <div>
                <p className="leading-tight">Karyawan</p>
                <p className="text-[10px] text-blue-500 dark:text-blue-400 font-normal">Andi Pratama</p>
              </div>
            </button>

            <button
              onClick={() => handleLogin('supervisor')}
              className="p-2.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-semibold border border-purple-200/60 dark:border-purple-800 text-left transition flex items-center gap-2"
            >
              <ShieldCheck size={15} />
              <div>
                <p className="leading-tight">HR / Manager</p>
                <p className="text-[10px] text-purple-500 dark:text-purple-400 font-normal">Siti Rahayu</p>
              </div>
            </button>
          </div>
        </div>

        {/* Biometric Quick Login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => handleLogin('employee')}
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 py-1"
          >
            <Fingerprint size={18} className="text-blue-600" />
            <span>Masuk dengan Sensor Biometrik</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kendala akun atau belum terdaftar?{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">Hubungi HR Department</span>
        </p>
      </div>
    </div>
  );
};
