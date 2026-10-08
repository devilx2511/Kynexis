import React, { useState } from 'react';
import { Appointment, Doctor } from '../../../types';
import { doctorsData } from '../../../data/clinicData';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  User,
  Plus,
  AlertCircle,
  ChevronRight,
  FileSpreadsheet,
} from 'lucide-react';

interface AppointmentsManagerTabProps {
  appointments: Appointment[];
  onUpdateStatus: (appointmentId: string, status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed') => void;
  onAddAppointment: (newApp: Appointment) => void;
}

export const AppointmentsManagerTab: React.FC<AppointmentsManagerTabProps> = ({
  appointments,
  onUpdateStatus,
  onAddAppointment,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New appointment form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('cardiology');
  const [newDoctor, setNewDoctor] = useState(doctorsData[0].name);
  const [newDate, setNewDate] = useState('2026-08-15');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newNotes, setNewNotes] = useState('');

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patientPhone.includes(searchTerm) ||
      a.specialtyId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newPatientPhone) return;

    const created: Appointment = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: newPatientName,
      patientEmail: 'patient@kynexishealth.com',
      patientPhone: newPatientPhone,
      specialtyId: newSpecialty,
      doctorId: 'doc-1',
      doctorName: newDoctor,
      date: newDate,
      timeSlot: newTime,
      reason: newNotes || 'General Outpatient Consultation',
      notes: newNotes,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      isFirstVisit: true,
    };

    onAddAppointment(created);
    setIsAddModalOpen(false);
    setNewPatientName('');
    setNewPatientPhone('');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#EFB33D]" />
            <span>Patient Appointments & Clinical Scheduling</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Kolupukur multi-specialty appointments, confirm requests, and dispatch notifications.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] transition-all flex items-center gap-2 shrink-0 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Manual Appointment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient name, phone, or specialty..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#EFB33D]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-500 font-medium">Status:</span>
          {['all', 'confirmed', 'pending', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl capitalize font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-[#061A2E] text-[#EFB33D]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#061A2E] text-white uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Appointment ID</th>
                <th className="p-4">Patient Info</th>
                <th className="p-4">Department & Doctor</th>
                <th className="p-4">Date & Slot</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No patient appointments matching criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#061A2E]">{app.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{app.patientName}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-[#EFB33D]" />
                        {app.patientPhone}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                        {app.specialtyId}
                      </span>
                      <p className="text-[11px] font-medium text-slate-600 mt-1">
                        {app.doctorName || 'Faculty Specialist'}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#061A2E]">{app.date}</p>
                      <p className="text-[11px] text-slate-500">{app.timeSlot}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          app.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : app.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {app.status === 'Confirmed' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{app.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      {app.status !== 'Confirmed' && (
                        <button
                          onClick={() => onUpdateStatus(app.id, 'Confirmed')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700"
                        >
                          Confirm
                        </button>
                      )}
                      {app.status !== 'Cancelled' && (
                        <button
                          onClick={() => onUpdateStatus(app.id, 'Cancelled')}
                          className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg font-bold text-[11px] hover:bg-red-200"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061A2E]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <h3 className="font-heading font-bold text-base text-[#061A2E]">
              Create Reception Appointment
            </h3>
            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Sourav Mukherjee"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#EFB33D]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  placeholder="+91 98300 00000"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#EFB33D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Specialty</label>
                  <select
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="dermatology">Dermatology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Preferred Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold rounded-xl shadow-md"
                >
                  Save & Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
