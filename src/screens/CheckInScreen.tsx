import React, { useState } from 'react';
import { 
  Camera, 
  QrCode, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';

export const CheckInScreen: React.FC = () => {
  const { navigateTo, performClockIn, performClockOut, todayRecord } = useApp();
  const [mode, setMode] = useState<'in' | 'out'>('in');
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [successResult, setSuccessResult] = useState<{
    show: boolean;
    title: string;
    time: string;
    message: string;
  } | null>(null);

  const handleTriggerAttendance = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      let res;
      if (mode === 'in') {
        res = performClockIn('Kantor Pusat - Cyber 2 Tower Lt. 12 (WFO)');
      } else {
        res = performClockOut('Kantor Pusat - Cyber 2 Tower Lt. 12 (WFO)');
      }

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback silently if confetti canvas not available
      }

      setSuccessResult({
        show: true,
        title: mode === 'in' ? 'Clock-In Berhasil!' : 'Clock-Out Berhasil!',
        time: res.time,
        message: mode === 'in' 
          ? 'Selamat bekerja! Kehadiran Anda telah dicatat oleh sistem.' 
          : 'Terima kasih atas kerja keras hari ini! Hati-hati di jalan.'
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 max-w-md mx-auto">
      <HeaderBar title="Check In / Clock Out" backTo="home" />

      <div className="p-5 space-y-4">
        {/* Toggle Mode: Clock In vs Clock Out */}
        <div className="bg-slate-200/80 dark:bg-slate-800 p-1 rounded-2xl flex">
          <button
            onClick={() => setMode('in')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'in'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock size={15} />
            <span>Clock In (Masuk)</span>
          </button>
          <button
            onClick={() => setMode('out')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'out'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock size={15} />
            <span>Clock Out (Pulang)</span>
          </button>
        </div>

        {/* Viewfinder / QR Scanner Frame - Matching Mockup Screen 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col items-center">
          <div className="relative w-64 h-64 bg-slate-950 rounded-2xl overflow-hidden border-4 border-slate-800 flex items-center justify-center shadow-inner">
            {/* Camera Viewfinder backdrop */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Laser scanning beam */}
            <div className="absolute w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent top-0 animate-[bounce_2.5s_infinite] shadow-[0_0_15px_#3b82f6]" />

            {/* QR Code graphic */}
            <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center">
              <QrCode size={130} className="text-slate-900" />
              <span className="text-[10px] font-bold text-slate-500 mt-2 tracking-widest">
                ABSEN-QR-OFFICE-01
              </span>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-3 border-l-3 border-blue-500 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-3 border-r-3 border-blue-500 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-3 border-l-3 border-blue-500 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-3 border-r-3 border-blue-500 rounded-br-lg pointer-events-none" />
          </div>

          <div className="mt-4 text-center">
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              {mode === 'in' ? 'Scan QR Masuk Kantor' : 'Scan QR Pulang Kantor'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
              Arahkan kamera ke QR Code yang terpajang di lobi atau meja resepsionis kantor
            </p>
          </div>

          {/* GPS Location Status Pill */}
          <div className="mt-4 w-full bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin size={14} className="text-blue-600" />
                <span>Cyber 2 Tower, Kuningan</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <ShieldCheck size={13} />
                <span>Radius Aman (15m)</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Koordinat: -6.2259° S, 106.8302° E (Terverifikasi Akurat)
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-2.5">
          <button
            onClick={handleTriggerAttendance}
            disabled={scanning}
            className={`w-full py-3.5 px-6 font-semibold rounded-2xl text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              mode === 'in'
                ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25'
            } disabled:opacity-70`}
          >
            {scanning ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Memverifikasi Presensi...</span>
              </>
            ) : (
              <>
                <Camera size={18} />
                <span>{mode === 'in' ? 'Clock In Sekarang' : 'Clock Out Sekarang'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleTriggerAttendance}
            className="w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <Navigation size={14} className="text-blue-600" />
            <span>Presensi Cepat via Lokasi GPS & Foto Selfie</span>
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {successResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {successResult.title}
            </h3>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
              Pukul {successResult.time}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {successResult.message}
            </p>

            <button
              onClick={() => {
                setSuccessResult(null);
                navigateTo('home');
              }}
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
