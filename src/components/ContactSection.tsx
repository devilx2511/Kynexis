import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Car, Navigation, Send, CheckCircle2, Shield } from 'lucide-react';
import { ClinicLocation } from '../types';
import { specialtiesData } from '../data/clinicData';

interface ContactSectionProps {
  currentLocation: ClinicLocation;
  onChangeLocationClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLocation,
  onChangeLocationClick,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    specialty: 'internal-medicine',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 lg:py-24 bg-[#EEF2F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112233]/5 text-[#112233] text-xs font-semibold uppercase tracking-wider">
            Patient Inquiry & Location
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#112233]">
            Connect With <span className="font-medium text-[#D4AF37]">Kynexis Health {currentLocation.city}</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our patient care team is available by phone, secure inquiry form, or in-person at our central clinical suite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: NAP & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="premium-porcelain-card p-6 lg:p-8 space-y-6 border border-white/80">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="font-heading text-xl font-bold text-[#112233]">
                  {currentLocation.city} Clinic NAP
                </h3>
                <button
                  onClick={onChangeLocationClick}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline"
                >
                  Switch City
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#112233] text-[#D4AF37] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Clinic Address</p>
                  <p className="text-sm font-semibold text-[#112233] mt-0.5">{currentLocation.fullAddress}</p>
                  <p className="text-xs text-slate-500 mt-1">{currentLocation.landmark}</p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#112233] text-[#D4AF37] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Direct Appointments</p>
                  <a href={`tel:${currentLocation.phone}`} className="text-sm font-semibold text-[#112233] hover:text-[#D4AF37] mt-0.5 block">
                    {currentLocation.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Emergency Triage: {currentLocation.emergencyPhone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#112233] text-[#D4AF37] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Patient Inquiry Email</p>
                  <a href={`mailto:${currentLocation.email}`} className="text-sm font-semibold text-[#112233] hover:text-[#D4AF37] mt-0.5 block">
                    {currentLocation.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#112233] text-[#D4AF37] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Clinic Hours</p>
                  <p className="text-xs font-semibold text-[#112233] mt-1">Mon – Fri: {currentLocation.hoursWeekday}</p>
                  <p className="text-xs font-semibold text-[#112233]">Saturday: {currentLocation.hoursSaturday}</p>
                  <p className="text-xs text-slate-500">Sunday: {currentLocation.hoursSunday}</p>
                </div>
              </div>

              {/* Parking */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                <Car className="w-4 h-4 text-[#8A9A86] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-normal">{currentLocation.parkingInfo}</p>
              </div>

            </div>

            {/* Google Maps Visual Simulator Card */}
            <div className="premium-porcelain-card p-4 overflow-hidden border border-white/80 space-y-3">
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center">
                {/* Simulated Map Visual */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter brightness-95"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-[#112233]/20" />

                {/* Map Pin Badge */}
                <div className="relative z-10 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white flex items-center gap-2.5">
                  <div className="p-2 bg-[#112233] text-[#D4AF37] rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#112233]">Kynexis Health {currentLocation.city}</p>
                    <p className="text-[10px] text-slate-500">{currentLocation.fullAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Coordinates: {currentLocation.coordinates.lat}, {currentLocation.coordinates.lng}</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentLocation.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="premium-porcelain-card p-6 lg:p-8 border border-white/80">
              
              <h3 className="font-heading text-2xl font-bold text-[#112233] mb-2">
                Send a General Inquiry
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Have a question regarding clinical services, insurance coverage, or facility access? Submit your request below.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-[#8A9A86]/15 rounded-2xl border border-[#8A9A86]/40 text-center space-y-4 animate-fade-in">
                  <div className="p-3 bg-[#112233] text-[#D4AF37] w-fit mx-auto rounded-full">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-[#112233]">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-[#112233]">{formData.name}</strong>. A Kynexis Health patient care coordinator will contact you at <strong className="text-[#112233]">{formData.phone || formData.email}</strong> within 2 business hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-2 text-xs font-semibold bg-[#112233] text-white rounded-xl hover:bg-[#1a344d]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-full-name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone-number" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone-number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email-address" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email-address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-department" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Department of Interest
                      </label>
                      <select
                        id="contact-department"
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                      >
                        {specialtiesData.map((spec) => (
                          <option key={spec.id} value={spec.id}>
                            {spec.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-preferred-date" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Preferred Date (Optional)
                    </label>
                    <input
                      id="contact-preferred-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message-body" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Message / Question
                    </label>
                    <textarea
                      id="contact-message-body"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify how we can assist you..."
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  {/* Privacy Statement Notice */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#8A9A86] shrink-0 mt-0.5" />
                    <span>
                      <strong>Privacy Protection:</strong> Do not include sensitive medical records or diagnosis details in basic web form inquiries. For secure chart communication, please use the encrypted Patient Portal.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
