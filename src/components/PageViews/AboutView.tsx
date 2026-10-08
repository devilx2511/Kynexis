import React from 'react';
import { Award, ShieldCheck, Heart, Building2, Users, CheckCircle2 } from 'lucide-react';
import { ClinicLocation } from '../../types';

interface AboutViewProps {
  currentLocation: ClinicLocation;
  onOpenBookModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ currentLocation, onOpenBookModal }) => {
  return (
    <div className="py-12 space-y-16 animate-fade-in">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 text-[#112233] text-xs font-semibold uppercase tracking-wider">
          Institutional Excellence
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#112233]">
          About <span className="font-medium text-[#D4AF37]">Kynexis Health</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Established to bridge the gap between complex subspecialty medical expertise and an unhurried, patient-centered clinical experience in {currentLocation.city}.
        </p>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 text-slate-700 text-sm leading-relaxed">
            <h2 className="font-heading text-2xl font-bold text-[#112233]">
              Precision Healthcare, Centered Around You
            </h2>
            <p>
              Traditional healthcare models often subject patients to fragmented consultations, delayed diagnostic turnarounds, and impersonal waiting rooms. At Kynexis Health, we engineered a unified clinical model where board-certified physicians collaborate under one roof.
            </p>
            <p>
              Whether you are undergoing a comprehensive executive health checkup or receiving targeted subspecialty management for cardiovascular or neurological concerns, your care is coordinated through a single, dedicated medical framework.
            </p>
            <div className="pt-2 space-y-2">
              {[
                'Fellowship-trained faculty from premier academic institutions',
                'Coordinated single-day diagnostic imaging & biomarker panels',
                'Quiet, porcelain-accented private clinical environments',
                'Direct digital communication via HIPAA-compliant Patient Portal'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-[#112233]">
                  <CheckCircle2 className="w-4 h-4 text-[#8A9A86] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="premium-porcelain-card p-4 rounded-3xl border border-white/80 shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                alt="Kynexis Health Clinical Suite"
                className="w-full h-[360px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="bg-[#112233] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-light">
              Our Core <span className="font-medium text-[#D4AF37]">Clinical Standards</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="premium-porcelain-dark p-6 space-y-3">
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-heading text-lg font-bold">Academic Rigor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every doctor on our medical team holds board certifications and fellowship training from top-tier teaching institutions.
              </p>
            </div>

            <div className="premium-porcelain-dark p-6 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#8A9A86]" />
              <h3 className="font-heading text-lg font-bold">HIPAA Security</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your medical data is protected with enterprise 256-bit encryption and strict access logging standards.
              </p>
            </div>

            <div className="premium-porcelain-dark p-6 space-y-3">
              <Heart className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-heading text-lg font-bold">Human Touch</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We protect the physician-patient relationship, offering unhurried 30-to-60 minute consults focused on active listening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="font-heading text-2xl font-bold text-[#112233]">
          Ready to Experience Kynexis Care?
        </h3>
        <p className="text-xs text-slate-600">
          Book your initial consultation with our faculty in {currentLocation.city}.
        </p>
        <button
          onClick={onOpenBookModal}
          className="px-8 py-3.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors shadow-lg"
        >
          Book an Appointment
        </button>
      </section>

    </div>
  );
};
