import React, { useState } from 'react';
import { X, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeaveRequestModal: React.FC = () => {
  const { leaveModalOpen, setLeaveModalOpen, submitLeaveRequest } = useApp();
  const [type, setType] = useState<'Cuti Tahunan' | 'Sakit' | 'Izin Keperluan Pribadi'>('Cuti Tahunan');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!leaveModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) return;

    submitLeaveRequest({
      type,
      startDate,
      endDate,
      reason
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLeaveModalOpen(false);
      setReason('');
      setStartDate('');
      setEndDate('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 transition-all max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 rounded-lg">
              <Calendar size={20} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Pengajuan Izin / Cuti</h3>
          </div>
          <button
            onClick={() => setLeaveModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 size={56} className="text-emerald-500 mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">Pengajuan Berhasil Dikirim!</h4>
            <p className="text-sm text-slate-500 mt-1">Notifikasi telah dikirimkan ke HRD & Manager.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Jenis Pengajuan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Cuti Tahunan', 'Sakit', 'Izin Keperluan Pribadi'] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition ${
                      type === t
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {t === 'Izin Keperluan Pribadi' ? 'Izin Pribadi' : t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Mulai Tanggal
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Sampai Tanggal
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Alasan / Keterangan
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan keterangan detail alasan izin/cuti..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                <span>Kirim Pengajuan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
