import React, { useState } from 'react';
import { Stethoscope, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { specialtiesData, doctorsData } from '../data/clinicData';

interface SymptomNavigatorProps {
  onSelectSpecialtyForBooking: (specialtyId: string) => void;
}

const SYMPTOM_PRESETS = [
  {
    id: 'chest-heart',
    label: 'Chest Discomfort, Palpitations, High BP',
    specialtyId: 'cardiology',
    recommendedDocId: 'doc-2',
    explanation: 'Cardiovascular evaluation recommended to assess heart rhythm, arterial wall stiffness, and BP control.'
  },
  {
    id: 'joint-pain',
    label: 'Joint Stiffness, Knee Pain, Sports Injuries',
    specialtyId: 'orthopedics',
    recommendedDocId: 'doc-3',
    explanation: 'Subspecialty orthopedic review utilizing ultrasound joint mapping and non-surgical preservation.'
  },
  {
    id: 'headaches-nerves',
    label: 'Migraines, Dizziness, Numbness, Memory',
    specialtyId: 'neurology',
    recommendedDocId: 'doc-4',
    explanation: 'Neurological consultation to rule out nerve entrapment, vascular headaches, or cognitive stress.'
  },
  {
    id: 'fatigue-wellness',
    label: 'Unexplained Fatigue, Annual Baseline, Blood Work',
    specialtyId: 'internal-medicine',
    recommendedDocId: 'doc-1',
    explanation: 'Internal medicine evaluation focusing on full metabolic panel, thyroid status, and baseline health.'
  },
  {
    id: 'skin-moles',
    label: 'Changing Moles, Rash, Skin Cancer Check',
    specialtyId: 'dermatology',
    recommendedDocId: 'doc-6',
    explanation: 'Digital dermoscopy screening for full-body mole examination and dermatologic health.'
  }
];

export const SymptomNavigator: React.FC<SymptomNavigatorProps> = ({
  onSelectSpecialtyForBooking,
}) => {
  const [activePreset, setActivePreset] = useState(SYMPTOM_PRESETS[0]);

  const matchedSpecialty = specialtiesData.find((s) => s.id === activePreset.specialtyId);
  const matchedDoctor = doctorsData.find((d) => d.id === activePreset.recommendedDocId);

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A9A86]/20 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Patient Care Navigator
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#112233]">
            Unsure Which Specialist <span className="font-medium text-[#D4AF37]">You Need?</span>
          </h2>
          <p className="text-sm text-slate-600">
            Select your primary health concern below for an immediate recommendation:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Preset Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {SYMPTOM_PRESETS.map((preset) => {
              const isSelected = preset.id === activePreset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset)}
                  className={`w-full p-4 text-left rounded-xl transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#112233] text-white border-[#112233] shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Stethoscope className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">{preset.label}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Result Card */}
          <div className="lg:col-span-7">
            <div className="premium-porcelain-card p-6 lg:p-8 h-full flex flex-col justify-between border-2 border-[#D4AF37]/30">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#112233] text-xs font-bold w-fit block mb-3">
                  Recommended Department: {matchedSpecialty?.name}
                </span>

                <h3 className="font-heading text-2xl font-bold text-[#112233] mb-2">
                  {matchedSpecialty?.name} Consultation
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {activePreset.explanation}
                </p>

                {matchedDoctor && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4 mb-6">
                    <img
                      src={matchedDoctor.image}
                      alt={matchedDoctor.name}
                      width="56"
                      height="56"
                      loading="lazy"
                      decoding="async"
                      className="w-14 h-14 rounded-xl object-cover border border-white shadow-sm shrink-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#112233]">{matchedDoctor.name}</p>
                      <p className="text-[11px] text-[#8A9A86] font-semibold">{matchedDoctor.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{matchedDoctor.qualifications[0]}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs text-slate-500">Same-week availability</span>
                <button
                  onClick={() => onSelectSpecialtyForBooking(activePreset.specialtyId)}
                  className="px-6 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Consultation Now</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
