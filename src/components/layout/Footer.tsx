import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8E2D5] bg-[#EFEBE1]/80 text-[#5C5852] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand & Vision */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2B4C3F] flex items-center justify-center text-white font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-[#252525] tracking-tight">MEDIQ</span>
          </div>
          <p className="text-xs text-[#252525] font-semibold leading-relaxed italic">
            "Don't wait to find out. Know before you go."
          </p>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            Human-centered smart hospital crowd-awareness and patient decision-support platform connecting patients with live activity telemetry.
          </p>
        </div>

        {/* Patient Portal Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#252525] uppercase tracking-wider">Patient Portal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to={ROUTES.PATIENT.HOSPITALS} className="hover:text-[#2B4C3F] transition-colors">
                Find Hospital & Crowd Status
              </Link>
            </li>
            <li>
              <Link to={ROUTES.PATIENT.APPOINTMENTS} className="hover:text-[#2B4C3F] transition-colors">
                Smart Queue Tokens
              </Link>
            </li>
            <li>
              <Link to={ROUTES.PATIENT.NOTIFICATIONS} className="hover:text-[#2B4C3F] transition-colors">
                Crowd Surge Alerts
              </Link>
            </li>
            <li>
              <Link to={ROUTES.PATIENT.PROFILE} className="hover:text-[#2B4C3F] transition-colors">
                Patient Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Hospital Portal Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#252525] uppercase tracking-wider">Hospital Desk</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to={ROUTES.HOSPITAL.CROWD} className="hover:text-[#8574B3] transition-colors">
                Live Department Capacity Controls
              </Link>
            </li>
            <li>
              <Link to={ROUTES.HOSPITAL.DEPARTMENTS} className="hover:text-[#8574B3] transition-colors">
                Department Management
              </Link>
            </li>
            <li>
              <Link to={ROUTES.HOSPITAL.ANALYTICS} className="hover:text-[#8574B3] transition-colors">
                Peak Crowd Analytics
              </Link>
            </li>
            <li>
              <Link to={ROUTES.HOSPITAL.APPOINTMENTS} className="hover:text-[#8574B3] transition-colors">
                Queue & Doctor Assignment
              </Link>
            </li>
          </ul>
        </div>

        {/* Operational Notice */}
        <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#E8E2D5] text-xs">
          <div className="flex items-center gap-2 text-[#2B4C3F] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Operational Notice</span>
          </div>
          <p className="text-[#5C5852] text-[11px] leading-relaxed">
            MEDIQ is an operational crowd intelligence and patient decision-support platform. It does NOT provide medical diagnosis or replace emergency services. In case of medical emergencies, dial local emergency services immediately.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#D8D0C2] flex flex-col md:flex-row items-center justify-between text-xs text-[#8C867D] gap-4">
        <p>© 2026 MEDIQ Healthcare Technology. Designed for human-centered hospital efficiency.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#5C5852] font-medium">
            <Heart className="w-3.5 h-3.5 text-[#E9826E]" />
            PostgreSQL & Supabase Architecture
          </span>
        </div>
      </div>
    </footer>
  );
};
