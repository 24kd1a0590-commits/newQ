import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Building2, Users, Clock, ChevronRight, Phone, AlertCircle } from 'lucide-react';
import { HospitalSummary } from '../../types/crowd';
import { CrowdBadge } from '../ui/CrowdBadge';
import { Button } from '../ui/Button';

interface HospitalMapViewProps {
  hospitals: HospitalSummary[];
  onSelectHospital?: (hospital: HospitalSummary) => void;
  selectedId?: string;
}

export const HospitalMapView: React.FC<HospitalMapViewProps> = ({
  hospitals,
  onSelectHospital,
  selectedId,
}) => {
  const [activeId, setActiveId] = useState<string>(selectedId || hospitals[0]?.id || 'hosp-01');

  const selectedHospital = hospitals.find((h) => h.id === activeId) || hospitals[0];

  // Map position coordinates preview relative to map graphic
  const markerPositions: Record<string, { top: string; left: string }> = {
    'hosp-01': { top: '38%', left: '28%' }, // CityCare Hospital
    'hosp-02': { top: '22%', left: '62%' }, // Metro Health
    'hosp-03': { top: '65%', left: '72%' }, // Apex SuperSpecialty
  };

  return (
    <div className="mediq-card bg-white border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm space-y-0">
      {/* Map Header */}
      <div className="p-4 sm:p-5 bg-[#F8F5EF] border-b border-[#E8E2D5] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#2B4C3F] text-white">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#252525]">Interactive Crowd Map & Locations</h3>
            <p className="text-[11px] text-[#5C5852]">Live queue density pins around Metropolis</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-[#5C5852] bg-white px-3 py-1.5 rounded-full border border-[#E8E2D5]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6F9F82]" /> Quiet
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9A436]" /> Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9826E]" /> Busy
          </span>
        </div>
      </div>

      {/* Main Visual Map Graphic Container */}
      <div className="relative h-80 sm:h-96 w-full bg-[#EFEBE1] overflow-hidden">
        {/* Background Map Visual Image */}
        <img
          src="/images/hospital_map_location.jpg"
          alt="Hospital Locations Map"
          className="w-full h-full object-cover opacity-90"
        />

        {/* User Location Pulse Marker */}
        <div className="absolute top-[52%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-full bg-[#2B4C3F]/30 absolute"
          />
          <div className="w-4 h-4 rounded-full bg-[#2B4C3F] border-2 border-white shadow-md z-10" />
          <span className="text-[10px] font-bold bg-[#252525] text-white px-2 py-0.5 rounded-md shadow-xs mt-1">
            Your Location
          </span>
        </div>

        {/* Hospital Interactive Markers */}
        {hospitals.map((h) => {
          const pos = markerPositions[h.id] || { top: '50%', left: '50%' };
          const isSelected = h.id === activeId;

          const badgeColor =
            h.overallCrowdLevel === 'HIGH'
              ? 'bg-[#E9826E] text-white'
              : h.overallCrowdLevel === 'MODERATE'
              ? 'bg-[#D9A436] text-white'
              : 'bg-[#6F9F82] text-white';

          return (
            <motion.div
              key={h.id}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => {
                setActiveId(h.id);
                if (onSelectHospital) onSelectHospital(h);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group`}
            >
              {/* Pin Container */}
              <div className="relative flex flex-col items-center">
                {/* Floating Tag */}
                <div
                  className={`px-2.5 py-1 rounded-xl text-xs font-black shadow-md border flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#252525] text-white border-white ring-2 ring-[#2B4C3F]'
                      : 'bg-white text-[#252525] border-[#E8E2D5]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#2B4C3F]" />
                  <span>{h.name.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${badgeColor}`}>
                    {h.overallCrowdLevel}
                  </span>
                </div>

                {/* Marker Needle */}
                <div
                  className={`w-3 h-3 rotate-45 border-r border-b -mt-1.5 ${
                    isSelected ? 'bg-[#252525] border-white' : 'bg-white border-[#E8E2D5]'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Selected Hospital Overlay Card at Bottom */}
        {selectedHospital && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedHospital.id}
            className="absolute bottom-4 left-4 right-4 z-30 max-w-xl mx-auto"
          >
            <div className="mediq-card bg-white/95 backdrop-blur-md p-4 border border-[#E8E2D5] shadow-xl rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-[#252525]">{selectedHospital.name}</h4>
                  <CrowdBadge level={selectedHospital.overallCrowdLevel} size="sm" />
                </div>
                <p className="text-xs text-[#5C5852] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8C867D]" />
                  {selectedHospital.address} • <strong className="text-[#2B4C3F]">{selectedHospital.distanceKm} km away</strong>
                </p>
                <div className="flex items-center gap-4 text-xs text-[#5C5852] pt-1">
                  <span>General OPD: <strong className="text-[#252525]">{selectedHospital.departments[0]?.crowd.level || 'LOW'}</strong></span>
                  <span>Avg Wait: <strong className="text-[#705008]">{selectedHospital.averageWaitMinutes} mins</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0">
                <Button
                  size="sm"
                  variant="primary"
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    if (onSelectHospital) onSelectHospital(selectedHospital);
                  }}
                  className="w-full sm:w-auto"
                >
                  View Queue
                </Button>
                <a
                  href={`tel:${selectedHospital.phone}`}
                  className="text-xs text-[#5C5852] hover:text-[#252525] flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                  <Phone className="w-3 h-3 text-[#2B4C3F]" />
                  Call Desk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
