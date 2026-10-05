import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { UserRound, Accessibility, Volume2, Eye, ShieldCheck, Heart, Phone, Mail, MapPin, CheckCircle2, Sparkles, UserPlus } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Accessibility & preference states
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [smsSurgeAlerts, setSmsSurgeAlerts] = useState(true);

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Patient Profile & Accessibility"
        description="Personalize your companion preferences, high-contrast visibility settings, and voice-assisted guidance options."
        badge={
          <span className="text-xs px-3.5 py-1.5 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">
            Accessibility Enabled
          </span>
        }
      />

      {/* Visual Human-Centered Banner (Requirement #2 & #13) */}
      <div className="mediq-card bg-white border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-2xs grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#2B4C3F] text-xs font-bold bg-[#EAF2EC] px-3 py-1 rounded-full border border-[#C8DDD0] w-fit">
            <Accessibility className="w-4 h-4" />
            <span>Inclusive Patient Experience</span>
          </div>
          <h2 className="text-2xl font-black text-[#252525]">Built for Patients of All Ages</h2>
          <p className="text-xs sm:text-sm text-[#5C5852] leading-relaxed">
            MEDIQ provides large touch targets, high contrast indicators, and simple language so that elderly patients and accompanying family members can easily navigate hospital crowd information.
          </p>
        </div>
        <div className="md:col-span-5 h-56 md:h-full bg-[#EFEBE1]">
          <img
            src="/images/elderly_patient_care.jpg"
            alt="Elderly Patient Assistance"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profile Header Visual Card */}
      <Card className="mediq-card border-[#E8E2D5] bg-white p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2B4C3F] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
              <UserRound className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#252525]">{user?.fullName || 'Sarah Jenkins'}</h3>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#EAF2EC] text-[#2A543B] border border-[#C8DDD0]">
                  Patient Member
                </span>
              </div>
              <p className="text-xs text-[#5C5852] mt-1 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#8C867D]" /> {user?.email || 'sarah.j@mediq-health.com'}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#8C867D]" /> +1 (555) 234-5678</span>
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>

        {/* Accessibility Controls Section (Requirement #13) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-[#2B4C3F]" />
            <h4 className="text-sm font-extrabold text-[#252525]">Accessibility & Visual Assistance Settings</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Toggle 1: Voice Guidance */}
            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#EAF2EC] text-[#2A543B]">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-[#252525]">Voice Guidance Companion</h5>
                  <p className="text-[11px] text-[#5C5852]">Read queue recommendations aloud</p>
                </div>
              </div>
              <button
                onClick={() => setVoiceGuidance(!voiceGuidance)}
                className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                  voiceGuidance ? 'bg-[#2B4C3F]' : 'bg-[#D8D0C2]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    voiceGuidance ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: SMS Surge Alerts */}
            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FDF7E7] text-[#705008]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-[#252525]">SMS Queue Surge Alerts</h5>
                  <p className="text-[11px] text-[#5C5852]">Receive SMS when crowd spikes</p>
                </div>
              </div>
              <button
                onClick={() => setSmsSurgeAlerts(!smsSurgeAlerts)}
                className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                  smsSurgeAlerts ? 'bg-[#2B4C3F]' : 'bg-[#D8D0C2]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    smsSurgeAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Saved Monitored Hospitals */}
        <div className="pt-4 border-t border-[#E8E2D5] space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8C867D]">
            My Preferred Healthcare Facilities
          </h4>
          <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-[#E9826E] fill-current" />
              <div>
                <strong className="text-[#252525] block font-extrabold">CityCare Hospital</strong>
                <span className="text-[#5C5852]">Primary General OPD • 2.4 km away</span>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAECE8] text-[#8C301E] font-bold border border-[#F2C4BA]">
              HIGH Crowd
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
