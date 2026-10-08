import React, { useState } from 'react';
import { initialRedirectRules } from '../../../data/devmodeData';
import { RedirectRule } from '../../../types';
import {
  Code2,
  Search,
  Globe,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Copy,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const SeoControlCenterTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'meta' | 'schema' | 'redirects'>('meta');
  const [redirects, setRedirects] = useState<RedirectRule[]>(initialRedirectRules);

  // Schema state
  const [clinicName, setClinicName] = useState('Kynexis Health - Kolkata Clinic');
  const [streetAddress, setStreetAddress] = useState('Kolupukur, Near Primary Hub');
  const [locality, setLocality] = useState('Kolkata');
  const [region, setRegion] = useState('West Bengal');
  const [postalCode, setPostalCode] = useState('700157');
  const [phone, setPhone] = useState('+9103325550199');

  const jsonLdCode = `{
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "name": "${clinicName}",
  "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
  "telephone": "${phone}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${streetAddress}",
    "addressLocality": "${locality}",
    "addressRegion": "${region}",
    "postalCode": "${postalCode}",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.5726,
    "longitude": 88.3639
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "medicalSpecialty": [
    "Cardiovascular",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics"
  ]
}`;

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Top Header */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#EFB33D]" />
            <span>SEO Control Center & Local Schema Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimize Kolkata search rankings, Local Business JSON-LD structured data, and 301 redirect rules.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('meta')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'meta'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Global Metadata
          </button>
          <button
            onClick={() => setActiveSubTab('schema')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'schema'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            JSON-LD Schema Builder
          </button>
          <button
            onClick={() => setActiveSubTab('redirects')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'redirects'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            301 Redirect Rules
          </button>
        </div>
      </div>

      {/* Sub Tab: Global Metadata */}
      {activeSubTab === 'meta' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#061A2E]">Global Site Meta Title & Description</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Site Title Format</label>
                <input
                  type="text"
                  defaultValue="Kynexis Health | Advanced Multi-Specialty Healthcare Kolkata"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Global Meta Description</label>
                <textarea
                  rows={3}
                  defaultValue="Trusted multi-specialty healthcare facility at Kolupukur, Kolkata. Offering Cardiology, Neurology, Orthopedics, 3D Echocardiography & 256-Bit SSL Patient Portal."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Canonical URL Base</label>
                <input
                  type="text"
                  defaultValue="https://kynexishealth.com"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#061A2E] text-white rounded-3xl border border-[#EFB33D]/30 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-[#EFB33D] flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Google SERP Preview Card</span>
            </h3>

            <div className="p-4 bg-white rounded-2xl text-slate-800 space-y-1 text-xs">
              <p className="text-[11px] text-slate-500 font-mono">https://kynexishealth.com</p>
              <p className="text-sm font-bold text-blue-700 hover:underline">
                Kynexis Health | Advanced Multi-Specialty Healthcare Kolkata
              </p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Trusted multi-specialty healthcare facility at Kolupukur, Kolkata (700157). Offering Cardiology, Neurology, Orthopedics & 3D Echocardiography.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab: JSON-LD Schema Builder */}
      {activeSubTab === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-[#061A2E] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#EFB33D]" />
              <span>Kolupukur Clinic LocalBusiness NAP Editor</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Clinic Legal Name</label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Street Address</label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">City</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full p-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">State</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">ZIP / PIN</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Clinic Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-[#EFB33D] font-mono">Generated JSON-LD Output</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Schema Validated
              </span>
            </div>

            <pre className="p-4 bg-slate-950 rounded-2xl text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-80 leading-tight">
              {jsonLdCode}
            </pre>
          </div>
        </div>
      )}

      {/* Sub Tab: Redirect Rules */}
      {activeSubTab === 'redirects' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#061A2E] text-white uppercase text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">Source URL</th>
                <th className="p-4">Target Destination</th>
                <th className="p-4">Type</th>
                <th className="p-4">Total Hits</th>
                <th className="p-4">Created By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800">{r.sourceUrl}</td>
                  <td className="p-4 text-emerald-600">{r.targetUrl}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                      {r.type}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{r.hits}</td>
                  <td className="p-4 text-slate-500 font-sans">{r.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
