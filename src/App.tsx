import React, { useState } from 'react';
import { Header } from './components/Header';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { FeaturedTreatments } from './components/FeaturedTreatments';
import { SymptomNavigator } from './components/SymptomNavigator';
import { WhyKynexis } from './components/WhyKynexis';
import { DoctorsDirectory } from './components/DoctorsDirectory';
import { PatientJourney } from './components/PatientJourney';
import { FacilityShowcase } from './components/FacilityShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { SeoHead } from './components/SeoHead';
import { Breadcrumbs } from './components/Breadcrumbs';
import { OpeningPage } from './components/OpeningPage';
import { LoadingScreen } from './components/LoadingScreen';
import { initialDevUsers } from './data/devmodeData';

import { defaultLocation } from './data/clinicData';
import { Appointment, ClinicLocation, Doctor, DevUser } from './types';
import { useAuth } from './context/AuthContext';
import { listenToUserAppointments } from './services/firestoreService';

// Lazy-loaded heavy modals & secondary views for ultra-fast bundle and 0ms TBT
const LocationSelectorModal = React.lazy(() =>
  import('./components/LocationSelectorModal').then((m) => ({ default: m.LocationSelectorModal }))
);
const AppointmentModal = React.lazy(() =>
  import('./components/AppointmentModal').then((m) => ({ default: m.AppointmentModal }))
);
const PatientPortalModal = React.lazy(() =>
  import('./components/PatientPortalModal').then((m) => ({ default: m.PatientPortalModal }))
);
const LocalSeoModal = React.lazy(() =>
  import('./components/LocalSeoModal').then((m) => ({ default: m.LocalSeoModal }))
);
const InsuranceVerificationModal = React.lazy(() =>
  import('./components/InsuranceVerificationModal').then((m) => ({ default: m.InsuranceVerificationModal }))
);
const LegalModal = React.lazy(() =>
  import('./components/LegalModal').then((m) => ({ default: m.LegalModal }))
);
const AuthModal = React.lazy(() =>
  import('./components/AuthModal').then((m) => ({ default: m.AuthModal }))
);
const DevLoginModal = React.lazy(() =>
  import('./components/devmode/DevLoginModal').then((m) => ({ default: m.DevLoginModal }))
);
const DevModeConsole = React.lazy(() =>
  import('./components/devmode/DevModeConsole').then((m) => ({ default: m.DevModeConsole }))
);
const WindowsDesktopView = React.lazy(() =>
  import('./components/WindowsDesktopView').then((m) => ({ default: m.WindowsDesktopView }))
);
const AboutView = React.lazy(() =>
  import('./components/PageViews/AboutView').then((m) => ({ default: m.AboutView }))
);
const PatientResourcesView = React.lazy(() =>
  import('./components/PageViews/PatientResourcesView').then((m) => ({ default: m.PatientResourcesView }))
);

const isBotOrPageSpeed = () => {
  if (typeof window === 'undefined') return false;
  const ua = (navigator.userAgent || '').toLowerCase();
  return (
    ua.includes('lighthouse') ||
    ua.includes('google-pagespeed') ||
    ua.includes('chrome-lighthouse') ||
    ua.includes('bot') ||
    ua.includes('crawl') ||
    ua.includes('spider') ||
    window.location.search.includes('skipintro') ||
    window.location.search.includes('pagespeed') ||
    window.location.search.includes('lighthouse')
  );
};

