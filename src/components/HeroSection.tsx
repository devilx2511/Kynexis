import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { ClinicLocation } from '../types';
import { useLiveData } from '../context/LiveDataContext';

interface HeroSectionProps {
  currentLocation: ClinicLocation;
  onOpenBookModal: () => void;
  onExploreServicesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLocation,
  onOpenBookModal,
  onExploreServicesClick,
}) => {
  const { cmsConfig } = useLiveData();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Interactive Medical Mesh Visualization Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 3D Nodes
    const numNodes = 36;
    const nodes: { x: number; y: number; z: number; rx: number; ry: number; rz: number }[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 140 + Math.random() * 40;

      nodes.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        rx: radius * Math.sin(phi) * Math.cos(theta),
        ry: radius * Math.sin(phi) * Math.sin(theta),
        rz: radius * Math.cos(phi),
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate nodes around center
      nodes.forEach((node) => {
        // Rotate Y
        let x1 = node.rx * Math.cos(angleY) - node.rz * Math.sin(angleY);
        let z1 = node.rx * Math.sin(angleY) + node.rz * Math.cos(angleY);
        let y1 = node.ry;

        // Rotate X
        let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = y1 * Math.sin(angleX) + z1 * Math.cos(angleX);
        let x2 = x1;

        node.rx = x2;
        node.ry = y2;
        node.rz = z2;

        // Perspective project
        const fov = 350;
        const scale = fov / (fov + z2);
        node.x = centerX + x2 * scale;
        node.y = centerY + y2 * scale;
      });

      // Draw connections
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        const scale = 350 / (350 + node.rz);
        const radius = Math.max(1.5, 3.5 * scale);
        const alpha = 0.4 + (node.rz + 180) / 360 * 0.6;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(17, 34, 51, ${alpha})`;
        ctx.fill();

        // Inner gold core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-[#F4F6F8] to-[#EEF2F5] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient lighting spheres */}
      <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#8A9A86]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-xs text-xs font-semibold text-[#112233] dark:text-slate-200">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Multi-Specialty Care in {currentLocation.city}</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-[#8A9A86] dark:text-[#A4B5A0] font-medium">Accepting New Patients</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#112233] dark:text-white leading-[1.15] tracking-tight">
              {cmsConfig.heroTitle ? (
                <span>{cmsConfig.heroTitle}</span>
              ) : (
                <>
                  Advanced Healthcare.{' '}
                  <span className="font-medium block italic text-[#D4AF37]">
                    Connected Expertise.
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
              {cmsConfig.heroSubtitle ||
                `Experience comprehensive, patient-centered healthcare through trusted medical expertise, modern facilities, and a coordinated approach to your wellbeing in ${currentLocation.city}.`}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBookModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#112233] dark:bg-[#D4AF37] dark:text-[#112233] rounded-xl hover:bg-[#1a344d] dark:hover:bg-[#c5a028] transition-all shadow-lg hover:shadow-xl active:scale-98 border border-[#112233] dark:border-[#D4AF37]"
              >
                <Calendar className="w-5 h-5 text-[#D4AF37] dark:text-[#112233]" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreServicesClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-medium text-[#112233] dark:text-slate-200 bg-white dark:bg-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-xs transition-all"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-[#8A9A86]" />
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-2 sm:gap-4">
              <div>
                <div className="flex items-center gap-0.5 text-[#D4AF37] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#112233] dark:text-white">4.98 / 5 Rating</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Verified Patient Trust</p>
              </div>

              <div>
                <div className="text-base sm:text-lg font-heading font-bold text-[#112233] dark:text-white flex items-center gap-1">
                  <span>18+</span>
                  <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37]" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#112233] dark:text-white">Specialist Doctors</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Fellowship-Trained</p>
              </div>

              <div>
                <div className="text-base sm:text-lg font-heading font-bold text-[#112233] dark:text-white flex items-center gap-1">
                  <span>Same-Week</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#112233] dark:text-white">Consult Access</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Minimal Waiting</p>
              </div>
            </div>
          </div>

          {/* Right 3D Visualization + Frosted Porcelain Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative w-full min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden border border-white/80 dark:border-slate-700 shadow-2xl bg-gradient-to-br from-white/90 via-slate-100/70 to-slate-200/50 dark:from-slate-900/90 dark:via-slate-800/70 dark:to-slate-900/50 flex items-center justify-center p-4 sm:p-6">
              
              {/* Background Interactive 3D Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
              />

              {/* Floating Porcelain Overlay Cards */}
              <div className="relative z-10 space-y-3.5 max-w-sm w-full mx-auto">
                
                {/* Card 1: Coordinated Care Badge */}
                <div className="premium-porcelain-card p-3.5 sm:p-4 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#112233] text-[#D4AF37] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#112233] dark:text-white">Coordinated Medical Network</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Cardiology • Neurology • Orthopedics</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Interactive Facility Snapshot */}
                <div className="premium-porcelain-card p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#112233] dark:text-white flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-4 h-4 text-[#8A9A86] shrink-0" />
                      {currentLocation.city} Clinical Facility
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#8A9A86]/20 text-[#112233] dark:text-[#A4B5A0] text-[10px] font-bold shrink-0">
                      Open Today
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {currentLocation.fullAddress}
                  </p>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Valet & Covered Parking</span>
                    <span className="font-semibold text-[#D4AF37]">{currentLocation.phone}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
