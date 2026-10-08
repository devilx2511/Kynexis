import React from 'react';
import { FileText, Shield, CheckCircle2, User, Phone, ArrowRight } from 'lucide-react';
import { ClinicLocation } from '../../types';
import { FaqAccordion } from '../FaqAccordion';

interface PatientResourcesViewProps {
  currentLocation: ClinicLocation;
  onOpenPortalModal: () => void;
  onOpenBookModal: () => void;
  onOpenInsuranceVerification?: () => void;
}

export const PatientResourcesView: React.FC<PatientResourcesViewProps> = ({
  currentLocation,
  onOpenPortalModal,
  onOpenBookModal,
  onOpenInsuranceVerification,
}) => {
  return (
    <div className="py-12 space-y-16 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 dark:bg-white/10 text-[#112233] dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
          Patient Guidance & Support
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-light text-[#112233] dark:text-white">
          Patient <span className="font-medium text-[#D4AF37]">Resources</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Everything you need to know before, during, and after your visit to Kynexis Health {currentLocation.city}.
        </p>
      </div>

      {/* 3 Main Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pre-Visit Checklist */}
        <div className="premium-porcelain-card p-6 space-y-4 border border-white/80 dark:border-slate-800">
          <div className="p-3 bg-[#112233] text-[#D4AF37] rounded-xl w-fit">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#112233] dark:text-white">Pre-Visit Checklist</h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
              Government Photo ID & Insurance Card
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
              List of current prescription medications
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
              10-Hour fasting if blood panel requested
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
              Prior diagnostic scans or laboratory reports
            </li>
          </ul>
        </div>

        {/* Patient Portal Card */}
        <div className="premium-porcelain-card p-6 space-y-4 border border-white/80 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-[#112233] text-[#D4AF37] rounded-xl w-fit">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#112233] dark:text-white mt-4">Encrypted Patient Portal</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              Access lab reports, message your doctor directly, and manage appointments securely 24/7 under HIPAA standards.
            </p>
          </div>
          <button
            onClick={onOpenPortalModal}
            className="w-full py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors shadow-sm"
          >
            Launch Patient Portal
          </button>
        </div>

        {/* Billing & Insurance */}
        <div className="premium-porcelain-card p-6 space-y-4 border border-white/80 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-[#112233] text-[#D4AF37] rounded-xl w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#112233] dark:text-white mt-4">Insurance & Cashless Claims</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              We partner with major network insurers for direct cashless OPD benefits at our Kolupukur clinic.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            {onOpenInsuranceVerification && (
              <button
                onClick={onOpenInsuranceVerification}
                className="w-full py-2.5 bg-[#D4AF37] text-[#112233] text-xs font-bold rounded-xl hover:bg-[#c5a028] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Shield className="w-4 h-4" />
                <span>Verify Insurance Online</span>
              </button>
            )}
            <div className="text-[11px] text-center font-semibold text-[#8A9A86]">
              Questions? Call {currentLocation.phone}
            </div>
          </div>
        </div>

      </div>

      {/* Interactive FAQ Accordion Section */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#112233] dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Interactive guidance regarding clinic policies, insurance coverage, and office hours.
          </p>
        </div>

        <FaqAccordion
          currentLocation={currentLocation}
          onOpenInsuranceVerification={onOpenInsuranceVerification}
          onOpenBookModal={onOpenBookModal}
          onOpenPortalModal={onOpenPortalModal}
        />
      </div>

    </div>
  );
};

