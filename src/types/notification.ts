import { CrowdLevel } from './crowd';

export type NotificationType = 'crowd_alert' | 'appointment_reminder' | 'wait_time_update' | 'system_alert';

export interface PatientNotification {
  id: string;
  patientId: string;
  type: NotificationType;
  title: string;
  message: string;
  hospitalName?: string;
  departmentName?: string;
  crowdLevel?: CrowdLevel;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
