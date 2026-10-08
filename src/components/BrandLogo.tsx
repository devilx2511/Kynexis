import React, { useState } from 'react';
import { useBrand } from '../context/BrandContext';
import { PresetLogoIcon } from '../types';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'dark' | 'light';
  className?: string;
  showTagline?: boolean;
  showMotto?: boolean;
  overrideBrandName?: string;
  overrideTagline?: string;
  forceLogoType?: 'vector' | 'image' | 'preset' | 'text_only';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  className = '',
  showTagline: showTaglineProp,
  showMotto = false,
  overrideBrandName,
  overrideTagline,
  forceLogoType,
}) => {
  const { brandConfig } = useBrand();
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  // Height and scale calculation
  const dimensions = {
    xs: { height: 22, textClass: 'text-xs', taglineClass: 'text-[7px]', mottoClass: 'text-[6px]', iconSize: 22 },
    sm: { height: 28, textClass: 'text-sm', taglineClass: 'text-[8px]', mottoClass: 'text-[7px]', iconSize: 28 },
    md: { height: 38, textClass: 'text-lg', taglineClass: 'text-[10px]', mottoClass: 'text-[8px]', iconSize: 38 },
    lg: { height: 50, textClass: 'text-2xl', taglineClass: 'text-[11px]', mottoClass: 'text-[9px]', iconSize: 50 },
    xl: { height: 68, textClass: 'text-3xl', taglineClass: 'text-[13px]', mottoClass: 'text-[10px]', iconSize: 68 },
    '2xl': { height: 88, textClass: 'text-4xl', taglineClass: 'text-[15px]', mottoClass: 'text-[11px]', iconSize: 88 },
  }[size];

  const primaryTextColor = variant === 'dark' ? 'text-[#112233] dark:text-white' : 'text-white';
  const subTextColor = variant === 'dark' ? 'text-[#D4AF37] dark:text-[#F3E5AB]' : 'text-[#F3E5AB]';
  const lineColor = variant === 'dark' ? '#D4AF37' : '#F3E5AB';

  const effectiveLogoType = forceLogoType || brandConfig?.logoType || 'vector';
  const brandName = overrideBrandName || brandConfig?.brandName || 'KYNEXIS';
  const tagline = overrideTagline || brandConfig?.tagline || 'HEALTH';
  const shouldShowTagline = showTaglineProp !== undefined ? showTaglineProp : (brandConfig?.showTagline ?? true);
  const multiplier = brandConfig?.logoHeightMultiplier || 1.0;
  const computedHeight = Math.round(dimensions.height * multiplier);

  // Official Kynexis Emblem: Golden Ring + Cyan/Blue Spine Vertebrae Curve + Dynamic Golden Figure "K"
  const renderOfficialKynexisEmblem = () => (
    <svg
      height={computedHeight}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105 filter drop-shadow-md"
    >
      <defs>
        {/* Metallic Gold Gradient */}
        <linearGradient id="kynexisGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="25%" stopColor="#F5D77F" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8F6B10" />
        </linearGradient>

        {/* Bio-Spine Sapphire/Cyan Glow Gradient */}
        <linearGradient id="kynexisSpineCyanGrad" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="30%" stopColor="#38BDF8" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        {/* Subtle Ring Glow */}
        <filter id="goldRingGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Outer Golden Circular Ring with subtle elegant opening */}
      <path
        d="M 68 12 A 56 56 0 1 1 20 54"
        stroke="url(#kynexisGoldGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#goldRingGlow)"
      />
      <path
        d="M 28 42 A 56 56 0 0 1 68 12"
        stroke="url(#kynexisGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 2. Left Spine Vertebrae Column (Cyan & Blue glowing segmented spine) */}
      {/* Outer spine ribbon */}
      <path
        d="M 42 28 C 36 50, 36 78, 52 108 C 50 102, 42 76, 48 32 Z"
        fill="url(#kynexisSpineCyanGrad)"
        opacity="0.9"
      />
      <path
        d="M 46 26 C 30 52, 28 82, 54 114 C 44 86, 42 56, 50 28 Z"
        fill="url(#kynexisSpineCyanGrad)"
        opacity="0.4"
      />

      {/* Spinal Vertebrae Nodes (Circular dots along the curvature) */}
      <circle cx="47" cy="38" r="2.8" fill="#E0F2FE" />
      <circle cx="43" cy="48" r="3.2" fill="#BAE6FD" />
      <circle cx="41" cy="58" r="3.4" fill="#7DD3FC" />
      <circle cx="42" cy="68" r="3.4" fill="#38BDF8" />
      <circle cx="45" cy="78" r="3.2" fill="#0284C7" />
      <circle cx="49" cy="88" r="3.0" fill="#0369A1" />
      <circle cx="54" cy="98" r="2.6" fill="#1D4ED8" />

      {/* 3. Golden Human Movement Figure & Upper Arm (Top part of the "K") */}
      {/* Head Orb */}
      <circle cx="92" cy="32" r="8" fill="url(#kynexisGoldGrad)" />
      
      {/* Upper diagonal torso & arm swooping up towards the head */}
      <path
        d="M 46 72 C 60 56, 75 42, 94 38 C 84 50, 68 64, 52 78 Z"
        fill="url(#kynexisGoldGrad)"
      />
      <path
        d="M 52 70 C 70 54, 88 44, 106 38 C 92 50, 74 66, 56 80 Z"
        fill="url(#kynexisGoldGrad)"
        opacity="0.8"
      />

      {/* 4. Lower Golden Leg (Bottom part of the "K") */}
      <path
        d="M 50 74 C 70 88, 92 104, 118 116 C 96 110, 74 95, 48 80 Z"
        fill="url(#kynexisGoldGrad)"
      />
      <path
        d="M 54 78 C 76 92, 98 108, 124 118 C 102 114, 80 100, 52 84 Z"
        fill="url(#kynexisGoldGrad)"
        opacity="0.85"
      />

      {/* Central energy spine light dot */}
      <circle cx="50" cy="74" r="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );

  // Helper to render other preset vector icons
  const renderPresetSvg = (iconType: PresetLogoIcon) => {
    switch (iconType) {
      case 'medical_cross':
        return (
          <svg height={computedHeight} viewBox="0 0 100 100" fill="none" className="shrink-0">
            <rect x="35" y="10" width="30" height="80" rx="10" fill="url(#brandGoldGradCommon)" />
            <rect x="10" y="35" width="80" height="30" rx="10" fill="url(#brandGoldGradCommon)" />
            <circle cx="50" cy="50" r="14" fill={variant === 'dark' ? '#112233' : '#061A2E'} />
            <path d="M 50 40 L 50 60 M 40 50 L 60 50" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="brandGoldGradCommon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D77F" /><stop offset="50%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#997A15" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'caduceus':
        return (
          <svg height={computedHeight} viewBox="0 0 100 100" fill="none" className="shrink-0">
            <line x1="50" y1="12" x2="50" y2="88" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" />
            <circle cx="50" cy="14" r="7" fill="#D4AF37" />
            <path d="M 50 30 Q 20 20, 20 40 Q 20 60, 50 50 Q 80 40, 80 60 Q 80 80, 50 70" stroke="#8A9A86" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 50 30 Q 80 20, 80 40 Q 80 60, 50 50 Q 20 40, 20 60 Q 20 80, 50 70" stroke="#D4AF37" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'stethoscope':
        return (
          <svg height={computedHeight} viewBox="0 0 100 100" fill="none" className="shrink-0">
            <path d="M 30 15 L 30 40 C 30 65, 70 65, 70 40 L 70 15" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 50 57 L 50 75 A 12 12 0 0 0 74 75 L 74 65" stroke="#8A9A86" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="74" cy="62" r="8" fill="#D4AF37" />
          </svg>
        );

      case 'dna_helix':
        return (
          <svg height={computedHeight} viewBox="0 0 100 100" fill="none" className="shrink-0">
            <path d="M 25 15 C 65 30, 65 50, 25 65 C -15 80, -15 100, 25 115" stroke="#D4AF37" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 75 15 C 35 30, 35 50, 75 65 C 115 80, 115 100, 75 115" stroke="#8A9A86" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'heart_pulse':
        return (
          <svg height={computedHeight} viewBox="0 0 100 100" fill="none" className="shrink-0">
            <path d="M 50 85 C 15 60, 5 35, 20 20 C 35 5, 50 25, 50 25 C 50 25, 65 5, 80 20 C 95 35, 85 60, 50 85 Z" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" strokeWidth="3" />
            <path d="M 22 48 L 38 48 L 44 32 L 54 62 L 60 42 L 66 48 L 78 48" stroke={variant === 'dark' ? '#112233' : '#F5D77F'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'monogram_gold':
      default:
        return renderOfficialKynexisEmblem();
    }
  };

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* LOGO ICON / IMAGE RENDERING */}
      {effectiveLogoType === 'image' && brandConfig?.customLogoUrl && !imageLoadFailed ? (
        <img
          src={brandConfig.customLogoUrl}
          alt={brandName}
          style={{ height: `${computedHeight}px` }}
          className="w-auto object-contain max-w-[220px] shrink-0 rounded-md transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => {
            console.warn('Custom logo image failed to load, falling back to official vector emblem');
            setImageLoadFailed(true);
          }}
        />
      ) : effectiveLogoType === 'preset' ? (
        renderPresetSvg(brandConfig?.presetIcon || 'monogram_gold')
      ) : (
        renderOfficialKynexisEmblem()
      )}

      {/* BRAND TYPOGRAPHY */}
      {effectiveLogoType !== 'image' || !brandConfig?.customLogoUrl?.includes('data:image') || brandName ? (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-heading font-bold tracking-[0.24em] uppercase ${primaryTextColor} ${dimensions.textClass}`}
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              letterSpacing: '0.22em',
            }}
          >
            {brandName}
          </span>

          {shouldShowTagline && tagline && (
            <div className="flex items-center justify-between gap-1.5 mt-1">
              <span
                className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]"
                style={{ backgroundColor: lineColor, opacity: 0.6 }}
              />
              <span
                className={`font-heading font-semibold tracking-[0.38em] uppercase ${subTextColor} ${dimensions.taglineClass}`}
                style={{ letterSpacing: '0.36em' }}
              >
                {tagline}
              </span>
              <span
                className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]"
                style={{ backgroundColor: lineColor, opacity: 0.6 }}
              />
            </div>
          )}

          {showMotto && (
            <p
              className={`font-sans font-medium tracking-[0.28em] uppercase text-slate-400 dark:text-slate-400 mt-1 ${dimensions.mottoClass}`}
              style={{ letterSpacing: '0.25em' }}
            >
              MOVE BETTER. LIVE BETTER.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};
