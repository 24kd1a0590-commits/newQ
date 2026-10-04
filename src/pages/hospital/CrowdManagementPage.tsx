import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Alert } from '../../components/ui/Alert';
import { CrowdLevel } from '../../types/crowd';
import { HospitalService } from '../../services/supabaseService';
import { Sliders, Save } from 'lucide-react';

export const CrowdManagementPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('dept-citycare-opd-01');
  const [crowdLevel, setCrowdLevel] = useState<CrowdLevel>('HIGH');
  const [currentPatients, setCurrentPatients] = useState(82);
  const [estimatedWait, setEstimatedWait] = useState(45);
  const [recommendation, setRecommendation] = useState('Consider visiting after 5:00 PM.');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);

    const res = await HospitalService.updateDepartmentCrowd(
      selectedDept,
      crowdLevel,
      currentPatients,
      estimatedWait,
      recommendation
    );

    setIsSaving(false);
    setSuccessMsg(
      res.isMock
        ? 'Telemetry updated in Demo state (Supabase integration ready).'
        : 'Telemetry broadcasted live to Supabase PostgreSQL database!'
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Live Crowd Telemetry Publisher"
        description="Broadcast department crowd status, patient load, and waiting time guidance to patient applications."
        badge={<span className="text-xs px-3 py-1 rounded-full bg-[#F0EDF7] text-[#45376B] font-bold border border-[#D3CBEA]">Telemetry Publisher</span>}
      />

      <div className="max-w-2xl">
        <Card className="glass-card border-[#E8E2D5] bg-white p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
            <h3 className="text-lg font-extrabold text-[#252525] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#8574B3]" />
              <span>Department Telemetry Publisher</span>
            </h3>
            <CrowdBadge level={crowdLevel} size="md" showDot={false} />
          </div>

          {successMsg && (
            <Alert variant="success" title="Telemetry Broadcasted">
              {successMsg}
            </Alert>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <Select
              label="Select Target Department"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              options={[
                { value: 'dept-citycare-opd-01', label: 'CityCare — General OPD (OPD-GEN)' },
                { value: 'dept-citycare-peds', label: 'CityCare — Pediatrics (PED-01)' },
                { value: 'dept-citycare-emg', label: 'CityCare — Emergency & Triage (EMG-01)' },
                { value: 'dept-citycare-ortho', label: 'CityCare — Orthopedics (ORTH-01)' },
              ]}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5C5852] tracking-wider uppercase">
                Crowd Severity Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['LOW', 'MODERATE', 'HIGH'] as CrowdLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCrowdLevel(lvl)}
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      crowdLevel === lvl
                        ? 'border-[#252525] bg-[#252525] text-white shadow-sm'
                        : 'border-[#E8E2D5] bg-[#F8F5EF] text-[#5C5852] hover:text-[#252525]'
                    }`}
                  >
                    <CrowdBadge level={lvl} size="sm" showDot={false} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Current Active Patients"
                type="number"
                value={currentPatients}
                onChange={(e) => setCurrentPatients(Number(e.target.value))}
              />
              <Input
                label="Estimated Wait (Minutes)"
                type="number"
                value={estimatedWait}
                onChange={(e) => setEstimatedWait(Number(e.target.value))}
              />
            </div>

            <Input
              label="Patient Recommendation / Guidance"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              helperText="This recommendation is displayed directly to patients before visiting."
            />

            <div className="pt-4 flex justify-end gap-3">
              <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
                Publish Telemetry Update
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
