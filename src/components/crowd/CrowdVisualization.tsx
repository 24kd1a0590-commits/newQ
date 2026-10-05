import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock3, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CrowdLevel } from '../../types/crowd';

interface CrowdVisualizationProps {
  departmentName?: string;
  crowdLevel: CrowdLevel;
  currentPatients: number;
  maxCapacity: number;
  estimatedWaitMinutes: number;
  recommendation?: string;
  trend?: 'increasing' | 'decreasing' | 'stable';
  compact?: boolean;
}

export const CrowdVisualization: React.FC<CrowdVisualizationProps> = ({
  departmentName = 'General OPD',
  crowdLevel,
  currentPatients,
  maxCapacity,
  estimatedWaitMinutes,
  recommendation = 'Consider visiting after 5:00 PM to avoid peak queues.',
  trend = 'increasing',
  compact = false,
}) => {
  const percentage = Math.min(Math.round((currentPatients / maxCapacity) * 100), 100);

  // Styling maps based on crowd level
  const levelStyles = {
    LOW: {
      bar: 'bg-[#6F9F82]',
      bg: 'bg-[#EAF2EC]',
      border: 'border-[#C8DDD0]',
      text: 'text-[#2A543B]',
      badgeBg: 'bg-[#6F9F82]',
      label: 'LOW CROWD',
      statusMsg: 'Queue is flowing smoothly',
      icon: <CheckCircle2 className="w-4 h-4 text-[#2A543B]" />,
    },
    MODERATE: {
      bar: 'bg-[#D9A436]',
      bg: 'bg-[#FDF7E7]',
      border: 'border-[#F5E3B3]',
      text: 'text-[#705008]',
      badgeBg: 'bg-[#D9A436]',
      label: 'MODERATE',
      statusMsg: 'Normal waiting time expected',
      icon: <Clock3 className="w-4 h-4 text-[#705008]" />,
    },
    HIGH: {
      bar: 'bg-[#E9826E]',
      bg: 'bg-[#FAECE8]',
      border: 'border-[#F2C4BA]',
      text: 'text-[#8C301E]',
      badgeBg: 'bg-[#E9826E]',
      label: 'HIGH CROWD',
      statusMsg: 'High crowd right now — expect delay',
      icon: <AlertTriangle className="w-4 h-4 text-[#8C301E]" />,
    },
  };

  const style = levelStyles[crowdLevel] || levelStyles.MODERATE;

  // Trend icon representation
  const trendIcons = {
    increasing: <TrendingUp className="w-3.5 h-3.5 text-[#E9826E]" />,
    decreasing: <TrendingDown className="w-3.5 h-3.5 text-[#6F9F82]" />,
    stable: <Minus className="w-3.5 h-3.5 text-[#5C5852]" />,
  };

  // Sparkline data points for daily crowd trend graph
  const trendPoints = crowdLevel === 'HIGH' 
    ? [20, 45, 82, 75, 50, 30] 
    : crowdLevel === 'MODERATE' 
    ? [15, 30, 50, 42, 35, 20] 
    : [10, 20, 28, 25, 18, 12];

  if (compact) {
    return (
      <div className={`p-3.5 rounded-2xl ${style.bg} ${style.border} border space-y-2`}>
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-[#252525]">{departmentName}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black text-white ${style.badgeBg}`}>
            {style.label}
          </span>
        </div>
        
        {/* Animated Progress Meter */}
        <div className="w-full h-2.5 bg-white/70 rounded-full overflow-hidden p-0.5 border border-black/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${style.bar}`}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#5C5852]">
          <span>{currentPatients} / {maxCapacity} Patients</span>
          <strong className={style.text}>~{estimatedWaitMinutes} min wait</strong>
        </div>
      </div>
    );
  }

  return (
    <div className={`mediq-card bg-white border ${style.border} p-5 sm:p-6 space-y-5 rounded-3xl shadow-sm`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D5]">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2B4C3F]">Live Queue Telemetry</span>
          <h3 className="text-xl font-extrabold text-[#252525]">{departmentName}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-white ${style.badgeBg} shadow-xs`}>
            {style.label}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#5C5852] bg-[#F8F5EF] px-2.5 py-1 rounded-full border border-[#E8E2D5]">
            {trendIcons[trend]}
            <span className="capitalize">{trend}</span>
          </div>
        </div>
      </div>

      {/* Main Meter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Crowd Capacity & Visual Gauge */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-[#5C5852] font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#2B4C3F]" />
              Current Department Crowd Density
            </span>
            <span className="font-extrabold text-[#252525]">
              {percentage}% Capacity ({currentPatients} patients)
            </span>
          </div>

          {/* Animated Capacity Bar */}
          <div className="h-4 bg-[#F8F5EF] rounded-full overflow-hidden p-1 border border-[#E8E2D5] shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`h-full rounded-full ${style.bar} shadow-xs`}
            />
          </div>

          {/* Grid of Person Icons for Visual Density */}
          <div className="flex items-center gap-1 pt-1 flex-wrap">
            {Array.from({ length: 20 }).map((_, i) => {
              const activeCount = Math.round((percentage / 100) * 20);
              const isActive = i < activeCount;
              return (
                <span
                  key={i}
                  className={`w-2.5 h-4 rounded-xs transition-all duration-300 ${
                    isActive ? style.bar : 'bg-[#E8E2D5]'
                  }`}
                  title={`Patient density unit ${i + 1}`}
                />
              );
            })}
            <span className="text-[10px] text-[#8C867D] ml-2">20 slots visual indicator</span>
          </div>
        </div>

        {/* Estimated Wait Card & Recommendation */}
        <div className="md:col-span-5 space-y-3">
          <div className={`p-4 rounded-2xl ${style.bg} ${style.border} border text-center space-y-1`}>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5C5852] block">
              Estimated Waiting Time
            </span>
            <div className={`text-3xl font-black ${style.text}`}>
              ~{estimatedWaitMinutes} <span className="text-base font-bold">mins</span>
            </div>
            <p className="text-[11px] text-[#5C5852] flex items-center justify-center gap-1">
              {style.icon}
              <span>{style.statusMsg}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hourly Crowd Trend Visualization & Advisory */}
      <div className="pt-4 border-t border-[#E8E2D5] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Trend Sparkline Chart */}
        <div className="md:col-span-5 space-y-1">
          <span className="text-[10px] font-bold text-[#8C867D] uppercase tracking-wider block">Today's Load Pattern</span>
          <div className="h-10 flex items-end gap-1.5 pt-2">
            {trendPoints.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`w-full rounded-t-xs ${val > 70 ? 'bg-[#E9826E]' : val > 40 ? 'bg-[#D9A436]' : 'bg-[#6F9F82]'}`}
                />
                <span className="text-[8px] text-[#8C867D]">
                  {['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MEDIQ Recommendation */}
        <div className="md:col-span-7 p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs text-[#5C5852] flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white border border-[#E8E2D5] text-[#2B4C3F] shrink-0 font-bold">
            💡 Advice
          </div>
          <div>
            <strong className="text-[#252525] block font-bold">MEDIQ Queue Guidance:</strong>
            <span className="text-[#5C5852]">{recommendation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
