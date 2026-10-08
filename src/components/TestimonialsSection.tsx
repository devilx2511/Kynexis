import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { testimonialsData } from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Verified Patient Experiences
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#112233]">
            Trusted by Patients Across <span className="font-medium text-[#D4AF37]">The Region</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Read authentic feedback from individuals who experienced our multi-specialty clinical care.
          </p>
        </div>

        {/* Testimonials 3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="premium-porcelain-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-[#8A9A86] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Patient
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#112233]">{item.patientInitials}</p>
                  <p className="text-[10px] text-slate-500">{item.city} • {item.serviceName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-[#D4AF37]">{item.doctorName}</p>
                  <p className="text-[10px] text-slate-400">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
