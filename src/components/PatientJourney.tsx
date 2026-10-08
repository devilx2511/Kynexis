import React from 'react';
import { Calendar, UserCheck, FileText, Activity } from 'lucide-react';

export const PatientJourney: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Book',
      description: 'Schedule your consultation online or via phone in under 60 seconds with your preferred specialist.',
      icon: Calendar
    },
    {
      num: '02',
      title: 'Consult',
      description: 'Meet with your board-certified specialist in a quiet, unhurried, private clinical environment.',
      icon: UserCheck
    },
    {
      num: '03',
      title: 'Understand',
      description: 'Receive clear, transparent diagnostic findings, laboratory results, and evidence-informed options.',
      icon: FileText
    },
    {
      num: '04',
      title: 'Continue Your Care',
      description: 'Follow your tailored wellness plan with continuous digital access via your encrypted Patient Portal.',
      icon: Activity
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#FAFAFA] to-[#EEF2F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Predictable & Seamless Care
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#112233]">
            The Patient Journey <span className="font-medium text-[#D4AF37]">at Kynexis</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From your initial appointment booking to long-term follow-up care, every touchpoint is designed for clarity and peace of mind.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="premium-porcelain-card p-6 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl font-light text-[#D4AF37]">
                      {step.num}
                    </span>
                    <div className="p-3 rounded-2xl bg-[#112233] text-white group-hover:bg-[#D4AF37] group-hover:text-[#112233] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#112233] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-[#8A9A86]">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
