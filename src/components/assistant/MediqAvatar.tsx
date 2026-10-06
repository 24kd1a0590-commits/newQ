import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, CheckCircle2, Volume2, Loader2, HeartPulse } from 'lucide-react';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'responding' | 'alert' | 'success';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface MediqAvatarProps {
  state?: AvatarState;
  size?: AvatarSize;
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const MediqAvatar: React.FC<MediqAvatarProps> = ({
  state = 'idle',
  size = 'md',
  showBadge = true,
  className = '',
  onClick,
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  // State badge configuration
  const stateBadgeConfig = {
    idle: {
      bg: 'bg-[#6F9F82]',
      border: 'border-white',
      icon: <Sparkles className={iconSizes[size]} />,
      text: 'Ready',
    },
    listening: {
      bg: 'bg-[#2B4C3F]',
      border: 'border-white',
      icon: <Volume2 className={iconSizes[size]} />,
      text: 'Listening...',
    },
    thinking: {
      bg: 'bg-[#D9A436]',
      border: 'border-white',
      icon: <Loader2 className={`${iconSizes[size]} animate-spin`} />,
      text: 'Thinking...',
    },
    responding: {
      bg: 'bg-[#2B4C3F]',
      border: 'border-white',
      icon: <HeartPulse className={iconSizes[size]} />,
      text: 'Responding',
    },
    alert: {
      bg: 'bg-[#E9826E]',
      border: 'border-white',
      icon: <AlertTriangle className={iconSizes[size]} />,
      text: 'Crowd Advisory',
    },
    success: {
      bg: 'bg-[#4A7C59]',
      border: 'border-white',
      icon: <CheckCircle2 className={iconSizes[size]} />,
      text: 'Done',
    },
  };

  const badgeInfo = stateBadgeConfig[state];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Outer Pulse / Ring Animation for Active States */}
      {state === 'listening' && (
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#6F9F82]/30 pointer-events-none"
        />
      )}

      {state === 'thinking' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1 rounded-full border-2 border-dashed border-[#D9A436] pointer-events-none"
        />
      )}

      {state === 'alert' && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#E9826E]/40 pointer-events-none"
        />
      )}

      {/* Main Avatar Container */}
      <motion.div
        animate={
          state === 'idle'
            ? { scale: [1, 1.03, 1] }
            : state === 'responding'
            ? { y: [0, -2, 0] }
            : {}
        }
        transition={
          state === 'idle'
            ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            : state === 'responding'
            ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#2B4C3F] shadow-md bg-[#F3EFE6] relative z-10 flex items-center justify-center`}
      >
        <img
          src="/images/mediq_assistant_avatar.jpg"
          alt="MEDIQ Healthcare Assistant"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback avatar UI if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Fallback Icon inside if image fails */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#EAF2EC] text-[#2B4C3F] font-bold text-xs">
          <HeartPulse className="w-1/2 h-1/2" />
        </div>
      </motion.div>

      {/* State Badge Icon Overlay */}
      {showBadge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -bottom-1 -right-1 z-20 p-1 rounded-full ${badgeInfo.bg} text-white ${badgeInfo.border} border-2 shadow-sm flex items-center justify-center`}
          title={`MEDIQ Assistant State: ${badgeInfo.text}`}
        >
          {badgeInfo.icon}
        </motion.div>
      )}
    </div>
  );
};
