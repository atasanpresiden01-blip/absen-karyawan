import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  ScreenType, 
  UserProfile, 
  AttendanceRecord, 
  AppNotification, 
  ShiftSchedule, 
  LeaveRequest 
} from '../types';

interface AppContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;
  previousScreen: ScreenType;
  currentUser: UserProfile;
  switchUser: (role: 'employee' | 'supervisor') => void;
  todayRecord: AttendanceRecord | null;
  historyRecords: AttendanceRecord[];
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  schedules: ShiftSchedule[];
  leaveRequests: LeaveRequest[];
  submitLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'status' | 'employeeName' | 'nik' | 'department'>) => void;
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected') => void;
  performClockIn: (location?: string) => { success: boolean; message: string; time: string };
  performClockOut: (location?: string) => { success: boolean; message: string; time: string };
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  biometricEnabled: boolean;
  setBiometricEnabled: (val: boolean) => void;
  leaveModalOpen: boolean;
  setLeaveModalOpen: (val: boolean) => void;
}

const defaultEmployee: UserProfile = {
  id: 'usr-1',
  nik: 'EMP-20240981',
  name: 'Andi Pratama',
  role: 'Senior Software Engineer',
  department: 'Technology & Product',
  email: 'andi.pratama@company.com',
  phone: '0812-3456-7890',
  joinDate: '12 Jan 2022',
  leaveBalance: 9,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  isSupervisor: false,
};

const defaultSupervisor: UserProfile = {
  id: 'usr-2',
  nik: 'EMP-20190112',
  name: 'Siti Rahayu, S.Kom',
  role: 'Engineering Manager & HR Lead',
  department: 'People Operations',
  email: 'siti.rahayu@company.com',
  phone: '0811-9876-5432',
  joinDate: '01 Mar 2019',
  leaveBalance: 12,
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
  isSupervisor: true,
};

const initialHistory: AttendanceRecord[] = [
  {
    id: 'att-1',
    date: '2026-10-04',
    dayName: 'Minggu',
    formattedDate: '04 Okt 2026',
    status: 'present',
    statusLabel: 'Libur Akhir Pekan',
    note: 'Weekend'
  },
  {
    id: 'att-2',
    date: '2026-10-03',
    dayName: 'Sabtu',
    formattedDate: '03 Okt 2026',
    status: 'present',
    statusLabel: 'Libur Akhir Pekan',
    note: 'Weekend'
  },
  {
    id: 'att-3',
    date: '2026-10-02',
    dayName: 'Jumat',
    formattedDate: '02 Okt 2026',
    clockIn: '07:52 WIB',
    clockOut: '17:05 WIB',
    status: 'present',
    statusLabel: 'Hadir Tepat Waktu',
    location: 'Kantor Pusat - Cyber 2'
  },
  {
    id: 'att-4',
    date: '2026-10-01',
    dayName: 'Kamis',
    formattedDate: '01 Okt 2026',
    clockIn: '08:14 WIB',
    clockOut: '17:30 WIB',
    status: 'late',
    statusLabel: 'Terlambat 14 Menit',
    location: 'Kantor Pusat - Cyber 2'
  },
  {
    id: 'att-5',
    date: '2026-09-30',
    dayName: 'Rabu',
    formattedDate: '30 Sep 2026',
    clockIn: '07:48 WIB',
    clockOut: '17:10 WIB',
    status: 'present',
    statusLabel: 'Hadir Tepat Waktu',
    location: 'WFH - Remote'
  },
  {
    id: 'att-6',
    date: '2026-09-29',
    dayName: 'Selasa',
    formattedDate: '29 Sep 2026',
    status: 'leave',
    statusLabel: 'Cuti Sakit',
    note: 'Surat dokter terlampir'
  },
  {
    id: 'att-7',
    date: '2026-09-28',
    dayName: 'Senin',
    formattedDate: '28 Sep 2026',
    clockIn: '07:50 WIB',
    clockOut: '17:02 WIB',
    status: 'present',
    statusLabel: 'Hadir Tepat Waktu',
    location: 'Kantor Pusat - Cyber 2'
  }
];

