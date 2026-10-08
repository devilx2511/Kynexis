import React, { useState } from 'react';
import { DevUser, ClinicLocation, Appointment } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { FounderDashboard } from './tabs/FounderDashboard';
import { AppointmentsManagerTab } from './tabs/AppointmentsManagerTab';
import { DoctorManagerTab } from './tabs/DoctorManagerTab';
import { WebsiteCmsTab } from './tabs/WebsiteCmsTab';
import { SeoControlCenterTab } from './tabs/SeoControlCenterTab';
import { DevToolsTab } from './tabs/DevToolsTab';
import { MaintainerTab } from './tabs/MaintainerTab';
import { SecurityCenterTab } from './tabs/SecurityCenterTab';
import { SettingsTab } from './tabs/SettingsTab';
import { BrandStudioTab } from './tabs/BrandStudioTab';
import { CommandPaletteModal } from './CommandPaletteModal';
import { AiAssistantModal } from './AiAssistantModal';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Search,
  Server,
  ShieldCheck,
  Settings,
  Command,
  Sparkles,
  LogOut,
  Bell,
  ChevronDown,
  Globe,
  Stethoscope,
  Activity,
  ArrowLeft,
  X,
  Lock,
  Wrench,
  Cpu,
  Layers,
  Palette,
} from 'lucide-react';

interface DevModeConsoleProps {
  currentUser: DevUser;
  currentLocation: ClinicLocation;
  appointments: Appointment[];
  onExitDevMode: () => void;
  onUpdateAppointmentsStatus: (id: string, status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed') => void;
  onAddAppointment: (app: Appointment) => void;
  onUpdateLocation: (updated: ClinicLocation) => void;
}

export const DevModeConsole: React.FC<DevModeConsoleProps> = ({
  currentUser,
  currentLocation,
  appointments,
  onExitDevMode,
  onUpdateAppointmentsStatus,
  onAddAppointment,
  onUpdateLocation,
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', group: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'branding', label: 'Brand & Logo Studio', group: 'CREATORS & CMS', icon: Palette },
    { id: 'appointments', label: 'Patient Appointments', group: 'OPERATIONS', icon: Calendar },
    { id: 'doctors', label: 'Doctor Faculty & Staff', group: 'OPERATIONS', icon: Stethoscope },
    { id: 'pages', label: 'Creators CMS & Builder', group: 'CREATORS & CMS', icon: FileText },
    { id: 'seo', label: 'SEO & Schema Manager', group: 'GROWTH & SEO', icon: Search },
    { id: 'maintenance', label: 'Site Maintainer Hub', group: 'MAINTENANCE', icon: Wrench },
    { id: 'devtools', label: 'Developer Console & Logs', group: 'DEVELOPER', icon: Server },
    { id: 'security', label: 'Security & HIPAA Audit', group: 'SECURITY', icon: ShieldCheck },
    { id: 'settings', label: 'Clinic Settings', group: 'SETTINGS', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#EEF2F5] text-slate-800 flex flex-col selection:bg-[#EFB33D]/30">
      {/* GLOBAL ENTERPRISE ADMIN HEADER */}
      <header className="sticky top-0 z-40 bg-[#061A2E] text-white border-b border-[#EFB33D]/20 shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <BrandLogo size="md" variant="light" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#EFB33D]/20 border border-[#EFB33D]/40 text-[#EFB33D] font-mono text-[10px] font-bold tracking-widest uppercase">
              DEVMODE ACTIVE
            </span>
          </div>
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Quick Command Launcher */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Command className="w-3.5 h-3.5 text-[#EFB33D]" />
            <span>Search features...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono border border-white/10">⌘K</kbd>
          </button>

          {/* AI Clinical Assistant Trigger */}
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFB33D] text-[#061A2E] font-bold hover:bg-[#D9A52F] transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Current User Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#EFB33D]/40"
            />
            <div className="hidden sm:block text-left leading-tight">
              <p className="font-bold text-[11px] text-white truncate max-w-[120px]">{currentUser.name}</p>
              <p className="text-[9px] uppercase font-mono text-[#EFB33D] font-bold">
                {currentUser.role.replace('_', ' ')}
              </p>
            </div>
          </div>

          {/* Exit DevMode Button */}
          <button
            onClick={onExitDevMode}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors flex items-center gap-1.5 font-bold"
            title="Exit DevMode & Return to Public Portal"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">Exit DevMode</span>
          </button>
        </div>
      </header>

      {/* BODY CONTENT CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#061A2E] text-slate-300 border-r border-[#EFB33D]/20 flex flex-col justify-between transition-transform duration-300 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Sidebar Group Sections */}
            {['OVERVIEW', 'OPERATIONS', 'CREATORS & CMS', 'GROWTH & SEO', 'MAINTENANCE', 'DEVELOPER', 'SECURITY', 'SETTINGS'].map((grp) => {
              const groupItems = navItems.filter((i) => i.group === grp);
              if (groupItems.length === 0) return null;
              return (
                <div key={grp} className="space-y-1">
                  <p className="px-3 text-[10px] font-bold tracking-widest text-[#EFB33D] uppercase">
                    {grp}
                  </p>
                  {groupItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                          isActive
                            ? 'bg-[#EFB33D] text-[#061A2E] shadow-md'
                            : 'hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#061A2E]' : 'text-[#EFB33D]'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Footer Info in Sidebar */}
          <div className="p-4 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
            <p className="font-bold text-white">Kynexis Health OS</p>
            <p>Kolupukur Hub • Kolkata 700157</p>
            <p className="text-emerald-400 font-mono">256-Bit SSL Protected</p>
          </div>
        </aside>

        {/* MAIN DYNAMIC CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <FounderDashboard
              currentLocation={currentLocation}
              appointments={appointments}
              onNavigateTab={(tab) => setActiveTab(tab)}
              userRole={currentUser.role}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsManagerTab
              appointments={appointments}
              onUpdateStatus={onUpdateAppointmentsStatus}
              onAddAppointment={onAddAppointment}
            />
          )}

          {activeTab === 'doctors' && <DoctorManagerTab />}

          {(activeTab === 'branding' || activeTab === 'logo' || activeTab === 'brand') && <BrandStudioTab />}

          {(activeTab === 'pages' || activeTab === 'website' || activeTab === 'creators') && (
            <WebsiteCmsTab onNavigateTab={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'seo' && <SeoControlCenterTab />}

          {activeTab === 'maintenance' && <MaintainerTab currentLocation={currentLocation} />}

          {(activeTab === 'devtools' || activeTab === 'developer') && <DevToolsTab />}

          {activeTab === 'security' && <SecurityCenterTab currentRole={currentUser.role} />}

          {activeTab === 'settings' && (
            <SettingsTab
              currentLocation={currentLocation}
              onUpdateLocation={onUpdateLocation}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}
        </main>
      </div>

      {/* COMMAND PALETTE MODAL (CTRL + K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onTriggerAction={(act) => console.log('Action:', act)}
      />

      {/* AI ASSISTANT MODAL */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />
    </div>
  );
};
