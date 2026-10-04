import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { BarChart3, TrendingUp } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Crowd Analytics & Peak Hours"
        description="Historical throughput metrics, peak surge hours analysis, and waiting-time reduction statistics."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-[#E8E2D5] bg-white p-6 space-y-2">
          <span className="text-xs text-[#8C867D] font-bold uppercase">Daily Patient Inflow</span>
          <div className="text-3xl font-extrabold text-[#252525]">248 Patients</div>
          <p className="text-xs text-[#2A543B] font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +14% vs previous week
          </p>
        </Card>

        <Card className="glass-card border-[#E8E2D5] bg-white p-6 space-y-2">
          <span className="text-xs text-[#8C867D] font-bold uppercase">Peak Surge Window</span>
          <div className="text-2xl font-extrabold text-[#705008]">10:00 AM - 1:00 PM</div>
          <p className="text-xs text-[#5C5852]">Highest OPD congestion period</p>
        </Card>

        <Card className="glass-card border-[#E8E2D5] bg-white p-6 space-y-2">
          <span className="text-xs text-[#8C867D] font-bold uppercase">Avg Wait Saved by MEDIQ</span>
          <div className="text-2xl font-extrabold text-[#2B4C3F]">22 min / patient</div>
          <p className="text-xs text-[#2A543B]">Off-peak guidance effective</p>
        </Card>
      </div>

      <Card className="glass-card border-[#E8E2D5] bg-white p-6">
        <CardHeader className="px-0 pt-0 pb-4">
          <CardTitle className="text-base font-extrabold text-[#252525] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#8574B3]" />
            <span>Hourly Department Patient Surge Trend (OPD vs Emergency)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="h-52 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-end justify-between p-6 gap-3">
            {[
              { time: '8 AM', height: '30%', label: 'Quiet' },
              { time: '10 AM', height: '90%', label: 'Busy' },
              { time: '12 PM', height: '85%', label: 'Busy' },
              { time: '2 PM', height: '60%', label: 'Moderate' },
              { time: '4 PM', height: '40%', label: 'Moderate' },
              { time: '6 PM', height: '20%', label: 'Quiet' },
              { time: '8 PM', height: '15%', label: 'Quiet' },
            ].map((bar) => (
              <div key={bar.time} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-[#5C5852] font-bold">{bar.label}</span>
                <div
                  className="w-full bg-[#2B4C3F] rounded-t-lg transition-all duration-300"
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] text-[#5C5852] font-semibold">{bar.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
