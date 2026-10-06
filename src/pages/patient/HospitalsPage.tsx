import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { MOCK_HOSPITALS } from '../../constants/mockData';
import { Search, MapPin, Building2, Phone, Clock3, HeartPulse, ArrowRight, ShieldCheck } from 'lucide-react';
import { CrowdVisualization } from '../../components/crowd/CrowdVisualization';
import { HospitalMapView } from '../../components/map/HospitalMapView';

export const HospitalsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'cards' | 'map'>('cards');

  const filteredHospitals = MOCK_HOSPITALS.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase()) ||
      h.departments.some((d) => d.name.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = filterLevel === 'ALL' || h.overallCrowdLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Hospital Queue & Crowd Discovery"
        description="Check real-time department activity, expected consultation wait times, and operating status before your visit."
        badge={
          <span className="text-xs px-3.5 py-1.5 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6F9F82] animate-pulse" />
            Live Hospital Telemetry Feed
          </span>
        }
      />

      {/* Filter and View Toggle Bar */}
      <div className="mediq-card p-4 border border-[#E8E2D5] bg-white rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
        <div className="w-full md:w-96">
          <Input
            placeholder="Search by hospital, city, or medical dept..."
            leftIcon={<Search className="w-4 h-4 text-[#8C867D]" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-52">
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

          <div className="flex bg-[#F8F5EF] p-1 rounded-2xl border border-[#E8E2D5] shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cards' ? 'bg-[#2B4C3F] text-white shadow-xs' : 'text-[#5C5852]'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'map' ? 'bg-[#2B4C3F] text-white shadow-xs' : 'text-[#5C5852]'
              }`}
            >
              Map View
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map View Tab */}
      {activeTab === 'map' ? (
        <HospitalMapView hospitals={filteredHospitals} />
      ) : (
        /* Hospital Cards List View (Requirement #9) */
        <div className="space-y-8">
          {filteredHospitals.map((hosp, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={hosp.id}
              className="mediq-card bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Hospital Photo Header */}
                <div className="lg:col-span-4 h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E8E2D5] bg-[#EFEBE1] relative">
                  <img
                    src={idx === 0 ? '/images/hero_hospital.jpg' : idx === 1 ? '/images/waiting_room.jpg' : '/images/doctor_consultation.jpg'}
                    alt={hosp.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-[#2B4C3F] text-xs font-black shadow-xs backdrop-blur-xs">
                      {hosp.distanceKm} km away
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <CrowdBadge level={hosp.overallCrowdLevel} size="sm" />
                  </div>
                </div>

                {/* Hospital Details */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D5]">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#252525]">{hosp.name}</h3>
                      <p className="text-xs text-[#5C5852] flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8C867D]" />
                        {hosp.address}, {hosp.city} • Phone: <span className="text-[#252525] font-semibold">{hosp.phone}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3.5 py-2 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] text-center">
                        <span className="text-[#5C5852] block text-[10px] uppercase font-extrabold">Avg Wait</span>
                        <strong className="text-[#705008] text-sm">{hosp.averageWaitMinutes} min</strong>
                      </div>
                      <div className="px-3.5 py-2 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] text-center">
                        <span className="text-[#5C5852] block text-[10px] uppercase font-extrabold">Active Depts</span>
                        <strong className="text-[#252525] text-sm">{hosp.departments.length} Monitored</strong>
                      </div>
                    </div>
                  </div>

                  {/* Primary Department Crowd Meter */}
                  {hosp.departments[0] && (
                    <CrowdVisualization
                      departmentName={hosp.departments[0].name}
                      crowdLevel={hosp.departments[0].crowd.level}
                      currentPatients={hosp.departments[0].crowd.currentPatients}
                      maxCapacity={hosp.departments[0].crowd.maxCapacity}
                      estimatedWaitMinutes={hosp.departments[0].crowd.estimatedWaitMinutes}
                      recommendation={hosp.departments[0].crowd.recommendation}
                      compact={false}
                    />
                  )}

                  {/* Secondary Departments Grid */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8C867D]">
                      Other Medical Departments at {hosp.name}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {hosp.departments.slice(1).map((dept) => (
                        <div key={dept.id} className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#252525]">{dept.name}</span>
                            <CrowdBadge level={dept.crowd.level} size="sm" showDot={false} />
                          </div>
                          <div className="flex justify-between text-[11px] text-[#5C5852]">
                            <span>{dept.crowd.currentPatients} Patients</span>
                            <strong className="text-[#705008]">~{dept.crowd.estimatedWaitMinutes} min</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
