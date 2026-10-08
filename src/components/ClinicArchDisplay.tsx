import React from 'react';
import { BrandLogo } from './BrandLogo';

export const ClinicArchDisplay: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[500px] lg:min-h-[720px] bg-[#0A121E] overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none">
      
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Cove Overhead Arc Light */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-[100%] bg-amber-100/15 blur-[60px]" />
        
        {/* Curved Circular Cove Ceiling Light Ring */}
        <div className="absolute -top-16 right-10 w-[420px] h-[220px] rounded-full border-[6px] border-amber-100/30 blur-[2px] shadow-[0_0_50px_rgba(254,243,199,0.4)]" />

        {/* Ambient Hallway Glow */}
        <div className="absolute top-1/3 left-10 w-[250px] h-[400px] bg-sky-200/10 blur-[80px]" />
      </div>

      {/* 3D Architectural Scene: Marble Wall on Right & Hallway on Left */}
      <div className="absolute inset-0 flex">
        {/* Left 35%: Perspective Hallway with Fluted Wood Panels and Window Light */}
        <div className="w-[38%] h-full relative border-r border-[#D4AF37]/30 bg-gradient-to-r from-[#071322] via-[#0E2034] to-[#14293D] overflow-hidden flex">
          {/* Vertical Fluted Wood Panels */}
          <div className="w-16 h-full flex flex-col justify-between py-8 pl-4 space-y-1 opacity-70">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="h-full w-1.5 bg-gradient-to-b from-[#8F6B10]/40 via-[#D4AF37]/60 to-[#5C430B]/40 rounded-full" />
            ))}
          </div>

          {/* Perspective Corridor Light */}
          <div className="flex-1 h-full relative flex flex-col justify-center items-center">
            {/* End of Hallway Window */}
            <div className="w-14 h-36 bg-gradient-to-b from-sky-100 to-sky-200/70 rounded-t-lg shadow-[0_0_40px_rgba(224,242,254,0.6)] flex items-end justify-center pb-2">
              <div className="w-6 h-5 rounded-t-full bg-slate-700/60" />
            </div>
            {/* Floor Reflection */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#112233] to-transparent opacity-80" />
          </div>
        </div>

        {/* Right 62%: Calacatta Gold Marble Reception Wall & Counter */}
        <div
          className="w-[62%] h-full relative flex flex-col items-center justify-center p-6"
          style={{
            background: 'linear-gradient(135deg, #FAF7F2 0%, #EDE6DC 50%, #DFD5C6 100%)',
          }}
        >
          {/* Subtle Marble Veins Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none mix-blend-multiply" viewBox="0 0 400 600" fill="none">
            <path d="M -20 100 Q 150 180, 250 120 T 420 300" stroke="#8F6B10" strokeWidth="1.5" strokeDasharray="6 8" />
            <path d="M 50 0 Q 120 220, 220 340 T 380 580" stroke="#78716C" strokeWidth="1" />
            <path d="M 280 50 Q 200 240, 320 400" stroke="#A8A29E" strokeWidth="1.2" />
          </svg>

          {/* Warm Cove Downlight Shimmer on Wall */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Golden Wall Signage: KYNEXIS HEALTH */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-white/40 backdrop-blur-sm border border-amber-900/10 shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
            <BrandLogo size="lg" variant="dark" showTagline={true} showMotto={true} overrideBrandName="KYNEXIS" overrideTagline="HEALTH" />
          </div>

          {/* Reception Counter Slab with LED Underglow */}
          <div className="absolute bottom-6 left-6 right-6 h-28 rounded-2xl bg-gradient-to-r from-[#F5EFEB] via-[#FFFFFF] to-[#EBE2D5] border-t-2 border-[#D4AF37] shadow-[0_-10px_25px_rgba(212,175,55,0.25)] flex items-center justify-between px-6 z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 font-bold">
                Main Reception & Concierge
              </span>
              <p className="text-xs font-bold text-[#112233]">
                Consultant Desk • Check-in
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#112233] text-[#D4AF37] flex items-center justify-center font-bold text-xs shadow-md">
              K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
