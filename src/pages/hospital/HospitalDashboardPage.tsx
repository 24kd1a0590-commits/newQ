import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { MOCK_HOSPITALS } from '../../constants/mockData';
import { ROUTES } from '../../constants/routes';
import { Building2, Users, Clock, Sliders, Activity, ShieldCheck } from 'lucide-react';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';

export const HospitalDashboardPage: React.FC = () => {
  const [viewState, setViewState] = useState<'success' | 'loading' | 'empty' | 'error'>('success');
  const hospital = MOCK_HOSPITALS[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hospital Operations Console"
        description="Monitor overall facility capacity load, adjust crowd levels, and publish live patient guidance."
        badge={<span className="text-xs px-3 py-1 rounded-full bg-[#F0EDF7] text-[#45376B] font-bold border border-[#D3CBEA]">Operational Console</span>}
        actions={
          <Link to={ROUTES.HOSPITAL.CROWD}>
            <Button variant="primary" size="sm" leftIcon={<Sliders className="w-3.5 h-3.5" />}>
              Telemetry Controller
            </Button>
          </Link>
        }
      />

      {/* State Switcher */}
      <div className="p-3 bg-[#EFEBE1] border border-[#E8E2D5] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#5C5852] font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#8574B3]" />
          <span>Console State Verification:</span>
        </span>
        <div className="flex gap-1">
          <button onClick={() => setViewState('success')} className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'success' ? 'bg-[#8574B3] text-white' : 'text-[#5C5852]'}`}>Success</button>
          <button onClick={() => setViewState('loading')} className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'loading' ? 'bg-[#D9A436] text-white' : 'text-[#5C5852]'}`}>Loading</button>
          <button onClick={() => setViewState('empty')} className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'empty' ? 'bg-[#2B4C3F] text-white' : 'text-[#5C5852]'}`}>Empty</button>
          <button onClick={() => setViewState('error')} className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${viewState === 'error' ? 'bg-[#E9826E] text-white' : 'text-[#5C5852]'}`}>Error</button>
        </div>
      </div>

      {viewState === 'loading' && <LoadingState message="Connecting to Hospital Operations feed..." />}
      {viewState === 'error' && <ErrorState title="Staff Console Connection Error" onRetry={() => setViewState('success')} />}
      {viewState === 'empty' && <EmptyState title="No Active Departments Configured" description="Create facility departments to broadcast telemetry." />}

      {viewState === 'success' && (
        <>
          {/* VISUALLY DOMINANT HERO OPERATIONAL METRIC */}
          <div className="mediq-card bg-white border-[#E8E2D5] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8574B3]">CURRENT HOSPITAL CAPACITY LOAD</span>
              <div className="text-5xl font-black text-[#252525] tracking-tight flex items-baseline gap-2">
                <span>72%</span>
                <span className="text-sm font-semibold text-[#8C301E]">Surge Threshold Active</span>
              </div>
              <p className="text-xs text-[#5C5852] max-w-xl pt-1">
                General OPD is currently at peak capacity. 6 doctors on duty. Triage flow active across emergency wings.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <CrowdBadge level="HIGH" size="lg" showDot={false} />
            </div>
          </div>

          {/* Key Operational KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass-card border-[#E8E2D5] bg-white p-5">
              <span className="text-[11px] text-[#8C867D] font-bold uppercase">Total OPD Patients Today</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-black text-[#252525]">138 Patients</span>
                <Users className="w-5 h-5 text-[#2B4C3F]" />
              </div>
            </Card>

            <Card className="glass-card border-[#E8E2D5] bg-white p-5">
              <span className="text-[11px] text-[#8C867D] font-bold uppercase">Avg OPD Waiting Time</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-black text-[#705008]">38 minutes</span>
                <Clock className="w-5 h-5 text-[#D9A436]" />
              </div>
            </Card>

            <Card className="glass-card border-[#E8E2D5] bg-white p-5">
              <span className="text-[11px] text-[#8C867D] font-bold uppercase">On-Duty Doctors</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-black text-[#2A543B]">21 Doctors</span>
                <Activity className="w-5 h-5 text-[#4A7C59]" />
              </div>
            </Card>
          </div>

          {/* Department Control Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#252525]">Department Capacity & Telemetry Controls</h3>
              <span className="text-xs text-[#5C5852] font-semibold">{hospital.departments.length} Departments Online</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hospital.departments.map((dept) => (
                <Card key={dept.id} className="glass-card border-[#E8E2D5] bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
                    <div>
                      <span className="text-[10px] font-mono text-[#8574B3] font-bold uppercase">{dept.code}</span>
                      <h4 className="text-base font-extrabold text-[#252525]">{dept.name}</h4>
                    </div>
                    <CrowdBadge level={dept.crowd.level} size="md" showDot={false} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5]">
                      <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Patient Load</span>
                      <strong className="text-[#252525] text-sm font-bold">{dept.crowd.currentPatients} / {dept.crowd.maxCapacity}</strong>
                    </div>
                    <div className="p-3 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5]">
                      <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Estimated Wait</span>
                      <strong className="text-[#705008] text-sm font-bold">{dept.crowd.estimatedWaitMinutes} min</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F3EFE6] border border-[#E8E2D5] text-xs space-y-1">
                    <span className="text-[10px] text-[#8C867D] uppercase font-bold">Broadcasted Patient Guidance</span>
                    <p className="text-[#252525] italic font-medium">"{dept.crowd.recommendation}"</p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link to={ROUTES.HOSPITAL.CROWD}>
                      <Button variant="outline" size="sm">
                        Adjust Telemetry
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
