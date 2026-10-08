import React from 'react';
import { Phone, Calendar, MapPin } from 'lucide-react';
import { ClinicLocation } from '../types';

interface MobileStickyBarProps {
  currentLocation: ClinicLocation;
  onOpenBookModal: () => void;
  onChangeLocationClick: () => void;
  onToggleWindowsDesktop?: () => void;
  isWindowsDesktopActive?: boolean;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  currentLocation,
  onOpenBookModal,
  onChangeLocationClick,
  onToggleWindowsDesktop,
  isWindowsDesktopActive = false,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#112233]/95 backdrop-blur-md border-t border-[#D4AF37]/30 p-2 px-2.5 shadow-2xl flex items-center justify-between gap-1.5">
      {/* Click-to-Call */}
      <a
        href={`tel:${currentLocation.phone.replace(/[^0-9+]/g, '')}`}
        className="flex-1 inline-flex items-center justify-center gap-1 py-2 bg-slate-800 text-white text-[11px] font-semibold rounded-xl border border-slate-700 active:bg-slate-700"
      >
        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Call</span>
      </a>

      {/* Book Appointment CTA */}
      <button
        onClick={onOpenBookModal}
        className="flex-1.5 inline-flex items-center justify-center gap-1.5 py-2 bg-[#D4AF37] text-[#112233] text-[11px] font-bold rounded-xl shadow-md active:bg-[#c5a028]"
      >
        <Calendar className="w-3.5 h-3.5 text-[#112233]" />
        <span>Book Visit</span>
      </button>

      {/* Windows Desktop OS Toggle Button */}
      {onToggleWindowsDesktop && (
        <button
          onClick={onToggleWindowsDesktop}
          className={`px-2.5 py-2 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1 ${
            isWindowsDesktopActive
              ? 'bg-[#D4AF37] text-[#112233] border-[#D4AF37]'
              : 'bg-indigo-950/90 text-[#F3E5AB] border-indigo-700/80 shadow-inner'
          }`}
          title="Windows Desktop OS View"
        >
          <span className="text-xs">🖥️</span>
          <span>{isWindowsDesktopActive ? 'Standard' : 'Win OS'}</span>
        </button>
      )}

      {/* Quick Location Badge */}
      <button
        onClick={onChangeLocationClick}
        className="p-2 bg-slate-800/80 text-slate-300 rounded-xl border border-slate-700/80"
        aria-label="Location"
      >
        <MapPin className="w-3.5 h-3.5 text-[#8A9A86]" />
      </button>
    </div>
  );
};
