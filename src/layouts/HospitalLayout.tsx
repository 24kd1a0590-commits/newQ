import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Sidebar } from '../components/layout/Sidebar';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { Building2 } from 'lucide-react';
import { CrowdBadge } from '../components/ui/CrowdBadge';

export const HospitalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col selection:bg-[#8574B3] selection:text-white">
      <Navbar />

      {/* Staff Console Banner */}
      <div className="bg-[#F0EDF7] border-b border-[#D3CBEA] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#45376B]">
            <span className="p-1 rounded-lg bg-[#8574B3] text-white">
              <Building2 className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-[#252525]">Hospital Operations Desk:</span>
            <span>CityCare Hospital (General OPD & Triage)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#5C5852]">General OPD Crowd:</span>
            <CrowdBadge level="HIGH" size="sm" showDot={false} />
            <StatusIndicator />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar portalType="hospital" />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};
