import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Wifi, 
  Camera, 
  Navigation, 
  Check, 
  RotateCcw, 
  Save, 
  AlertCircle,
  Plus,
  Sliders,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import type { OfficeLocation } from '../types';

export const OfficeSettingsScreen: React.FC = () => {
  const { 
    officeConfig, 
    updateOfficeConfig, 
    activeOfficeLocation, 
    setActiveLocation,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'location' | 'hours' | 'security'>('location');
  const [selectedLocId, setSelectedLocId] = useState<string>(officeConfig.activeLocationId);

  // Form states initialized from active location
  const currentLoc = officeConfig.locations.find(l => l.id === selectedLocId) || activeOfficeLocation;
  const [locName, setLocName] = useState(currentLoc.name);
  const [locAddress, setLocAddress] = useState(currentLoc.address);
  const [locLat, setLocLat] = useState(currentLoc.latitude.toString());
  const [locLng, setLocLng] = useState(currentLoc.longitude.toString());
  const [locRadius, setLocRadius] = useState(currentLoc.radiusMeters);
  const [locWifi, setLocWifi] = useState(currentLoc.wifiSsid || '');

  // Office policies
  const [workStart, setWorkStart] = useState(officeConfig.workHoursStart);
  const [workEnd, setWorkEnd] = useState(officeConfig.workHoursEnd);
  const [tolerance, setTolerance] = useState(officeConfig.lateToleranceMinutes);
  const [requireSelfie, setRequireSelfie] = useState(officeConfig.requireSelfie);
  const [requireGps, setRequireGps] = useState(officeConfig.requireGps);
  const [antiFakeGps, setAntiFakeGps] = useState(officeConfig.antiFakeGps);
  const [allowWfh, setAllowWfh] = useState(officeConfig.allowWfh);
  const [wifiWhitelist, setWifiWhitelist] = useState(officeConfig.wifiWhitelistEnabled);
  const [leaveQuota, setLeaveQuota] = useState(officeConfig.annualLeaveQuota);

  // Feedback notifications
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);

  const handleSelectLocation = (loc: OfficeLocation) => {
    setSelectedLocId(loc.id);
    setLocName(loc.name);
    setLocAddress(loc.address);
    setLocLat(loc.latitude.toString());
    setLocLng(loc.longitude.toString());
    setLocRadius(loc.radiusMeters);
    setLocWifi(loc.wifiSsid || '');
  };

  const handleDetectCurrentGPS = () => {
    if (!navigator.geolocation) {
      setGpsMessage('Browser tidak mendukung pendeteksian geolokasi.');
      return;
    }

    setGpsDetecting(true);
    setGpsMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocLat(pos.coords.latitude.toFixed(6));
        setLocLng(pos.coords.longitude.toFixed(6));
        setGpsDetecting(false);
        setGpsMessage(`Lokasi GPS terdeteksi akurat (±${Math.round(pos.coords.accuracy)}m)`);
        setTimeout(() => setGpsMessage(null), 4000);
      },
      (err) => {
        setGpsDetecting(false);
        // Fallback default coordinates (Cyber 2 Tower Kuningan)
        setLocLat('-6.225574');
        setLocLng('106.831518');
        setGpsMessage('Izin GPS tidak diberikan, koordinat diset ke titik default kantor.');
        setTimeout(() => setGpsMessage(null), 4000);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    // Update location list
    const updatedLocations = officeConfig.locations.map(loc => {
      if (loc.id === selectedLocId) {
        return {
          ...loc,
          name: locName,
          address: locAddress,
          latitude: parseFloat(locLat) || loc.latitude,
          longitude: parseFloat(locLng) || loc.longitude,
          radiusMeters: Number(locRadius),
          wifiSsid: locWifi
        };
      }
      return loc;
    });

    updateOfficeConfig({
      activeLocationId: selectedLocId,
      locations: updatedLocations,
      officeName: locName,
      workHoursStart: workStart,
      workHoursEnd: workEnd,
      lateToleranceMinutes: Number(tolerance),
      requireSelfie,
      requireGps,
      antiFakeGps,
      allowWfh,
      wifiWhitelistEnabled: wifiWhitelist,
      annualLeaveQuota: Number(leaveQuota)
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <HeaderBar 
        title="Pengaturan Kantor & Geofencing" 
        backTo="home" 
        rightAction={
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95"
          >
            <Save size={14} />
            <span>Simpan</span>
          </button>
        }
      />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner Overview */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-2">
                <Building2 size={12} />
                {officeConfig.companyName}
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">{officeConfig.officeName}</h2>
              <p className="text-xs text-blue-100 mt-1 max-w-xl">
                Konfigurasi radius geofencing presensi, koordinat kantor, toleransi keterlambatan, dan kebijakan keamanan kehadiran karyawan.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <div className="p-2.5 bg-white/20 rounded-xl text-white">
                <Navigation size={22} className="animate-spin-slow" />
              </div>
              <div>
                <p className="text-[10px] text-blue-200 uppercase font-bold">Radius Aktif</p>
                <p className="text-lg font-black">{locRadius} Meter</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm rounded-2xl flex items-center gap-3 shadow-md animate-in fade-in">
            <Check size={20} className="text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Pengaturan Berhasil Disimpan!</p>
              <p className="text-xs opacity-90">Koordinat, radius geofencing, dan kebijakan kantor telah diperbarui.</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs gap-1">
          <button
            onClick={() => setActiveTab('location')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'location'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin size={16} />
            <span>Lokasi & Geofence</span>
          </button>

          <button
            onClick={() => setActiveTab('hours')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'hours'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock size={16} />
            <span>Jam Kerja & Shift</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Kebijakan Presensi</span>
          </button>
        </div>

        {/* TAB 1: Lokasi & Geofence */}
        {activeTab === 'location' && (
          <div className="space-y-6">
            {/* Cabang Kantor Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pilih Cabang / Titik Absensi</h3>
                  <p className="text-xs text-slate-400">Pilih kantor aktif tempat validasi kehadiran diberlakukan</p>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-1 rounded-full">
                  {officeConfig.locations.length} Lokasi Terdaftar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {officeConfig.locations.map((loc) => {
                  const isSelected = loc.id === selectedLocId;
                  const isActiveHQ = loc.id === officeConfig.activeLocationId;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className={`p-4 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            loc.isHeadquarter 
                              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {loc.isHeadquarter ? 'Kantor Pusat' : 'Cabang'}
                          </span>
                          {isActiveHQ && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              Aktif
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug line-clamp-1">
                          {loc.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {loc.address}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Radius: {loc.radiusMeters}m</span>
                        {isSelected && <Check size={14} className="text-blue-600 font-bold" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Koordinat & Geofence Radius */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Input Detail */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders size={16} className="text-blue-600" />
                    Detail Koordinat Lokasi
                  </h3>
                  <button
                    type="button"
                    onClick={handleDetectCurrentGPS}
                    disabled={gpsDetecting}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Navigation size={13} className={gpsDetecting ? 'animate-spin' : ''} />
                    <span>{gpsDetecting ? 'Mendeteksi...' : 'Deteksi GPS Saya'}</span>
                  </button>
                </div>

                {gpsMessage && (
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{gpsMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Nama Lokasi / Kantor
                  </label>
                  <input
                    type="text"
                    value={locName}
                    onChange={(e) => setLocName(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={locAddress}
                    onChange={(e) => setLocAddress(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={locLat}
                      onChange={(e) => setLocLat(e.target.value)}
                      placeholder="-6.225574"
                      className="w-full text-xs font-mono font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={locLng}
                      onChange={(e) => setLocLng(e.target.value)}
                      placeholder="106.831518"
                      className="w-full text-xs font-mono font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>
                </div>

                {/* Slider Radius Geofencing */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Radius Geofencing (Presensi)
                    </label>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full">
                      {locRadius} Meter
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="25"
                    value={locRadius}
                    onChange={(e) => setLocRadius(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>25m (Sangat Ketat)</span>
                    <span>100m (Standar Kantor)</span>
                    <span>500m (Area Pabrik/Kampus)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Nama Jaringan WiFi Kantor (SSID)
                  </label>
                  <div className="relative">
                    <Wifi size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={locWifi}
                      onChange={(e) => setLocWifi(e.target.value)}
                      placeholder="Contoh: Cyber2-Office-5G"
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Radar Geofencing Simulation Visualizer */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Navigation size={16} className="text-emerald-500" />
                      Visualisasi Radar Geofence
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Live Simulation
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Karyawan hanya dapat melakukan absen masuk/pulang saat berada di dalam lingkaran radius {locRadius}m dari titik pusat kantor.
                  </p>
                </div>

                {/* Radar Graphic */}
                <div className="relative w-full aspect-4/3 max-h-60 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center my-2 shadow-inner">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Concentric circles */}
                  <div className="absolute w-48 h-48 rounded-full border border-blue-500/20" />
                  <div className="absolute w-36 h-36 rounded-full border border-blue-500/30" />
                  <div className="absolute w-24 h-24 rounded-full border border-blue-500/40 animate-ping opacity-25" />

                  {/* Geofence Active Circle Area */}
                  <div 
                    className="absolute rounded-full bg-blue-500/20 border-2 border-blue-400/80 flex items-center justify-center transition-all duration-300"
                    style={{
                      width: `${Math.min(220, Math.max(70, (locRadius / 500) * 220))}px`,
                      height: `${Math.min(220, Math.max(70, (locRadius / 500) * 220))}px`
                    }}
                  >
                    <span className="text-[10px] font-bold text-blue-300 bg-slate-950/70 px-2 py-0.5 rounded-full border border-blue-400/40">
                      Radius {locRadius}m
                    </span>
                  </div>

                  {/* Center pin (Office Pin) */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/50 ring-4 ring-blue-400/30">
                      <Building2 size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-white bg-slate-900/90 px-1.5 py-0.5 rounded-md mt-1 border border-slate-700">
                      Titik Pusat Kantor
                    </span>
                  </div>

                  {/* Employee simulated marker */}
                  <div className="absolute top-10 right-14 flex items-center gap-1 bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>Karyawan (Dalam Radius)</span>
                  </div>
                </div>

                {/* Status Indicator Bar */}
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <div>
                      <p className="font-bold text-emerald-900 dark:text-emerald-200">Geofencing & Anti Mock-GPS Aktif</p>
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400">Presensi via Fake GPS / Fake Location akan otomatis diblokir.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Jam Kerja & Shift */}
        {activeTab === 'hours' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Jadwal Jam Kerja & Kebijakan Shift</h3>
              <p className="text-xs text-slate-400 mt-0.5">Konfigurasi batas jam kehadiran kerja resmi perusahaan</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Jam Masuk Standar (WIB)
                </label>
                <input
                  type="time"
                  value={workStart}
                  onChange={(e) => setWorkStart(e.target.value)}
                  className="w-full text-base font-bold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
                <p className="text-[10px] text-slate-400 mt-1.5">Clock-in dibuka mulai 30 menit sebelum jam ini.</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Jam Pulang Standar (WIB)
                </label>
                <input
                  type="time"
                  value={workEnd}
                  onChange={(e) => setWorkEnd(e.target.value)}
                  className="w-full text-base font-bold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
                <p className="text-[10px] text-slate-400 mt-1.5">Clock-out sebelum jam ini dicatat pulang awal.</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Toleransi Telat (Menit)
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full text-base font-bold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
                <p className="text-[10px] text-slate-400 mt-1.5">Melewati {tolerance} menit dihitung status 'Terlambat'.</p>
              </div>
            </div>

            {/* Hari Kerja Aktif */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Hari Kerja Aktif Perusahaan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => {
                  const isActive = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].includes(day);
                  return (
                    <div
                      key={day}
                      className={`p-3 rounded-xl border text-center transition ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 text-blue-700 dark:text-blue-300 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400'
                      }`}
                    >
                      <p className="text-xs">{day}</p>
                      <span className="text-[10px] font-medium block mt-0.5">
                        {isActive ? '08:00 - 17:00' : 'Libur'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Kebijakan Keamanan Presensi */}
        {activeTab === 'security' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Verifikasi & Keamanan Presensi</h3>
              <p className="text-xs text-slate-400 mt-0.5">Atur syarat validasi kehadiran untuk mencegah kecurangan absen</p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Selfie Requirement */}
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Wajib Foto Selfie (Face Check)</h4>
                    <p className="text-[11px] text-slate-400">Karyawan wajib mengambil foto saat clock-in & clock-out</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireSelfie}
                    onChange={(e) => setRequireSelfie(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* GPS Geofence Requirement */}
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Wajib GPS & Radius Geofencing</h4>
                    <p className="text-[11px] text-slate-400">Blokir tombol absen jika lokasi karyawan berada di luar radius kantor</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireGps}
                    onChange={(e) => setRequireGps(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Anti Mock-GPS */}
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Blokir Fake GPS (Mock Location)</h4>
                    <p className="text-[11px] text-slate-400">Deteksi dan tolak kehadiran dari aplikasi fake GPS atau emulator</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={antiFakeGps}
                    onChange={(e) => setAntiFakeGps(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Allow WFH */}
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Izinkan Presensi WFH (Remote)</h4>
                    <p className="text-[11px] text-slate-400">Memberikan opsi tipe kehadiran Work From Home jika disetujui atasan</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowWfh}
                    onChange={(e) => setAllowWfh(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Leave Quota */}
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Kuota Cuti Tahunan Standar</h4>
                    <p className="text-[11px] text-slate-400">Jatah cuti berbayar karyawan per tahun</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={leaveQuota}
                    onChange={(e) => setLeaveQuota(Number(e.target.value))}
                    className="w-16 text-center text-xs font-bold px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <span className="text-xs text-slate-500 font-semibold">Hari</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Bottom Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => navigateTo('settings')}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            ← Kembali ke Pengaturan Aplikasi
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
            >
              <Save size={16} />
              <span>Simpan Perubahan Pengaturan Kantor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
