import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  Check, 
  X, 
  Download, 
  Calendar, 
  ShieldCheck, 
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const SupervisorScreen: React.FC = () => {
  const { leaveRequests, updateLeaveStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('Semua');
  const [exportNotice, setExportNotice] = useState(false);

  const teamMembers = [
    { id: '1', name: 'Andi Pratama', role: 'Sr. Software Engineer', dept: 'Technology', status: 'Hadir', time: '07:55 WIB', type: 'present' },
    { id: '2', name: 'Budi Santoso', role: 'Frontend Engineer', dept: 'Technology', status: 'Hadir', time: '07:48 WIB', type: 'present' },
    { id: '3', name: 'Doni Siregar', role: 'QA Automation', dept: 'Technology', status: 'Terlambat', time: '08:14 WIB', type: 'late' },
    { id: '4', name: 'Rina Wijaya', role: 'Product Marketing', dept: 'Marketing', status: 'Sakit (Izin)', time: '-', type: 'leave' },
    { id: '5', name: 'Maya Anggraini', role: 'UI/UX Designer', dept: 'Product', status: 'Hadir', time: '07:52 WIB', type: 'present' },
    { id: '6', name: 'Fajar Nugraha', role: 'DevOps Specialist', dept: 'Technology', status: 'Hadir', time: '07:58 WIB', type: 'present' },
  ];

  const filteredMembers = teamMembers.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'Semua' || m.dept === selectedDept;
    return matchSearch && matchDept;
  });

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 max-w-md mx-auto">
      <HeaderBar 
        title="Dashboard Supervisor & HR" 
        backTo="home"
        rightAction={
          <button
            onClick={handleExport}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-full"
            title="Export Rekap"
          >
            <Download size={18} />
          </button>
        }
      />

      <div className="p-5 space-y-4">
        {/* Supervisor Profile Card */}
        <div className="bg-linear-to-br from-indigo-700 to-purple-800 rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
                alt="Supervisor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base">Siti Rahayu, S.Kom</h3>
                <ShieldCheck size={16} className="text-emerald-400" />
              </div>
              <p className="text-xs text-indigo-200">People Operations & Lead Manager</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-3.5 border-t border-white/20 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10px] uppercase text-indigo-200">Total Tim</p>
              <p className="text-lg font-extrabold mt-0.5">42 Orang</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-emerald-300">Hadir Hari Ini</p>
              <p className="text-lg font-extrabold mt-0.5 text-emerald-300">39 (92%)</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-amber-300">Izin / Sakit</p>
              <p className="text-lg font-extrabold mt-0.5 text-amber-300">3 Orang</p>
            </div>
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs rounded-2xl flex items-center gap-2 animate-in fade-in">
            <FileSpreadsheet size={16} className="text-emerald-600" />
            <span>Laporan Rekap Kehadiran Bulan Ini berhasil diexport (Format Excel .xlsx)</span>
          </div>
        )}

        {/* Section 1: Pending Leave Approvals */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Persetujuan Cuti / Izin ({leaveRequests.filter(r => r.status === 'pending').length})
            </h4>
          </div>

          <div className="space-y-3">
            {leaveRequests.filter(r => r.status === 'pending').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-2">Tidak ada permohonan yang menunggu persetujuan</p>
            ) : (
              leaveRequests.filter(r => r.status === 'pending').map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">{req.employeeName}</h5>
                      <p className="text-[10px] text-slate-400">{req.nik} • {req.department}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                      {req.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {req.startDate} s/d {req.endDate}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">"{req.reason}"</p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'rejected')}
                      className="flex-1 py-1.5 px-3 bg-white dark:bg-slate-800 border border-rose-300 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-50 transition flex items-center justify-center gap-1"
                    >
                      <X size={14} />
                      <span>Tolak</span>
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'approved')}
                      className="flex-1 py-1.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-xs transition flex items-center justify-center gap-1"
                    >
                      <Check size={14} />
                      <span>Setujui</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 2: Real-time Team Attendance Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Presensi Anggota Tim
            </h4>
            <span className="text-[11px] text-blue-600 font-semibold">Real-time</span>
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama karyawan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredMembers.map((member) => (
              <div key={member.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">{member.name}</h5>
                  <p className="text-[10px] text-slate-400">{member.role}</p>
                </div>

                <div className="text-right">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.type === 'present'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : member.type === 'late'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                      : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                  }`}>
                    {member.status} {member.time !== '-' ? `(${member.time})` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
