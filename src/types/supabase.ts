export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'patient' | 'hospital' | 'admin';
          phone: string | null;
          hospital_id: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'patient' | 'hospital' | 'admin';
          phone?: string | null;
          hospital_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'patient' | 'hospital' | 'admin';
          phone?: string | null;
          hospital_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      hospitals: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          phone: string;
          operating_hours: string;
          is_emergency_available: boolean;
          overall_crowd_level: 'LOW' | 'MODERATE' | 'HIGH';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          city: string;
          phone: string;
          operating_hours?: string;
          is_emergency_available?: boolean;
          overall_crowd_level?: 'LOW' | 'MODERATE' | 'HIGH';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          city?: string;
          phone?: string;
          operating_hours?: string;
          is_emergency_available?: boolean;
          overall_crowd_level?: 'LOW' | 'MODERATE' | 'HIGH';
          created_at?: string;
        };
      };
      departments: {
        Row: {
          id: string;
          hospital_id: string;
          name: string;
          code: string;
          current_patients: number;
          max_capacity: number;
          estimated_wait_minutes: number;
          crowd_level: 'LOW' | 'MODERATE' | 'HIGH';
          recommendation: string;
          is_open: boolean;
          active_doctors: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hospital_id: string;
          name: string;
          code: string;
          current_patients?: number;
          max_capacity?: number;
          estimated_wait_minutes?: number;
          crowd_level?: 'LOW' | 'MODERATE' | 'HIGH';
          recommendation?: string;
          is_open?: boolean;
          active_doctors?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hospital_id?: string;
          name?: string;
          code?: string;
          current_patients?: number;
          max_capacity?: number;
          estimated_wait_minutes?: number;
          crowd_level?: 'LOW' | 'MODERATE' | 'HIGH';
          recommendation?: string;
          is_open?: boolean;
          active_doctors?: number;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          hospital_id: string;
          department_id: string;
          appointment_time: string;
          token_number: number;
          status: 'scheduled' | 'checked_in' | 'in_consultation' | 'completed' | 'cancelled';
          estimated_wait_minutes: number;
          crowd_level_at_booking: 'LOW' | 'MODERATE' | 'HIGH';
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          hospital_id: string;
          department_id: string;
          appointment_time: string;
          token_number: number;
          status?: 'scheduled' | 'checked_in' | 'in_consultation' | 'completed' | 'cancelled';
          estimated_wait_minutes: number;
          crowd_level_at_booking: 'LOW' | 'MODERATE' | 'HIGH';
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          hospital_id?: string;
          department_id?: string;
          appointment_time?: string;
          token_number?: number;
          status?: 'scheduled' | 'checked_in' | 'in_consultation' | 'completed' | 'cancelled';
          estimated_wait_minutes?: number;
          crowd_level_at_booking?: 'LOW' | 'MODERATE' | 'HIGH';
          notes?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          patient_id: string;
          type: 'crowd_alert' | 'appointment_reminder' | 'wait_time_update' | 'system_alert';
          title: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          type: 'crowd_alert' | 'appointment_reminder' | 'wait_time_update' | 'system_alert';
          title: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          type?: 'crowd_alert' | 'appointment_reminder' | 'wait_time_update' | 'system_alert';
          title?: string;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
