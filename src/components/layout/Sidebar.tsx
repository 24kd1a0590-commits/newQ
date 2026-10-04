import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Bell,
  User,
  Users,
  BarChart3,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import { CrowdBadge } from '../ui/CrowdBadge';

export interface SidebarProps {
  portalType: 'patient' | 'hospital';
}

export const Sidebar: React.FC<SidebarProps> = ({ portalType }) => {
  const { user } = useAuth();

  const patientNav = [
    { label: 'Overview', to: ROUTES.PATIENT.DASHBOARD, icon: LayoutDashboard, exact: true },
    { label: 'Hospitals & Crowd', to: ROUTES.PATIENT.HOSPITALS, icon: Building2 },
    { label: 'My Appointments', to: ROUTES.PATIENT.APPOINTMENTS, icon: Calendar },
    { label: 'Surge Notifications', to: ROUTES.PATIENT.NOTIFICATIONS, icon: Bell },
    { label: 'Patient Profile', to: ROUTES.PATIENT.PROFILE, icon: User },
  ];

  const hospitalNav = [
    { label: 'Hospital Overview', to: ROUTES.HOSPITAL.DASHBOARD, icon: LayoutDashboard, exact: true },
    { label: 'Live Crowd Telemetry', to: ROUTES.HOSPITAL.CROWD, icon: Sliders },
    { label: 'Departments & Capacity', to: ROUTES.HOSPITAL.DEPARTMENTS, icon: Building2 },
    { label: 'Queue Management', to: ROUTES.HOSPITAL.APPOINTMENTS, icon: Users },
    { label: 'Peak Analytics', to: ROUTES.HOSPITAL.ANALYTICS, icon: BarChart3 },
  ];

  const items = portalType === 'patient' ? patientNav : hospitalNav;

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-24 space-y-6">
        {/* User / Facility Card */}
        <div className="mediq-card p-4 border border-[#E8E2D5] bg-white">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm",
              portalType === 'patient' ? "bg-[#2B4C3F]" : "bg-[#8574B3]"
            )}>
              {portalType === 'patient' ? <User className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-[#252525] truncate">
                {portalType === 'patient' ? user?.fullName || 'Sarah Jenkins' : 'CityCare Hospital'}
              </h4>
              <p className="text-[11px] text-[#5C5852] truncate">
                {portalType === 'patient' ? 'Patient Companion' : 'General OPD & Triage'}
              </p>
            </div>
          </div>

          {portalType === 'hospital' && (
            <div className="mt-3 pt-3 border-t border-[#E8E2D5] flex items-center justify-between">
              <span className="text-[11px] text-[#5C5852]">Overall Status:</span>
              <CrowdBadge level="HIGH" size="sm" showDot={false} />
            </div>
          )}
        </div>

        {/* Navigation List */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8C867D] mb-2">
            {portalType === 'patient' ? 'Patient Portal' : 'Hospital Console'}
          </p>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                    isActive
                      ? portalType === 'patient'
                        ? 'bg-[#2B4C3F] text-white shadow-sm'
                        : 'bg-[#8574B3] text-white shadow-sm'
                      : 'text-[#5C5852] hover:text-[#252525] hover:bg-[#EFEBE1]'
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-2xl bg-[#EFEBE1] border border-[#E8E2D5] text-xs text-[#5C5852] space-y-1">
          <div className="flex items-center gap-1.5 text-[#2B4C3F] font-bold text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PostgreSQL Architecture</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Real-time database integration active. Patient & hospital consoles stay synchronized.
          </p>
        </div>
      </div>
    </aside>
  );
};
