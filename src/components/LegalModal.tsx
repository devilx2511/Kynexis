import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Lock,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Download,
  Printer,
  ChevronRight,
  Building,
  Mail,
  Phone,
  Scale,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ClinicLocation } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'hipaa';
  currentLocation?: ClinicLocation;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
  currentLocation,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'hipaa'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#061A2E]/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/30 flex flex-col max-h-[90vh] text-slate-800 dark:text-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#112233] text-white flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" variant="light" />
            <div className="border-l border-white/20 pl-3">
              <h2 className="font-heading font-bold text-lg text-white">
                Legal & Compliance Documents
              </h2>
              <p className="text-xs text-[#D4AF37]">
                Kynexis Health • Official Clinical Governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Print Document"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="px-6 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-[#112233] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-[#112233] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('hipaa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'hipaa'
                ? 'bg-[#112233] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>HIPAA Notice of Privacy Practices</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed printable-area">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  EFFECTIVE DATE: AUGUST 2026 • VERSION 3.2
                </span>
                <h3 className="text-2xl font-bold font-heading text-[#112233] dark:text-white mt-1">
                  Kynexis Health Privacy Policy
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Protecting Patient Confidentiality & Protected Health Information (PHI)
                </p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Commitment to Clinical Data Privacy</span>
                </p>
                <p>
                  Kynexis Health adheres to the Health Insurance Portability and Accountability Act (HIPAA), the Digital Personal Data Protection (DPDP) Act, and applicable state healthcare privacy laws. We implement strict 256-bit encryption for all patient transmissions.
                </p>
              </div>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  1. Information We Collect
                </h4>
                <p>
                  When you utilize our website, schedule consultations, or access the Patient Portal, we collect the following categories of information:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Personal Identifiers:</strong> Name, government ID details, date of birth, residential address, telephone number, and email address.</li>
                  <li><strong>Protected Health Information (PHI):</strong> Medical history, current symptoms, prior laboratory reports, diagnostic imaging, and physician consultation notes.</li>
                  <li><strong>Insurance & Payment Details:</strong> Policy numbers, group IDs, cashless insurance claim verifications, and transaction metadata.</li>
                  <li><strong>Technical Metadata:</strong> IP address, browser type, device identifiers, and encrypted session cookies required for portal authentication.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  2. How We Use Your Information
                </h4>
                <p>
                  Your information is utilized solely for clinical and operational purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Delivering diagnostic care, outpatient appointments, and medical consultations with our specialists.</li>
                  <li>Processing insurance pre-authorizations and verified cashless claims.</li>
                  <li>Facilitating encrypted communications via our HIPAA-compliant Patient Portal.</li>
                  <li>Sending automated SMS and email appointment reminders and schedule updates.</li>
                  <li>Improving clinical protocols, safety audits, and healthcare quality assurance.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  3. Information Sharing & Third Parties
                </h4>
                <p>
                  We <strong>never sell or rent</strong> patient data. Information is only disclosed to authorized entities under strict Business Associate Agreements (BAAs), including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Accredited reference pathology laboratories and radiology diagnostic imaging centers.</li>
                  <li>Recognized health insurance carriers for claim adjudication.</li>
                  <li>Regulatory or public health authorities when strictly mandated by applicable statutory law.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  4. Patient Data Rights & Retention
                </h4>
                <p>
                  You hold the legal right to inspect, obtain an electronic copy of, or request amendments to your health records. To submit a formal data inquiry or request deletion of non-statutory records, contact our Privacy Officer at <strong>privacy@kynexishealth.com</strong>.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  TERMS & CONDITIONS • LAST REVISED: AUGUST 2026
                </span>
                <h3 className="text-2xl font-bold font-heading text-[#112233] dark:text-white mt-1">
                  Terms of Service & Patient Agreement
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Agreement governing your access to Kynexis Health clinical services and digital platforms.
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-xs text-red-900 dark:text-red-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>Emergency Medical Disclaimer</span>
                </p>
                <p>
                  This website and digital portal are NOT intended for urgent or life-threatening medical emergencies. If you are experiencing chest pain, severe bleeding, difficulty breathing, or acute neurological symptoms, immediately call <strong>911 (US) / 112 (India)</strong> or proceed to the nearest emergency department.
                </p>
              </div>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  1. Acceptance of Terms
                </h4>
                <p>
                  By accessing the Kynexis Health website, scheduling appointments, or registering for our encrypted portal, you agree to be bound by these Terms of Service. If you do not agree with any provision, please refrain from using our online services.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  2. Appointment Scheduling & Cancellation Policy
                </h4>
                <p>
                  Consultation appointments confirmed through our digital platform allocate dedicated specialist clinical time.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Notice Required:</strong> Cancellations or rescheduling requests must be submitted at least <strong>4 hours prior</strong> to the appointment slot.</li>
                  <li><strong>Punctuality:</strong> Patients are requested to arrive 10 minutes prior to scheduled outpatient appointments for vitals baseline recording.</li>
                  <li><strong>No-Show Policy:</strong> Repeated unnotified absences may require administrative confirmation for future bookings.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  3. Virtual Consultations & Medical Advice
                </h4>
                <p>
                  Information published on our educational blog or symptom navigation modules is intended for informational purposes only. It does not replace comprehensive in-person medical evaluation by a licensed physician.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  4. User Conduct & Security
                </h4>
                <p>
                  Users agree to provide accurate identification details, maintain the confidentiality of portal access credentials, and avoid uploading malicious files or unauthorized third-party health data.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: HIPAA NOTICE */}
          {activeTab === 'hipaa' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  HIPAA NOTICE OF PRIVACY PRACTICES
                </span>
                <h3 className="text-2xl font-bold font-heading text-[#112233] dark:text-white mt-1">
                  Protected Health Information (ePHI) Practices
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  How Medical Information About You May Be Used and Disclosed Under Federal & State Law
                </p>
              </div>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  Our Legal Duty
                </h4>
                <p>
                  Kynexis Health is legally mandated to maintain the privacy of your Protected Health Information (PHI), provide you with this detailed notice of our legal duties and privacy practices, and notify affected individuals in the event of a breach of unsecured PHI.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  Permitted Uses & Disclosures
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-[#112233] dark:text-white">For Treatment</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Sharing medical records between treating doctors, nurses, and lab pathologists to formulate your diagnosis and treatment plan.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-[#112233] dark:text-white">For Payment</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Submitting diagnostic codes and treatment summaries to your health insurer for claim reimbursement.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-[#112233] dark:text-white">Healthcare Operations</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Internal quality assessment, medical credentialing, and clinical staff training audits.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-base text-[#112233] dark:text-white border-b pb-1 dark:border-slate-800">
                  Electronic Security Standards
                </h4>
                <p>
                  All patient communication channels, electronic health record databases, and lab result transmission pipelines operate with:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>256-Bit SSL/TLS in-transit transport encryption.</li>
                  <li>AES-256 at-rest database storage encryption.</li>
                  <li>Multi-factor authentication (MFA) for clinical practitioner workstations.</li>
                  <li>Immutable audit logging tracking every record view, export, or print.</li>
                </ul>
              </section>
            </div>
          )}

          {/* Contact Details */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-[#112233] dark:text-white">
                Questions or Concerns Regarding Privacy?
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Contact our Clinical Compliance & Grievance Officer:
              </p>
            </div>
            <div className="text-right space-y-0.5">
              <p className="font-bold text-[#D4AF37]">privacy@kynexishealth.com</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Kolupukur Hub • Kolkata, WB 700157
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Kynexis Health Clinical Governance • All Rights Reserved
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#112233] text-white font-bold rounded-xl text-xs hover:bg-[#1a344d] transition-colors"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
};
