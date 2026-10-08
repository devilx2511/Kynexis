import React, { useState } from 'react';
import { ClinicLocation } from '../../../types';
import {
  Settings,
  AlertTriangle,
  Building2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Phone,
  Mail,
  Globe,
  MapPin,
  Lock,
  Palette,
  ArrowRight,
} from 'lucide-react';

interface SettingsTabProps {
  currentLocation: ClinicLocation;
  onUpdateLocation: (updated: ClinicLocation) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  currentLocation,
  onUpdateLocation,
  onNavigateTab,
}) => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [disableBookings, setDisableBookings] = useState(false);

  const [address, setAddress] = useState(currentLocation.address);
  const [landmark, setLandmark] = useState(currentLocation.landmark);
  const [phone, setPhone] = useState(currentLocation.phone);
  const [hours, setHours] = useState(currentLocation.hours);

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLocation({
      ...currentLocation,
      address,
      landmark,
      phone,
      hours,
      fullAddress: `${address}, ${landmark}, ${currentLocation.city}, ${currentLocation.state} ${currentLocation.zip}`,
    });
  };

  const integrations = [
    { name: 'Google Search Console & Maps API', status: 'Connected', key: 'gmaps_kolkata_live' },
    { name: '256-Bit SSL Encrypted Patient Portal', status: 'Connected', key: 'ssl_hipaa_verified' },
    { name: 'SMS Gateway (Appointment Reminders)', status: 'Connected', key: 'sms_kolkata_queue' },
    { name: 'WhatsApp Notification Gateway', status: 'Testing', key: 'wa_sandbox_mode' },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Header */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#EFB33D]" />
            <span>Clinic Settings, Integrations & Emergency Controls</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure Kolupukur clinic details, NAP consistency, third-party integrations and system maintenance locks.
          </p>
        </div>
      </div>

      {/* Brand & Logo Quick Customization Card */}
      <div className="p-6 bg-gradient-to-r from-[#061A2E] to-[#112233] text-white rounded-3xl border border-[#EFB33D]/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EFB33D] text-[#061A2E] flex items-center justify-center font-bold shadow-lg shrink-0">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-white">
              Website Logo & Brand Studio
            </h3>
            <p className="text-xs text-slate-300">
              Upload custom hospital logos, select medical vector monograms, and customize website brand typography.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab?.('branding')}
          className="px-4 py-2.5 bg-[#EFB33D] text-[#061A2E] text-xs font-bold rounded-xl hover:bg-[#D9A52F] transition-all shadow-md shrink-0 flex items-center gap-1.5"
        >
          <span>Open Brand & Logo Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Emergency Website Controls Section */}
      <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-3xl space-y-4">
        <h3 className="font-heading font-bold text-sm text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Emergency Website Controls & Overrides</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-[#061A2E]">Emergency Maintenance Mode</p>
              <p className="text-[11px] text-slate-500">
                Displays emergency clinical notice to public users while allowing admin bypass.
              </p>
            </div>
            <button onClick={() => setMaintenanceMode(!maintenanceMode)}>
              {maintenanceMode ? (
                <ToggleRight className="w-9 h-9 text-amber-600" />
              ) : (
                <ToggleLeft className="w-9 h-9 text-slate-300" />
              )}
            </button>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-[#061A2E]">Disable Online Appointment Forms</p>
              <p className="text-[11px] text-slate-500">
                Temporarily suspends patient booking forms during clinic capacity overloads.
              </p>
            </div>
            <button onClick={() => setDisableBookings(!disableBookings)}>
              {disableBookings ? (
                <ToggleRight className="w-9 h-9 text-[#061A2E]" />
              ) : (
                <ToggleLeft className="w-9 h-9 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Location NAP Details */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#061A2E] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#EFB33D]" />
            <span>Kolkata Clinic NAP Settings</span>
          </h3>

          <form onSubmit={handleSaveLocation} className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Landmark / Locality</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Clinic Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold rounded-xl shadow-md hover:bg-[#10243A]"
            >
              Update Clinic Details Across Site
            </button>
          </form>
        </div>

        {/* Integration Statuses */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#061A2E]">Third-Party Integration Hub</h3>

          <div className="space-y-3">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-2"
              >
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{item.key}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
