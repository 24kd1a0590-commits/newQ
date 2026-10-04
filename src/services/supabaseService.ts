import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { HospitalSummary, DepartmentCrowd, CrowdLevel } from '../types/crowd';
import { MOCK_HOSPITALS, MOCK_APPOINTMENTS, MOCK_NOTIFICATIONS } from '../constants/mockData';
import { Appointment } from '../types/appointment';
import { PatientNotification } from '../types/notification';

export const HospitalService = {
  /**
   * Fetches all hospitals with department crowd levels
   */
  async getHospitals(): Promise<{ data: HospitalSummary[]; isMock: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { data: MOCK_HOSPITALS, isMock: true, error: null };
    }

    try {
      const { data: rawHospitals, error: hospErr } = await supabase
        .from('hospitals')
        .select('*');

      if (hospErr) throw hospErr;

      const { data: rawDepts, error: deptErr } = await supabase
        .from('departments')
        .select('*');

      if (deptErr) throw deptErr;

      // Map Supabase rows to domain types
      const mappedHospitals: HospitalSummary[] = (rawHospitals || []).map((h: any) => {
        const hospitalDepts: DepartmentCrowd[] = (rawDepts || [])
          .filter((d: any) => d.hospital_id === h.id)
          .map((d: any) => ({
            id: d.id,
            hospitalId: d.hospital_id,
            hospitalName: h.name,
            name: d.name,
            code: d.code,
            isOpen: d.is_open ?? true,
            activeDoctors: d.active_doctors ?? 2,
            crowd: {
              level: d.crowd_level as CrowdLevel,
              currentPatients: d.current_patients ?? 0,
              maxCapacity: d.max_capacity ?? 100,
              estimatedWaitMinutes: d.estimated_wait_minutes ?? 15,
              recommendation: d.recommendation || 'Standard queue flow.',
              lastUpdated: 'Just now',
            },
          }));

        return {
          id: h.id,
          name: h.name,
          address: h.address,
          city: h.city,
          phone: h.phone,
          overallCrowdLevel: h.overall_crowd_level as CrowdLevel,
          totalDepartments: hospitalDepts.length,
          averageWaitMinutes:
            hospitalDepts.length > 0
              ? Math.round(
                  hospitalDepts.reduce((acc, curr) => acc + curr.crowd.estimatedWaitMinutes, 0) /
                    hospitalDepts.length
                )
              : 0,
          operatingHours: h.operating_hours || '08:00 AM - 08:00 PM',
          isEmergencyAvailable: h.is_emergency_available ?? true,
          departments: hospitalDepts,
        };
      });

      return { data: mappedHospitals, isMock: false, error: null };
    } catch (err: any) {
      console.warn('Supabase fetch error, using fallback preview data:', err);
      return { data: MOCK_HOSPITALS, isMock: true, error: err.message || 'Error fetching data' };
    }
  },

  /**
   * Updates department crowd telemetry (Used by hospital staff dashboard)
   */
  async updateDepartmentCrowd(
    departmentId: string,
    crowdLevel: CrowdLevel,
    currentPatients: number,
    estimatedWaitMinutes: number,
    recommendation: string
  ): Promise<{ success: boolean; isMock: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { success: true, isMock: true, error: null };
    }

    try {
      const { error } = await supabase
        .from('departments')
        .update({
          crowd_level: crowdLevel,
          current_patients: currentPatients,
          estimated_wait_minutes: estimatedWaitMinutes,
          recommendation: recommendation,
          updated_at: new Date().toISOString(),
        } as any)
        .eq('id', departmentId);

      if (error) throw error;
      return { success: true, isMock: false, error: null };
    } catch (err: any) {
      return { success: false, isMock: false, error: err.message };
    }
  },
};

export const PatientService = {
  async getAppointments(patientId: string): Promise<{ data: Appointment[]; isMock: boolean }> {
    if (!isSupabaseConfigured) {
      return { data: MOCK_APPOINTMENTS, isMock: true };
    }
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId);

      if (error || !data) return { data: MOCK_APPOINTMENTS, isMock: true };

      const mapped: Appointment[] = (data as any[]).map((a) => ({
        id: a.id,
        patientId: a.patient_id,
        patientName: 'Patient',
        hospitalId: a.hospital_id,
        hospitalName: 'Hospital',
        departmentId: a.department_id,
        departmentName: 'Department',
        appointmentTime: a.appointment_time,
        tokenNumber: a.token_number,
        status: a.status,
        estimatedWaitMinutes: a.estimated_wait_minutes,
        crowdLevelAtBooking: a.crowd_level_at_booking as CrowdLevel,
        notes: a.notes || undefined,
        createdAt: a.created_at,
      }));

      return { data: mapped, isMock: false };
    } catch {
      return { data: MOCK_APPOINTMENTS, isMock: true };
    }
  },

  async getNotifications(patientId: string): Promise<{ data: PatientNotification[]; isMock: boolean }> {
    if (!isSupabaseConfigured) {
      return { data: MOCK_NOTIFICATIONS, isMock: true };
    }
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('patient_id', patientId);

      if (error || !data) return { data: MOCK_NOTIFICATIONS, isMock: true };

      const mapped: PatientNotification[] = (data as any[]).map((n) => ({
        id: n.id,
        patientId: n.patient_id,
        type: n.type,
        title: n.title,
        message: n.message,
        timestamp: n.created_at,
        isRead: n.is_read,
      }));

      return { data: mapped, isMock: false };
    } catch {
      return { data: MOCK_NOTIFICATIONS, isMock: true };
    }
  },
};
