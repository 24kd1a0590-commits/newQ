import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { MOCK_NOTIFICATIONS } from '../../constants/mockData';
import { Bell } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Crowd Surge & Queue Notifications"
        description="Real-time alerts generated when hospital department crowds spike or waiting times decrease."
        badge={<span className="text-xs px-3 py-1 rounded-full bg-[#FAECE8] text-[#8C301E] font-bold border border-[#F2C4BA]">Live Surge Stream</span>}
      />

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((n) => (
          <Card key={n.id} className="glass-card border-[#E8E2D5] bg-white p-5 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#FDF7E7] border border-[#F5E3B3] text-[#705008] shrink-0">
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-extrabold text-[#252525]">{n.title}</h4>
                <span className="text-[11px] text-[#8C867D]">{n.timestamp}</span>
              </div>
              <p className="text-xs text-[#5C5852] leading-relaxed">{n.message}</p>

              {n.crowdLevel && (
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] text-[#8C867D]">Recorded Crowd Level:</span>
                  <CrowdBadge level={n.crowdLevel} size="sm" showDot={false} />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
