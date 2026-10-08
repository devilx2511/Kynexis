import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Search,
  Calendar,
  User,
  Phone,
  MapPin,
  Bell,
  Settings,
  Minimize2,
  Maximize2,
  X,
  FileText,
  Stethoscope,
  Building,
  Sparkles,
  Clock,
  ShieldCheck,
  Wifi,
  Battery,
  Monitor,
  Code2,
  ChevronUp,
  Volume2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { ClinicLocation, Doctor } from '../types';
import { BrandLogo } from './BrandLogo';
import { specialtiesData, doctorsData } from '../data/clinicData';

interface WindowsDesktopViewProps {
  currentLocation: ClinicLocation;
  onChangeLocationClick: () => void;
  onOpenBookModal: () => void;
  onOpenPortalModal: () => void;
  onOpenSeoModal: () => void;
  onSelectSpecialtyForBooking: (specId: string) => void;
  onBookWithDoctor: (doc: Doctor) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadNotifCount: number;
  onSwitchToStandardView: () => void;
}

export const WindowsDesktopView: React.FC<WindowsDesktopViewProps> = ({
  currentLocation,
  onChangeLocationClick,
  onOpenBookModal,
  onOpenPortalModal,
  onOpenSeoModal,
  onSelectSpecialtyForBooking,
  onBookWithDoctor,
  activeTab,
  setActiveTab,
  unreadNotifCount,
  onSwitchToStandardView,
}) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [windowState, setWindowState] = useState<'normal' | 'maximized'>('normal');

  const wallpapers = [
    'linear-gradient(135deg, #112233 0%, #1a344d 50%, #0d1b2a 100%)', // Windows Navy
    'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', // Porcelain Slate
    'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)', // Emerald Teal
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString([], { month: 'short', day: 'numeric' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const desktopIcons = [
    {
      id: 'book',
      name: 'Book Appointment.exe',
      icon: Calendar,
      color: 'bg-[#D4AF37] text-[#112233]',
      action: onOpenBookModal,
    },
    {
      id: 'portal',
      name: 'Patient Portal.sys',
      icon: User,
      color: 'bg-[#112233] text-[#D4AF37]',
      badge: unreadNotifCount > 0 ? `${unreadNotifCount} New` : undefined,
      action: onOpenPortalModal,
    },
    {
      id: 'specialties',
      name: 'Specialties.app',
      icon: Stethoscope,
      color: 'bg-emerald-700 text-white',
      action: () => setActiveTab('specialties'),
    },
    {
      id: 'doctors',
      name: 'Doctors Directory.dll',
      icon: User,
      color: 'bg-indigo-700 text-white',
      action: () => setActiveTab('doctors'),
    },
    {
      id: 'facilities',
      name: 'Clinical Suite.view',
      icon: Building,
      color: 'bg-slate-700 text-white',
      action: () => setActiveTab('why-kynexis'),
    },
    {
      id: 'location',
      name: 'Location Settings.cfg',
      icon: MapPin,
      color: 'bg-[#8A9A86] text-white',
      action: onChangeLocationClick,
    },
    {
      id: 'seo',
      name: 'SEO & Schema.json',
      icon: Code2,
      color: 'bg-amber-600 text-white',
      action: onOpenSeoModal,
    },
  ];

  const handleStartMenuAppClick = (action: () => void) => {
    setStartMenuOpen(false);
    action();
  };

  const filteredSpecialties = specialtiesData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none text-slate-800 transition-all duration-500"
      style={{ background: wallpapers[wallpaperIndex] }}
    >
      {/* Top Windows Desktop Title Header */}
      <div className="bg-[#112233]/90 backdrop-blur-md border-b border-[#D4AF37]/30 text-white text-xs px-3 py-1.5 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#D4AF37]">
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Windows 11 Healthcare OS</span>
            <span className="sm:hidden">Windows OS</span>
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            {currentLocation.city} Facility
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch to standard layout button */}
          <button
            onClick={onSwitchToStandardView}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F3E5AB] text-[11px] font-semibold border border-white/20 flex items-center gap-1.5"
            title="Switch back to Standard Mobile Layout"
          >
            <RefreshCw className="w-3 h-3 text-[#D4AF37]" />
            <span>Standard View</span>
          </button>

          {/* Change wallpaper button */}
          <button
            onClick={() =>
              setWallpaperIndex((prev) => (prev + 1) % wallpapers.length)
            }
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 text-[10px] font-medium"
            title="Cycle Wallpaper"
          >
            Theme
          </button>
        </div>
      </div>

      {/* Main Desktop Workspace Area */}
      <div className="flex-1 p-4 sm:p-6 relative z-10 overflow-y-auto">
        {/* Desktop Icons Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-4xl">
          {desktopIcons.map((ico) => {
            const Icon = ico.icon;
            return (
              <button
                key={ico.id}
                onClick={ico.action}
                className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 hover:bg-white/20 hover:backdrop-blur-md hover:shadow-lg focus:bg-white/30 focus:outline-none"
              >
                <div
                  className={`relative p-3.5 rounded-2xl shadow-md group-hover:scale-105 transition-transform ${ico.color}`}
                >
                  <Icon className="w-6 h-6" />
                  {ico.badge && (
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold shadow">
                      {ico.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-white drop-shadow-md text-center line-clamp-2 leading-tight">
                  {ico.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Windows Desktop Widget Window (Interactive Quick Access) */}
        <div className="mt-6 max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl border border-white/80 shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-[#112233] text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-heading font-bold">
                Kynexis Health Desktop Console
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[10px] text-slate-300">Active Session</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-100/80 rounded-xl border border-slate-200">
              <div>
                <p className="font-bold text-[#112233]">
                  {currentLocation.city} Multi-Specialty Clinic
                </p>
                <p className="text-slate-500 text-[11px]">
                  {currentLocation.fullAddress}
                </p>
              </div>
              <button
                onClick={onOpenBookModal}
                className="px-4 py-2 bg-[#112233] text-white font-bold rounded-lg hover:bg-[#1a344d] shrink-0"
              >
                Instant Book
              </button>
            </div>

            {/* Quick Department Launch Cards */}
            <div>
              <p className="font-bold text-slate-600 mb-2 uppercase text-[10px] tracking-wider">
                Quick Department Access
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {specialtiesData.slice(0, 6).map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => onSelectSpecialtyForBooking(spec.id)}
                    className="p-2.5 text-left bg-white rounded-xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-sm transition-all"
                  >
                    <p className="font-bold text-[#112233] truncate">{spec.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{spec.tagline}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WINDOWS 11 START MENU POPUP */}
      {startMenuOpen && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[92vw] max-w-lg bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/90 z-50 p-5 space-y-4 animate-fade-in text-slate-800">
          {/* Search Box in Start Menu */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medical specialties, doctors, or services..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Search Results if query exists */}
          {searchQuery ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase text-slate-400">
                Matching Departments
              </p>
              {filteredSpecialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() =>
                    handleStartMenuAppClick(() =>
                      onSelectSpecialtyForBooking(spec.id)
                    )
                  }
                  className="w-full p-2.5 text-left bg-slate-50 rounded-xl hover:bg-[#112233] hover:text-white transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-xs">{spec.name}</p>
                    <p className="text-[10px] opacity-75">{spec.tagline}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* Pinned Applications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#112233]">
                    Pinned Applications
                  </span>
                  <span className="text-[10px] text-slate-400">
                    All Apps ({specialtiesData.length})
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center">
                  <button
                    onClick={() => handleStartMenuAppClick(onOpenBookModal)}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all"
                  >
                    <div className="p-2.5 bg-[#112233] text-[#D4AF37] rounded-xl">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#112233]">
                      Book Visit
                    </span>
                  </button>

                  <button
                    onClick={() => handleStartMenuAppClick(onOpenPortalModal)}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all relative"
                  >
                    <div className="p-2.5 bg-[#8A9A86] text-white rounded-xl">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#112233]">
                      Portal
                    </span>
                    {unreadNotifCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      handleStartMenuAppClick(() => setActiveTab('doctors'))
                    }
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all"
                  >
                    <div className="p-2.5 bg-indigo-700 text-white rounded-xl">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#112233]">
                      Doctors
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      handleStartMenuAppClick(() => setActiveTab('why-kynexis'))
                    }
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl flex flex-col items-center gap-1.5 transition-all"
                  >
                    <div className="p-2.5 bg-emerald-700 text-white rounded-xl">
                      <Building className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#112233]">
                      Suites
                    </span>
                  </button>
                </div>
              </div>

              {/* Recommended Recent Activity */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-bold text-[#112233] block mb-2">
                  Recommended
                </span>
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <p className="font-bold text-[#112233]">
                          HIPAA Encrypted Patient Records
                        </p>
                        <p className="text-[10px] text-slate-500">
                          256-Bit SSL Secured
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartMenuAppClick(onOpenPortalModal)}
                      className="text-[11px] font-bold text-[#D4AF37] hover:underline"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* User Profile Bar at bottom of Start Menu */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#112233] text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                KH
              </div>
              <div>
                <p className="text-xs font-bold text-[#112233]">Patient User</p>
                <p className="text-[10px] text-slate-500">
                  {currentLocation.city} Facility
                </p>
              </div>
            </div>

            <button
              onClick={() => handleStartMenuAppClick(onChangeLocationClick)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Switch City</span>
            </button>
          </div>
        </div>
      )}

      {/* WINDOWS 11 TASKBAR AT BOTTOM */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#112233]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-3 py-2 flex items-center justify-between shadow-2xl">
        {/* Left / Center Taskbar Icons */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          {/* Windows Start Button */}
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
              startMenuOpen
                ? 'bg-[#D4AF37] text-[#112233] shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-[#D4AF37]'
            }`}
            title="Start Menu"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          {/* Search Bar Pin */}
          <button
            onClick={() => setStartMenuOpen(true)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hidden sm:flex items-center gap-2 text-xs"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-slate-400">Search Kynexis OS...</span>
          </button>

          {/* Taskbar App Pins */}
          <button
            onClick={onOpenBookModal}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] transition-all relative"
            title="Book Appointment"
          >
            <Calendar className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenPortalModal}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-all relative"
            title="Patient Portal"
          >
            <User className="w-5 h-5 text-[#8A9A86]" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#112233] text-[9px] font-bold flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('specialties')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-all"
            title="Specialties"
          >
            <Stethoscope className="w-5 h-5" />
          </button>
        </div>

        {/* Right System Tray */}
        <div className="hidden sm:flex items-center gap-3 text-white text-xs">
          <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <Battery className="w-3.5 h-3.5 text-slate-200" />
            <Volume2 className="w-3.5 h-3.5 text-slate-200" />
          </div>

          <div className="text-right leading-tight">
            <p className="font-bold text-slate-200">{currentTime}</p>
            <p className="text-[10px] text-slate-400">{currentDate}</p>
          </div>

          <button
            onClick={onOpenPortalModal}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
