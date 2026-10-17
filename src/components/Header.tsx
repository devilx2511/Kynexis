import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Calendar, User, Bell, Menu, X, Code2, Sun, Moon, LogIn, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ClinicLocation } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentLocation: ClinicLocation;
  onChangeLocationClick: () => void;
  onOpenBookModal: () => void;
  onOpenPortalModal: () => void;
  onOpenSeoModal: () => void;
  onOpenAuthModal: () => void;
  onOpenDevMode?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadNotifCount: number;
  onToggleWindowsDesktop?: () => void;
  isWindowsDesktopActive?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onChangeLocationClick,
  onOpenBookModal,
  onOpenPortalModal,
  onOpenSeoModal,
  onOpenAuthModal,
  onOpenDevMode,
  activeTab,
  setActiveTab,
  unreadNotifCount,
  onToggleWindowsDesktop,
  isWindowsDesktopActive = false,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const { user, userProfile, isGuest, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'specialties', label: 'Specialties' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'why-kynexis', label: 'Why Kynexis' },
    { id: 'patient-resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Banner for Urgent Contact & Location Context */}
      <div className="bg-[#112233] text-white text-xs border-b border-[#D4AF37]/20 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {/* Active City Button */}
            <button
              onClick={onChangeLocationClick}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium">{currentLocation.city}, {currentLocation.state} Clinic</span>
              <span className="text-[10px] text-slate-400 underline decoration-dashed">Change</span>
            </button>

            <span className="hidden sm:inline text-slate-600">|</span>

            {/* Direct Phone */}
            <a
              href={`tel:${currentLocation.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#8A9A86]" />
              <span>Direct: {currentLocation.phone}</span>
            </a>

            <span className="hidden md:inline text-slate-600">|</span>

            <span className="hidden md:inline text-slate-300 truncate">
              Hours: Mon-Fri {currentLocation.hoursWeekday}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Global Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 dark:bg-amber-400 dark:text-slate-900 text-[11px] font-bold hover:opacity-90 transition-all shadow-xs"
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-amber-300" />}
                <span>{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
            )}

            {/* Windows Desktop OS View Mode Button */}
            {onToggleWindowsDesktop && (
              <button
                onClick={onToggleWindowsDesktop}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#D4AF37] text-[#112233] text-[11px] font-bold hover:bg-[#c5a028] transition-colors shadow-sm"
              >
                <span>🖥️</span>
                <span className="hidden sm:inline">{isWindowsDesktopActive ? 'Standard Layout' : 'Windows Desktop'}</span>
              </button>
            )}

            {/* SEO Schema Inspector Link */}
            <button
              onClick={onOpenSeoModal}
              className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:text-[#F3E5AB] font-medium transition-colors"
            >
              <Code2 className="w-3 h-3" />
              <span>SEO Schema</span>
            </button>

            {/* Dedicated DevMode Feature Button */}
            {onOpenDevMode && (
              <button
                onClick={onOpenDevMode}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#061A2E] bg-gradient-to-r from-[#EFB33D] to-[#F59E0B] hover:from-[#D9A52F] hover:to-[#D97706] px-2.5 py-0.5 rounded-md font-bold transition-all shadow-sm border border-[#EFB33D]/60 active:scale-95 group"
                title="Open Administrative DevMode Console (Password Protected)"
              >
                <span className="text-xs">⚙️</span>
                <span className="tracking-wide">DevMode</span>
                <span className="text-[9px] bg-[#061A2E] text-[#EFB33D] px-1 py-0.2 rounded font-mono font-bold uppercase">
                  AUTH
                </span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80 dark:border-slate-800'
            : 'bg-[#FAFAFA]/90 dark:bg-slate-900/90 backdrop-blur-sm py-4 border-b border-slate-200/50 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Kynexis Health homepage"
            className="text-left focus:outline-none"
          >
            <BrandLogo size="md" variant={isDarkMode ? 'light' : 'dark'} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-[#112233] dark:text-white font-semibold bg-slate-100/80 dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#112233] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons - Large screens */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Auth Button or User Profile Badge */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#112233] dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#112233] text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      (userProfile?.fullName?.[0] || user.displayName?.[0] || (isGuest ? 'G' : 'P')).toUpperCase()
                    )}
                  </div>
                  <span className="max-w-[110px] truncate">
                    {userProfile?.fullName || user.displayName || (isGuest ? 'Guest Patient' : 'My Account')}
                  </span>
                  {isGuest && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-bold">
                      GUEST
                    </span>
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fade-in text-xs space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-slate-800 dark:text-white truncate">
                        {userProfile?.fullName || user.displayName || 'Patient'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user.email || user.phoneNumber || 'Anonymous Session'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenPortalModal();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                    >
                      <User className="w-3.5 h-3.5 text-[#8A9A86]" />
                      <span>My Medical Portal & Chart</span>
                    </button>

                    {isGuest && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenAuthModal();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[#D4AF37] hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors text-left font-semibold"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Link Permanent Account</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#112233] dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
              >
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* Patient Portal Button */}
            <button
              onClick={onOpenPortalModal}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#112233] dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              aria-label="Patient Portal"
            >
              <User className="w-4 h-4 text-[#8A9A86]" />
              <span>Patient Portal</span>
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#112233]">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Primary Book Appointment CTA */}
            <button
              onClick={onOpenBookModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#112233] dark:bg-[#D4AF37] dark:text-[#112233] rounded-xl hover:bg-[#1a344d] dark:hover:bg-[#c5a028] transition-all shadow-md hover:shadow-lg active:scale-98 border border-[#112233] dark:border-[#D4AF37]"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37] dark:text-[#112233]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile & Tablet Control Buttons (lg:hidden) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Book CTA on tablet */}
            <button
              onClick={onOpenBookModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#112233] dark:bg-[#D4AF37] dark:text-[#112233] rounded-xl shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37] dark:text-[#112233]" />
              <span>Book</span>
            </button>

            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg text-slate-700 dark:text-amber-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-amber-300" />}
              </button>
            )}

            <button
              onClick={onOpenPortalModal}
              className="relative p-2 rounded-lg text-[#112233] dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-label="Patient Portal"
            >
              <User className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#112233]">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#112233] dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-slate-500 dark:text-slate-400">Clinic Branch:</span>
                <p className="font-semibold text-[#112233] dark:text-white">{currentLocation.city}, {currentLocation.state} ({currentLocation.landmark})</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onChangeLocationClick();
                }}
                className="px-2.5 py-1 text-xs bg-white dark:bg-slate-700 text-[#D4AF37] font-semibold border border-[#D4AF37]/40 rounded-lg shadow-xs"
              >
                Change
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2.5 text-left rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-[#112233] text-white dark:bg-[#D4AF37] dark:text-[#112233] font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              {/* User Account / Auth Section in Mobile Menu */}
              {user ? (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#112233] text-[#D4AF37] flex items-center justify-center text-xs font-bold shrink-0">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        (userProfile?.fullName?.[0] || user.displayName?.[0] || (isGuest ? 'G' : 'P')).toUpperCase()
                      )}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-[#112233] dark:text-white truncate max-w-[150px]">
                        {userProfile?.fullName || user.displayName || (isGuest ? 'Guest Patient' : 'Patient')}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {user.email || user.phoneNumber || 'Anonymous Session'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-lg font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#D4AF37] text-[#112233] font-bold rounded-xl shadow-xs text-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Patient Sign In / Register</span>
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#112233] text-white font-semibold rounded-xl hover:bg-[#1a344d] transition-colors shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Consultation</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortalModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 text-[#112233] dark:text-white font-medium rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <User className="w-4 h-4 text-[#8A9A86]" />
                  <span>Patient Chart & Records</span>
                </button>
              </div>

              {onToggleWindowsDesktop && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleWindowsDesktop();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#D4AF37]/15 dark:bg-[#D4AF37]/25 text-[#112233] dark:text-[#F3E5AB] font-bold rounded-xl border border-[#D4AF37]/40 text-xs"
                >
                  <span>🖥️</span>
                  <span>{isWindowsDesktopActive ? 'Switch to Standard Web View' : 'Toggle Windows Desktop Clinical Workspace'}</span>
                </button>
              )}

              {onOpenDevMode && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDevMode();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#061A2E] text-[#EFB33D] font-bold rounded-xl border border-[#EFB33D]/40 shadow-sm text-xs"
                >
                  <span>⚙️ Unlock DevMode Console</span>
                  <span className="text-[10px] bg-[#EFB33D] text-[#061A2E] px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                    AUTH
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

    </>
  );
};
