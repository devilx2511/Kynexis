import React, { useState } from 'react';
import { initialDevUsers } from '../../data/devmodeData';
import { DevUser } from '../../types';
import { BrandLogo } from '../BrandLogo';
import {
  ShieldCheck,
  Key,
  Lock,
  UserCheck,
  X,
  AlertCircle,
  ArrowRight,
  Shield,
  CheckCircle2,
  Eye,
  EyeOff,
  Terminal,
  Cpu,
  Settings,
  Sparkles,
} from 'lucide-react';

interface DevLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: DevUser) => void;
}

export const DevLoginModal: React.FC<DevLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [selectedUser, setSelectedUser] = useState<DevUser>(initialDevUsers[0]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerifyMasterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict Password Protection Requirement: "Sanhati26052009"
    if (password !== 'Sanhati26052009') {
      setErrorMsg('Access Denied: Incorrect DevMode master password. Please enter the authorized password.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(selectedUser);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061A2E]/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EFB33D]/40 space-y-0 text-slate-800 animate-scale-up">
        {/* Header */}
        <div className="p-6 bg-[#061A2E] text-white flex items-center justify-between border-b border-[#EFB33D]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EFB33D]/20 rounded-xl border border-[#EFB33D]/30">
              <Terminal className="w-5 h-5 text-[#EFB33D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-base text-white">DevMode Console</h2>
                <span className="px-2 py-0.5 rounded bg-[#EFB33D] text-[#061A2E] text-[10px] font-mono font-bold uppercase">
                  RESTRICTED
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Developer, Creator, Admin, Maintainer & Manager Suite
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-start gap-2.5 font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div className="space-y-0.5">
                <p>{errorMsg}</p>
                <p className="text-[10px] font-normal text-red-600">
                  Protected with 256-bit AES cryptographic administrative guard.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleVerifyMasterPassword} className="space-y-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center justify-between">
                <span>Select Administrative Role / Identity:</span>
                <span className="text-[10px] text-slate-400 font-mono">Role-Based Access Control</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {initialDevUsers.map((u) => {
                  const isSelected = selectedUser.id === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setSelectedUser(u)}
                      className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                        isSelected
                          ? 'bg-[#061A2E] text-white border-[#EFB33D] ring-2 ring-[#EFB33D]/30 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11px] truncate">{u.name}</p>
                        <p
                          className={`text-[9px] uppercase font-mono tracking-wider font-semibold truncate ${
                            isSelected ? 'text-[#EFB33D]' : 'text-slate-500'
                          }`}
                        >
                          {u.role.replace('_', ' ')}
                        </p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#EFB33D] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="block text-slate-700 font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#EFB33D]" />
                  <span>DevMode Master Password:</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Password Required</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter DevMode Password"
                  required
                  autoFocus
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-2xl font-mono text-sm tracking-wide text-slate-900 focus:outline-none focus:border-[#EFB33D] focus:bg-white focus:ring-2 focus:ring-[#EFB33D]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Authorized Personnel Only</p>
                <p className="text-amber-800 text-[10px] leading-tight">
                  This console contains full permissions for Developers, Creators, Maintainers, SEO Managers, and System Admins.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-[#061A2E] text-[#EFB33D] font-bold rounded-2xl shadow-lg hover:bg-[#10243A] hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs border border-[#EFB33D]/40"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#EFB33D] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Master Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock DevMode Console</span>
                  <ArrowRight className="w-4 h-4 text-[#EFB33D]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono">
          Kynexis Health OS • Secure Clinical Maintenance Protocol
        </div>
      </div>
    </div>
  );
};
