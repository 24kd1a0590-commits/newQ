import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MOCK_APPOINTMENTS, MOCK_HOSPITALS } from '../../constants/mockData';
import { Calendar, Clock, Ticket, Building2, CheckCircle2, UserRound, Sparkles, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { Appointment } from '../../types/appointment';

export const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [activeTab, setActiveTab] = useState<'my-appointments' | 'book-new'>('my-appointments');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  // Form State
  const [selectedHospitalId, setSelectedHospitalId] = useState('hosp-01');
  const [selectedDeptId, setSelectedDeptId] = useState('dept-citycare-opd-01');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('05:30 PM');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Elena Rostova');
  const [patientNotes, setPatientNotes] = useState('');

  const selectedHospital = MOCK_HOSPITALS.find((h) => h.id === selectedHospitalId) || MOCK_HOSPITALS[0];
  const selectedDept = selectedHospital.departments.find((d) => d.id === selectedDeptId) || selectedHospital.departments[0];

  const timeSlots = [
    { time: '09:00 AM', load: 'HIGH', wait: '45 min' },
    { time: '11:30 AM', load: 'HIGH', wait: '40 min' },
    { time: '02:30 PM', load: 'MODERATE', wait: '20 min' },
    { time: '05:30 PM', load: 'LOW', wait: '10 min (Recommended)' },
    { time: '06:45 PM', load: 'LOW', wait: '5 min' },
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: 'usr-patient-demo',
      patientName: 'Sarah Jenkins',
      hospitalId: selectedHospital.id,
      hospitalName: selectedHospital.name,
      departmentId: selectedDept.id,
      departmentName: selectedDept.name,
      appointmentTime: new Date(Date.now() + 86400000).toISOString(),
      tokenNumber: Math.floor(Math.random() * 50) + 15,
      status: 'scheduled',
      estimatedWaitMinutes: selectedDept.crowd.estimatedWaitMinutes,
      crowdLevelAtBooking: selectedDept.crowd.level,
      notes: patientNotes || 'Routine Queue Reservation',
      createdAt: new Date().toISOString(),
    };

    setAppointments([newApt, ...appointments]);
    setBookingSuccess(newApt);
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Consultation Tokens & Appointments"
        description="Book off-peak OPD tokens, track live queue wait times, and manage your consultation schedule."
        badge={
          <span className="text-xs px-3.5 py-1.5 rounded-full bg-[#EAF2EC] text-[#2A543B] font-bold border border-[#C8DDD0]">
            {appointments.length} Active Reservations
          </span>
        }
        actions={
          <div className="flex bg-[#EFEBE1] p-1 rounded-2xl border border-[#E8E2D5]">
            <button
              onClick={() => {
                setActiveTab('my-appointments');
                setBookingSuccess(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'my-appointments' ? 'bg-[#2B4C3F] text-white shadow-xs' : 'text-[#5C5852]'
              }`}
            >
              My Tokens
            </button>
            <button
              onClick={() => {
                setActiveTab('book-new');
                setBookingSuccess(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'book-new' ? 'bg-[#2B4C3F] text-white shadow-xs' : 'text-[#5C5852]'
              }`}
            >
              Book New Token
            </button>
          </div>
        }
      />

      {/* CONFIRMATION SUCCESS STATE (Requirement #12) */}
      {bookingSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mediq-card bg-white border border-[#C8DDD0] p-8 rounded-3xl space-y-6 max-w-2xl mx-auto shadow-xl text-center"
        >
          {/* Success Checkmark Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="w-20 h-20 rounded-full bg-[#EAF2EC] text-[#2A543B] border-2 border-[#C8DDD0] flex items-center justify-center mx-auto shadow-md"
          >
            <CheckCircle2 className="w-10 h-10 text-[#4A7C59]" />
          </motion.div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2A543B]">
              Confirmation Issued
            </span>
            <h2 className="text-3xl font-black text-[#252525]">✓ Appointment Confirmed</h2>
            <p className="text-sm text-[#5C5852]">
              Your token has been reserved in the real-time department queue system.
            </p>
          </div>

          {/* Ticket Summary Card */}
          <div className="p-6 bg-[#F8F5EF] rounded-3xl border border-[#E8E2D5] space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C867D]">Consultation Token</span>
                <div className="text-2xl font-black text-[#2B4C3F]">Token #{bookingSuccess.tokenNumber}</div>
              </div>
              <CrowdBadge level={bookingSuccess.crowdLevelAtBooking} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#5C5852] block">Hospital:</span>
                <strong className="text-[#252525] font-extrabold text-sm">{bookingSuccess.hospitalName}</strong>
              </div>
              <div>
                <span className="text-[#5C5852] block">Department:</span>
                <strong className="text-[#252525] font-extrabold text-sm">{bookingSuccess.departmentName}</strong>
              </div>
              <div>
                <span className="text-[#5C5852] block">Selected Time Slot:</span>
                <strong className="text-[#252525] font-extrabold text-sm">{selectedTimeSlot}</strong>
              </div>
              <div>
                <span className="text-[#5C5852] block">Est Waiting Time:</span>
                <strong className="text-[#705008] font-extrabold text-sm">~{bookingSuccess.estimatedWaitMinutes} mins</strong>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <Button
              variant="primary"
              onClick={() => {
                setBookingSuccess(null);
                setActiveTab('my-appointments');
              }}
            >
              View My Tokens
            </Button>
          </div>
        </motion.div>
      ) : activeTab === 'book-new' ? (
        /* BOOK NEW APPOINTMENT FORM */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mediq-card bg-white border border-[#E8E2D5] p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xs"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#252525]">Reserve OPD Consultation Slot</h2>
            <p className="text-xs text-[#5C5852]">
              Select facility, department, and off-peak hour to minimize waiting room time.
            </p>
          </div>

          <form onSubmit={handleBookSubmit} className="space-y-6">
            {/* Step 1: Select Facility */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#252525] block">1. Select Hospital Facility</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_HOSPITALS.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      setSelectedHospitalId(h.id);
                      setSelectedDeptId(h.departments[0]?.id || '');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedHospitalId === h.id
                        ? 'border-[#2B4C3F] bg-[#EAF2EC] ring-1 ring-[#2B4C3F]'
                        : 'border-[#E8E2D5] bg-[#F8F5EF] hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-extrabold text-[#252525]">{h.name}</h4>
                      <CrowdBadge level={h.overallCrowdLevel} size="sm" showDot={false} />
                    </div>
                    <p className="text-xs text-[#5C5852]">{h.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Select Department & Doctor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#252525] block">2. Select Medical Department</label>
                <div className="space-y-2">
                  {selectedHospital.departments.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDeptId(d.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedDeptId === d.id
                          ? 'border-[#2B4C3F] bg-[#EAF2EC]'
                          : 'border-[#E8E2D5] bg-[#F8F5EF] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white text-[#2B4C3F]">
                          <HeartPulse className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-extrabold text-[#252525] block">{d.name}</strong>
                          <span className="text-[10px] text-[#5C5852]">{d.activeDoctors} Doctors Active</span>
                        </div>
                      </div>
                      <CrowdBadge level={d.crowd.level} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Card */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#252525] block">Available Specialist Profile</label>
                <div className="p-4 rounded-2xl border border-[#E8E2D5] bg-[#F8F5EF] flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#E8E2D5] shrink-0 bg-[#EFEBE1]">
                    <img src="/images/doctor_consultation.jpg" alt="Doctor" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#252525]">{selectedDoctor}</h4>
                    <p className="text-xs text-[#2B4C3F] font-semibold">Senior Attending Consultant</p>
                    <p className="text-[11px] text-[#5C5852] mt-0.5">Focus: General Diagnostics & Internal Care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Available Time Slot Visualization */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#252525] block">3. Select Preferred Time Slot (MEDIQ Queue Guidance)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((slot, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      selectedTimeSlot === slot.time
                        ? 'border-[#2B4C3F] bg-[#2B4C3F] text-white shadow-xs'
                        : 'border-[#E8E2D5] bg-[#F8F5EF] hover:bg-white text-[#252525]'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{slot.time}</div>
                    <span className="text-[10px] block opacity-80 mt-1">{slot.wait}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button size="lg" variant="primary" type="submit" className="w-full">
              Confirm & Issue Consultation Token
            </Button>
          </form>
        </motion.div>
      ) : (
        /* MY TOKENS LIST VIEW */
        <div className="space-y-6">
          {appointments.map((apt) => (
            <Card key={apt.id} className="mediq-card border-[#E8E2D5] bg-white p-6 rounded-3xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-[#E8E2D5]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#2B4C3F] flex flex-col items-center justify-center text-white font-extrabold shadow-xs shrink-0">
                    <span className="text-[9px] uppercase tracking-wider opacity-80">TOKEN</span>
                    <span className="text-2xl font-black">#{apt.tokenNumber}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-[#252525]">{apt.departmentName}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAF2EC] text-[#2A543B] border border-[#C8DDD0] font-bold uppercase">
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C5852] flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-[#8C867D]" />
                      {apt.hospitalName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CrowdBadge level={apt.crowdLevelAtBooking} size="md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#2B4C3F] shrink-0" />
                  <div>
                    <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Scheduled Time</span>
                    <strong className="text-[#252525] text-sm">{formatDate(apt.appointmentTime)}</strong>
                  </div>
                </div>

                <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#705008] shrink-0" />
                  <div>
                    <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Estimated Queue Wait</span>
                    <strong className="text-[#705008] text-sm">{apt.estimatedWaitMinutes} min wait</strong>
                  </div>
                </div>

                <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] flex items-center justify-between">
                  <div>
                    <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Token Status</span>
                    <strong className="text-[#2B4C3F] text-sm">Active & Verified</strong>
                  </div>
                  <Button variant="outline" size="sm">Check In</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
