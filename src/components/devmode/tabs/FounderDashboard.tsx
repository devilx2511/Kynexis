import React from 'react';
import { ClinicLocation, Appointment, DevRole } from '../../../types';
import {
  TrendingUp,
  Users,
  Calendar,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  Activity,
  DollarSign,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react';

interface FounderDashboardProps {
  currentLocation: ClinicLocation;
  appointments: Appointment[];
  onNavigateTab: (tab: string) => void;
  userRole: DevRole;
}

export const FounderDashboard: React.FC<FounderDashboardProps> = ({
  currentLocation,
  appointments,
  onNavigateTab,
  userRole,
}) => {
  const metrics = [
    {
      title: 'Total Patient Consultations',
      value: '1,420',
      change: '+18.4%',
      trend: 'up',
      subtitle: 'This month at Kolupukur',
      icon: Users,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Active Appointments Queue',
      value: appointments.length.toString(),
      change: 'Confirmed',
      trend: 'neutral',
      subtitle: 'Next 24 hours schedule',
      icon: Calendar,
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: 'Local SEO Visibility Score',
      value: '98.5%',
      change: '+4.2%',
      trend: 'up',
      subtitle: 'Kolkata local search ranking',
      icon: Search,
      color: 'bg-amber-500/10 text-amber-600',
    },
    {
      title: 'System SSL Security & Health',
      value: '100%',
      change: '256-Bit SSL',
      trend: 'up',
      subtitle: 'Zero security warnings',
      icon: ShieldCheck,
      color: 'bg-[#061A2E]/10 text-[#061A2E]',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Executive Welcome Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#061A2E] via-[#0D2845] to-[#061A2E] text-white rounded-3xl border border-[#EFB33D]/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EFB33D]/20 text-[#EFB33D] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#EFB33D]/30">
              FOUNDER & EXECUTIVE DASHBOARD
            </span>
            <span className="text-slate-400 text-xs font-mono">• {currentLocation.city}, WB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Kynexis Health Executive Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Real-time management for Kolupukur, Kolkata primary clinic operations, doctor schedules, SEO ranking, and system security.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10 shrink-0">
          <button
            onClick={() => onNavigateTab('appointments')}
            className="px-4 py-2.5 bg-[#EFB33D] text-[#061A2E] font-bold rounded-2xl text-xs hover:bg-[#D9A52F] transition-all shadow-lg flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>View Appointments</span>
          </button>
          <button
            onClick={() => onNavigateTab('doctors')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs transition-all border border-white/10 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-[#EFB33D]" />
            <span>Doctor Directory</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 font-mono">
                  {m.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-[#061A2E]">{m.value}</h3>
                <p className="text-xs font-bold text-slate-700">{m.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{m.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Operations Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions & Recent Appointments Summary */}
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-heading font-bold text-base text-[#061A2E]">
                Recent Patient Bookings (Kolupukur Node)
              </h3>
              <p className="text-xs text-slate-500">Live incoming consultations from website portal</p>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-bold text-[#D9A52F] hover:underline flex items-center gap-1"
            >
              <span>Manage All ({appointments.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {appointments.slice(0, 3).map((app) => (
              <div key={app.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-800">{app.patientName}</p>
                  <p className="text-[11px] text-slate-500">
                    {app.date} • {app.timeSlot}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    {app.status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{app.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Clinic Node Specs */}
        <div className="p-6 bg-[#061A2E] text-white rounded-3xl border border-[#EFB33D]/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#EFB33D]" />
            <h3 className="font-heading font-bold text-base text-white">Active Clinic Location</h3>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs text-slate-300">
            <p className="font-bold text-white text-sm">{currentLocation.name}</p>
            <p className="flex items-center gap-1 text-slate-300">
              <span className="text-[#EFB33D]">📍 Address:</span> {currentLocation.fullAddress}
            </p>
            <p className="flex items-center gap-1 text-slate-300">
              <span className="text-[#EFB33D]">📞 Phone:</span> {currentLocation.phone}
            </p>
            <p className="flex items-center gap-1 text-slate-300 font-mono text-[11px]">
              <span className="text-[#EFB33D]">✉️ Email:</span> {currentLocation.email}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('settings')}
            className="w-full py-2.5 bg-[#EFB33D] text-[#061A2E] font-bold text-xs rounded-xl hover:bg-[#D9A52F] transition-all"
          >
            Edit Clinic NAP & Settings
          </button>
        </div>
      </div>
    </div>
  );
};
