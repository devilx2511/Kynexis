import React from 'react';
import { Appointment, ClinicLocation } from '../types';
import { BrandLogo } from './BrandLogo';
import { Printer, Calendar, Clock, MapPin, User, ShieldCheck, CheckCircle2, Phone, FileText, X } from 'lucide-react';

interface PrintableAppointmentSummaryProps {
  appointment: Appointment;
  currentLocation: ClinicLocation;
  onClose: () => void;
}

export const PrintableAppointmentSummary: React.FC<PrintableAppointmentSummaryProps> = ({
  appointment,
  currentLocation,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in no-print-bg">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col">
        
        {/* Modal Toolbar (hidden during printing) */}
        <div className="p-4 bg-[#112233] text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Printer className="w-4 h-4 text-[#D4AF37]" />
            <span>Appointment Summary Voucher</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#c5a028] text-[#112233] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE AREA */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 printable-area bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
          
          {/* Header Branding */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6 dark:border-slate-800">
            <div>
              <BrandLogo size="md" variant="dark" />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{currentLocation.address}, {currentLocation.city}, {currentLocation.state} {currentLocation.zip}</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
                <span>Phone: {currentLocation.phone} • Email: appointments@kynexishealth.com</span>
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-[#112233] text-[#D4AF37] text-xs font-bold rounded-md">
                CONFIRMED BOOKING
              </span>
              <p className="text-[11px] font-mono text-slate-500 block mt-1">Ref ID: <strong className="text-slate-800 dark:text-slate-200">{appointment.id}</strong></p>
              <p className="text-[10px] text-slate-400">Issued: {appointment.createdAt || new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          {/* Consultation Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Patient Name:</span>
              <span className="font-bold text-sm text-[#112233] dark:text-white block mt-0.5">{appointment.patientName}</span>
              <span className="text-slate-600 dark:text-slate-400 block mt-1">{appointment.patientPhone} • {appointment.patientEmail}</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Specialty & Department:</span>
              <span className="font-bold text-sm text-[#112233] dark:text-white block mt-0.5 uppercase tracking-wide">
                {appointment.specialtyId.replace('-', ' ')}
              </span>
              <span className="text-slate-600 dark:text-slate-400 block mt-1">
                Doctor: {appointment.doctorName || 'Assigned Senior Specialist'}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Appointment Date:</span>
              <span className="font-bold text-sm text-[#112233] dark:text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {appointment.date}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Time Slot:</span>
              <span className="font-bold text-sm text-[#112233] dark:text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#8A9A86]" />
                {appointment.timeSlot}
              </span>
            </div>
          </div>

          {/* Consultation Reason & Patient Notes */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Clinical Consultation Details
            </h4>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <p><strong>Primary Concern:</strong> {appointment.reason || 'General Outpatient Medical Consultation'}</p>
              {appointment.notes && <p className="mt-1"><strong>Additional Notes:</strong> {appointment.notes}</p>}
            </div>
          </div>

          {/* Important Patient Instructions */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#112233] dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A86]" />
              Pre-Arrival Patient Guidelines
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed">
              <li>Please arrive <strong>15 minutes prior</strong> to your scheduled time at our {currentLocation.city} facility.</li>
              <li>Bring a valid photo ID (Aadhaar / Voter ID / Passport) and active health insurance membership card.</li>
              <li>{currentLocation.parkingInfo || 'Parking & Valet services available at clinic main entrance.'}</li>
              <li>If fasting blood samples or diagnostic imaging is requested, maintain 8-10 hours fasting prior to check-in.</li>
            </ul>
          </div>

          {/* Verification & Barcode / QR Simulation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8A9A86]" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">HIPAA & Clinical Security Standard</p>
                <p>256-Bit SSL Encrypted Verification Code: KYN-{appointment.id}-VERIFIED</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                ||||| | ||||| || ||| ||||
              </div>
              <span className="text-[9px] text-slate-400 block mt-0.5">Scan at Reception Desk</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs no-print">
          <p className="text-slate-500 dark:text-slate-400">
            Need to reschedule? Call <strong className="text-slate-800 dark:text-slate-200">{currentLocation.phone}</strong>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#112233] text-white font-bold rounded-xl hover:bg-[#1a344d] transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Summary</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
