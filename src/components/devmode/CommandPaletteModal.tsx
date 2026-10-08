import React, { useState, useEffect } from 'react';
import {
  Search,
  Command,
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Code2,
  Server,
  ShieldCheck,
  Settings,
  X,
  ArrowRight,
  Activity,
  Stethoscope,
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onTriggerAction: (action: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onTriggerAction,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'dashboard', title: 'Open Executive Founder Dashboard', category: 'Navigation', icon: LayoutDashboard },
    { id: 'branding', title: 'Brand & Logo Studio (Upload Custom Logo & Sizing)', category: 'Branding', icon: FileText },
    { id: 'appointments', title: 'Manage Patient Appointments & Schedule', category: 'Operations', icon: Calendar },
    { id: 'doctors', title: 'Doctor Faculty Credentials & Directory', category: 'Operations', icon: Stethoscope },
    { id: 'pages', title: 'Visual Page Builder & Section Reordering', category: 'Website', icon: FileText },
    { id: 'seo', title: 'Local Schema Builder & SERP Meta Tags', category: 'SEO', icon: Search },
    { id: 'analytics', title: 'View Kolkata Organic Search Analytics', category: 'Analytics', icon: Activity },
    { id: 'devtools', title: 'Developer Error Logs & Feature Flags', category: 'Developer', icon: Server },
    { id: 'security', title: 'Security RBAC & Immutable Audit Trail', category: 'Security', icon: ShieldCheck },
    { id: 'settings', title: 'Emergency Clinic Controls & Maintenance Mode', category: 'Settings', icon: Settings },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#061A2E]/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EFB33D]/30 space-y-0 text-slate-800">
        {/* Search Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#EFB33D]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to tab..."
            className="w-full bg-transparent text-sm font-medium focus:outline-none text-[#061A2E]"
          />
          <kbd className="px-2 py-0.5 rounded bg-slate-200 text-[10px] font-mono font-bold text-slate-600">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 text-xs">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No commands matching "{query}"</div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    onSelectTab(cmd.id);
                    onClose();
                  }}
                  className="w-full p-3 rounded-2xl hover:bg-[#061A2E] hover:text-white flex items-center justify-between group transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#EFB33D] shrink-0" />
                    <div>
                      <p className="font-bold">{cmd.title}</p>
                      <span className="text-[10px] opacity-60 uppercase font-mono">{cmd.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#EFB33D]" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
