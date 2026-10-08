import React, { useState } from 'react';
import { Activity, Clock, CheckCircle2, ArrowRight, X, ChevronRight, HelpCircle } from 'lucide-react';
import { servicesData, specialtiesData, doctorsData } from '../data/clinicData';
import { MedicalService } from '../types';

interface FeaturedTreatmentsProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const FeaturedTreatments: React.FC<FeaturedTreatmentsProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#EEF2F5] via-[#FAFAFA] to-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Evidence-Informed Medical Services
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#112233]">
            Care Designed <span className="font-medium text-[#D4AF37]">Around Your Needs</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every clinical procedure and diagnostic evaluation is structured around maximum precision, minimal patient downtime, and direct doctor communication.
          </p>
        </div>

        {/* Treatments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const specialty = specialtiesData.find((s) => s.id === service.specialtyId);
            const assignedDocs = doctorsData.filter((d) => service.doctorIds.includes(d.id));

            return (
              <div
                key={service.id}
                className="premium-porcelain-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#112233]/5 text-[#112233] text-[11px] font-bold uppercase tracking-wider">
                      {specialty?.name || 'General Medicine'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {service.durationMinutes} mins
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-[#112233] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </h3>

                  {/* Short Desc */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Patient Concerns Addressed */}
                  <div className="space-y-1.5 mb-6 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Addresses Concerns Like:
                    </p>
                    {service.concernsAddressed.slice(0, 3).map((concern, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86] shrink-0" />
                        <span className="truncate">{concern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-[#112233] hover:text-[#D4AF37] inline-flex items-center gap-1 group/btn"
                  >
                    <span>Explore Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#112233] rounded-xl hover:bg-[#1a344d] transition-colors shadow-sm"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detailed Service Walkthrough Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/80 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  Treatment Walkthrough & Details
                </span>
                <h3 className="font-heading text-2xl font-bold">{selectedService.name}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Detailed Overview</h4>
                <p className="text-sm leading-relaxed">{selectedService.fullDesc}</p>
              </div>

              {/* Consultation Steps */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">What Happens During Consultation</h4>
                <div className="space-y-2.5">
                  {selectedService.consultationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#112233] text-[11px] font-bold text-[#D4AF37]">
                        0{idx + 1}
                      </span>
                      <p className="text-xs font-medium text-[#112233] pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Kynexis Health */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Why Choose Kynexis Health</h4>
                <ul className="space-y-2">
                  {selectedService.whyChooseUs.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#8A9A86] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected Outcome */}
              <div className="p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#112233] mb-1">Expected Patient Outcome</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedService.expectedOutcome}</p>
              </div>

              {/* FAQs */}
              {selectedService.faqs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                    Frequently Asked Questions
                  </h4>
                  <div className="space-y-3">
                    {selectedService.faqs.map((faq, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-xs font-bold text-[#112233] mb-1">Q: {faq.question}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const sId = selectedService.id;
                  setSelectedService(null);
                  onSelectServiceForBooking(sId);
                }}
                className="px-5 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors"
              >
                Schedule {selectedService.name}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
