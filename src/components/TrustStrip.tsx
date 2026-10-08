import React from 'react';
import { Award, ShieldCheck, Stethoscope, HeartHandshake } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Award,
      title: 'Board-Certified Specialists',
      description: 'Fellowship-trained medical leaders'
    },
    {
      icon: Stethoscope,
      title: 'Multi-Specialty Care',
      description: 'Connected internal medicine & subspecialties'
    },
    {
      icon: ShieldCheck,
      title: 'Patient-Centered Excellence',
      description: '4.98/5 verified patient trust rating'
    },
    {
      icon: HeartHandshake,
      title: 'Modern Clinical Environment',
      description: 'Quiet, porcelain-crafted diagnostic suites'
    }
  ];

  return (
    <section className="bg-white border-y border-slate-200/80 py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-3.5 group">
                <div className="p-2.5 rounded-xl bg-[#112233]/5 text-[#112233] group-hover:bg-[#D4AF37]/15 group-hover:text-[#D4AF37] transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-[#112233]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
