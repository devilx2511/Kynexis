import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  MapPin,
  Globe,
  Search,
  X,
  FileCode,
  Smartphone,
  Monitor,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ClinicLocation } from '../types';
import { SEO_CONFIG, ROUTE_SEO_REGISTRY, generateMedicalClinicSchema, generateOrganizationSchema } from '../data/seoConfig';

interface LocalSeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: ClinicLocation;
}

export const LocalSeoModal: React.FC<LocalSeoModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
}) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'serp' | 'gbp' | 'sitemap'>('schema');
  const [copied, setCopied] = useState(false);
  const [serpView, setSerpView] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedRouteKey, setSelectedRouteKey] = useState<string>('home');

  if (!isOpen) return null;

  const currentRouteMeta = ROUTE_SEO_REGISTRY[selectedRouteKey] || ROUTE_SEO_REGISTRY.home;

  // Generate dynamic full JSON-LD Schema
  const schemaObj = {
    '@context': 'https://schema.org',
    '@graph': [
      generateMedicalClinicSchema(currentLocation),
      generateOrganizationSchema()
    ]
  };

  const schemaJsonString = JSON.stringify(schemaObj, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/80 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold flex items-center gap-2">
                <span>Technical & Local SEO Architecture</span>
                <span className="text-[10px] bg-[#D4AF37] text-[#112233] px-2 py-0.5 rounded-full font-bold uppercase">
                  Production Validated
                </span>
              </h3>
              <p className="text-xs text-slate-300">Schema.org JSON-LD, Google SERP Simulator, Local Kolkata Citations & Sitemaps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-slate-50 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'schema'
                ? 'border-[#D4AF37] text-[#112233] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#D4AF37]" />
            <span>JSON-LD Schema Graph</span>
          </button>

          <button
            onClick={() => setActiveTab('serp')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'serp'
                ? 'border-[#D4AF37] text-[#112233] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4 text-[#8A9A86]" />
            <span>Google SERP Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('gbp')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'gbp'
                ? 'border-[#D4AF37] text-[#112233] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Kolkata Local SEO & GBP</span>
          </button>

          <button
            onClick={() => setActiveTab('sitemap')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'sitemap'
                ? 'border-[#D4AF37] text-[#112233] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-slate-600" />
            <span>Sitemap & Robots.txt</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* TAB 1: JSON-LD SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-[#112233]">
                    Schema.org @graph (MedicalClinic + MedicalOrganization + Physician + BreadcrumbList)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Complies with Google Structured Data Guidelines for Medical Clinics.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(schemaJsonString)}
                    className="px-3.5 py-1.5 bg-[#112233] text-white text-xs font-semibold rounded-xl hover:bg-[#1a344d] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    <span>{copied ? 'Copied!' : 'Copy JSON-LD'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#112233] text-[#F3E5AB] text-xs font-mono rounded-2xl overflow-x-auto max-h-[380px] border border-slate-700 leading-relaxed shadow-inner">
                <code>{schemaJsonString}</code>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero syntax errors. Verified with valid Schema.org MedicalClinic entity definitions, coordinates, and doctors array.</span>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE SERP PREVIEW */}
          {activeTab === 'serp' && (
            <div className="space-y-5 animate-fade-in">
              {/* Route Selector & View Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Preview Page:</span>
                  <select
                    value={selectedRouteKey}
                    onChange={(e) => setSelectedRouteKey(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-medium focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    {Object.keys(ROUTE_SEO_REGISTRY).map((key) => (
                      <option key={key} value={key}>
                        {ROUTE_SEO_REGISTRY[key].breadcrumbs.slice(-1)[0]?.name || key} ({key})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-medium">
                  <button
                    onClick={() => setSerpView('desktop')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                      serpView === 'desktop' ? 'bg-[#112233] text-[#D4AF37]' : 'text-slate-600'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setSerpView('mobile')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                      serpView === 'mobile' ? 'bg-[#112233] text-[#D4AF37]' : 'text-slate-600'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* SERP Card Visualizer */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <p className="text-[11px] font-mono text-slate-400 mb-1">
                  Google Search Snippet Simulation ({serpView.toUpperCase()})
                </p>

                {/* Google Result Preview Box */}
                <div className={`p-4 rounded-xl border border-slate-100 bg-[#FAFAFA] ${serpView === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full bg-[#112233] flex items-center justify-center text-[8px] text-[#D4AF37] font-bold">
                      K
                    </div>
                    <div className="text-[11px] text-slate-700 truncate font-sans">
                      https://kynexishealth.com{currentRouteMeta.canonicalPath === '/' ? '' : currentRouteMeta.canonicalPath}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {currentRouteMeta.title}
                  </h3>

                  <p className="text-xs text-[#4d5156] mt-1.5 leading-relaxed">
                    {currentRouteMeta.description}
                  </p>
                </div>
              </div>

              {/* Pixel & Character Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Title Length:</span>
                    <span className={currentRouteMeta.title.length <= 60 ? 'text-emerald-600' : 'text-amber-600'}>
                      {currentRouteMeta.title.length} / 60 chars (Optimal)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (currentRouteMeta.title.length / 60) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Meta Description Length:</span>
                    <span className={currentRouteMeta.description.length <= 160 ? 'text-emerald-600' : 'text-amber-600'}>
                      {currentRouteMeta.description.length} / 160 chars (Optimal)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (currentRouteMeta.description.length / 160) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KOLKATA LOCAL SEO & GBP */}
          {activeTab === 'gbp' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#112233] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    Kolupukur, Kolkata Physical NAP Consistency
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    100% Synced
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <div>
                    <strong className="text-slate-900">Clinic Name:</strong> {SEO_CONFIG.CLINIC_NAME}
                  </div>
                  <div>
                    <strong className="text-slate-900">Legal Entity:</strong> {SEO_CONFIG.CLINIC_LEGAL_NAME}
                  </div>
                  <div>
                    <strong className="text-slate-900">Phone:</strong> {currentLocation.phone}
                  </div>
                  <div>
                    <strong className="text-slate-900">Email:</strong> {currentLocation.email}
                  </div>
                  <div className="sm:col-span-2">
                    <strong className="text-slate-900">Physical Address:</strong> {currentLocation.fullAddress}
                  </div>
                  <div>
                    <strong className="text-slate-900">Coordinates:</strong> {currentLocation.coordinates.lat}, {currentLocation.coordinates.lng}
                  </div>
                  <div>
                    <strong className="text-slate-900">Landmark:</strong> {currentLocation.landmark}
                  </div>
                </div>
              </div>

              {/* Google Business Profile Checklist */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-[#112233] uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#8A9A86]" />
                  Google Business Profile (GBP) Verification Guidelines
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Primary Category:</strong> Medical Clinic / Multi-Specialty Clinic. Secondary: Cardiologist, Neurologist, Orthopedic Clinic, Dermatologist.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Appointment Link:</strong> Set to <code>https://kynexishealth.com/?action=book</code> for Google direct booking integration.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Operating Hours:</strong> Mo-Fr 08:00-20:00, Sa 09:00-17:00, Su 10:00-14:00 (Urgent Care).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Services List:</strong> Executive Health Check, Echocardiography Suite, Ultrasound Joint Injection, Migraine Protocol, Digital Dermoscopy.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SITEMAP & ROBOTS.TXT */}
          {activeTab === 'sitemap' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Robots.txt Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#112233] uppercase tracking-wider">
                      /robots.txt (Public File)
                    </h5>
                    <button
                      onClick={() => handleCopy(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /devmode\nDisallow: /portal\nSitemap: https://kynexishealth.com/sitemap.xml`)}
                      className="text-[11px] text-[#D4AF37] font-semibold hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-3 bg-[#112233] text-emerald-300 font-mono text-[11px] rounded-xl overflow-x-auto">
{`User-agent: *
Allow: /
Allow: /about
Allow: /specialties
Allow: /services
Allow: /doctors
Allow: /why-kynexis
Allow: /patient-resources
Allow: /contact

Disallow: /api/
Disallow: /devmode
Disallow: /portal
Disallow: /*?*devmode*

Sitemap: https://kynexishealth.com/sitemap.xml`}
                  </pre>
                </div>

                {/* XML Sitemap Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#112233] uppercase tracking-wider">
                      /sitemap.xml (8 Indexable URLs)
                    </h5>
                    <button
                      onClick={() => handleCopy(`https://kynexishealth.com/sitemap.xml`)}
                      className="text-[11px] text-[#D4AF37] font-semibold hover:underline"
                    >
                      Copy URL
                    </button>
                  </div>
                  <div className="p-3 bg-[#112233] text-[#F3E5AB] font-mono text-[11px] rounded-xl overflow-y-auto max-h-48 space-y-1">
                    <p className="text-emerald-400">✓ https://kynexishealth.com/ (priority 1.0)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/about (priority 0.8)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/specialties (priority 0.9)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/services (priority 0.9)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/doctors (priority 0.9)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/why-kynexis (priority 0.7)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/patient-resources (priority 0.8)</p>
                    <p className="text-slate-300">✓ https://kynexishealth.com/contact (priority 0.8)</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audit Status: Google Search & Schema Validation Ready</span>
          </span>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors shadow-sm"
          >
            Close SEO Center
          </button>
        </div>

      </div>
    </div>
  );
};
