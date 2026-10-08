import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, X, Shield, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { specialtiesData } from '../data/clinicData';
import { Appointment, ClinicLocation, Doctor } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLiveData } from '../context/LiveDataContext';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: ClinicLocation;
  preSelectedSpecialtyId?: string;
  preSelectedDoctor?: Doctor | null;
  onAppointmentCreated: (app: Appointment) => void;
}

const TIME_SLOTS = [
  '08:30 AM',
  '09:15 AM',
  '10:00 AM',
  '11:00 AM',
  '01:30 PM',
  '02:15 PM',
  '03:30 PM',
  '04:30 PM',
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  preSelectedSpecialtyId,
  preSelectedDoctor,
  onAppointmentCreated,
}) => {
  const { user, userProfile } = useAuth();
  const { doctors } = useLiveData();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [specialtyId, setSpecialtyId] = useState<string>(
    preSelectedDoctor?.specialtyId || preSelectedSpecialtyId || 'internal-medicine'
  );
  const [doctorId, setDoctorId] = useState<string>(preSelectedDoctor?.id || '');
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM');
  
  // Patient details
  const [patientName, setPatientName] = useState(userProfile?.fullName || user?.displayName || '');
  const [patientEmail, setPatientEmail] = useState(userProfile?.email || user?.email || '');
  const [patientPhone, setPatientPhone] = useState(userProfile?.phone || user?.phoneNumber || '');
  const [reason, setReason] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [hipaaAccepted, setHipaaAccepted] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (user || userProfile) {
      if (!patientName && (userProfile?.fullName || user?.displayName)) {
        setPatientName(userProfile?.fullName || user?.displayName || '');
      }
      if (!patientEmail && (userProfile?.email || user?.email)) {
        setPatientEmail(userProfile?.email || user?.email || '');
      }
      if (!patientPhone && (userProfile?.phone || user?.phoneNumber)) {
        setPatientPhone(userProfile?.phone || user?.phoneNumber || '');
      }
    }
  }, [user, userProfile]);

  if (!isOpen) return null;

  const availableDoctors = doctors.filter((d) => d.specialtyId === specialtyId);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hipaaAccepted) return;

    const chosenDoc = doctors.find((d) => d.id === doctorId) || availableDoctors[0];

    const newApp: Appointment = {
      id: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user?.uid || 'guest-user',
      patientName,
      patientEmail,
      patientPhone,
      specialtyId: specialtyId as any,
      specialty: chosenDoc?.specialtyName || specialtyId,
      doctorId: chosenDoc?.id || 'doc-1',
      doctorName: chosenDoc?.name || 'Dr. Specialist',
      date,
      timeSlot,
      reason,
      symptoms: reason,
      consultationType: 'In-Person Consultation',
      location: currentLocation.name || 'Kolkata Clinic',
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      isFirstVisit,
    };

    onAppointmentCreated(newApp);
    setConfirmedAppointment(newApp);
    setStep(3);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedAppointment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/80 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold">Book an Appointment</h3>
              <p className="text-xs text-slate-300">
                Kynexis Health {currentLocation.city} Facility
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step !== 3 && (
          <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className={`font-bold ${step === 1 ? 'text-[#112233]' : 'text-slate-400'}`}>
              1. Select Specialty & Time
            </span>
            <span className="text-slate-300">•</span>
            <span className={`font-bold ${step === 2 ? 'text-[#112233]' : 'text-slate-400'}`}>
              2. Patient Details & HIPAA Consent
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800">
          
          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-5">
              
              {/* Select Specialty */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  1. Choose Medical Specialty *
                </label>
                <select
                  value={specialtyId}
                  onChange={(e) => {
                    setSpecialtyId(e.target.value);
                    const docs = doctors.filter((d) => d.specialtyId === e.target.value);
                    setDoctorId(docs[0]?.id || '');
                  }}
                  className="w-full px-4 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                >
                  {specialtiesData.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name} ({spec.tagline})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Doctor */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  2. Choose Subspecialist Physician
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableDoctors.map((doc) => {
                    const isSelected = doctorId === doc.id || (!doctorId && availableDoctors[0]?.id === doc.id);
                    return (
                      <button
                        type="button"
                        key={doc.id}
                        onClick={() => setDoctorId(doc.id)}
                        className={`p-3 text-left rounded-xl border transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 font-semibold'
                            : 'border-slate-200 bg-slate-50 hover:bg-white'
                        }`}
                      >
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#112233] truncate">{doc.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{doc.qualifications[0]}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    3. Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    4. Available Time Slot *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.slice(0, 4).map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-2 text-[11px] font-bold rounded-lg border text-center transition-all ${
                          timeSlot === slot
                            ? 'bg-[#112233] text-[#D4AF37] border-[#112233]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors flex items-center gap-2"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Robert Smith"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (312) 555-0199"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="robert@example.com"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Primary Concern / Reason for Visit
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Brief description of symptoms or consultation goal..."
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFirstVisit}
                    onChange={(e) => setIsFirstVisit(e.target.checked)}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span>This is my first visit to Kynexis Health.</span>
                </label>

                <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={hipaaAccepted}
                    onChange={(e) => setHipaaAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span>
                    <strong>HIPAA Authorization & Privacy Consent:</strong> I authorize Kynexis Health to process my appointment details and store clinical communications in accordance with HIPAA standards.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={!hipaaAccepted}
                  className="px-6 py-3 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Confirm Appointment Booking</span>
                </button>
              </div>

            </form>
          )}

          {/* STEP 3 — Instant Ticket Confirmation */}
          {step === 3 && confirmedAppointment && (
            <div className="text-center space-y-6 py-4 animate-fade-in">
              <div className="p-4 bg-[#8A9A86]/20 text-[#112233] rounded-full w-fit mx-auto border border-[#8A9A86]/50">
                <CheckCircle2 className="w-12 h-12 text-[#112233]" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#112233] text-xs font-bold uppercase tracking-wider">
                  Booking Confirmed
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#112233] mt-2">
                  Appointment Scheduled
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Reference ID: <strong className="font-mono text-[#112233]">{confirmedAppointment.id}</strong>
                </p>
              </div>

              {/* Ticket Card */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-300 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-[#112233]">Patient: {confirmedAppointment.patientName}</span>
                  <span className="px-2 py-0.5 rounded bg-[#112233] text-white text-[10px] font-bold">
                    {confirmedAppointment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Date & Time</span>
                    <span className="font-semibold text-[#112233]">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Clinic Location</span>
                    <span className="font-semibold text-[#112233]">{currentLocation.city} Facility</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  Confirmation details have been dispatched to <strong>{confirmedAppointment.patientEmail}</strong>. You can also review this visit inside your encrypted Patient Portal.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d]"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
