import React from 'react';
import { Award, GitMerge, Building2, Heart } from 'lucide-react';

export const WhyKynexis: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Experienced Expertise',
      description: 'Qualified healthcare professionals delivering evidence-informed care backed by subspecialty board certifications.',
      accentColor: 'border-[#D4AF37]'
    },
    {
      icon: GitMerge,
      title: 'Connected Care',
      description: 'A coordinated approach across relevant specialties that eliminates redundant testing and fragmented communication.',
      accentColor: 'border-[#8A9A86]'
    },
    {
      icon: Building2,
      title: 'Modern Environment',
      description: 'A thoughtfully designed clinical environment focused on patient comfort, quiet diagnostic chambers, and speed.',
      accentColor: 'border-[#112233]'
    },
    {
      icon: Heart,
      title: 'Patient-Centered Experience',
      description: 'Clear communication, transparent treatment options, and unhurried consultations centered around your individual goals.',
      accentColor: 'border-[#D4AF37]'
    }
  ];

  return (
    <section id="why-kynexis-section" className="py-16 lg:py-24 bg-[#112233] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8A9A86]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            Our Clinical Standard
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-white">
            Healthcare, <span className="font-medium text-[#D4AF37]">Reimagined Around the Patient</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            We bridge the gap between world-class subspecialty medical rigor and an unhurried, deeply personal patient experience.
          </p>
        </div>

        {/* Pillars 4-grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="premium-porcelain-dark p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-white/10 text-[#D4AF37] w-fit mb-6 group-hover:bg-[#D4AF37] group-hover:text-[#112233] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold text-[#8A9A86] uppercase tracking-widest block mb-2">
                    Pillar 0{idx + 1}
                  </span>

                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Verified Standard</span>
                  <span className="text-[#D4AF37] font-semibold">Kynexis Model</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
