import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, Mouse, ChevronDown, Sparkles, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ClinicLocation } from '../types';
import { useBrand } from '../context/BrandContext';

interface OpeningPageProps {
  currentLocation: ClinicLocation;
  onProceed: (targetAction?: 'book' | 'explore') => void;
}

export const OpeningPage: React.FC<OpeningPageProps> = ({
  currentLocation,
  onProceed,
}) => {
  const { brandConfig } = useBrand();
  const [isEntering, setIsEntering] = useState(false);

  const heroImageSrc = brandConfig.openingPageImageUrl || '/src/assets/images/kynexis_luxury_clinic_hero_1787993777543.jpg';
  const headline = brandConfig.openingPageHeadline || 'Advanced Healthcare.';
  const headlineAccent = brandConfig.openingPageHeadlineAccent || 'Connected Expertise.';
  const subtitle = brandConfig.openingPageSubtitle || 'Experience comprehensive, patient-centered care with trusted specialists, modern facilities, and a coordinated approach to your wellbeing.';
  const ctaText = brandConfig.openingPageCtaText || 'Start Booking Your Consultant';
  const showWallSign = brandConfig.showOpeningPageWallSign ?? true;

  // Handle scroll or keyboard to proceed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30 && !isEntering) {
        setIsEntering(true);
        timeoutId = setTimeout(() => onProceed('explore'), 300);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && !isEntering) {
        e.preventDefault();
        setIsEntering(true);
        timeoutId = setTimeout(() => onProceed('explore'), 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [isEntering, onProceed]);

  const handleStartBooking = () => {
    setIsEntering(true);
    setTimeout(() => {
      onProceed('book');
    }, 250);
  };

  const handleExplore = () => {
    setIsEntering(true);
    setTimeout(() => {
      onProceed('explore');
    }, 250);
  };

  return (
    <div
      className={`min-h-screen w-full bg-[#050C16] text-white flex flex-col justify-between relative overflow-hidden select-none transition-all duration-700 ${
        isEntering ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at top left, #0D223A 0%, #06111E 40%, #030810 100%)',
      }}
    >
      {/* Dynamic Golden Wave Filament Curves & Dust Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Ambient Gold & Teal Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[120px]" />

        {/* Golden Wave Lines SVG at Bottom Left */}
        <svg
          className="absolute -bottom-20 -left-20 w-[900px] h-[600px] opacity-40 mix-blend-screen"
          viewBox="0 0 900 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -50 550 C 200 500, 350 420, 520 480 C 680 540, 780 430, 900 380"
            stroke="url(#goldLineGrad1)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M -50 580 C 180 520, 380 450, 560 510 C 720 560, 810 460, 920 400"
            stroke="url(#goldLineGrad2)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M -50 520 C 220 480, 320 390, 480 440 C 640 500, 750 400, 880 340"
            stroke="url(#goldLineGrad1)"
            strokeWidth="0.75"
            strokeDasharray="4 4"
            fill="none"
          />
          <defs>
            <linearGradient id="goldLineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="30%" stopColor="#F5D77F" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8F6B10" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="goldLineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Split Grid: Left Content + Right Crescent Portal */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-14 lg:py-10">
        
        {/* LEFT COLUMN: Logo, Serifs, Subtitle, Booking CTA, & Navigation */}
        <div className="w-full lg:w-[52%] xl:w-[50%] flex flex-col justify-center items-start space-y-7 sm:space-y-9 z-20 py-6 lg:py-0">
          
          {/* Top Brand Logo Banner */}
          <div className="animate-fade-in">
            <BrandLogo size="xl" variant="light" showTagline={true} showMotto={true} />
          </div>

          {/* Luxury Serifs Headline */}
          <div className="space-y-2 sm:space-y-3">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal text-white tracking-tight leading-[1.12]"
              style={{
                fontFamily: "'Playfair Display', 'Cinzel', serif, Georgia",
              }}
            >
              <span className="block">{headline}</span>
              <span className="block bg-gradient-to-r from-[#FFF2B2] via-[#F5D77F] to-[#D4AF37] bg-clip-text text-transparent font-normal">
                {headlineAccent}
              </span>
            </h1>
          </div>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
            {subtitle}
          </p>

          {/* Call to Action Booking Button */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleStartBooking}
              className="group relative inline-flex items-center justify-center gap-3.5 px-8 py-4.5 rounded-2xl bg-[#061424]/90 border-2 border-[#D4AF37] text-white text-sm sm:text-base font-semibold tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.28)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] hover:border-[#FFF2B2] hover:bg-[#0B1E34] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <div className="p-1 rounded-lg bg-[#D4AF37]/20 text-[#F5D77F] group-hover:bg-[#D4AF37] group-hover:text-[#061424] transition-colors">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-heading">{ctaText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5D77F] group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            {/* Quick Explore Link */}
            <button
              onClick={handleExplore}
              className="inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-semibold text-slate-400 hover:text-[#F5D77F] transition-colors"
            >
              <span>Explore Departments & Doctors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Location & Certification Trust Pills */}
          <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{currentLocation.name} • {currentLocation.city}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NABH & HIPAA Compliant Suite</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dramatic Crescent Portal Arch with High-End Clinic Reception */}
        <div className="w-full lg:w-[48%] xl:w-[50%] h-[380px] sm:h-[500px] lg:h-[720px] relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
          
          {/* Outer Glowing Golden Halo */}
          <div className="absolute inset-0 sm:inset-4 lg:inset-6 rounded-[40px] lg:rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-transparent to-[#38BDF8]/20 blur-3xl pointer-events-none" />

          {/* The Crescent Portal Mask */}
          <div className="relative w-full h-full max-w-[640px] lg:max-w-none rounded-[36px] lg:rounded-l-[380px] lg:rounded-r-[60px] overflow-hidden border-2 border-[#D4AF37]/70 shadow-[0_0_50px_rgba(212,175,55,0.35)] group transition-all duration-700 hover:shadow-[0_0_75px_rgba(212,175,55,0.5)]">
            
            {/* Photorealistic Clinic Reception Image Background */}
            <img
              key={heroImageSrc}
              src={heroImageSrc}
              alt="Kynexis Health Luxury Reception & Diagnostic Suite"
              className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-all duration-700 ease-out animate-fade-in"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80') {
                  target.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80';
                }
              }}
            />

            {/* Subtle Vignette & Warm Golden Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050C16]/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-color-dodge pointer-events-none" />

            {/* Dynamic Gold Wall Signage: KYNEXIS HEALTH (Optional overlay if user wants wall plaque) */}
            {showWallSign && (
              <div className="absolute top-1/3 right-8 sm:right-12 -translate-y-1/2 flex flex-col items-center justify-center p-5 rounded-3xl bg-black/25 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105">
                <BrandLogo size="lg" variant="light" showTagline={true} showMotto={true} overrideBrandName={brandConfig.brandName} overrideTagline={brandConfig.tagline} />
              </div>
            )}

            {/* Glowing In-Arch Clinic Badge */}
            <div className="absolute top-6 right-6 p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 text-white shadow-xl flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#F5D77F]">
                Walk-Ins & Consultations Active
              </span>
            </div>

            {/* Bottom In-Arch Specialty Highlight */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#061424]/85 backdrop-blur-xl border border-[#D4AF37]/30 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white font-heading">
                  Kolupukur Diagnostic & Outpatient Center
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  18+ Board-Certified Consultants • 3D Ultrasound & Cardiology
                </p>
              </div>
              <button
                onClick={handleExplore}
                className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#061424] text-xs font-bold hover:bg-[#FFF2B2] transition-colors shrink-0"
              >
                View Center
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Scroll Indicator & Footer */}
      <footer className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Kynexis Health Outpatient Clinic • 24/7 Helpline: {currentLocation.phone}</span>
        </div>

        {/* Interactive Scroll / Click To Discover Button */}
        <button
          onClick={handleExplore}
          className="group flex flex-col items-center gap-1.5 cursor-pointer py-1 px-4 rounded-xl hover:bg-white/5 transition-all text-slate-300 hover:text-[#F5D77F]"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#D4AF37] p-1 flex justify-center shadow-[0_0_12px_rgba(212,175,55,0.3)]">
            <div className="w-1.5 h-2 bg-[#F5D77F] rounded-full animate-bounce mt-1" />
          </div>
          <div className="flex items-center gap-1">
            <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold">
              Scroll To Discover
            </span>
          </div>
        </button>

        <div className="text-right text-[11px] text-slate-400">
          <span>© {new Date().getFullYear()} Kynexis Health. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};
