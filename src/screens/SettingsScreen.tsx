import React, { useState } from 'react';
import { 
  Lock, 
  Bell, 
  Globe, 
  Moon, 
  Fingerprint, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Check,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const SettingsScreen: React.FC = () => {
  const { 
    navigateTo, 
    darkMode, 
    setDarkMode, 
    biometricEnabled, 
    setBiometricEnabled 
  } = useApp();

  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChanged(true);
    setTimeout(() => {
      setPasswordChanged(false);
      setModalPasswordOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 max-w-md mx-auto">
      <HeaderBar title="Pengaturan Aplikasi" backTo="home" />

      <div className="p-5 space-y-5">
        {/* Office Settings Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Manajemen Kantor & Perusahaan
          </h4>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <button
              onClick={() => navigateTo('office-settings')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl group-hover:scale-105 transition">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">Pengaturan Kantor & Geofencing</p>
                    <span className="text-[9px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-md">Baru</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Radius GPS, titik kantor, jam shift & keamanan</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Akun & Keamanan
          </h4>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
            <button
              onClick={() => setModalPasswordOpen(true)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                  <Lock size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Ganti Kata Sandi</p>
                  <p className="text-[11px] text-slate-400">Perbarui kata sandi akun secara berkala</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </button>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Bahasa Aplikasi</p>
                  <p className="text-[11px] text-slate-400">Pilihan bahasa antarmuka</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'id' | 'en')}
                className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl px-2.5 py-1.5 border-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English (US)</option>
              </select>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Preferensi Aplikasi
          </h4>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
            {/* Dark Mode Toggle */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                  <Moon size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Mode Gelap (Dark Mode)</p>
                  <p className="text-[11px] text-slate-400">Tampilan gelap yang nyaman di mata</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            {/* Biometric Toggle */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                  <Fingerprint size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Login Biometrik / FaceID</p>
                  <p className="text-[11px] text-slate-400">Masuk cepat menggunakan sidik jari</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={biometricEnabled}
                  onChange={(e) => setBiometricEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Support & About */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Bantuan & Info
          </h4>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Pusat Bantuan HR / Support</p>
                  <p className="text-[11px] text-slate-400">hrd@company.com / Ext: 104</p>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Versi Aplikasi</p>
                  <p className="text-[11px] text-slate-400">AbsenKaryawan v1.0.0 (Build Android)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('login')}
            className="w-full py-3.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-2xl border border-rose-200 dark:border-rose-900 transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            <span>Keluar dari Akun (Log Out)</span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {modalPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Ganti Kata Sandi</h3>
            {passwordChanged ? (
              <div className="py-6 text-center text-emerald-600">
                <Check size={40} className="mx-auto mb-2" />
                <p className="text-sm font-bold">Kata sandi berhasil diubah!</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <input
                  type="password"
                  placeholder="Kata Sandi Lama"
                  required
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <input
                  type="password"
                  placeholder="Kata Sandi Baru"
                  required
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalPasswordOpen(false)}
                    className="flex-1 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
