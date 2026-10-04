import { CrowdLevel } from '../types/crowd';

export interface CrowdConfig {
  label: string;
  statusTitle: string; // e.g. "Quiet right now", "Moderate activity", "Busy right now"
  description: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  cardBg: string;
  iconName: 'CheckCircle2' | 'Clock' | 'AlertCircle';
  ariaLabel: string;
  recommendedAction: string;
}

export const CROWD_CONFIG: Record<CrowdLevel, CrowdConfig> = {
  LOW: {
    label: 'Low Crowd',
    statusTitle: 'Quiet right now',
    description: 'Minimal wait time. Direct registration and short consultation queues.',
    badgeBg: 'bg-[#EAF2EC]',
    badgeText: 'text-[#2A543B]',
    badgeBorder: 'border-[#C8DDD0]',
    dotColor: 'bg-[#4A7C59]',
    cardBg: 'bg-[#F2F7F4]',
    iconName: 'CheckCircle2',
    ariaLabel: 'Crowd status: Quiet right now. Short wait times expected.',
    recommendedAction: 'Optimal time for visit. Minimal wait expected upon arrival.',
  },
  MODERATE: {
    label: 'Moderate Crowd',
    statusTitle: 'Moderate activity',
    description: 'Steady patient flow. Standard waiting times apply.',
    badgeBg: 'bg-[#FDF7E7]',
    badgeText: 'text-[#705008]',
    badgeBorder: 'border-[#F5E3B3]',
    dotColor: 'bg-[#D9A436]',
    cardBg: 'bg-[#FCF9F0]',
    iconName: 'Clock',
    ariaLabel: 'Crowd status: Moderate activity. Standard wait times expected.',
    recommendedAction: 'Consider booking a queue token online before departing.',
  },
  HIGH: {
    label: 'High Crowd',
    statusTitle: 'Busy right now',
    description: 'Department experiencing heavy volume. Extended waiting time expected.',
    badgeBg: 'bg-[#FAECE8]',
    badgeText: 'text-[#8C301E]',
    badgeBorder: 'border-[#F2C4BA]',
    dotColor: 'bg-[#E9826E]',
    cardBg: 'bg-[#FAF3F1]',
    iconName: 'AlertCircle',
    ariaLabel: 'Crowd status: Busy right now. Significant wait time expected.',
    recommendedAction: 'Consider visiting after 5:00 PM or select an alternate nearby facility.',
  },
};
