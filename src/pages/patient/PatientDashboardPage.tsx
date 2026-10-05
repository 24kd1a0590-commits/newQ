import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  CalendarCheck,
  Clock3,
  Sparkles,
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  HeartPulse,
  Bell,
  ChevronRight,
  UserRound,
} from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';
import { MOCK_HOSPITALS, DEMO_PREVIEW_FLAG_TEXT } from '../../constants/mockData';
import { ROUTES } from '../../constants/routes';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Alert } from '../../components/ui/Alert';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { MediqAvatar } from '../../components/assistant/MediqAvatar';
import { MediqAssistantModal } from '../../components/assistant/MediqAssistantModal';
import { CrowdVisualization } from '../../components/crowd/CrowdVisualization';
import { HospitalMapView } from '../../components/map/HospitalMapView';
import { HospitalSummary } from '../../types/crowd';

export const PatientDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [viewState, setViewState] = useState<'success' | 'loading' | 'empty' | 'error'>('success');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState('');

  // Time based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const filteredHospitals = MOCK_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.departments.some((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAssistantWithQuery = (query: string) => {
    setAssistantInitialQuery(query);
    setIsAssistantOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. PERSONAL HEALTHCARE COMPANION HERO */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mediq-card bg-white p-6 sm:p-8 border border-[#E8E2D5] rounded-3xl shadow-xs space-y-6 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-[#2B4C3F] uppercase tracking-wider bg-[#EAF2EC] px-3 py-1 rounded-full border border-[#C8DDD0] inline-block">
              Patient Care Companion
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#252525]">
              {getGreeting()} 👋, <span className="text-[#2B4C3F]">{user?.fullName?.split(' ')[0] || 'Sarah'}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#5C5852] leading-relaxed">
              How can MEDIQ help you today? Check live hospital crowd levels, know expected wait times, and find quiet consultation slots before leaving home.
            </p>
          </div>

          {/* Assistant Banner Integration (Requirement #5) */}
          <div className="p-4 bg-[#F8F5EF] border border-[#E8E2D5] rounded-2xl flex items-center gap-4 max-w-sm shrink-0 shadow-xs">
            <MediqAvatar
              state="idle"
              size="lg"
              showBadge={true}
              onClick={() => setIsAssistantOpen(true)}
            />
            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-[#252525] font-extrabold block text-sm">Planning a hospital visit?</strong>
                <span className="text-[#5C5852]">Tell me what you need and I'll find the quietest option.</span>
              </div>
              <Button
                size="sm"
                variant="primary"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => setIsAssistantOpen(true)}
              >
                Ask MEDIQ
              </Button>
            </div>
          </div>
        </div>

        {/* Visual Quick Actions Bar (Requirement #5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-[#E8E2D5]">
          <Link
            to={ROUTES.PATIENT.HOSPITALS}
            className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] hover:border-[#2B4C3F] hover:bg-white transition-all flex flex-col items-center text-center gap-2 group shadow-2xs"
          >
            <div className="p-3 rounded-2xl bg-[#2B4C3F] text-white group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#252525]">Find a Hospital</span>
          </Link>

          <Link
            to={ROUTES.PATIENT.HOSPITALS}
            className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] hover:border-[#D9A436] hover:bg-white transition-all flex flex-col items-center text-center gap-2 group shadow-2xs"
          >
            <div className="p-3 rounded-2xl bg-[#D9A436] text-white group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#252525]">Check Crowd</span>
          </Link>

          <Link
            to={ROUTES.PATIENT.APPOINTMENTS}
            className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] hover:border-[#8574B3] hover:bg-white transition-all flex flex-col items-center text-center gap-2 group shadow-2xs"
          >
            <div className="p-3 rounded-2xl bg-[#8574B3] text-white group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#252525]">Book Appointment</span>
          </Link>

          <Link
            to={ROUTES.PATIENT.APPOINTMENTS}
            className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] hover:border-[#6F9F82] hover:bg-white transition-all flex flex-col items-center text-center gap-2 group shadow-2xs"
          >
            <div className="p-3 rounded-2xl bg-[#6F9F82] text-white group-hover:scale-110 transition-transform">
              <Clock3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#252525]">View My Visits</span>
          </Link>

          <button
            onClick={() => setIsAssistantOpen(true)}
            className="p-4 rounded-2xl bg-[#FAECE8] border border-[#F2C4BA] hover:border-[#E9826E] hover:bg-white transition-all flex flex-col items-center text-center gap-2 group shadow-2xs col-span-2 sm:col-span-1"
          >
            <div className="p-3 rounded-2xl bg-[#E9826E] text-white group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-[#8C301E]">Ask MEDIQ</span>
          </button>
        </div>
      </motion.div>

      {/* Tester UI State Switcher Bar */}
      <div className="p-3 bg-[#EFEBE1] border border-[#E8E2D5] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#5C5852] font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2B4C3F]" />
          <span>Database Telemetry Stream Verification:</span>
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setViewState('success')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              viewState === 'success' ? 'bg-[#2B4C3F] text-white' : 'text-[#5C5852]'
            }`}
          >
            Live Data Feed
          </button>
          <button
            onClick={() => setViewState('loading')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              viewState === 'loading' ? 'bg-[#D9A436] text-white' : 'text-[#5C5852]'
            }`}
          >
            Loading
          </button>
          <button
            onClick={() => setViewState('empty')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              viewState === 'empty' ? 'bg-[#8574B3] text-white' : 'text-[#5C5852]'
            }`}
          >
            Empty Region
          </button>
          <button
            onClick={() => setViewState('error')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              viewState === 'error' ? 'bg-[#E9826E] text-white' : 'text-[#5C5852]'
            }`}
          >
            Error State
          </button>
        </div>
      </div>

      {/* DYNAMIC STATES */}
      {viewState === 'loading' && (
        <LoadingState message="Connecting to Supabase PostgreSQL real-time hospital crowd telemetry..." />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Telemetry Connection Issue"
          message="Could not load real-time department crowd metrics."
          onRetry={() => setViewState('success')}
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          title="No Nearby Monitored Hospitals"
          description="No hospital facilities are actively broadcasting queue telemetry in this district."
          action={<Button variant="primary" onClick={() => setViewState('success')}>Reset District Filter</Button>}
        />
      )}

      {viewState === 'success' && (
        <>
          {/* Active Surge Advisory Banner */}
          <Alert variant="warning" title="Crowd Surge Advisory — CityCare General OPD">
            General OPD is experiencing high patient surge (82% load, ~45 min wait). MEDIQ recommends visiting after 5:00 PM or visiting Metro Health Medical Center (LOW crowd).
          </Alert>

          {/* Quick Assistant Suggestions (Requirement #6) */}
          <div className="mediq-card bg-white p-5 border border-[#E8E2D5] rounded-3xl space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2B4C3F]" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#252525]">
                Suggested AI Healthcare Queries
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Building2 className="w-3.5 h-3.5 text-[#6F9F82]" />, text: 'Which hospital has less crowd?' },
                { icon: <Clock3 className="w-3.5 h-3.5 text-[#D9A436]" />, text: 'When is the best time to visit?' },
                { icon: <HeartPulse className="w-3.5 h-3.5 text-[#8574B3]" />, text: 'Where can I find Cardiology?' },
                { icon: <MapPin className="w-3.5 h-3.5 text-[#2B4C3F]" />, text: 'Show nearby hospitals' },
                { icon: <Users className="w-3.5 h-3.5 text-[#E9826E]" />, text: 'How busy is General OPD?' },
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleOpenAssistantWithQuery(q.text)}
                  className="px-3.5 py-2 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs text-[#5C5852] hover:text-[#252525] hover:border-[#2B4C3F] hover:bg-white flex items-center gap-2 transition-all"
                >
                  {q.icon}
                  <span>{q.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. INTERACTIVE MAP & CROWD TELEMETRY (Requirement #10) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#252525]">Monitored Regional Hospitals</h2>
                <p className="text-xs text-[#5C5852]">Live wait times and department activity</p>
              </div>

              {/* Search Box */}
              <div className="w-full sm:w-80">
                <Input
                  placeholder="Search hospital or department..."
                  leftIcon={<Search className="w-4 h-4 text-[#8C867D]" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Visual Interactive Map View */}
            <HospitalMapView hospitals={filteredHospitals} />
          </div>

          {/* 3. FEATURED HOSPITAL CARDS WITH DETAILED CROWD METERS (Requirement #7 & #9) */}
          <div className="space-y-6 pt-4">
            <h2 className="text-lg font-extrabold text-[#252525]">Facility Department Queue Breakdown</h2>

            <div className="grid grid-cols-1 gap-6">
              {filteredHospitals.map((hosp) => (
                <div key={hosp.id} className="mediq-card bg-white border border-[#E8E2D5] p-6 rounded-3xl space-y-6">
                  {/* Hospital Info Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D5]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-extrabold text-[#252525]">{hosp.name}</h3>
                        <CrowdBadge level={hosp.overallCrowdLevel} size="md" />
                      </div>
                      <p className="text-xs text-[#5C5852] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8C867D]" />
                        {hosp.address} • <strong className="text-[#2B4C3F]">{hosp.distanceKm} km away</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link to={ROUTES.PATIENT.APPOINTMENTS}>
                        <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Book OPD Token
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Primary Department Crowd Meter (Requirement #7) */}
                  {hosp.departments[0] && (
                    <CrowdVisualization
                      departmentName={hosp.departments[0].name}
                      crowdLevel={hosp.departments[0].crowd.level}
                      currentPatients={hosp.departments[0].crowd.currentPatients}
                      maxCapacity={hosp.departments[0].crowd.maxCapacity}
                      estimatedWaitMinutes={hosp.departments[0].crowd.estimatedWaitMinutes}
                      recommendation={hosp.departments[0].crowd.recommendation}
                      trend={hosp.departments[0].crowd.trend || 'stable'}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Interactive MEDIQ Assistant Modal */}
      <MediqAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        initialQuery={assistantInitialQuery}
      />
    </div>
  );
};
