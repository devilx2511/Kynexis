import React, { useState } from 'react';
import { Activity, HeartPulse, Bone, Brain, Sparkles, ShieldCheck, ArrowRight, CheckCircle, X } from 'lucide-react';
import { specialtiesData, doctorsData } from '../data/clinicData';
import { SpecialtyInfo } from '../types';

interface SpecialtiesSectionProps {
  onSelectSpecialtyForBooking: (specialtyId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Activity,
  HeartPulse,
  Bone,
  Brain,
  Sparkles,
  ShieldCheck,
};

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  onSelectSpecialtyForBooking,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyInfo | null>(null);

  return (
    <section id="specialties-section" className="py-16 lg:py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Specialized Medical Departments
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#112233]">
            Comprehensive Care, <span className="font-medium text-[#D4AF37]">Connected Under One Roof</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our multi-specialty framework unites board-certified internal medicine physicians and fellowship-trained subspecialists for seamless diagnostic coordination.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialtiesData.map((spec) => {
            const IconComponent = iconMap[spec.iconName] || Activity;
            const assignedDoctors = doctorsData.filter((d) => d.specialtyId === spec.id);

            return (
              <div
                key={spec.id}
                className="premium-porcelain-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group border border-white/80"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#112233] text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {assignedDoctors.length} {assignedDoctors.length === 1 ? 'Specialist' : 'Specialists'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-xl font-bold text-[#112233] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-[#8A9A86] font-semibold mb-3">
                    {spec.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {spec.description}
                  </p>

                  {/* Featured Treatments */}
                  <div className="space-y-1.5 mb-6">
                    {spec.featuredTreatments.slice(0, 2).map((tr, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
                        <span className="truncate">{tr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSpecialty(spec)}
                    className="text-xs font-semibold text-[#112233] hover:text-[#D4AF37] inline-flex items-center gap-1 group/btn"
                  >
                    <span>Explore Specialty</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectSpecialtyForBooking(spec.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#112233] rounded-lg hover:bg-[#1a344d] transition-colors"
                  >
                    Book Consult
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Specialty Detail Drawer/Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/80 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                  {React.createElement(iconMap[selectedSpecialty.iconName] || Activity, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold">{selectedSpecialty.name}</h3>
                  <p className="text-xs text-slate-300">{selectedSpecialty.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Overview</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedSpecialty.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Key Treatments & Protocols</h4>
                <div className="space-y-2">
                  {selectedSpecialty.featuredTreatments.map((tr, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="text-xs font-medium text-[#112233]">{tr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Assigned Subspecialist Physicians</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctorsData
                    .filter((d) => d.specialtyId === selectedSpecialty.id)
                    .map((doc) => (
                      <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#112233] truncate">{doc.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{doc.title}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const specId = selectedSpecialty.id;
                  setSelectedSpecialty(null);
                  onSelectSpecialtyForBooking(specId);
                }}
                className="px-5 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors"
              >
                Book Consultation for {selectedSpecialty.name}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
