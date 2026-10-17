import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { ClinicLocation } from '../types';

interface FacilityShowcaseProps {
  currentLocation: ClinicLocation;
}

export const FacilityShowcase: React.FC<FacilityShowcaseProps> = ({ currentLocation }) => {
  const [activeTab, setActiveTab] = useState(0);

  const facilities = [
    {
      title: 'Reception & Patient Lounge',
      description: 'Designed as a quiet, porcelain-accented environment with minimal wait times and personalized reception.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Quiet acoustic dampening', 'Private intake booths', 'Complimentary espresso & sparkling water']
    },
    {
      title: 'Private Consultation Suites',
      description: 'Sound-isolated physician suites enabling thorough, private medical history discussions without interruptions.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Ergonomic examination tables', 'High-definition diagnostic displays', 'HEPA air filtration']
    },
    {
      title: 'Non-Invasive Diagnostic Suite',
      description: 'Equipped with 3D echocardiography, high-frequency musculoskeletal ultrasound, and vascular doppler units.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Same-day diagnostic overread', 'Zero radiation ultrasound imaging', 'Direct physician review']
    },
    {
      title: 'Executive Health & Longevity Lounge',
      description: 'A serene private suite for comprehensive multi-hour health evaluations with dedicated patient concierge care.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Private workspace amenities', 'Fast-tracked lab collection', 'Post-evaluation physician briefing']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#112233] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              Clinical Architecture
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-white">
              The {currentLocation.city} <span className="font-medium text-[#D4AF37]">Clinical Environment</span>
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-md flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Located at {currentLocation.fullAddress}. Designed for patient comfort and clinical efficiency.</span>
          </p>
        </div>

        {/* Facility Gallery Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Navigation Buttons List */}
          <div className="lg:col-span-4 space-y-3">
            {facilities.map((fac, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full p-4 text-left rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                  activeTab === idx
                    ? 'bg-white text-[#112233] border-[#D4AF37] shadow-xl'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <div>
                  <h4 className={`font-heading text-base font-bold ${activeTab === idx ? 'text-[#112233]' : 'text-white'}`}>
                    {fac.title}
                  </h4>
                  <p className={`text-xs mt-1 line-clamp-1 ${activeTab === idx ? 'text-slate-600' : 'text-slate-400'}`}>
                    {fac.description}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 ${activeTab === idx ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
              </button>
            ))}
          </div>

          {/* Active Facility Display Card */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group h-[420px] sm:h-[480px]">
              <img
                src={facilities[activeTab].image}
                alt={facilities[activeTab].title}
                width="1200"
                height="480"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#112233] via-[#112233]/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#112233] text-xs font-bold w-fit mb-3">
                  {facilities[activeTab].title}
                </span>
                <p className="text-sm text-slate-200 max-w-xl mb-4 leading-relaxed">
                  {facilities[activeTab].description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/20">
                  {facilities[activeTab].highlights.map((hl, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-medium text-white border border-white/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
