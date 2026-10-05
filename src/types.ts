export type ScreenType = 
  | 'splash'
  | 'login'
  | 'home'
  | 'checkin'
  | 'history'
  | 'schedule'
  | 'profile'
  | 'notifications'
  | 'settings'
  | 'supervisor';

export type AttendanceStatus = 'present' | 'late' | 'sick' | 'leave' | 'absent';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  formattedDate: string;
  clockIn?: string;
  clockOut?: string;
  status: AttendanceStatus;
  statusLabel: string;
  location?: string;
  note?: string;
}

export interface UserProfile {
  id: string;
  nik: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  leaveBalance: number;
  avatarUrl: string;
  isSupervisor: boolean;
}

export interface ShiftSchedule {
  id: string;
  title: string;
  timeRange: string;
  location: string;
  type: 'shift' | 'meeting' | 'holiday';
  status?: string;
  color?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'attendance' | 'reminder' | 'announcement' | 'leave';
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  nik: string;
  department: string;
  type: 'Cuti Tahunan' | 'Sakit' | 'Izin Keperluan Pribadi';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}
