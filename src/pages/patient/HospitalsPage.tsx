import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { MOCK_HOSPITALS } from '../../constants/mockData';
import { Search, MapPin } from 'lucide-react';

export const HospitalsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredHospitals = MOCK_HOSPITALS.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.address.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filterLevel === 'ALL' || h.overallCrowdLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Monitored Hospitals & Department Load"
        description="View live crowd telemetry across regional hospitals, emergency triage centers, and specialty departments."
        badge={<span className="text-xs px-3 py-1 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">Live Telemetry Stream</span>}
      />

      {/* Filter Bar */}
      <div className="mediq-card p-4 border border-[#E8E2D5] bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-96">
          <Input
            placeholder="Filter hospitals by name, city, or address..."
            leftIcon={<Search className="w-4 h-4 text-[#8C867D]" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-56">
          <Select
            label=""
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Crowd Statuses' },
              { value: 'LOW', label: 'Quiet Right Now (Low)' },
              { value: 'MODERATE', label: 'Moderate Activity' },
              { value: 'HIGH', label: 'Busy Right Now (High)' },
            ]}
          />
        </div>
      </div>

      {/* Monitored Facilities */}
      <div className="space-y-6">
        {filteredHospitals.map((hosp) => (
          <Card key={hosp.id} className="glass-card border-[#E8E2D5] bg-white p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D5]">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-extrabold text-[#252525]">{hosp.name}</h3>
                  <CrowdBadge level={hosp.overallCrowdLevel} size="md" />
                </div>
                <p className="text-xs text-[#5C5852] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C867D]" />
                  {hosp.address} • Phone: <span className="text-[#252525] font-semibold">{hosp.phone}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="px-3.5 py-2 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] text-center">
                  <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Average Wait</span>
                  <strong className="text-[#705008] text-sm">{hosp.averageWaitMinutes} min</strong>
                </div>
                <div className="px-3.5 py-2 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] text-center">
                  <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Monitored Depts</span>
                  <strong className="text-[#252525] text-sm">{hosp.departments.length} Active</strong>
                </div>
              </div>
            </div>

            {/* Department Level Crowd Breakdown */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C867D] mb-4">
                Department Activity & Waiting Guidance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hosp.departments.map((dept) => (
                  <div key={dept.id} className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#2B4C3F] font-bold uppercase">{dept.code}</span>
                        <h5 className="text-sm font-extrabold text-[#252525]">{dept.name}</h5>
                      </div>
                      <CrowdBadge level={dept.crowd.level} size="sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#5C5852]">
                      <div>Patients: <strong className="text-[#252525]">{dept.crowd.currentPatients} / {dept.crowd.maxCapacity}</strong></div>
                      <div>Est Wait: <strong className="text-[#705008]">{dept.crowd.estimatedWaitMinutes} min</strong></div>
                    </div>

                    <p className="text-xs text-[#5C5852] bg-white p-2.5 rounded-xl border border-[#E8E2D5]">
                      {dept.crowd.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
