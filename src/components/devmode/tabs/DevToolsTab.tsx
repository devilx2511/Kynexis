import React, { useState } from 'react';
import { initialErrorLogs, initialFeatureFlags, initialDeploymentHistory } from '../../../data/devmodeData';
import { ErrorLogItem, FeatureFlag, DeploymentVersion } from '../../../types';
import {
  Server,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RotateCcw,
  ToggleLeft,
  ToggleRight,
  Terminal,
  Activity,
  Layers,
  ShieldAlert,
  HardDrive,
  RefreshCw,
} from 'lucide-react';

export const DevToolsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'errors' | 'flags' | 'deployments' | 'health'>('errors');
  const [errorLogs, setErrorLogs] = useState<ErrorLogItem[]>(initialErrorLogs);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(initialFeatureFlags);
  const [deployments, setDeployments] = useState<DeploymentVersion[]>(initialDeploymentHistory);

  const toggleFlag = (id: string) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const resolveError = (id: string) => {
    setErrorLogs((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'Resolved' } : e))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Top Header */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <Server className="w-5 h-5 text-[#EFB33D]" />
            <span>Developer Console, Error Diagnostics & Deployments</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor API latencies, feature flag toggles, Cloud Run application container deployments and system errors.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('errors')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'errors'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Error Logs ({errorLogs.filter((e) => e.status !== 'Resolved').length})
          </button>
          <button
            onClick={() => setActiveSubTab('flags')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'flags'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Feature Flags
          </button>
          <button
            onClick={() => setActiveSubTab('deployments')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'deployments'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Deployment History
          </button>
        </div>
      </div>

      {/* Sub Tab: Error Logs */}
      {activeSubTab === 'errors' && (
        <div className="space-y-4">
          {errorLogs.map((err) => (
            <div
              key={err.id}
              className={`p-5 rounded-3xl border shadow-sm space-y-3 ${
                err.severity === 'high' || err.severity === 'fatal'
                  ? 'bg-red-50/50 border-red-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px]">
                    {err.type}
                  </span>
                  <span className="font-mono text-slate-500">{err.path}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">{err.timestamp}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      err.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {err.status}
                  </span>
                </div>
              </div>

              <p className="text-xs font-bold text-slate-800">{err.message}</p>

              {err.stackTrace && (
                <pre className="p-3 bg-slate-900 text-slate-300 rounded-2xl text-[10px] font-mono overflow-x-auto">
                  {err.stackTrace}
                </pre>
              )}

              <div className="flex items-center justify-between pt-2 border-t text-[11px] text-slate-500">
                <span>Client: {err.device}</span>
                {err.status !== 'Resolved' && (
                  <button
                    onClick={() => resolveError(err.id)}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub Tab: Feature Flags */}
      {activeSubTab === 'flags' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <div className="divide-y divide-slate-100">
            {featureFlags.map((flag) => (
              <div key={flag.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#061A2E]">{flag.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                      {flag.key}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs">{flag.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">{flag.environment}</span>
                  <button
                    onClick={() => toggleFlag(flag.id)}
                    className="p-1 text-[#061A2E] hover:scale-105 transition-transform"
                  >
                    {flag.enabled ? (
                      <ToggleRight className="w-9 h-9 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Tab: Deployments */}
      {activeSubTab === 'deployments' && (
        <div className="space-y-4">
          {deployments.map((dep) => (
            <div key={dep.id} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#061A2E]">{dep.version}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-600 text-[10px]">
                    #{dep.commitHash}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                    {dep.environment}
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{dep.deployedAt}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <p className="font-bold text-slate-700">Deployment Changelog:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {dep.changelog.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Deployed by: <strong className="text-slate-800">{dep.deployedBy}</strong></span>
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>Rollback to this version</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
