import React, { useState } from 'react';
import { Search, Star, Languages, Award, ShieldCheck, Calendar, X, ExternalLink, GraduationCap } from 'lucide-react';
import { specialtiesData } from '../data/clinicData';
import { Doctor } from '../types';
import { useLiveData } from '../context/LiveDataContext';

interface DoctorsDirectoryProps {
  onBookWithDoctor: (doctor: Doctor) => void;
}

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({
  onBookWithDoctor,
}) => {
  const { doctors } = useLiveData();
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDoctorModal, setActiveDoctorModal] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialtyFilter === 'all' || doc.specialtyId === selectedSpecialtyFilter;

    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialtyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSpecialty && matchesSearch;
  });

  return (
    <section id="doctors-section" className="py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Medical Faculty & Specialists
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#112233]">
            Fellowship-Trained <span className="font-medium text-[#D4AF37]">Medical Leaders</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our physicians combine academic distinction, board certification, and decades of clinical practice focused on patient outcomes.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 sm:mb-10 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          
          {/* Specialty Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setSelectedSpecialtyFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
                selectedSpecialtyFilter === 'all'
                  ? 'bg-[#112233] text-white dark:bg-[#D4AF37] dark:text-[#112233] shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Faculty ({doctors.length})
            </button>
            {specialtiesData.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialtyFilter(spec.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
                  selectedSpecialtyFilter === spec.id
                    ? 'bg-[#112233] text-white dark:bg-[#D4AF37] dark:text-[#112233] shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {spec.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-doctors"
              type="text"
              aria-label="Search doctors by name or language"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor, language..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-[#112233] dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="premium-porcelain-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
            >
              {/* Top Photo & Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#112233] leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#8A9A86] font-semibold mt-0.5">
                      {doc.title}
                    </p>
                  </div>
                </div>

                {/* Qualifications Pill List */}
                <div className="space-y-1.5 mb-4">
                  {doc.qualifications.slice(0, 2).map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{q}</span>
                    </div>
                  ))}
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {doc.bio}
                </p>

                {/* Languages & Experience */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-slate-400" />
                    {doc.languages.join(', ')}
                  </span>
                  <span className="font-semibold text-[#112233]">{doc.experienceYears}+ Yrs Exp</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveDoctorModal(doc)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#112233] hover:text-[#D4AF37] transition-colors"
                >
                  View Profile
                </button>

                <button
                  onClick={() => onBookWithDoctor(doc)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#112233] rounded-xl hover:bg-[#1a344d] transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Book Consult</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Doctor Full Profile Modal */}
      {activeDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/80 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={activeDoctorModal.image}
                  alt={activeDoctorModal.name}
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 rounded-xl object-cover border border-white/30"
                />
                <div>
                  <h3 className="font-heading text-xl font-bold">{activeDoctorModal.name}</h3>
                  <p className="text-xs text-[#D4AF37] font-medium">{activeDoctorModal.title}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveDoctorModal(null)}
                aria-label="Close doctor details"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              
              {/* Verified Credentials Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#112233] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8A9A86]" />
                    State Registration License
                  </span>
                  <span className="font-mono text-slate-500 font-semibold">{activeDoctorModal.regNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                  <span>{activeDoctorModal.education}</span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Biography & Clinical Focus</h4>
                <p className="text-sm leading-relaxed">{activeDoctorModal.bio}</p>
              </div>

              {/* Qualifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Board Certifications & Memberships</h4>
                <div className="space-y-2">
                  {activeDoctorModal.qualifications.map((q, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                      <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold uppercase text-slate-500 mb-1">Languages Spoken</p>
                  <p className="text-xs font-semibold text-[#112233]">{activeDoctorModal.languages.join(', ')}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold uppercase text-slate-500 mb-1">Clinical Clinic Days</p>
                  <p className="text-xs font-semibold text-[#112233]">{activeDoctorModal.availableDays.join(', ')}</p>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveDoctorModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const doc = activeDoctorModal;
                  setActiveDoctorModal(null);
                  onBookWithDoctor(doc);
                }}
                className="px-6 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Appointment with {activeDoctorModal.name.split(',')[0]}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
