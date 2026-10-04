import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { MOCK_APPOINTMENTS } from '../../constants/mockData';
import { Calendar, Clock, Ticket, Building2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const AppointmentsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Queue Tokens & Scheduled Visits"
        description="Track your active consultation tokens, estimated wait times, and crowd conditions at booking."
        badge={<span className="text-xs px-3 py-1 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">2 Active Tokens</span>}
        actions={
          <Button variant="primary" size="sm" leftIcon={<Ticket className="w-3.5 h-3.5" />}>
            Book New Token
          </Button>
        }
      />

      <div className="space-y-6">
        {MOCK_APPOINTMENTS.map((apt) => (
          <Card key={apt.id} className="glass-card border-[#E8E2D5] bg-white p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-[#E8E2D5]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2B4C3F] flex flex-col items-center justify-center text-white font-extrabold shadow-sm">
                  <span className="text-[10px] uppercase opacity-80">TOKEN</span>
                  <span className="text-xl">#{apt.tokenNumber}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-[#252525]">{apt.departmentName}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAF2EC] text-[#2A543B] border border-[#C8DDD0] font-bold uppercase">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5852] flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#8C867D]" />
                    {apt.hospitalName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-[#8C867D] block uppercase font-bold">Crowd Level at Booking</span>
                  <CrowdBadge level={apt.crowdLevelAtBooking} size="sm" showDot={false} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3.5 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#2B4C3F] shrink-0" />
                <div>
                  <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Scheduled Time</span>
                  <strong className="text-[#252525]">{formatDate(apt.appointmentTime)}</strong>
                </div>
              </div>

              <div className="p-3.5 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#705008] shrink-0" />
                <div>
                  <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Estimated Wait</span>
                  <strong className="text-[#705008]">{apt.estimatedWaitMinutes} min wait</strong>
                </div>
              </div>

              <div className="p-3.5 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-center justify-between">
                <div>
                  <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Token Status</span>
                  <strong className="text-[#252525]">Token Active</strong>
                </div>
                <Button variant="outline" size="sm">Check In</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
