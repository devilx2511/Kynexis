import React, { useState } from 'react';
import { User, ShieldCheck, Lock, FileText, Send, Bell, Calendar, Download, CheckCircle2, MessageSquare, X, Eye, Shield, Printer } from 'lucide-react';
import { sampleHealthRecords, sampleNotifications, sampleEncryptedMessages, defaultLocation } from '../data/clinicData';
import { Appointment, ClinicLocation, EncryptedMessage, HealthRecord, NotificationItem } from '../types';
import { PrintableAppointmentSummary } from './PrintableAppointmentSummary';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  currentLocation?: ClinicLocation;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  appointments,
  currentLocation = defaultLocation,
}) => {
  const [activeTab, setActiveTab] = useState<'records' | 'messages' | 'notifications' | 'appointments'>('records');
  
  // Encrypted Chat State
  const [messages, setMessages] = useState<EncryptedMessage[]>(sampleEncryptedMessages);
  const [newMessageText, setNewMessageText] = useState('');

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

  // Selected Record View Modal
  const [viewingRecord, setViewingRecord] = useState<HealthRecord | null>(null);

  // Printable Appointment Summary Modal
  const [printingAppointment, setPrintingAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const userMsg: EncryptedMessage = {
      id: `MSG-${Date.now()}`,
      sender: 'patient',
      senderName: 'You (Patient Portal)',
      text: newMessageText.trim(),
      timestamp: 'Just now',
      isEncrypted: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessageText('');

    // Simulate Provider Response after 1.5s
    setTimeout(() => {
      const autoReply: EncryptedMessage = {
        id: `MSG-REPLY-${Date.now()}`,
        sender: 'provider',
        senderName: 'Dr. Evelyn Vance, MD',
        text: 'Message received and logged in your encrypted chart. I will review and follow up with you shortly.',
        timestamp: 'Just now',
        isEncrypted: true,
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1200);
  };

  const markAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/80 max-h-[92vh] flex flex-col">
        
        {/* Header with HIPAA Compliance Badge */}
        <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-bold">Kynexis Patient Portal</h3>
                <span className="px-2 py-0.5 rounded bg-[#8A9A86]/30 text-[#F3E5AB] text-[10px] font-bold border border-[#8A9A86]/50 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  HIPAA Compliant
                </span>
              </div>
              <p className="text-xs text-slate-300">Encrypted Patient Dashboard & Provider Communication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('records')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'records'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Health Records ({sampleHealthRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#8A9A86]" />
            <span>Encrypted Provider Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'notifications'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Alerts</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#112233] text-[9px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>My Visits ({appointments.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 max-h-[65vh]">
          
          {/* TAB 1: HEALTH RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#112233]">
                    Protected Health Information (PHI)
                  </h4>
                  <p className="text-xs text-slate-500">
                    256-Bit SSL Encrypted Storage • Authorized Patient Access Only
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {sampleHealthRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D4AF37] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-[#112233] text-[#D4AF37] shrink-0 mt-1">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                            {rec.category}
                          </span>
                          <span className="text-xs text-slate-400">• {rec.date}</span>
                        </div>
                        <h5 className="font-bold text-sm text-[#112233] mt-1">{rec.title}</h5>
                        <p className="text-xs text-slate-500">Ordering Physician: {rec.doctorName}</p>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">{rec.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => setViewingRecord(rec)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#112233] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8A9A86]" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => alert(`Simulated secure PDF download of ${rec.title}`)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#112233] bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-lg hover:bg-[#D4AF37]/30 flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ENCRYPTED PROVIDER CHAT */}
          {activeTab === 'messages' && (
            <div className="space-y-4 flex flex-col h-[50vh]">
              {/* Security Shield Banner */}
              <div className="p-3 bg-[#112233] text-white rounded-xl text-xs flex items-center justify-between shrink-0">
                <span className="flex items-center gap-2 text-slate-200">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  End-to-End Encrypted Channel with Dr. Evelyn Vance, MD
                </span>
                <span className="text-[10px] text-[#8A9A86] font-mono font-bold">HIPAA SECURE</span>
              </div>

              {/* Chat Messages Window */}
              <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                {messages.map((msg) => {
                  const isPatient = msg.sender === 'patient';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-sm ${
                          isPatient
                            ? 'bg-[#112233] text-white rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 pb-1 border-b border-current/10">
                          <span className="font-bold">{msg.senderName}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed pt-1">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Type an encrypted message to your physician..."
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newMessageText.trim()}
                  className="px-5 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-lg font-bold text-[#112233]">
                  Real-time Portal Notifications
                </h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotifsRead}
                    className="text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    Mark All as Read
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      notif.read ? 'bg-slate-50 border-slate-200' : 'bg-[#D4AF37]/10 border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#112233] text-[#D4AF37] shrink-0 mt-0.5">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#112233]">{notif.title}</h5>
                        <p className="text-xs text-slate-600 mt-0.5">{notif.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MY VISITS & APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-lg font-bold text-[#112233]">
                  Upcoming & Historic Consultations
                </h4>
                <p className="text-xs text-slate-500">
                  Select an appointment to print or save your voucher
                </p>
              </div>

              {appointments.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600">No appointments scheduled yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-slate-500">{app.id}</span>
                          <span className="px-2 py-0.5 rounded bg-[#112233] text-white text-[10px] font-bold">
                            {app.status}
                          </span>
                        </div>
                        <p className="font-bold text-sm text-[#112233] mt-1">{app.specialtyId.toUpperCase()} Consultation</p>
                        <p className="text-slate-500 mt-0.5">{app.date} at {app.timeSlot}</p>
                        {app.reason && <p className="text-slate-600 text-[11px] mt-1 italic">"{app.reason}"</p>}
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="text-right hidden sm:block">
                          <p className="font-semibold text-[#112233]">{app.patientName}</p>
                          <span className="text-[10px] text-[#8A9A86] font-bold">Confirmed</span>
                        </div>

                        <button
                          onClick={() => setPrintingAppointment(app)}
                          className="px-3.5 py-2 bg-[#112233] hover:bg-[#1a344d] text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Print Summary</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#8A9A86]" />
            Session encrypted under HIPAA Privacy Rule 45 CFR § 164.312
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-[#112233] hover:text-[#D4AF37]"
          >
            Close Dashboard
          </button>
        </div>

      </div>

      {/* Printable Appointment Summary Modal */}
      {printingAppointment && (
        <PrintableAppointmentSummary
          appointment={printingAppointment}
          currentLocation={currentLocation}
          onClose={() => setPrintingAppointment(null)}
        />
      )}


      {/* Record Inspection Modal */}
      {viewingRecord && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-heading font-bold text-base text-[#112233]">{viewingRecord.title}</h4>
              <button onClick={() => setViewingRecord(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Category:</strong> {viewingRecord.category}</p>
              <p><strong>Date:</strong> {viewingRecord.date}</p>
              <p><strong>Physician:</strong> {viewingRecord.doctorName}</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-2">
                <p className="font-bold mb-1">Clinical Summary:</p>
                <p className="text-slate-600 leading-relaxed">{viewingRecord.summary}</p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingRecord(null)}
                className="px-4 py-2 bg-[#112233] text-white text-xs font-bold rounded-xl"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
