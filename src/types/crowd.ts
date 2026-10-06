export type CrowdLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface CrowdInfo {
  level: CrowdLevel;
  currentPatients: number;
  maxCapacity: number;
  estimatedWaitMinutes: number;
  recommendation: string;
  lastUpdated: string;
  trend?: 'increasing' | 'stable' | 'decreasing';
}

export interface DepartmentCrowd {
  id: string;
  hospitalId: string;
  hospitalName: string;
  name: string; // e.g. "General OPD", "Pediatrics", "Emergency", "Orthopedics"
  code: string;
  crowd: CrowdInfo;
  isOpen: boolean;
  activeDoctors: number;
}

export interface HospitalSummary {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  overallCrowdLevel: CrowdLevel;
  totalDepartments: number;
  averageWaitMinutes: number;
  distanceKm?: number;
  operatingHours: string;
  isEmergencyAvailable: boolean;
  departments: DepartmentCrowd[];
}
