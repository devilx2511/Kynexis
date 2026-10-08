import React, { useState, useRef } from 'react';
import { useBrand, DEFAULT_BRAND_CONFIG } from '../../../context/BrandContext';
import { PresetLogoIcon } from '../../../types';
import { BrandLogo } from '../../BrandLogo';
import { optimizeImageFile } from '../../../lib/imageOptimizer';
import {
  Sparkles,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  RotateCcw,
  Sliders,
  Eye,
  Layers,
  Layout,
  Globe,
  FileCheck,
  AlertCircle,
  Trash2,
  Maximize2,
  Palette,
  Check,
  DoorOpen,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Sparkle,
  Radio,
  Wifi,
  Cloud,
  ArrowRight
} from 'lucide-react';

export const BrandStudioTab: React.FC = () => {
  const {
    brandConfig,
    updateBrandConfig,
    setCustomLogoImage,
    setOpeningPageImage,
    setPresetLogo,
    resetToDefaultBrand,
    isSaving,
    isLiveDatabaseConnected,
    lastSavedAt,
    syncError,
  } = useBrand();

  // Studio Sub-Navigation
  const [studioSection, setStudioSection] = useState<'logo' | 'opening_page'>('opening_page');

  // --- LOGO TAB STATE ---
  const [activeLogoMode, setActiveLogoMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [logoUrlInput, setLogoUrlInput] = useState(brandConfig.customLogoUrl || '');
  const [brandNameInput, setBrandNameInput] = useState(brandConfig.brandName || 'KYNEXIS');
  const [taglineInput, setTaglineInput] = useState(brandConfig.tagline || 'HEALTH');
  const [showTaglineState, setShowTaglineState] = useState(brandConfig.showTagline ?? true);
  const [heightMultiplier, setHeightMultiplier] = useState(brandConfig.logoHeightMultiplier || 1.0);
  const [syncFaviconState, setSyncFaviconState] = useState(brandConfig.syncFavicon ?? true);

  const [logoDragActive, setLogoDragActive] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);
  const [isOptimizingLogo, setIsOptimizingLogo] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // --- OPENING PAGE TAB STATE ---
  const [activeOpeningMode, setActiveOpeningMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [openingImageUrlInput, setOpeningImageUrlInput] = useState(brandConfig.openingPageImageUrl || '');
  const [openingHeadlineInput, setOpeningHeadlineInput] = useState(brandConfig.openingPageHeadline || 'Advanced Healthcare.');
  const [openingAccentInput, setOpeningAccentInput] = useState(brandConfig.openingPageHeadlineAccent || 'Connected Expertise.');
  const [openingSubtitleInput, setOpeningSubtitleInput] = useState(brandConfig.openingPageSubtitle || 'Experience comprehensive, patient-centered care with trusted specialists, modern facilities, and a coordinated approach to your wellbeing.');
  const [openingCtaInput, setOpeningCtaInput] = useState(brandConfig.openingPageCtaText || 'Start Booking Your Consultant');
  const [showWallSignState, setShowWallSignState] = useState(brandConfig.showOpeningPageWallSign ?? true);

  const [openingDragActive, setOpeningDragActive] = useState(false);
  const [openingUploadError, setOpeningUploadError] = useState<string | null>(null);
  const [isOptimizingOpening, setIsOptimizingOpening] = useState(false);
  const [lastOptimizedDetails, setLastOptimizedDetails] = useState<string | null>(null);
  const openingFileInputRef = useRef<HTMLInputElement>(null);

  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Curated High-Definition Clinic Image Presets for Opening Page Arch
  const OPENING_PAGE_PRESETS = [
    {
      id: 'luxury_gold_reception',
      title: 'Luxury Clinic Reception (Signature Gold)',
      desc: 'High-end marble front desk, cove lighting, gold architectural trim & calm medical corridor.',
      url: '/src/assets/images/kynexis_luxury_clinic_hero_1787993777543.jpg',
    },
    {
      id: 'architectural_hallway',
      title: 'Architectural Diagnostic Center',
      desc: 'Fluted wood panels, amber accent lighting, and private consultation corridor.',
      url: '/src/assets/images/kynexis_clinic_interior_1787993215720.jpg',
    },
    {
      id: 'minimalist_medical_lobby',
      title: 'Modern Minimalist Hospital Lobby',
      desc: 'Spacious high-ceiling healthcare atrium with abundant natural daylight.',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 'specialist_consult_suite',
      title: 'Prestige Consultation Wing',
      desc: 'Private physician suites with state-of-the-art diagnostic imaging amenities.',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 'diagnostic_lounge',
      title: 'Executive Patient Waiting Lounge',
      desc: 'Comfortable waiting area with soothing architectural ambient illumination.',
      url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 'private_wellness_center',
      title: 'Integrated Health & Wellness Wing',
      desc: 'Serene botanical clinic environment designed for holistic patient recovery.',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  // Curated Medical Vector Icons
  const PRESET_ICONS: { id: PresetLogoIcon; title: string; desc: string }[] = [
    {
      id: 'monogram_gold',
      title: 'Signature "K" Vertebral Gold Ring',
      desc: 'Official medical spinal column & dynamic kinetic movement figure with gold aura.',
    },
    {
      id: 'medical_cross',
      title: 'Modern Geometric Cross',
      desc: 'Rounded gold cross with navy core and clinical precision.',
    },
    {
      id: 'caduceus',
      title: 'Clinical Caduceus',
      desc: 'Asclepius staff with gold and sage serpent coils for high-tier medicine.',
    },
    {
      id: 'stethoscope',
      title: 'Acoustic Stethoscope',
      desc: 'Modern clinical stethoscope icon for diagnostic outpatient centers.',
    },
    {
      id: 'dna_helix',
      title: 'Genomics DNA Helix',
      desc: 'Dual-strand helix emblem for cutting-edge regenerative care.',
    },
    {
      id: 'heart_pulse',
      title: 'Cardio ECG Pulse Shield',
      desc: 'Cardiac rhythm pulse within a protective health shield.',
    },
  ];

  // --- LOGO UPLOAD HANDLERS ---
  const handleLogoFile = async (file: File) => {
    setLogoUploadError(null);
    if (!file.type.startsWith('image/')) {
      setLogoUploadError('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    try {
      setIsOptimizingLogo(true);
      const optimized = await optimizeImageFile(file, 800, 400, 0.9);
      await setCustomLogoImage(optimized.dataUrl);
      setLogoUrlInput('');
      showSuccessNotice(`Custom logo uploaded & published live to database! (${optimized.sizeFormatted})`);
    } catch (err: any) {
      console.error('Logo upload error:', err);
      setLogoUploadError(err?.message || 'Failed to process logo image.');
    } finally {
      setIsOptimizingLogo(false);
    }
  };

  const handleApplyLogoUrl = async () => {
    setLogoUploadError(null);
    if (!logoUrlInput.trim()) {
      setLogoUploadError('Please enter a valid image URL.');
      return;
    }
    await setCustomLogoImage(logoUrlInput.trim());
    showSuccessNotice('Custom logo URL applied & published live to database!');
  };

  const handleSelectPresetLogo = async (preset: PresetLogoIcon) => {
    await setPresetLogo(preset);
    showSuccessNotice(`Applied "${preset.replace('_', ' ').toUpperCase()}" vector logo & published live!`);
  };

  const handleApplyLogoTypography = async () => {
    await updateBrandConfig({
      brandName: brandNameInput.trim() || 'KYNEXIS',
      tagline: taglineInput.trim() || 'HEALTH',
      showTagline: showTaglineState,
      logoHeightMultiplier: heightMultiplier,
      syncFavicon: syncFaviconState,
    });
    showSuccessNotice('Brand typography & sizing published live to database!');
  };

  // --- OPENING PAGE IMAGE HANDLERS ---
  const handleOpeningFile = async (file: File) => {
    setOpeningUploadError(null);
    if (!file.type.startsWith('image/')) {
      setOpeningUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    try {
      setIsOptimizingOpening(true);
      // Optimize image for instant Firestore database sync and crystal-clear presentation
      const optimized = await optimizeImageFile(file, 1600, 1000, 0.84);
      setLastOptimizedDetails(`${optimized.width}x${optimized.height} (${optimized.sizeFormatted})`);
      
      const success = await setOpeningPageImage(optimized.dataUrl);
      setOpeningImageUrlInput('');
      
      if (success) {
        showSuccessNotice(`Opening Page image published live to database! (${optimized.sizeFormatted}) - Visible globally.`);
      } else {
        showSuccessNotice(`Opening Page image updated & cached locally (${optimized.sizeFormatted})`);
      }
    } catch (err: any) {
      console.error('Opening page upload error:', err);
      setOpeningUploadError(err?.message || 'Failed to optimize image file.');
    } finally {
      setIsOptimizingOpening(false);
    }
  };

  const handleApplyOpeningUrl = async () => {
    setOpeningUploadError(null);
    if (!openingImageUrlInput.trim()) {
      setOpeningUploadError('Please enter a valid image URL.');
      return;
    }
    await setOpeningPageImage(openingImageUrlInput.trim());
    showSuccessNotice('Opening Page image URL updated & published live to database!');
  };

  const handleSelectOpeningPreset = async (presetUrl: string, presetTitle: string) => {
    await setOpeningPageImage(presetUrl);
    showSuccessNotice(`Applied "${presetTitle}" to Opening Page & published live to database!`);
  };

  const handleApplyOpeningTextAndSettings = async () => {
    await updateBrandConfig({
      openingPageHeadline: openingHeadlineInput.trim() || 'Advanced Healthcare.',
      openingPageHeadlineAccent: openingAccentInput.trim() || 'Connected Expertise.',
      openingPageSubtitle: openingSubtitleInput.trim() || 'Experience comprehensive, patient-centered care with trusted specialists, modern facilities, and a coordinated approach to your wellbeing.',
      openingPageCtaText: openingCtaInput.trim() || 'Start Booking Your Consultant',
      showOpeningPageWallSign: showWallSignState,
    });
    showSuccessNotice('Opening Page text, headlines, and plaque settings published live to database!');
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset to the default signature Kynexis Health branding & opening page?')) {
      await resetToDefaultBrand();
      setBrandNameInput(DEFAULT_BRAND_CONFIG.brandName);
      setTaglineInput(DEFAULT_BRAND_CONFIG.tagline);
      setShowTaglineState(DEFAULT_BRAND_CONFIG.showTagline);
      setHeightMultiplier(DEFAULT_BRAND_CONFIG.logoHeightMultiplier);
      setSyncFaviconState(DEFAULT_BRAND_CONFIG.syncFavicon);
      setLogoUrlInput('');
      setOpeningImageUrlInput('');
      setOpeningHeadlineInput(DEFAULT_BRAND_CONFIG.openingPageHeadline || 'Advanced Healthcare.');
      setOpeningAccentInput(DEFAULT_BRAND_CONFIG.openingPageHeadlineAccent || 'Connected Expertise.');
      setOpeningSubtitleInput(DEFAULT_BRAND_CONFIG.openingPageSubtitle || '');
      setOpeningCtaInput(DEFAULT_BRAND_CONFIG.openingPageCtaText || 'Start Booking Your Consultant');
      setShowWallSignState(DEFAULT_BRAND_CONFIG.showOpeningPageWallSign ?? true);
      showSuccessNotice('Restored default signature Kynexis Health branding & published live.');
    }
  };

  const showSuccessNotice = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => {
      setSaveSuccessNotice(null);
    }, 5000);
  };

  const currentOpeningImg = brandConfig.openingPageImageUrl || '/src/assets/images/kynexis_luxury_clinic_hero_1787993777543.jpg';

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* GLOBAL DATABASE REAL-TIME STATUS BANNER */}
      <div className="p-4 bg-[#061A2E] text-white rounded-3xl border border-[#EFB33D]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold font-mono tracking-wide text-[#EFB33D] flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5" />
                <span>REAL-TIME DATABASE BROADCAST ACTIVE</span>
              </p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                LIVE WORLDWIDE
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Every image upload, logo edit, headline tweak, and setting saved in DevMode publishes directly to Firestore and reflects instantly across all users, devices, and browsers without page refresh.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto text-[11px] font-mono text-slate-400">
          {isSaving ? (
            <span className="flex items-center gap-1.5 text-amber-400 animate-pulse">
              <Radio className="w-3 h-3 animate-spin" />
              <span>Broadcasting to cloud...</span>
            </span>
          ) : lastSavedAt ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Synced at {lastSavedAt}</span>
            </span>
          ) : (
            <span className="text-slate-400 flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>Online & Connected</span>
            </span>
          )}
        </div>
      </div>

      {/* Top Header Card */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#061A2E] text-[#EFB33D] flex items-center justify-center font-bold shadow-md">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
                <span>Brand Studio & Opening Page Media</span>
              </h2>
              <p className="text-xs text-slate-500">
                Upload your custom medical clinic reception image for the Opening Page portal arch, or customize the global Kynexis brand logo.
              </p>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold self-start md:self-auto">
          <button
            onClick={() => setStudioSection('opening_page')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              studioSection === 'opening_page'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DoorOpen className="w-4 h-4" />
            <span>Opening Page Image & Text</span>
          </button>
          <button
            onClick={() => setStudioSection('logo')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              studioSection === 'logo'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkle className="w-4 h-4" />
            <span>Clinic Logo & Typography</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center justify-between text-xs animate-slide-in shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{saveSuccessNotice}</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-800 font-bold">
            Live in Database
          </span>
        </div>
      )}

      {syncError && (
        <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl flex items-center justify-between text-xs animate-slide-in shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Database note: {syncError} (Cached in browser memory)</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: OPENING PAGE IMAGE & HERO CONTENT CONTROL */}
      {/* ========================================================================= */}
      {studioSection === 'opening_page' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Controls Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Media Upload & Source Selector */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#061A2E] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#EFB33D]" />
                      <span>Opening Page Portal Arch Image</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose how you want to configure the photographic backdrop inside the opening page arch.
                    </p>
                  </div>
                </div>

                {/* Mode Selector Pill Buttons */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveOpeningMode('upload')}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeOpeningMode === 'upload'
                        ? 'bg-white text-[#061A2E] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 text-[#EFB33D]" />
                    <span>Upload Image File</span>
                  </button>
                  <button
                    onClick={() => setActiveOpeningMode('url')}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeOpeningMode === 'url'
                        ? 'bg-white text-[#061A2E] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#EFB33D]" />
                    <span>Direct Image URL</span>
                  </button>
                  <button
                    onClick={() => setActiveOpeningMode('presets')}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeOpeningMode === 'presets'
                        ? 'bg-white text-[#061A2E] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#EFB33D]" />
                    <span>Curated Presets</span>
                  </button>
                </div>

                {/* Sub-mode 1: File Upload */}
                {activeOpeningMode === 'upload' && (
                  <div className="space-y-3">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setOpeningDragActive(true);
                      }}
                      onDragLeave={() => setOpeningDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setOpeningDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleOpeningFile(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => openingFileInputRef.current?.click()}
                      className={`cursor-pointer border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                        openingDragActive
                          ? 'border-[#EFB33D] bg-[#EFB33D]/10 scale-[0.99]'
                          : 'border-slate-300 hover:border-[#EFB33D] bg-slate-50/70 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        ref={openingFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleOpeningFile(e.target.files[0]);
                          }
                        }}
                      />

                      <div className="w-14 h-14 rounded-2xl bg-[#061A2E] text-[#EFB33D] flex items-center justify-center mx-auto mb-3 shadow-md">
                        {isOptimizingOpening ? (
                          <Radio className="w-7 h-7 animate-spin text-[#EFB33D]" />
                        ) : (
                          <Upload className="w-7 h-7" />
                        )}
                      </div>

                      <p className="font-bold text-sm text-[#061A2E]">
                        {isOptimizingOpening
                          ? 'Optimizing & Publishing Image to Live Cloud...'
                          : 'Click to Browse or Drag & Drop Clinic Photo'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Supports PNG, JPG, WebP. High-res photos from phones & cameras are automatically compressed & optimized for instant global real-time synchronization.
                      </p>

                      {lastOptimizedDetails && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Last Upload: {lastOptimizedDetails} (Published Live)</span>
                        </div>
                      )}
                    </div>

                    {openingUploadError && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{openingUploadError}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Sub-mode 2: Image URL Input */}
                {activeOpeningMode === 'url' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Paste High-Definition Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={openingImageUrlInput}
                        onChange={(e) => setOpeningImageUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
                      />
                      <button
                        onClick={handleApplyOpeningUrl}
                        disabled={isSaving}
                        className="px-5 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Publish Live</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Enter any publicly accessible HTTPS image link. It will instantly render across the website.
                    </p>
                    {openingUploadError && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{openingUploadError}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Sub-mode 3: Presets Gallery */}
                {activeOpeningMode === 'presets' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">
                      Select one of our curated architectural healthcare photography styles:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                      {OPENING_PAGE_PRESETS.map((preset) => {
                        const isSelected = currentOpeningImg === preset.url;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => handleSelectOpeningPreset(preset.url, preset.title)}
                            className={`cursor-pointer p-2.5 rounded-2xl border transition-all text-left group flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#EFB33D] bg-[#EFB33D]/10 ring-2 ring-[#EFB33D]/30'
                                : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <div className="h-28 rounded-xl overflow-hidden mb-2 bg-slate-200 relative">
                              <img
                                src={preset.url}
                                alt={preset.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-[#EFB33D] text-[#061A2E] p-1 rounded-full shadow-md">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-xs text-[#061A2E] line-clamp-1">{preset.title}</p>
                              <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{preset.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Opening Page Copy & Typography Controls */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-heading font-bold text-base text-[#061A2E] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#EFB33D]" />
                    <span>Opening Page Headlines & Messaging</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize the welcome typography and CTA button on the opening intro screen.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Headline</label>
                    <input
                      type="text"
                      value={openingHeadlineInput}
                      onChange={(e) => setOpeningHeadlineInput(e.target.value)}
                      placeholder="Advanced Healthcare."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Accent Headline (Gold)</label>
                    <input
                      type="text"
                      value={openingAccentInput}
                      onChange={(e) => setOpeningAccentInput(e.target.value)}
                      placeholder="Connected Expertise."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Mission Statement</label>
                  <textarea
                    rows={3}
                    value={openingSubtitleInput}
                    onChange={(e) => setOpeningSubtitleInput(e.target.value)}
                    placeholder="Experience comprehensive, patient-centered care..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={openingCtaInput}
                      onChange={(e) => setOpeningCtaInput(e.target.value)}
                      placeholder="Start Booking Your Consultant"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 self-end">
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Show Gold Wall Plaque</p>
                      <p className="text-[10px] text-slate-400">Overlay 3D logo plaque on image</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={showWallSignState}
                      onChange={(e) => setShowWallSignState(e.target.checked)}
                      className="w-4 h-4 accent-[#061A2E] rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={handleApplyOpeningTextAndSettings}
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] transition-all flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Publish Opening Page Changes Live</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Preview Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#061424] text-white rounded-3xl border border-[#D4AF37]/30 shadow-xl space-y-4 sticky top-24">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#EFB33D]" />
                    <h3 className="font-bold text-xs tracking-wider uppercase text-[#EFB33D]">
                      Live Opening Page Arch Preview
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Real-Time
                  </span>
                </div>

                {/* Preview Mini Arch */}
                <div className="relative w-full h-[280px] rounded-l-[140px] rounded-r-[24px] overflow-hidden border-2 border-[#D4AF37]/80 shadow-[0_0_30px_rgba(212,175,55,0.3)] group bg-slate-900">
                  <img
                    key={currentOpeningImg}
                    src={currentOpeningImg}
                    alt="Opening Arch Live Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050C16]/80 via-transparent to-black/20 pointer-events-none" />

                  {showWallSignState && (
                    <div className="absolute top-1/3 right-6 -translate-y-1/2 p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 shadow-lg scale-90">
                      <BrandLogo
                        size="sm"
                        variant="light"
                        showTagline={true}
                        overrideBrandName={brandConfig.brandName}
                        overrideTagline={brandConfig.tagline}
                      />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-[10px] flex items-center justify-between">
                    <span className="font-bold text-white font-heading truncate">
                      {openingHeadlineInput} {openingAccentInput}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EFB33D] text-[#061A2E] font-bold shrink-0">
                      Active
                    </span>
                  </div>
                </div>

                {/* Summary Info */}
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-1 text-xs text-slate-300">
                  <p className="font-semibold text-white flex items-center justify-between">
                    <span>Active Hero Image:</span>
                    <span className="text-[#EFB33D] font-mono text-[10px] truncate max-w-[140px]">
                      {currentOpeningImg.startsWith('data:') ? 'Custom Upload (Embedded)' : currentOpeningImg.slice(-25)}
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Changes take effect instantaneously for every visitor accessing the home screen across all devices.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>

                  <a
                    href="/?skipintro=false"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#EFB33D] text-[#061A2E] font-bold text-xs hover:bg-[#D9A52F] flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <span>Test Opening View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CLINIC LOGO & TYPOGRAPHY STUDIO */}
      {/* ========================================================================= */}
      {studioSection === 'logo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Logo Source Selection Card */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#061A2E] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#EFB33D]" />
                      <span>Clinic Logo Source & Emblem</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload your official medical crest, provide a vector SVG/PNG URL, or choose a geometric icon.
                    </p>
                  </div>
                </div>

                {/* Sub-mode selector */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveLogoMode('upload')}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeLogoMode === 'upload'
                        ? 'bg-white text-[#061A2E] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 text-[#EFB33D]" />
                    <span>Upload Logo File</span>
                  </button>
                  <button
                    onClick={() => setActiveLogoMode('url')}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeLogoMode === 'url'
                        ? 'bg-white text-[#061A2E] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#EFB33D]" />
                    <span>Direct Logo URL</span>
                  </button>
                  <button
                    onClick={() => setActiveLogoMode('presets')}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeLogoMode === 'presets'
                        ? 'bg-white text-[#061A2E] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#EFB33D]" />
                    <span>Preset Vector Emblems</span>
                  </button>
                </div>

                {/* Mode 1: File Upload */}
                {activeLogoMode === 'upload' && (
                  <div className="space-y-3">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setLogoDragActive(true);
                      }}
                      onDragLeave={() => setLogoDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setLogoDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleLogoFile(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => logoFileInputRef.current?.click()}
                      className={`cursor-pointer border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                        logoDragActive
                          ? 'border-[#EFB33D] bg-[#EFB33D]/10 scale-[0.99]'
                          : 'border-slate-300 hover:border-[#EFB33D] bg-slate-50/70 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        ref={logoFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleLogoFile(e.target.files[0]);
                          }
                        }}
                      />

                      <div className="w-14 h-14 rounded-2xl bg-[#061A2E] text-[#EFB33D] flex items-center justify-center mx-auto mb-3 shadow-md">
                        {isOptimizingLogo ? (
                          <Radio className="w-7 h-7 animate-spin text-[#EFB33D]" />
                        ) : (
                          <Upload className="w-7 h-7" />
                        )}
                      </div>

                      <p className="font-bold text-sm text-[#061A2E]">
                        {isOptimizingLogo ? 'Processing & Publishing Logo...' : 'Click to Upload Custom Logo'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Recommended: Transparent PNG or SVG emblem. Automatically synchronized to header, footer, portals, and favicon.
                      </p>
                    </div>

                    {logoUploadError && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{logoUploadError}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Mode 2: Direct URL */}
                {activeLogoMode === 'url' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">Paste Logo Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={logoUrlInput}
                        onChange={(e) => setLogoUrlInput(e.target.value)}
                        placeholder="https://yourclinic.com/assets/logo.png"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#EFB33D]"
                      />
                      <button
                        onClick={handleApplyLogoUrl}
                        disabled={isSaving}
                        className="px-5 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Publish Live</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Mode 3: Presets */}
                {activeLogoMode === 'presets' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Select a handcrafted clinical vector icon:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PRESET_ICONS.map((preset) => {
                        const isSelected =
                          brandConfig.logoType === 'preset' && brandConfig.presetIcon === preset.id;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => handleSelectPresetLogo(preset.id)}
                            className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex items-start gap-3 ${
                              isSelected
                                ? 'border-[#EFB33D] bg-[#EFB33D]/10 ring-2 ring-[#EFB33D]/30'
                                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#061A2E] text-[#EFB33D] flex items-center justify-center shrink-0 shadow-sm">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-xs text-[#061A2E]">{preset.title}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Brand Typography & Sizing Card */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-heading font-bold text-base text-[#061A2E] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#EFB33D]" />
                    <span>Brand Typography & Sizing</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure the text label and tagline displayed alongside your emblem.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic Brand Name</label>
                    <input
                      type="text"
                      value={brandNameInput}
                      onChange={(e) => setBrandNameInput(e.target.value)}
                      placeholder="KYNEXIS"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-[#EFB33D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline Label</label>
                    <input
                      type="text"
                      value={taglineInput}
                      onChange={(e) => setTaglineInput(e.target.value)}
                      placeholder="HEALTH"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#EFB33D]"
                    />
                  </div>
                </div>

                {/* Sizing Slider & Favicon Checkbox */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">Logo Scale Multiplier:</span>
                      <span className="font-mono font-bold text-[#061A2E]">{heightMultiplier.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.75"
                      max="1.5"
                      step="0.05"
                      value={heightMultiplier}
                      onChange={(e) => setHeightMultiplier(parseFloat(e.target.value))}
                      className="w-full accent-[#061A2E]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Show Tagline</p>
                      <p className="text-[10px] text-slate-400">Display "HEALTH" below title</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={showTaglineState}
                      onChange={(e) => setShowTaglineState(e.target.checked)}
                      className="w-4 h-4 accent-[#061A2E] rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={handleApplyLogoTypography}
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold text-xs rounded-xl hover:bg-[#10243A] transition-all flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Publish Logo Settings Live</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Preview Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-xs tracking-wider uppercase text-slate-700 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#EFB33D]" />
                    <span>Live Logo Preview</span>
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Real-Time Synced
                  </span>
                </div>

                {/* Dark Background Variant */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Navy Header Background (Default)
                  </p>
                  <div className="p-6 rounded-2xl bg-[#061A2E] border border-[#EFB33D]/30 flex items-center justify-center shadow-inner">
                    <BrandLogo
                      size="lg"
                      variant="light"
                      showTagline={showTaglineState}
                      overrideBrandName={brandNameInput}
                      overrideTagline={taglineInput}
                    />
                  </div>
                </div>

                {/* Light Background Variant */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Light Paper Background (Reports & Prescriptions)
                  </p>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                    <BrandLogo
                      size="lg"
                      variant="dark"
                      showTagline={showTaglineState}
                      overrideBrandName={brandNameInput}
                      overrideTagline={taglineInput}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handleReset}
                    className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
