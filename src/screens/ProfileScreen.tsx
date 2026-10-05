import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Edit3, 
  Settings, 
  CheckCircle, 
  ShieldCheck, 
  FileText,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const ProfileScreen: React.FC = () => {
  const { currentUser, navigateTo } = useApp();
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setEditing(false);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 w-full max-w-2xl mx-auto">
      <HeaderBar 
        title="Profil Karyawan" 
        backTo="home"
        showSettings={true}
      />

      <div className="p-5 space-y-4">
        {/* Profile Card Header - Matching screen 7 in mockup */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 text-center shadow-xs">
          <div className="relative inline-block mx-auto mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-md">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white shadow-md">
              <ShieldCheck size={14} />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {currentUser.name}
          </h3>
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
            {currentUser.role}
          </p>
          <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-2">
            {currentUser.department}
          </span>

          {/* Quick Leave Balance Pill */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-around">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Sisa Cuti Tahunan</p>
              <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">{currentUser.leaveBalance} Hari</p>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Status Kepegawaian</p>
              <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">Tetap (PKWTT)</p>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Informasi Pribadi & Kontak
          </h4>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Perubahan data berhasil disimpan!</span>
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500">Email Kantor</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mt-1"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 py-2 text-xs font-semibold bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl shadow-xs"
                >
                  Simpan
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 flex items-center gap-2">
                  <User size={15} />
                  <span>Nomor Induk Karyawan (NIK)</span>
                </span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">{currentUser.nik}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar size={15} />
                  <span>Tanggal Bergabung</span>
                </span>
                <span className="font-bold text-slate-800 dark:text-white">{currentUser.joinDate}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 flex items-center gap-2">
                  <Mail size={15} />
                  <span>Email Perusahaan</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-white">{email}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 flex items-center gap-2">
                  <Phone size={15} />
                  <span>Nomor WhatsApp</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-white">{phone}</span>
              </div>
            </div>
          )}

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Edit3 size={15} />
              <span>Edit Profil & Kontak</span>
            </button>
          )}
        </div>

        {/* Quick App Settings Link */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
              <Settings size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Pengaturan Aplikasi</p>
              <p className="text-[11px] text-slate-400">Mode gelap, biometrik & kata sandi</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('settings')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Buka
          </button>
        </div>
      </div>
    </div>
  );
};
