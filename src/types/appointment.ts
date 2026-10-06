import { CrowdLevel } from './crowd';

export type AppointmentStatus = 'scheduled' | 'checked_in' | 'in_consultation' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  hospitalId: string;
  hospitalName: string;
  departmentId: string;
  departmentName: string;
  appointmentTime: string;
  tokenNumber: number;
  status: AppointmentStatus;
  estimatedWaitMinutes: number;
  crowdLevelAtBooking: CrowdLevel;
  notes?: string;
  createdAt: string;
}