const initialSchedules: ShiftSchedule[] = [
  {
    id: 'sch-1',
    title: 'Regular Working Hours (WFO)',
    timeRange: '08:00 - 17:00 WIB',
    location: 'Kantor Pusat - Lantai 12',
    type: 'shift',
    status: 'Aktif',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: 'sch-2',
    title: 'Daily Standup & Sprint Sync',
    timeRange: '09:30 - 10:00 WIB',
    location: 'Ruang Rapat 3B / Google Meet',
    type: 'meeting',
    status: 'Mendatang',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
  },
  {
    id: 'sch-3',
    title: 'Tech Architecture Review',
    timeRange: '14:00 - 15:30 WIB',
    location: 'Townhall Room Lt. 8',
    type: 'meeting',
    status: 'Mendatang',
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  }
];

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Absensi Masuk Berhasil',
    description: 'Kehadiran Anda pada 05 Okt 2026 tercatat tepat waktu pukul 07:55 WIB.',
    timestamp: '07:55 WIB',
    read: false,
    type: 'attendance'
  },
  {
    id: 'notif-2',
    title: 'Pengingat Shift Kerja',
    description: 'Jadwal shift Reguler WFO Anda dimulai dalam 15 menit.',
    timestamp: '07:45 WIB',
    read: false,
    type: 'reminder'
  },
  {
    id: 'notif-3',
    title: 'Pengumuman HRD: Libur Nasional',
    description: 'Pemberitahuan operasional kantor selama libur nasional pekan depan.',
    timestamp: 'Kemarin',
    read: true,
    type: 'announcement'
  },
  {
    id: 'notif-4',
    title: 'Status Pengajuan Cuti Disetujui',
    description: 'Pengajuan cuti tahunan Anda tanggal 15 Okt 2026 telah disetujui atasan.',
    timestamp: '2 hari lalu',
    read: true,
    type: 'leave'
  }
];

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 'lvr-1',
    employeeName: 'Budi Santoso',
    nik: 'EMP-20230114',
    department: 'Technology & Product',
    type: 'Cuti Tahunan',
    startDate: '10 Okt 2026',
    endDate: '12 Okt 2026',
    reason: 'Acara keluarga di kampung halaman',
    status: 'pending'
  },
  {
    id: 'lvr-2',
    employeeName: 'Rina Wijaya',
    nik: 'EMP-20240219',
    department: 'Marketing & Growth',
    type: 'Sakit',
    startDate: '06 Okt 2026',
    endDate: '07 Okt 2026',
    reason: 'Demam dan flu (istirahat dokter)',
    status: 'approved'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultEmployee);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(true);
  const [leaveModalOpen, setLeaveModalOpen] = useState<boolean>(false);

  // Today's attendance state
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [historyRecords, setHistoryRecords] = useState<AttendanceRecord[]>(initialHistory);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [schedules] = useState<ShiftSchedule[]>(initialSchedules);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);

  const navigateTo = (screen: ScreenType) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUser = (role: 'employee' | 'supervisor') => {
    if (role === 'supervisor') {
      setCurrentUser(defaultSupervisor);
    } else {
      setCurrentUser(defaultEmployee);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const submitLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'status' | 'employeeName' | 'nik' | 'department'>) => {
    const newReq: LeaveRequest = {
      ...req,
      id: `lvr-${Date.now()}`,
      status: 'pending',
      employeeName: currentUser.name,
      nik: currentUser.nik,
      department: currentUser.department
    };
    setLeaveRequests(prev => [newReq, ...prev]);
    
    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Pengajuan Cuti Terkirim',
      description: `Pengajuan ${req.type} Anda berhasil dikirim ke HRD untuk approval.`,
      timestamp: 'Baru saja',
      read: false,
      type: 'leave'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateLeaveStatus = (id: string, status: 'approved' | 'rejected') => {
    setLeaveRequests(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const performClockIn = (location: string = 'Kantor Pusat - Cyber 2 Tower Lt. 12') => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const isLate = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 0);

    const record: AttendanceRecord = {
      id: `att-today-${Date.now()}`,
      date: '2026-10-05',
      dayName: 'Senin',
      formattedDate: '05 Okt 2026',
      clockIn: timeStr,
      status: isLate ? 'late' : 'present',
      statusLabel: isLate ? 'Terlambat Masuk' : 'Hadir Tepat Waktu',
      location: location
    };

    setTodayRecord(record);
    setHistoryRecords(prev => [record, ...prev.filter(r => r.date !== '2026-10-05')]);

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-clockin-${Date.now()}`,
        title: 'Clock-In Berhasil!',
        description: `Absen masuk tercatat pada ${timeStr} di ${location}.`,
        timestamp: timeStr,
        read: false,
        type: 'attendance'
      },
      ...prev
    ]);

    return { success: true, message: 'Clock-In Berhasil!', time: timeStr };
  };

  const performClockOut = (location: string = 'Kantor Pusat - Cyber 2 Tower Lt. 12') => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    if (!todayRecord) {
      // Clocking out directly
      const record: AttendanceRecord = {
        id: `att-today-${Date.now()}`,
        date: '2026-10-05',
        dayName: 'Senin',
        formattedDate: '05 Okt 2026',
        clockIn: '08:00 WIB',
        clockOut: timeStr,
        status: 'present',
        statusLabel: 'Selesai Jam Kerja',
        location: location
      };
      setTodayRecord(record);
      setHistoryRecords(prev => [record, ...prev.filter(r => r.date !== '2026-10-05')]);
    } else {
      const updated: AttendanceRecord = {
        ...todayRecord,
        clockOut: timeStr,
        statusLabel: 'Selesai Bekerja Hari Ini'
      };
      setTodayRecord(updated);
      setHistoryRecords(prev => prev.map(r => r.date === '2026-10-05' ? updated : r));
    }

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-clockout-${Date.now()}`,
        title: 'Clock-Out Selesai',
        description: `Terima kasih! Jam pulang kerja Anda tercatat pada ${timeStr}.`,
        timestamp: timeStr,
        read: false,
        type: 'attendance'
      },
      ...prev
    ]);

    return { success: true, message: 'Clock-Out Berhasil!', time: timeStr };
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        previousScreen,
        currentUser,
        switchUser,
        todayRecord,
        historyRecords,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        schedules,
        leaveRequests,
        submitLeaveRequest,
        updateLeaveStatus,
        performClockIn,
        performClockOut,
        darkMode,
        setDarkMode,
        biometricEnabled,
        setBiometricEnabled,
        leaveModalOpen,
        setLeaveModalOpen
      }}
    >
      <div className={darkMode ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
