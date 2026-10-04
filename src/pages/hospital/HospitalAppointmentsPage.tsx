import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MOCK_APPOINTMENTS } from '../../constants/mockData';
import { CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const HospitalAppointmentsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Queue & Token Triage Console"
        description="View incoming patient queue tokens, manage check-in triage, and call consultation numbers."
      />

      <div className="space-y-4">
        {MOCK_APPOINTMENTS.map((a) => (
          <Card key={a.id} className="glass-card border-[#E8E2D5] bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0EDF7] border border-[#D3CBEA] text-[#45376B] flex items-center justify-center font-extrabold text-lg">
                #{a.tokenNumber}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#252525]">{a.patientName}</h4>
                <p className="text-xs text-[#5C5852]">{a.departmentName} • Scheduled: {formatDate(a.appointmentTime)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">
                {a.status}
              </span>
              <Button variant="primary" size="sm" leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                Call Next Token
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
