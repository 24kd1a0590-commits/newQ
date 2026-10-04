import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Sidebar } from '../components/layout/Sidebar';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { Activity } from 'lucide-react';

export const PatientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col selection:bg-[#2B4C3F] selection:text-white">
      <Navbar />

      {/* Top Banner Notice */}
      <div className="bg-[#EFEBE1] border-b border-[#E8E2D5] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5C5852]">
            <span className="p-1 rounded-lg bg-[#2B4C3F] text-white">
              <Activity className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-[#252525]">Patient Decision Support:</span>
            <span>Monitoring real-time hospital activity across regional facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#5C5852]">Database Node:</span>
            <StatusIndicator />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar portalType="patient" />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};
