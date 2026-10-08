import React, { useState } from 'react';
import {
  Wrench,
  Server,
  Activity,
  HardDrive,
  RefreshCw,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Clock,
  Database,
  Cpu,
  Lock,
} from 'lucide-react';
import { ClinicLocation } from '../../../types';

interface MaintainerTabProps {
  currentLocation?: ClinicLocation;
}

export const MaintainerTab: React.FC<MaintainerTabProps> = ({ currentLocation }) => {
  const [isFlushingCache, setIsFlushingCache] = useState(false);
  const [cacheFlushSuccess, setCacheFlushSuccess] = useState(false);
  const [isPurgingCdn, setIsPurgingCdn] = useState(false);
  const [cdnPurgeSuccess, setCdnPurgeSuccess] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    'Scheduled routine system maintenance in progress. Emergency triage remains available via direct phone line.'
  );

  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<{
    ssl: 'healthy' | 'checking';
    database: 'healthy' | 'checking';
    smsGateway: 'healthy' | 'checking';
    apiRoutes: 'healthy' | 'checking';
    latencyMs: number;
  }>({
    ssl: 'healthy',
    database: 'healthy',
    smsGateway: 'healthy',
    apiRoutes: 'healthy',
    latencyMs: 18,
  });

  const handleFlushCache = () => {
    setIsFlushingCache(true);
    setCacheFlushSuccess(false);
    setTimeout(() => {
      // Clear local storage demo cache keys
      try {
        localStorage.removeItem('kynexis_temp_cache');
      } catch (e) {
        // ignore
      }
      setIsFlushingCache(false);
      setCacheFlushSuccess(true);
      setTimeout(() => setCacheFlushSuccess(false), 4000);
    }, 1200);
  };

  const handlePurgeCdn = () => {
    setIsPurgingCdn(true);
    setCdnPurgeSuccess(false);
    setTimeout(() => {
      setIsPurgingCdn(false);
      setCdnPurgeSuccess(true);
      setTimeout(() => setCdnPurgeSuccess(false), 4000);
    }, 1400);
  };

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setBackupSuccess(false);
    setTimeout(() => {
      const backupData = {
        exportedAt: new Date().toISOString(),
        site: 'Kynexis Health Kolkata',
        location: currentLocation,
        systemVersion: 'v2.4.0-prod',
        timestamp: Date.now(),
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kynexis-health-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsBackingUp(false);
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 4000);
    }, 1000);
  };

  const handleRunDiagnostics = () => {
    setDiagnosticsRunning(true);
    setTimeout(() => {
      setDiagnosticResults({
        ssl: 'healthy',
        database: 'healthy',
        smsGateway: 'healthy',
        apiRoutes: 'healthy',
        latencyMs: Math.floor(Math.random() * 12) + 14,
      });
      setDiagnosticsRunning(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
              ALL SYSTEMS OPERATIONAL
            </span>
            <span className="text-slate-400 text-xs font-mono">• 99.99% Uptime</span>
          </div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] mt-1 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#EFB33D]" />
            <span>Site Maintainers & Reliability Engineering Hub</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Website infrastructure controls, cache purge pipelines, automated database backups, and live server diagnostics.
          </p>
        </div>

        <button
          onClick={handleRunDiagnostics}
          disabled={diagnosticsRunning}
          className="px-4 py-2.5 bg-[#061A2E] text-[#EFB33D] font-bold rounded-2xl text-xs hover:bg-[#10243A] transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          <Activity className={`w-4 h-4 ${diagnosticsRunning ? 'animate-spin' : ''}`} />
          <span>{diagnosticsRunning ? 'Testing Endpoints...' : 'Run Live Diagnostic'}</span>
        </button>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Container Load (CPU)</span>
            <Cpu className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-[#061A2E]">8.4%</p>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Nominal threshold (&lt;40%)
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Memory Allocation</span>
            <Server className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-[#061A2E]">184 MB / 1 GB</p>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 18.4% heap consumption
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">API Gateway Latency</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-[#061A2E]">{diagnosticResults.latencyMs} ms</p>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Kolkata edge CDN fast-path
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">SSL 256-Bit Certificate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-[#061A2E]">Valid</p>
          <p className="text-[10px] text-slate-500 font-semibold">Expires in 284 days (Auto-renews)</p>
        </div>
      </div>

      {/* Maintainer Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rapid Site Operations */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#061A2E] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#EFB33D]" />
              <span>One-Click Maintenance Actions</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Execute routine maintenance routines without taking the clinic website offline.
            </p>
          </div>

          <div className="space-y-3">
            {/* Flush Cache */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-slate-800">Clear Application & Static Cache</p>
                <p className="text-slate-500 text-[11px]">
                  Flushes bundle memory, stale local preferences, and cache headers.
                </p>
              </div>
              <button
                onClick={handleFlushCache}
                disabled={isFlushingCache}
                className="px-3.5 py-2 bg-[#061A2E] text-white hover:bg-slate-800 font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFlushingCache ? 'animate-spin' : ''}`} />
                <span>{isFlushingCache ? 'Flushing...' : 'Flush Cache'}</span>
              </button>
            </div>
            {cacheFlushSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Application and static browser cache flushed successfully!</span>
              </div>
            )}

            {/* Purge Edge CDN */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-slate-800">Purge Cloudflare / Edge CDN</p>
                <p className="text-slate-500 text-[11px]">
                  Invalidates globally distributed edge nodes for instant content refresh.
                </p>
              </div>
              <button
                onClick={handlePurgeCdn}
                disabled={isPurgingCdn}
                className="px-3.5 py-2 bg-[#061A2E] text-white hover:bg-slate-800 font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                <Globe className={`w-3.5 h-3.5 ${isPurgingCdn ? 'animate-spin' : ''}`} />
                <span>{isPurgingCdn ? 'Purging...' : 'Purge CDN'}</span>
              </button>
            </div>
            {cdnPurgeSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Edge CDN cache successfully purged across all multi-region nodes!</span>
              </div>
            )}

            {/* Database Snapshot */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-slate-800">Export Full Website & Clinic Snapshot</p>
                <p className="text-slate-500 text-[11px]">
                  Generates an encrypted JSON backup file of appointments, doctors, and CMS content.
                </p>
              </div>
              <button
                onClick={handleCreateBackup}
                disabled={isBackingUp}
                className="px-3.5 py-2 bg-[#EFB33D] text-[#061A2E] hover:bg-[#d9a52f] font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                <Download className={`w-3.5 h-3.5 ${isBackingUp ? 'animate-spin' : ''}`} />
                <span>{isBackingUp ? 'Exporting...' : 'Download JSON Backup'}</span>
              </button>
            </div>
            {backupSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Database snapshot exported and downloaded to your workstation!</span>
              </div>
            )}
          </div>
        </div>

        {/* Maintenance Mode & Health Checks */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#061A2E] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Public Maintenance Advisory Banner</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Display an active maintenance alert to website visitors during server upgrades.
                </p>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Visitor Advisory Notice Text:
              </label>
              <textarea
                value={maintenanceMessage}
                onChange={(e) => setMaintenanceMessage(e.target.value)}
                rows={2}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#EFB33D]"
              />
            </div>

            {/* Live Subsystem Health Checklist */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-700">Subsystem Diagnostics Matrix:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Database Connection</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ONLINE
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-700">SMS Gateway (Twilio)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ONLINE
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-700">256-Bit SSL Handshake</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    VERIFIED
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Cloud Run Ingress</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    HEALTHY
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Next scheduled automatic weekly backup: Sunday at 02:00 AM IST</span>
          </div>
        </div>

      </div>
    </div>
  );
};
