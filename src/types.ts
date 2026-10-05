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
  | 'supervisor'
  | 'office-settings'
  | 'employees';

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

export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  wifiSsid?: string;
  isHeadquarter: boolean;
}

export interface OfficeConfig {
  officeName: string;
  companyName: string;
  locations: OfficeLocation[];
  activeLocationId: string;
  workHoursStart: string; // "08:00"
  workHoursEnd: string;   // "17:00"
  lateToleranceMinutes: number; // 15
  requireSelfie: boolean;
  requireGps: boolean;
  strictGeofencing: boolean;
  allowWfh: boolean;
  antiFakeGps: boolean;
  wifiWhitelistEnabled: boolean;
  annualLeaveQuota: number; // 12
  workDays: string[]; // ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
}

