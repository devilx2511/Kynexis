import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Lock, Code2, Scale, Terminal } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ClinicLocation } from '../types';

interface FooterProps {
  currentLocation: ClinicLocation;
  onChangeLocationClick: () => void;
  onOpenBookModal: () => void;
  onOpenPortalModal: () => void;
  onOpenSeoModal: () => void;
  onOpenLegalModal?: (tab: 'privacy' | 'terms' | 'hipaa') => void;
  onOpenDevMode?: () => void;
  onReplayIntro?: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLocation,
  onChangeLocationClick,
  onOpenBookModal,
  onOpenPortalModal,
  onOpenSeoModal,
  onOpenLegalModal,
  onOpenDevMode,
  onReplayIntro,
  setActiveTab,
}) => {
  return (
    <footer className="bg-[#112233] text-white pt-16 pb-24 sm:pb-16 border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none"
            >
              <BrandLogo size="lg" variant="light" />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Comprehensive, patient-centered multi-specialty healthcare delivering evidence-informed medical care, quiet diagnostic suites, and direct subspecialist access in {currentLocation.city}.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                HIPAA Compliant Standards
              </span>

              <button
                onClick={() => onOpenLegalModal?.('privacy')}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4AF37] text-[10px] font-medium transition-colors"
              >
                256-Bit SSL Encrypted
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {['Home', 'About', 'Specialties', 'Services', 'Doctors', 'Why Kynexis', 'Resources', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const id = item.toLowerCase().replace(/\s+/g, '-');
                      setActiveTab(id === 'resources' ? 'patient-resources' : id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal & Clinical Governance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('privacy')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('terms')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('hipaa')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>HIPAA Privacy Notice</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortalModal()}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Patient Rights & Records
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSeoModal()}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Local Healthcare Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: NAP Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
                {currentLocation.city} Clinic
              </h4>
              <button
                onClick={onChangeLocationClick}
                className="text-[10px] text-slate-400 underline hover:text-[#D4AF37]"
              >
                Change City
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{currentLocation.fullAddress}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8A9A86] shrink-0" />
                <a href={`tel:${currentLocation.phone}`} className="hover:text-white font-semibold">
                  {currentLocation.phone}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8A9A86] shrink-0" />
                <a href={`mailto:${currentLocation.email}`} className="hover:text-white">
                  {currentLocation.email}
                </a>
              </p>

              <p className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Mon-Fri: {currentLocation.hoursWeekday}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="space-y-4 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>Medical Disclaimer:</strong> The content on this website is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider regarding any health questions or medical conditions. In the event of a medical emergency, dial 911 (US) or 112 (India) or visit your nearest emergency department immediately.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <p>© {new Date().getFullYear()} Kynexis Health. All Rights Reserved.</p>
              <span>•</span>
              <button
                onClick={() => onOpenLegalModal?.('privacy')}
                className="hover:text-[#D4AF37] underline transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => onOpenLegalModal?.('terms')}
                className="hover:text-[#D4AF37] underline transition-colors"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                onClick={() => onOpenLegalModal?.('hipaa')}
                className="hover:text-[#D4AF37] underline transition-colors"
              >
                HIPAA Notice
              </button>
            </div>

            <div className="flex items-center gap-4">
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#D4AF37] transition-colors"
                  title="View Grand Opening Entrance & Loading Experience"
                >
                  <span>Opening Page</span>
                </button>
              )}

              <button
                onClick={onOpenSeoModal}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Schema JSON-LD</span>
              </button>

              {onOpenDevMode && (
                <button
                  onClick={onOpenDevMode}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#EFB33D] transition-colors"
                  title="DevMode Console Access"
                >
                  <Terminal className="w-3 h-3" />
                  <span>DevMode</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