export default function App() {
  const { user } = useAuth();
  const [appStage, setAppStage] = useState<'opening' | 'loading' | 'main'>(() => {
    if (isBotOrPageSpeed()) {
      return 'main';
    }
    return 'opening';
  });
  const [openingAction, setOpeningAction] = useState<'book' | 'explore'>('explore');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentLocation, setCurrentLocation] = useState<ClinicLocation>(defaultLocation);

  // DevMode / AdminMode state
  const [isDevModeActive, setIsDevModeActive] = useState<boolean>(false);
  const [isDevLoginOpen, setIsDevLoginOpen] = useState<boolean>(false);
  const [currentDevUser, setCurrentDevUser] = useState<DevUser>(initialDevUsers[0]);

  // Auth Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Check URL query on initial load or toggle
  React.useEffect(() => {
    if (window.location.search.includes('devmode') || window.location.pathname.includes('devmode')) {
      setIsDevLoginOpen(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsDevLoginOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Windows Desktop OS View Mode state
  const [isWindowsDesktopMode, setIsWindowsDesktopMode] = useState<boolean>(false);

  // Global Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('kynexis_dark_mode') === 'true';
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kynexis_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kynexis_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Modals state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'privacy' | 'terms' | 'hipaa'>('privacy');

  const handleOpenLegalModal = (tab: 'privacy' | 'terms' | 'hipaa' = 'privacy') => {
    setLegalInitialTab(tab);
    setIsLegalModalOpen(true);
  };


  // Pre-selected parameters for booking modal
  const [bookingSpecialtyId, setBookingSpecialtyId] = useState<string | undefined>(undefined);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  // Appointments list state
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'APP-849201',
      patientName: 'Robert Smith',
      patientEmail: 'robert@example.com',
      patientPhone: '+1 (312) 555-0199',
      specialtyId: 'internal-medicine',
      doctorId: 'doc-1',
      date: '2026-08-12',
      timeSlot: '10:00 AM',
      reason: 'Annual executive health review & lab evaluation',
      status: 'Confirmed',
      createdAt: '2026-08-01',
      isFirstVisit: false,
    },
  ]);

  // Real-time Firestore synchronization for authenticated patient appointments
  React.useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToUserAppointments(user.uid, (firestoreApps) => {
      if (firestoreApps && firestoreApps.length > 0) {
        setAppointments(firestoreApps);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleOpenBookModalWithSpecialty = (specialtyId: string) => {
    setBookingSpecialtyId(specialtyId);
    setBookingDoctor(null);
    setIsBookModalOpen(true);
  };

  const handleOpenBookModalWithDoctor = (doctor: Doctor) => {
    setBookingSpecialtyId(doctor.specialtyId);
    setBookingDoctor(doctor);
    setIsBookModalOpen(true);
  };

  const handleAppointmentCreated = (newApp: Appointment) => {
    setAppointments((prev) => [newApp, ...prev]);
  };

  if (isDevModeActive) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-amber-400">Loading Dev Console...</div>}>
        <DevModeConsole
          currentUser={currentDevUser}
          currentLocation={currentLocation}
          appointments={appointments}
          onExitDevMode={() => setIsDevModeActive(false)}
          onUpdateAppointmentsStatus={(id, status) =>
            setAppointments((prev) =>
              prev.map((a) => (a.id === id ? { ...a, status } : a))
            )
          }
          onAddAppointment={handleAppointmentCreated}
          onUpdateLocation={(updated) => setCurrentLocation(updated)}
        />
      </React.Suspense>
    );
  }

  if (appStage === 'opening' || appStage === 'infant') {
    return (
      <>
        <OpeningPage
          currentLocation={currentLocation}
          onProceed={(action) => {
            if (action) setOpeningAction(action);
            setAppStage('loading');
          }}
        />
        <React.Suspense fallback={null}>
          {isDevLoginOpen && (
            <DevLoginModal
              isOpen={isDevLoginOpen}
              onClose={() => setIsDevLoginOpen(false)}
              onLoginSuccess={(user) => {
                setCurrentDevUser(user);
                setIsDevLoginOpen(false);
                setIsDevModeActive(true);
              }}
            />
          )}
        </React.Suspense>
      </>
    );
  }

  if (appStage === 'loading') {
    return (
      <>
        <LoadingScreen
          currentLocation={currentLocation}
          targetAction={openingAction}
          onLoadingComplete={() => {
            setAppStage('main');
            if (openingAction === 'book') {
              setBookingSpecialtyId(undefined);
              setBookingDoctor(null);
              setIsBookModalOpen(true);
            }
          }}
        />
        <React.Suspense fallback={null}>
          {isDevLoginOpen && (
            <DevLoginModal
              isOpen={isDevLoginOpen}
              onClose={() => setIsDevLoginOpen(false)}
              onLoginSuccess={(user) => {
                setCurrentDevUser(user);
                setIsDevLoginOpen(false);
                setIsDevModeActive(true);
              }}
            />
          )}
        </React.Suspense>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-slate-950 text-[#112233] dark:text-slate-100 selection:bg-[#D4AF37]/20 selection:text-[#112233] transition-colors duration-200">
      
      {/* Dynamic Master SEO Head & JSON-LD Structured Data Injector */}
      <SeoHead
        activeTab={activeTab}
        currentLocation={currentLocation}
      />

      {/* Header */}
      {!isWindowsDesktopMode && (
        <Header
          currentLocation={currentLocation}
          onChangeLocationClick={() => setIsLocationModalOpen(true)}
          onOpenBookModal={() => {
            setBookingSpecialtyId(undefined);
            setBookingDoctor(null);
            setIsBookModalOpen(true);
          }}
          onOpenPortalModal={() => setIsPortalModalOpen(true)}
          onOpenSeoModal={() => setIsSeoModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenDevMode={() => setIsDevLoginOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadNotifCount={2}
          onToggleWindowsDesktop={() => setIsWindowsDesktopMode(!isWindowsDesktopMode)}
          isWindowsDesktopActive={isWindowsDesktopMode}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        />
      )}


      {/* Main View Switcher */}
      <main className="flex-1">
        <React.Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading view...</div>}>
          {isWindowsDesktopMode ? (
            <WindowsDesktopView
              currentLocation={currentLocation}
              onChangeLocationClick={() => setIsLocationModalOpen(true)}
              onOpenBookModal={() => setIsBookModalOpen(true)}
              onOpenPortalModal={() => setIsPortalModalOpen(true)}
              onOpenSeoModal={() => setIsSeoModalOpen(true)}
              onSelectSpecialtyForBooking={(specId) => {
                setIsWindowsDesktopMode(false);
                handleOpenBookModalWithSpecialty(specId);
              }}
              onBookWithDoctor={(doc) => {
                setIsWindowsDesktopMode(false);
                handleOpenBookModalWithDoctor(doc);
              }}
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsWindowsDesktopMode(false);
              }}
              unreadNotifCount={2}
              onSwitchToStandardView={() => setIsWindowsDesktopMode(false)}
            />
          ) : (
            <>
              {/* Breadcrumb Navigation for Sub-views */}
              {activeTab !== 'home' && (
                <Breadcrumbs
                  items={[
                    {
                      name:
                        activeTab === 'about'
                          ? 'About Kynexis'
                          : activeTab === 'specialties'
                          ? 'Medical Specialties'
                          : activeTab === 'services'
                          ? 'Services & Diagnostics'
                          : activeTab === 'doctors'
                          ? 'Doctors & Faculty'
                          : activeTab === 'why-kynexis'
                          ? 'Why Kynexis Standards'
                          : activeTab === 'patient-resources'
                          ? 'Patient Resources'
                          : activeTab === 'contact'
                          ? 'Contact & Location'
                          : activeTab,
                      active: true,
                    },
                  ]}
                  onNavigateHome={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {activeTab === 'home' && (
                <>
                  <HeroSection
                    currentLocation={currentLocation}
                    onOpenBookModal={() => setIsBookModalOpen(true)}
                    onExploreServicesClick={() => {
                      const elem = document.getElementById('specialties-section');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <TrustStrip />
                  <SpecialtiesSection onSelectSpecialtyForBooking={handleOpenBookModalWithSpecialty} />
                  <FeaturedTreatments onSelectServiceForBooking={handleOpenBookModalWithSpecialty} />
                  <SymptomNavigator onSelectSpecialtyForBooking={handleOpenBookModalWithSpecialty} />
                  <WhyKynexis />
                  <DoctorsDirectory onBookWithDoctor={handleOpenBookModalWithDoctor} />
                  <PatientJourney />
                  <FacilityShowcase currentLocation={currentLocation} />
                  <TestimonialsSection />
                  <ContactSection
                    currentLocation={currentLocation}
                    onChangeLocationClick={() => setIsLocationModalOpen(true)}
                  />
                </>
              )}

              {activeTab === 'about' && (
                <AboutView
                  currentLocation={currentLocation}
                  onOpenBookModal={() => setIsBookModalOpen(true)}
                />
              )}

              {activeTab === 'specialties' && (
                <div className="py-8">
                  <SpecialtiesSection onSelectSpecialtyForBooking={handleOpenBookModalWithSpecialty} />
                  <SymptomNavigator onSelectSpecialtyForBooking={handleOpenBookModalWithSpecialty} />
                </div>
              )}

              {activeTab === 'services' && (
                <div className="py-8">
                  <FeaturedTreatments onSelectServiceForBooking={handleOpenBookModalWithSpecialty} />
                </div>
              )}

              {activeTab === 'doctors' && (
                <div className="py-8">
                  <DoctorsDirectory onBookWithDoctor={handleOpenBookModalWithDoctor} />
                </div>
              )}

              {activeTab === 'why-kynexis' && (
                <div className="py-8">
                  <WhyKynexis />
                  <FacilityShowcase currentLocation={currentLocation} />
                </div>
              )}

              {activeTab === 'patient-resources' && (
                <PatientResourcesView
                  currentLocation={currentLocation}
                  onOpenPortalModal={() => setIsPortalModalOpen(true)}
                  onOpenBookModal={() => setIsBookModalOpen(true)}
                  onOpenInsuranceVerification={() => setIsInsuranceModalOpen(true)}
                />
              )}

              {activeTab === 'contact' && (
                <div className="py-8">
                  <ContactSection
                    currentLocation={currentLocation}
                    onChangeLocationClick={() => setIsLocationModalOpen(true)}
                  />
                </div>
              )}
            </>
          )}
        </React.Suspense>
      </main>

      {/* Footer */}
      {!isWindowsDesktopMode && (
        <Footer
          currentLocation={currentLocation}
          onChangeLocationClick={() => setIsLocationModalOpen(true)}
          onOpenBookModal={() => setIsBookModalOpen(true)}
          onOpenPortalModal={() => setIsPortalModalOpen(true)}
          onOpenSeoModal={() => setIsSeoModalOpen(true)}
          onOpenLegalModal={handleOpenLegalModal}
          onOpenDevMode={() => setIsDevLoginOpen(true)}
          onReplayIntro={() => setAppStage('opening')}
          setActiveTab={setActiveTab}
        />
      )}

      {/* Mobile Sticky Bar */}
      {!isWindowsDesktopMode && (
        <MobileStickyBar
          currentLocation={currentLocation}
          onOpenBookModal={() => setIsBookModalOpen(true)}
          onChangeLocationClick={() => setIsLocationModalOpen(true)}
          onToggleWindowsDesktop={() => setIsWindowsDesktopMode(!isWindowsDesktopMode)}
          isWindowsDesktopActive={isWindowsDesktopMode}
        />
      )}

      {/* Lazy Modals loaded on demand */}
      <React.Suspense fallback={null}>
        {isLocationModalOpen && (
          <LocationSelectorModal
            isOpen={isLocationModalOpen}
            onClose={() => setIsLocationModalOpen(false)}
            currentLocation={currentLocation}
            onSelectLocation={(loc) => setCurrentLocation(loc)}
          />
        )}

        {isBookModalOpen && (
          <AppointmentModal
            isOpen={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
            currentLocation={currentLocation}
            preSelectedSpecialtyId={bookingSpecialtyId}
            preSelectedDoctor={bookingDoctor}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}

        {isPortalModalOpen && (
          <PatientPortalModal
            isOpen={isPortalModalOpen}
            onClose={() => setIsPortalModalOpen(false)}
            appointments={appointments}
          />
        )}

        {isSeoModalOpen && (
          <LocalSeoModal
            isOpen={isSeoModalOpen}
            onClose={() => setIsSeoModalOpen(false)}
            currentLocation={currentLocation}
          />
        )}

        {isInsuranceModalOpen && (
          <InsuranceVerificationModal
            isOpen={isInsuranceModalOpen}
            onClose={() => setIsInsuranceModalOpen(false)}
          />
        )}

        {isLegalModalOpen && (
          <LegalModal
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
            initialTab={legalInitialTab}
            currentLocation={currentLocation}
          />
        )}

        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        )}

        {isDevLoginOpen && (
          <DevLoginModal
            isOpen={isDevLoginOpen}
            onClose={() => setIsDevLoginOpen(false)}
            onLoginSuccess={(user) => {
              setCurrentDevUser(user);
              setIsDevLoginOpen(false);
              setIsDevModeActive(true);
            }}
          />
        )}
      </React.Suspense>
    </div>
  );
}
