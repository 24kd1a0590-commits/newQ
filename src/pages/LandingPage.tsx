import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Clock,
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
} from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { CrowdBadge } from '../components/ui/CrowdBadge';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DEMO_PREVIEW_FLAG_TEXT } from '../constants/mockData';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col selection:bg-[#2B4C3F] selection:text-white">
      <Navbar />

      {/* HERO SECTION — EDITORIAL ASYMMETRICAL COMPOSITION */}
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
                <Sparkles className="w-3.5 h-3.5 text-[#4A7C59]" />
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
                MEDIQ monitors hospital department crowds and converts live activity telemetry into clear waiting time visibility. Know the queue conditions before stepping out of your home.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.PATIENT.HOSPITALS}>
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Find a Hospital
                  </Button>
                </Link>
                <Link to={ROUTES.HOSPITAL.CROWD}>
                  <Button size="lg" variant="secondary" leftIcon={<Building2 className="w-4 h-4 text-[#2B4C3F]" />}>
                    Hospital Staff Console
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

            {/* Right Column: Believable Hospital Crowd Intelligence Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="mediq-card bg-white border border-[#E8E2D5] p-6 sm:p-8 shadow-xl rounded-3xl relative">
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-[#E8E2D5]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E9826E] animate-pulse" />
                    <span className="text-xs font-bold text-[#8C867D] uppercase tracking-wider">Live Activity Telemetry</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F3EFE6] text-[#5C5852]">
                    Preview Data
                  </span>
                </div>

                {/* Facility & Department Details */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-[#5C5852] uppercase tracking-wide">Facility & Department</span>
                    <h3 className="text-2xl font-extrabold text-[#252525]">CityCare Hospital</h3>
                    <p className="text-xs text-[#5C5852] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C867D]" />
                      General OPD • Metropolis District
                    </p>
                  </div>
                  <CrowdBadge level="HIGH" size="md" />
                </div>

                {/* Metrics Card Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Metric 1: Patients */}
                  <div className="p-4 rounded-2xl bg-[#FAECE8] border border-[#F2C4BA] space-y-1">
                    <span className="text-xs text-[#8C301E] font-medium block">Current Department Load</span>
                    <div className="text-3xl font-black text-[#8C301E] flex items-baseline gap-1">
                      <span>82</span>
                      <span className="text-sm font-semibold text-[#8C301E]/70">/ 100 capacity</span>
                    </div>
                    <div className="w-full bg-[#F2C4BA] rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-[#E9826E] h-1.5 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  {/* Metric 2: Estimated Wait */}
                  <div className="p-4 rounded-2xl bg-[#FDF7E7] border border-[#F5E3B3] space-y-1">
                    <span className="text-xs text-[#705008] font-medium block">Estimated Wait Time</span>
                    <div className="text-3xl font-black text-[#705008] flex items-baseline gap-1">
                      <span>45</span>
                      <span className="text-sm font-semibold text-[#705008]/70">min</span>
                    </div>
                    <span className="text-[10px] text-[#705008]/80 block mt-2">Updated 2 minutes ago</span>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="p-4 rounded-2xl bg-[#FAF3F1] border border-[#F2C4BA] flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#E9826E] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <h4 className="font-bold text-[#8C301E]">Patient Guidance Recommendation</h4>
                    <p className="text-[#5C5852] leading-relaxed">
                      "Consider visiting after 5:00 PM." — OPD volume currently peak. Off-peak visiting hours reduce expected wait to under 12 minutes.
                    </p>
                  </div>
                </div>

                {/* Disclaimer Footnote */}
                <p className="text-[11px] text-[#8C867D] mt-4 text-center">
                  {DEMO_PREVIEW_FLAG_TEXT}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HUMAN-CENTERED VISUAL STORY SECTION — BEFORE vs WITH MEDIQ */}
      <section className="py-20 bg-[#EFEBE1]/60 border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B4C3F]">The Patient Experience Transformation</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Ignorance of crowd conditions creates unpredictable waiting
            </h2>
            <p className="text-sm text-[#5C5852] leading-relaxed">
              MEDIQ replaces blind hospital travel with clear, predictive transparency before arrival.
            </p>
          </div>

          {/* Visual Journey Transformation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* BEFORE MEDIQ Journey */}
            <div className="mediq-card bg-white border-[#F2C4BA] p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2C4BA]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FAECE8] text-[#8C301E]">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#252525]">Before MEDIQ</h3>
                    <p className="text-xs text-[#8C301E]">Unpredictable Traditional Hospital Visit</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FAECE8] text-[#8C301E] font-bold border border-[#F2C4BA]">
                  High Friction
                </span>
              </div>

              {/* Journey Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#E8E2D5] text-[#252525] flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <p className="font-bold text-[#252525]">Patient Leaves Home Blindly</p>
                    <p className="text-[#5C5852] mt-0.5">Decides to travel to the hospital without knowing current department crowd.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#E8E2D5] text-[#252525] flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <p className="font-bold text-[#252525]">Travels in Traffic</p>
                    <p className="text-[#5C5852] mt-0.5">Spends 30–45 minutes commuting across the city.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAECE8] border border-[#F2C4BA] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#E9826E] text-white flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <p className="font-bold text-[#8C301E]">Finds Overcrowded OPD Room</p>
                    <p className="text-[#8C301E] mt-0.5">Discovers 80+ patients waiting. Waiting time exceeds 90 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAECE8] border border-[#F2C4BA] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#E9826E] text-white flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <p className="font-bold text-[#8C301E]">Waits Unexpectedly for Hours</p>
                    <p className="text-[#8C301E] mt-0.5">Frustrated patient forced to sit in congested waiting hall.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WITH MEDIQ Journey */}
            <div className="mediq-card bg-white border-[#C8DDD0] p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#C8DDD0]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#EAF2EC] text-[#2A543B]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#252525]">With MEDIQ</h3>
                    <p className="text-xs text-[#2A543B]">Empowered & Informed Patient Visit</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">
                  Zero Surprise
                </span>
              </div>

              {/* Journey Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#2B4C3F] text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <p className="font-bold text-[#252525]">Checks MEDIQ at Home</p>
                    <p className="text-[#5C5852] mt-0.5">Opens MEDIQ app before leaving. Views live crowd telemetry.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#F8F5EF] border border-[#E8E2D5] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#2B4C3F] text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <p className="font-bold text-[#252525]">Sees Crowd Status & Guidance</p>
                    <p className="text-[#5C5852] mt-0.5">App flags "Busy right now (45 min wait). Consider visiting after 5:00 PM."</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#EAF2EC] border border-[#C8DDD0] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#4A7C59] text-white flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <p className="font-bold text-[#2A543B]">Chooses Better Visiting Time</p>
                    <p className="text-[#2A543B] mt-0.5">Books token for off-peak hours or selects alternate low-crowd facility.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#EAF2EC] border border-[#C8DDD0] text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#4A7C59] text-white flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <p className="font-bold text-[#2A543B]">Fast & Peaceful Visit</p>
                    <p className="text-[#2A543B] mt-0.5">Arrives right on schedule. Minimal waiting time before consultation.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ELEGANT CROWD STATUS DESIGN SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2B4C3F]">Semantic Status Standards</span>
          <h2 className="text-3xl font-extrabold text-[#252525]">Clear Semantic Crowd Language</h2>
          <p className="text-sm text-[#5C5852]">
            MEDIQ uses accessible, human-readable status levels combining text, icons, and contextual recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LOW CROWD */}
          <div className="mediq-card bg-[#F2F7F4] border-[#C8DDD0] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#2A543B] tracking-wider">Level 1</span>
              <CrowdBadge level="LOW" size="sm" />
            </div>
            <h3 className="text-xl font-bold text-[#2A543B]">"Quiet right now"</h3>
            <p className="text-xs text-[#5C5852] leading-relaxed">
              Minimal queue velocity. Short waiting time expected. Optimal window to visit hospital.
            </p>
          </div>

          {/* MODERATE CROWD */}
          <div className="mediq-card bg-[#FCF9F0] border-[#F5E3B3] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#705008] tracking-wider">Level 2</span>
              <CrowdBadge level="MODERATE" size="sm" />
            </div>
            <h3 className="text-xl font-bold text-[#705008]">"Moderate activity"</h3>
            <p className="text-xs text-[#5C5852] leading-relaxed">
              Steady patient inflow. Standard waiting times apply. Booking queue token recommended.
            </p>
          </div>

          {/* HIGH CROWD */}
          <div className="mediq-card bg-[#FAF3F1] border-[#F2C4BA] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#8C301E] tracking-wider">Level 3</span>
              <CrowdBadge level="HIGH" size="sm" />
            </div>
            <h3 className="text-xl font-bold text-[#8C301E]">"Busy right now"</h3>
            <p className="text-xs text-[#5C5852] leading-relaxed">
              Heavy patient volume. Extended delay expected. Off-peak visiting hours recommended.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES GRID */}
      <section className="py-20 bg-[#EFEBE1]/40 border-t border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2B4C3F]">Platform Capabilities</h2>
            <h3 className="text-3xl font-extrabold text-[#252525]">Built for Patients and Hospital Operations</h3>
            <p className="text-sm text-[#5C5852]">
              Powered by real-time activity telemetry and Supabase PostgreSQL infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mediq-card bg-white p-6 border-[#E8E2D5] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] text-[#2A543B] flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#252525]">Pre-Visit Visibility</h4>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                Inspect department patient volume and estimated consultation wait before leaving home.
              </p>
            </div>

            <div className="mediq-card bg-white p-6 border-[#E8E2D5] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F0EDF7] text-[#45376B] flex items-center justify-center font-bold">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#252525]">Surge Notifications</h4>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                Receive proactive alerts when crowd levels spike or when waiting times drop significantly.
              </p>
            </div>

            <div className="mediq-card bg-white p-6 border-[#E8E2D5] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FDF7E7] text-[#705008] flex items-center justify-center font-bold">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#252525]">Staff Telemetry Publisher</h4>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                Hospital staff can update crowd metrics, manage capacity thresholds, and balance patient load.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
