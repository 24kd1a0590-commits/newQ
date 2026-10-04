import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { MOCK_HOSPITALS, MOCK_CITYCARE_PREVIEW, DEMO_PREVIEW_FLAG_TEXT } from '../../constants/mockData';
import { ROUTES } from '../../constants/routes';
import { Building2, Clock, Calendar, Bell, ArrowRight, ShieldCheck, Search, MapPin, Sparkles } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

export const PatientDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [viewState, setViewState] = useState<'success' | 'loading' | 'empty' | 'error'>('success');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHospitals = MOCK_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Warm Personal Greeting */}
      <div className="mediq-card bg-white p-6 sm:p-8 border border-[#E8E2D5] space-y-2">
        <span className="text-xs font-bold text-[#2B4C3F] uppercase tracking-wider">Patient Companion</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
          Good morning, {user?.fullName?.split(' ')[0] || 'Sarah'}.
        </h1>
        <p className="text-sm text-[#5C5852]">
          What do you need today? Check live hospital crowd conditions and estimated waiting times before visiting.
        </p>
      </div>

      {/* UI State Tester Bar */}
      <div className="p-3 bg-[#EFEBE1] border border-[#E8E2D5] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#5C5852] font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2B4C3F]" />
          <span>UI State Verification:</span>
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setViewState('success')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'success' ? 'bg-[#2B4C3F] text-white' : 'text-[#5C5852]'}`}
          >
            Success State
          </button>
          <button
            onClick={() => setViewState('loading')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'loading' ? 'bg-[#D9A436] text-white' : 'text-[#5C5852]'}`}
          >
            Loading State
          </button>
          <button
            onClick={() => setViewState('empty')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'empty' ? 'bg-[#8574B3] text-white' : 'text-[#5C5852]'}`}
          >
            Empty State
          </button>
          <button
            onClick={() => setViewState('error')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'error' ? 'bg-[#E9826E] text-white' : 'text-[#5C5852]'}`}
          >
            Error State
          </button>
        </div>
      </div>

      {/* DYNAMIC STATES */}
      {viewState === 'loading' && <LoadingState message="Connecting to Supabase PostgreSQL real-time hospital feeds..." />}

      {viewState === 'error' && (
        <ErrorState
          title="Telemetry Stream Unreachable"
          message="Could not establish real-time connection to hospital crowd database."
          onRetry={() => setViewState('success')}
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          title="No Nearby Monitored Facilities"
          description="There are currently no active hospitals broadcasting crowd telemetry in your search region."
          action={<Button variant="primary" onClick={() => setViewState('success')}>Reset Search</Button>}
        />
      )}

      {viewState === 'success' && (
        <>
          {/* Active Surge Advisory Alert */}
          <Alert variant="warning" title="Crowd Surge Advisory — CityCare General OPD">
            General OPD is currently busy (82/100 patients, estimated wait 45 min). We recommend visiting after 5:00 PM or selecting an alternate department.
          </Alert>

          {/* Search Filter Input */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-96">
              <Input
                placeholder="Search hospital name or department..."
                leftIcon={<Search className="w-4 h-4 text-[#8C867D]" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-xs text-[#5C5852]">
              Showing <strong className="text-[#252525]">{filteredHospitals.length}</strong> monitored facilities
            </div>
          </div>

          {/* Prioritized Hospital Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hosp) => (
              <Card key={hosp.id} className="mediq-card-hover border-[#E8E2D5] bg-white p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#2B4C3F] uppercase tracking-wider">
                      {hosp.city} • {hosp.distanceKm} km away
                    </span>
                    <CrowdBadge level={hosp.overallCrowdLevel} size="sm" showDot={false} />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#252525]">{hosp.name}</h3>
                  <p className="text-xs text-[#5C5852] line-clamp-1">{hosp.address}</p>

                  <div className="mt-4 p-3 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] space-y-2 text-xs">
                    <div className="flex justify-between text-[#5C5852]">
                      <span>General OPD Activity:</span>
                      <strong className="text-[#252525] font-bold">{hosp.departments[0]?.crowd.level || 'LOW'}</strong>
                    </div>
                    <div className="flex justify-between text-[#5C5852]">
                      <span>Avg Waiting Time:</span>
                      <strong className="text-[#705008] font-bold">{hosp.averageWaitMinutes} min wait</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C5852] italic bg-[#F3EFE6] p-3 rounded-xl border border-[#E8E2D5] mt-3">
                    "{hosp.departments[0]?.crowd.recommendation || 'Standard queue flow.'}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C867D]">{hosp.operatingHours}</span>
                  <Link to={ROUTES.PATIENT.HOSPITALS}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View Depts
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Database Footer Info */}
          <div className="p-4 rounded-2xl bg-[#EFEBE1] border border-[#E8E2D5] text-xs text-[#5C5852] flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              <Building2 className="w-4 h-4 text-[#2B4C3F]" />
              <span>Real-time hospital crowd telemetry stream active</span>
            </div>
            <span className="text-[11px] text-[#8C867D]">{DEMO_PREVIEW_FLAG_TEXT}</span>
          </div>
        </>
      )}
    </div>
  );
};
