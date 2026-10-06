import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Database, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StatusIndicator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all select-none',
        isSupabaseConfigured
          ? 'bg-[#EAF2EC] border-[#C8DDD0] text-[#2A543B]'
          : 'bg-[#F0EDF7] border-[#D3CBEA] text-[#45376B]',
        className
      )}
      title={
        isSupabaseConfigured
          ? 'Connected to live Supabase PostgreSQL database'
          : 'Running in safe Demo Preview mode (Supabase integration ready)'
      }
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            isSupabaseConfigured ? 'bg-[#4A7C59]' : 'bg-[#8574B3]'
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            isSupabaseConfigured ? 'bg-[#4A7C59]' : 'bg-[#8574B3]'
          )}
        />
      </span>
      {isSupabaseConfigured ? (
        <>
          <Database className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Supabase Realtime Live</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#8574B3]" aria-hidden="true" />
          <span>Demo Mode (Supabase Ready)</span>
        </>
      )}
    </div>
  );
};
