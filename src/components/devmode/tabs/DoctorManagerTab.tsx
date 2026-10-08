import React, { useState } from 'react';
import { Doctor } from '../../../types';
import { useLiveData } from '../../../context/LiveDataContext';
import {
  User,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Award,
  Stethoscope,
  MapPin,
  Star,
  Search,
  Building2,
  X,
  Radio,
  RotateCcw,
  Cloud,
  Check
} from 'lucide-react';

export const DoctorManagerTab: React.FC = () => {
  const { doctors, saveDoctor, addDoctor, deleteDoctor, resetDoctors, isSavingLiveData, lastLiveDataSyncedAt } = useLiveData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Doctor Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocDesignation, setNewDocDesignation] = useState('');
  const [newDocSpecialty, setNewDocSpecialty] = useState('Cardiology & Heart Care');
  const [newDocQualifications, setNewDocQualifications] = useState('MBBS, MD, DM');
  const [newDocExperience, setNewDocExperience] = useState('12+ Years');
  const [newDocLocation, setNewDocLocation] = useState('Kolupukur Main Medical Campus, Kolkata');
  const [newDocImage, setNewDocImage] = useState('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80');

  const filtered = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!selectedDoctor) return;
    const success = await saveDoctor(selectedDoctor);
    setSelectedDoctor(null);
    setIsEditing(false);
    showNotice(success ? 'Doctor profile updated & published live to database!' : 'Doctor profile updated locally');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) return;

    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      designation: newDocDesignation || 'Senior Consultant Physician',
      specialty: newDocSpecialty,
      specialtyId: newDocSpecialty.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      specialtyName: newDocSpecialty,
      qualifications: newDocQualifications,
      experience: newDocExperience,
      location: newDocLocation,
      imageUrl: newDocImage,
      rating: 4.9,
      reviewsCount: 24,
      availability: 'Mon - Sat (10:00 AM - 05:00 PM)',
      department: 'Clinical Medicine',
      languages: ['English', 'Bengali', 'Hindi'],
      about: `${newDocName} is an experienced medical specialist dedicated to patient wellness in Kolkata.`,
      consultationFee: '₹800',
    };

    const success = await addDoctor(newDoc);
    setIsAdding(false);
    setNewDocName('');
    setNewDocDesignation('');
    showNotice(success ? 'New Doctor added & published live to database!' : 'New Doctor added locally');
  };

  const handleDelete = async (docId: string, docName: string) => {
    if (window.confirm(`Are you sure you want to remove ${docName} from the faculty directory?`)) {
      const success = await deleteDoctor(docId);
      showNotice(success ? `${docName} removed & updated in database.` : 'Doctor removed locally.');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset faculty directory to default Kynexis medical specialists?')) {
      await resetDoctors();
      showNotice('Faculty directory restored to defaults and published live.');
    }
  };

  const showNotice = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Real-Time Sync Indicator */}
      <div className="p-4 bg-[#061A2E] text-white rounded-3xl border border-[#EFB33D]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <p className="text-xs font-bold font-mono tracking-wide text-[#EFB33D] flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5" />
              <span>LIVE DOCTOR FACULTY DATABASE SYNC</span>
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Changes to doctors, credentials, or appointments sync in real time across the website and booking modals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] font-mono text-slate-400">
          {isSavingLiveData ? (
            <span className="flex items-center gap-1.5 text-amber-400 animate-pulse">
              <Radio className="w-3 h-3 animate-spin" />
              <span>Broadcasting update...</span>
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lastLiveDataSyncedAt ? `Synced at ${lastLiveDataSyncedAt}` : 'Live in Cloud'}</span>
            </span>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs animate-slide-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <User className="w-5 h-5 text-[#EFB33D]" />
            <span>Doctor Faculty & Specialist Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Kolkata faculty profiles, board credentials, experience, and consultation availability.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor or specialty..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
            />
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      {/* Grid of Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={doc.imageUrl || doc.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#061A2E]/20 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#061A2E] truncate">{doc.name}</h3>
                  <p className="text-xs font-semibold text-[#D9A52F] truncate">{doc.designation || doc.title || 'Consultant Specialist'}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 truncate">
                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{doc.location || 'Kolupukur Medical Hub, Kolkata'}</span>
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1 text-xs">
                <p className="text-[11px] font-bold text-slate-700">Specialty & Qualifications:</p>
                <p className="text-slate-700 font-semibold">{doc.specialty || doc.specialtyName}</p>
                <p className="text-slate-600 font-mono text-[11px] truncate">
                  {Array.isArray(doc.qualifications) ? doc.qualifications.join(' • ') : doc.qualifications}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-semibold">{doc.experience || (doc.experienceYears ? `${doc.experienceYears}+ Years` : '10+ Years')} Experience</span>
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {doc.rating || 4.9} ({doc.reviewsCount || doc.reviewCount || 30} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedDoctor({ ...doc });
                  setIsEditing(true);
                }}
                className="flex-1 py-2 bg-[#061A2E] text-white rounded-xl font-bold text-xs hover:bg-[#10243A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#EFB33D]" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(doc.id, doc.name)}
                className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors"
                title="Remove Doctor"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-xl flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Doctors to Factory Defaults</span>
        </button>
      </div>

      {/* Edit Doctor Modal */}
      {isEditing && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061A2E]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-[#061A2E]">
                Edit Faculty Doctor Credentials
              </h3>
              <button onClick={() => setIsEditing(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={selectedDoctor.name}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Designation</label>
                  <input
                    type="text"
                    value={selectedDoctor.designation}
                    onChange={(e) => setSelectedDoctor({ ...selectedDoctor, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Specialty</label>
                  <input
                    type="text"
                    value={selectedDoctor.specialty}
                    onChange={(e) => setSelectedDoctor({ ...selectedDoctor, specialty: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Board Qualifications</label>
                <input
                  type="text"
                  value={selectedDoctor.qualifications}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, qualifications: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Clinic Address / Location</label>
                <input
                  type="text"
                  value={selectedDoctor.location}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, location: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={selectedDoctor.imageUrl}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSavingLiveData}
                className="px-5 py-2 bg-[#061A2E] text-[#EFB33D] rounded-xl font-bold flex items-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Publish to Database</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061A2E]/80 backdrop-blur-md">
          <form onSubmit={handleCreate} className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-[#061A2E]">
                Add New Medical Specialist
              </h3>
              <button type="button" onClick={() => setIsAdding(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Doctor Full Name</label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Dr. Somenath Chatterjee"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Designation</label>
                  <input
                    type="text"
                    value={newDocDesignation}
                    onChange={(e) => setNewDocDesignation(e.target.value)}
                    placeholder="Chief Consultant"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Specialty</label>
                  <input
                    type="text"
                    value={newDocSpecialty}
                    onChange={(e) => setNewDocSpecialty(e.target.value)}
                    placeholder="Cardiology & Vascular"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Board Qualifications</label>
                <input
                  type="text"
                  value={newDocQualifications}
                  onChange={(e) => setNewDocQualifications(e.target.value)}
                  placeholder="MBBS, MD (Medicine), DM (Cardio)"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Clinic Campus Location</label>
                <input
                  type="text"
                  value={newDocLocation}
                  onChange={(e) => setNewDocLocation(e.target.value)}
                  placeholder="Kolupukur Hub, Kolkata"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Doctor Photo URL</label>
                <input
                  type="url"
                  value={newDocImage}
                  onChange={(e) => setNewDocImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingLiveData}
                className="px-5 py-2 bg-[#061A2E] text-[#EFB33D] rounded-xl font-bold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add & Publish Live</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
