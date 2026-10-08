import React, { useState } from 'react';
import { initialDevUsers, initialAuditLogs } from '../../../data/devmodeData';
import { DevUser, AuditLogItem, DevRole } from '../../../types';
import {
  ShieldCheck,
  Users,
  KeyRound,
  Lock,
  Clock,
  UserCheck,
  AlertTriangle,
  FileText,
  Search,
  Check,
  X,
} from 'lucide-react';

interface SecurityCenterTabProps {
  currentRole: DevRole;
}

export const SecurityCenterTab: React.FC<SecurityCenterTabProps> = ({ currentRole }) => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'matrix' | 'audit'>('users');
  const [users, setUsers] = useState<DevUser[]>(initialDevUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);

  const matrixRoles: DevRole[] = [
    'founder',
    'super_admin',
    'developer',
    'seo_manager',
    'maintenance',
    'reception',
    'content_editor',
  ];

  const permissions = [
    { module: 'Executive Dashboard & Financials', founder: true, super_admin: true, developer: false, seo_manager: false, maintenance: false, reception: false, content_editor: false },
    { module: 'Website Content & Visual Builder', founder: true, super_admin: true, developer: true, seo_manager: false, maintenance: true, reception: false, content_editor: true },
    { module: 'Doctor Profiles & Qualifications', founder: true, super_admin: true, developer: true, seo_manager: false, maintenance: true, reception: true, content_editor: false },
    { module: 'Patient Appointments & Schedule', founder: true, super_admin: true, developer: false, seo_manager: false, maintenance: false, reception: true, content_editor: false },
    { module: 'SEO Metadata & Local Schema', founder: true, super_admin: true, developer: true, seo_manager: true, maintenance: false, reception: false, content_editor: false },
    { module: 'Developer Tools & Deployment', founder: true, super_admin: false, developer: true, seo_manager: false, maintenance: false, reception: false, content_editor: false },
    { module: 'Security Users & Audit Logs', founder: true, super_admin: true, developer: false, seo_manager: false, maintenance: false, reception: false, content_editor: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Top Header */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#061A2E] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#EFB33D]" />
            <span>Security Center, User Roles & Audit Logs</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Granular Role-Based Access Control (RBAC), session management, and immutable audit trailing.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'users'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'matrix'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Permission Matrix
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === 'audit'
                ? 'bg-[#061A2E] text-[#EFB33D] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Immutable Audit Trail
          </button>
        </div>
      </div>

      {/* Sub Tab: User Management */}
      {activeSubTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#061A2E] text-white uppercase text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">MFA Status</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#061A2E] font-bold uppercase text-[10px]">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.mfaEnabled ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 2FA Active
                      </span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Disabled</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500 font-mono">{u.lastLogin}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sub Tab: Permission Matrix */}
      {activeSubTab === 'matrix' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto text-xs p-4">
          <table className="w-full text-left">
            <thead className="bg-[#061A2E] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Module</th>
                {matrixRoles.map((r) => (
                  <th key={r} className="p-3 text-center capitalize">
                    {r.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{p.module}</td>
                  {matrixRoles.map((r) => {
                    const allowed = (p as any)[r];
                    return (
                      <td key={r} className="p-3 text-center">
                        {allowed ? (
                          <span className="inline-flex p-1 bg-emerald-100 text-emerald-800 rounded-full">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex p-1 bg-slate-100 text-slate-400 rounded-full">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sub Tab: Audit Logs */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left font-mono">
            <thead className="bg-[#061A2E] text-white uppercase text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User & Role</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Object</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-4 text-slate-400">{log.timestamp}</td>
                  <td className="p-4 font-sans">
                    <p className="font-bold text-slate-800">{log.userName}</p>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{log.userRole}</span>
                  </td>
                  <td className="p-4 font-bold text-[#061A2E] font-sans">{log.action}</td>
                  <td className="p-4 text-slate-600">{log.targetObject}</td>
                  <td className="p-4 text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
