export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PATIENT: {
    DASHBOARD: '/patient',
    HOSPITALS: '/patient/hospitals',
    APPOINTMENTS: '/patient/appointments',
    NOTIFICATIONS: '/patient/notifications',
    PROFILE: '/patient/profile',
  },
  HOSPITAL: {
    DASHBOARD: '/hospital',
    DEPARTMENTS: '/hospital/departments',
    APPOINTMENTS: '/hospital/appointments',
    CROWD: '/hospital/crowd',
    ANALYTICS: '/hospital/analytics',
  },
} as const;
