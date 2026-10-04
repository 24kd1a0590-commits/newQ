import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ROUTES } from './constants/routes';

// Layout Wrappers
import { PatientLayout } from './layouts/PatientLayout';
import { HospitalLayout } from './layouts/HospitalLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

// Patient Pages
import { PatientDashboardPage } from './pages/patient/PatientDashboardPage';
import { HospitalsPage } from './pages/patient/HospitalsPage';
import { AppointmentsPage } from './pages/patient/AppointmentsPage';
import { NotificationsPage } from './pages/patient/NotificationsPage';
import { ProfilePage } from './pages/patient/ProfilePage';

// Hospital Pages
import { HospitalDashboardPage } from './pages/hospital/HospitalDashboardPage';
import { DepartmentsPage } from './pages/hospital/DepartmentsPage';
import { HospitalAppointmentsPage } from './pages/hospital/HospitalAppointmentsPage';
import { CrowdManagementPage } from './pages/hospital/CrowdManagementPage';
import { AnalyticsPage } from './pages/hospital/AnalyticsPage';

import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Auth Routes */}
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

          {/* Patient Portal Sub-routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<PatientDashboardPage />} />
            <Route path="hospitals" element={<HospitalsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Hospital Staff Desk Sub-routes */}
          <Route path="/hospital" element={<HospitalLayout />}>
            <Route index element={<HospitalDashboardPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="appointments" element={<HospitalAppointmentsPage />} />
            <Route path="crowd" element={<CrowdManagementPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
