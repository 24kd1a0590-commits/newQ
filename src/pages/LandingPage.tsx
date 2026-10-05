import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Clock3,
  Users,
  Building2,
  Bell,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  XCircle,
  Eye,
  Sliders,
  CalendarCheck,
  Smartphone,
  ChevronRight,
  HeartPulse,
  Navigation,
} from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { CrowdBadge } from '../components/ui/CrowdBadge';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DEMO_PREVIEW_FLAG_TEXT } from '../constants/mockData';
import { MediqAvatar } from '../components/assistant/MediqAvatar';
import { CrowdVisualization } from '../components/crowd/CrowdVisualization';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col selection:bg-[#2B4C3F] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION — HIGH IMPACT VISUAL COMPOSITION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EC] border border-[#C8DDD0] text-[#2A543B] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#2B4C3F]" />
                <span>Smart Hospital Crowd Intelligence Platform</span>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-extrabold uppercase tracking-widest text-[#2B4C3F]">MEDIQ</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#252525] leading-[1.15] tracking-tight">
                  Don’t wait to find out.{' '}
                  <span className="block text-[#2B4C3F] mt-1 italic font-normal">Know before you go.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#5C5852] leading-relaxed max-w-xl">
                See hospital crowd levels, understand waiting times, and choose a better time to visit. MEDIQ turns live department activity telemetry into clear queue visibility.
              </p>

              {/* MEDIQ Assistant Callout */}
              <div className="p-4 bg-white rounded-2xl border border-[#C8DDD0] flex items-center gap-4 shadow-sm">
                <MediqAvatar state="idle" size="sm" showBadge={false} />
                <div className="text-xs">
                  <strong className="text-[#252525] font-extrabold block">Meet your MEDIQ Assistant</strong>
                  <span className="text-[#5C5852]">"Ask me anytime about nearby low-crowd OPD slots."</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.PATIENT.HOSPITALS}>
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Check Hospital Crowd
                  </Button>
                </Link>
                <Link to={ROUTES.PATIENT.DASHBOARD}>
                  <Button size="lg" variant="secondary" leftIcon={<Sparkles className="w-4 h-4 text-[#2B4C3F]" />}>
                    Explore MEDIQ
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E8E2D5] flex items-center gap-6 text-xs text-[#5C5852]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A7C59]" />
                  <span>No Diagnosis Claims</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2B4C3F]" />
                  <span>Operational Crowd Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Real Hospital Photo + Telemetry Card Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="mediq-card bg-white border border-[#E8E2D5] p-4 sm:p-6 shadow-2xl rounded-3xl relative overflow-hidden space-y-4">
                
                {/* Hero Photo Image */}
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#E8E2D5] bg-[#EFEBE1]">
                  <img
                    src="/images/hero_hospital.jpg"
                    alt="The Willows Healthcare Center"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-[#2B4C3F] text-xs font-bold shadow-xs backdrop-blur-md">
                      2.4 km away
                    </span>
                    <CrowdBadge level="HIGH" size="md" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-0.5">
                    <h3 className="text-xl font-extrabold">CityCare Hospital</h3>
                    <p className="text-xs text-white/90 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#EAF2EC]" />
                      General OPD • Metropolis District
                    </p>
                  </div>
                </div>

                {/* Telemetry Gauge Box */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#FAECE8] border border-[#F2C4BA] space-y-1">
                    <span className="text-[11px] text-[#8C301E] font-medium block">Current Crowd</span>
                    <div className="text-2xl font-black text-[#8C301E]">82 / 100</div>
                    <span className="text-[10px] text-[#8C301E]/80 block">General OPD Load</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FDF7E7] border border-[#F5E3B3] space-y-1">
                    <span className="text-[11px] text-[#705008] font-medium block">Estimated Wait</span>
                    <div className="text-2xl font-black text-[#705008]">~45 min</div>
                    <span className="text-[10px] text-[#705008]/80 block">Updated 2 min ago</span>
                  </div>
                </div>

                {/* Advice Footnote */}
                <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] flex items-center gap-3 text-xs text-[#5C5852]">
                  <AlertCircle className="w-4 h-4 text-[#E9826E] shrink-0" />
                  <span>"MEDIQ recommends visiting after 5:00 PM for minimal wait."</span>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. HUMAN STORYTELLING SECTION — BEFORE vs WITH MEDIQ (Requirement #16) */}
      <section className="py-20 bg-[#EFEBE1]/60 border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B4C3F]">Human Storytelling</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Transforming the Patient Healthcare Journey
            </h2>
            <p className="text-sm text-[#5C5852] leading-relaxed">
              Ignorance of crowd conditions creates unpredictable waiting. MEDIQ empowers patients with pre-visit crowd visibility.
            </p>
          </div>

          {/* Visual Journey Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* BEFORE MEDIQ */}
            <div className="mediq-card bg-white border-[#F2C4BA] p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2C4BA]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FAECE8] text-[#8C301E]">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#252525]">Without MEDIQ</h3>
                    <p className="text-xs text-[#8C301E]">Unpredictable Traditional Hospital Visit</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FAECE8] text-[#8C301E] font-bold border border-[#F2C4BA]">
                  High Friction
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#E8E2D5] text-[#252525] flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <p className="font-extrabold text-[#252525]">Home</p>
                    <p className="text-[#5C5852] mt-0.5">Patient leaves home without knowing current department crowd.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#E8E2D5] text-[#252525] flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <p className="font-extrabold text-[#252525]">Travel</p>
                    <p className="text-[#5C5852] mt-0.5">Spends 30–45 minutes commuting across traffic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAECE8] border border-[#F2C4BA] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#E9826E] text-white flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <p className="font-extrabold text-[#8C301E]">Reach Hospital & Discover Crowd</p>
                    <p className="text-[#8C301E] mt-0.5">Discovers 80+ patients waiting. Waiting time exceeds 90 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAECE8] border border-[#F2C4BA] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#E9826E] text-white flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <p className="font-extrabold text-[#8C301E]">Long Unexpected Waiting</p>
                    <p className="text-[#8C301E] mt-0.5">Frustrated patient sits in congested, stressful waiting hall.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WITH MEDIQ */}
            <div className="mediq-card bg-white border-[#C8DDD0] p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#C8DDD0]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#EAF2EC] text-[#2A543B]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#252525]">With MEDIQ</h3>
                    <p className="text-xs text-[#2A543B]">Empowered & Informed Patient Care</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">
                  Zero Surprises
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#2B4C3F] text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <p className="font-extrabold text-[#252525]">Check MEDIQ</p>
                    <p className="text-[#5C5852] mt-0.5">Opens MEDIQ app before leaving home. Views live queue telemetry.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#2B4C3F] text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <p className="font-extrabold text-[#252525]">See Crowd & Understand Wait Time</p>
                    <p className="text-[#5C5852] mt-0.5">App indicates high crowd now (~45 min wait), recommends visiting after 5 PM.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#EAF2EC] border border-[#C8DDD0] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#4A7C59] text-white flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <p className="font-extrabold text-[#2A543B]">Choose Better Time or Facility</p>
                    <p className="text-[#2A543B] mt-0.5">Reserves off-peak token or selects nearby low-crowd clinic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#EAF2EC] border border-[#C8DDD0] text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#4A7C59] text-white flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <p className="font-extrabold text-[#2A543B]">Reach Hospital with Confidence</p>
                    <p className="text-[#2A543B] mt-0.5">Arrives right on time. Consultation happens with minimal wait.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HEALTHCARE PHOTOGRAPHY SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B4C3F]">Human-Centered Care</span>
          <h2 className="text-3xl font-extrabold text-[#252525]">Designed for Patients & Families</h2>
          <p className="text-sm text-[#5C5852]">
            Warm, reassuring healthcare environments designed to reduce anxiety and streamline hospital visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="mediq-card bg-white border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-xs space-y-4 p-4">
            <div className="h-48 rounded-2xl overflow-hidden bg-[#EFEBE1]">
              <img src="/images/waiting_room.jpg" alt="Peaceful Waiting Area" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 p-2">
              <h3 className="text-lg font-extrabold text-[#252525]">Peaceful Waiting Halls</h3>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                By spreading patient traffic evenly across hours, waiting areas stay calm and un-congested.
              </p>
            </div>
          </div>

          <div className="mediq-card bg-white border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-xs space-y-4 p-4">
            <div className="h-48 rounded-2xl overflow-hidden bg-[#EFEBE1]">
              <img src="/images/doctor_consultation.jpg" alt="Doctor Consultation" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 p-2">
              <h3 className="text-lg font-extrabold text-[#252525]">Quality Consultation Time</h3>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                Doctors give focused attention when department surges are managed proactively.
              </p>
            </div>
          </div>

          <div className="mediq-card bg-white border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-xs space-y-4 p-4">
            <div className="h-48 rounded-2xl overflow-hidden bg-[#EFEBE1]">
              <img src="/images/patient_family.jpg" alt="Patient Family Support" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 p-2">
              <h3 className="text-lg font-extrabold text-[#252525]">Support for Families & Elderly</h3>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                Elderly patients and accompanying families avoid exhausting 2-hour waits in crowded hallways.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};
