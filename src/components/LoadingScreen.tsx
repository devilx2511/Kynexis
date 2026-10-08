import React, { useEffect, useState } from 'react';
import { ShieldCheck, Activity, CheckCircle2, Sparkles, Stethoscope, Lock, HeartPulse } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ClinicLocation } from '../types';

interface LoadingScreenProps {
  currentLocation: ClinicLocation;
  onLoadingComplete: () => void;
  targetAction?: 'book' | 'explore';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  currentLocation,
  onLoadingComplete,
  targetAction,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusStep, setStatusStep] = useState<string>('Initializing Secure Clinical Gateway...');

  useEffect(() => {
    const steps = [
      { p: 20, msg: `Establishing Connection to ${currentLocation.name || 'Kolupukur Clinical Suite'}...` },
      { p: 45, msg: 'Synchronizing Board-Certified Specialists & Live Consultation Availability...' },
      { p: 70, msg: 'Loading 256-Bit HIPAA & NABH Encrypted Medical Records...' },
      { p: 92, msg: targetAction === 'book' ? 'Opening Priority Specialist Consultation Booking Desk...' : 'Preparing Diagnostic Services & Care Pathways...' },
      { p: 100, msg: 'System Ready. Welcome to Kynexis Health.' },
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < steps.length) {
        setProgress(steps[currentIdx].p);
        setStatusStep(steps[currentIdx].msg);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 400);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [onLoadingComplete, currentLocation.name, targetAction]);

  return (
    <div
      className="min-h-screen w-full bg-[#050C16] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at center, #0B1F36 0%, #06111E 50%, #030810 100%)',
      }}
    >
      {/* Golden & Blue Ambient Halo */}
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Gold Filament Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-[#D4AF37]/30 animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#38BDF8]/20 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 animate-fade-in">
        {/* Animated Brand Logo Container */}
        <div className="flex flex-col items-center gap-5">
          <div className="relative p-6 sm:p-8 rounded-3xl bg-[#061424]/80 border-2 border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.3)] backdrop-blur-2xl transition-transform hover:scale-105 duration-500">
            <BrandLogo size="2xl" variant="light" showTagline={true} showMotto={true} />
            
            {/* Pulsing Status Orb */}
            <div className="absolute -top-2 -right-2 flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] animate-ping absolute" />
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] relative flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-[#061424]" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#F5D77F] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Kolkata Main Facility • PIN {currentLocation.zip}</span>
          </div>
        </div>

        {/* Dynamic Status Step */}
        <div className="min-h-[48px] flex flex-col items-center justify-center px-4">
          <p className="text-sm sm:text-base font-medium text-slate-200 transition-all duration-300">
            {statusStep}
          </p>
        </div>

        {/* Gold & Azure Shimmer Progress Bar */}
        <div className="space-y-3 px-2">
          <div className="w-full bg-[#061424] rounded-full h-3 p-0.5 border border-[#D4AF37]/40 overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]">
            <div
              className="bg-gradient-to-r from-[#38BDF8] via-[#F5D77F] to-[#D4AF37] h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span className="text-[#F5D77F] font-bold">{progress}% Loaded</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>

        {/* Clinical Accreditation Security Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[11px] text-slate-300 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>NABH Accredited</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[11px] text-slate-300 border border-white/10">
            <Lock className="w-3.5 h-3.5 text-[#F5D77F]" />
            <span>HIPAA Compliant Care</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[11px] text-slate-300 border border-white/10">
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            <span>24/7 Diagnostics</span>
          </div>
        </div>
      </div>
    </div>
  );
};
