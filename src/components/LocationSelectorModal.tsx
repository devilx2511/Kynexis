import React, { useState } from 'react';
import { MapPin, Check, X, Phone, Clock, Navigation } from 'lucide-react';
import { ClinicLocation } from '../types';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: ClinicLocation;
  onSelectLocation: (loc: ClinicLocation) => void;
}

const PRESET_CITIES: ClinicLocation[] = [
  {
    city: 'Kolkata',
    state: 'West Bengal',
    zip: '700157',
    fullAddress: 'Kolupukur, Kolkata, West Bengal, India, Kolkata 700157',
    phone: '+91 (033) 2555-0199',
    emergencyPhone: '+91 (033) 2555-0100',
    email: 'care.kolkata@kynexishealth.com',
    hoursWeekday: '8:00 AM – 8:00 PM',
    hoursSaturday: '9:00 AM – 5:00 PM',
    hoursSunday: '10:00 AM – 2:00 PM',
    coordinates: { lat: 22.628, lng: 88.435 },
    landmark: 'Kolupukur Hub, Near VIP Road & New Town Expressway',
    parkingInfo: 'Dedicated subterranean patient parking & valet service available at Kolupukur entrance.'
  },
  {
    city: 'Chicago',
    state: 'IL',
    zip: '60611',
    fullAddress: '676 N Michigan Avenue, Suite 1800, Chicago, IL 60611',
    phone: '+1 (312) 555-0199',
    emergencyPhone: '+1 (312) 555-0100',
    email: 'chicago@kynexishealth.com',
    hoursWeekday: '8:00 AM – 7:00 PM',
    hoursSaturday: '9:00 AM – 3:00 PM',
    hoursSunday: '10:00 AM – 1:00 PM',
    coordinates: { lat: 41.8947, lng: -87.6242 },
    landmark: 'Near Water Tower Place & Northwestern Memorial District',
    parkingInfo: 'Valet parking available at North Entrance. Garage with elevator to Suite 1800.'
  },
  {
    city: 'New York',
    state: 'NY',
    zip: '10022',
    fullAddress: '425 Park Avenue, 14th Floor, New York, NY 10022',
    phone: '+1 (212) 555-0188',
    emergencyPhone: '+1 (212) 555-0100',
    email: 'ny@kynexishealth.com',
    hoursWeekday: '7:30 AM – 7:30 PM',
    hoursSaturday: '9:00 AM – 4:00 PM',
    hoursSunday: 'Closed',
    coordinates: { lat: 40.7608, lng: -73.9712 },
    landmark: 'Between 55th & 56th Street in Midtown East',
    parkingInfo: 'Dedicated patient parking garage adjacent at 430 E 56th St.'
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    zip: '90210',
    fullAddress: '9730 Wilshire Blvd, Suite 600, Beverly Hills, CA 90210',
    phone: '+1 (310) 555-0177',
    emergencyPhone: '+1 (310) 555-0100',
    email: 'la@kynexishealth.com',
    hoursWeekday: '8:00 AM – 6:00 PM',
    hoursSaturday: '9:00 AM – 2:00 PM',
    hoursSunday: 'Closed',
    coordinates: { lat: 34.0673, lng: -118.4011 },
    landmark: 'Wilshire Medical Center near Bedford Drive',
    parkingInfo: 'Underground subterranean parking with validated patient rate.'
  },
  {
    city: 'Miami',
    state: 'FL',
    zip: '33131',
    fullAddress: '801 Brickell Avenue, Suite 2200, Miami, FL 33131',
    phone: '+1 (305) 555-0166',
    emergencyPhone: '+1 (305) 555-0100',
    email: 'miami@kynexishealth.com',
    hoursWeekday: '8:00 AM – 6:30 PM',
    hoursSaturday: '9:00 AM – 2:00 PM',
    hoursSunday: 'Closed',
    coordinates: { lat: 25.7654, lng: -80.1918 },
    landmark: 'Brickell Financial District near Brickell City Centre',
    parkingInfo: 'On-site covered parking with dedicated medical visitor spots.'
  }
];

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation
}) => {
  const [customCity, setCustomCity] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCity.trim()) return;
    
    const newLoc: ClinicLocation = {
      city: customCity.trim(),
      state: 'US',
      zip: '00000',
      fullAddress: `100 Medical Center Plaza, ${customCity.trim()}, US`,
      phone: '+1 (800) 555-KYNEXIS',
      emergencyPhone: '+1 (800) 555-0100',
      email: `care.${customCity.toLowerCase().replace(/\s+/g, '')}@kynexishealth.com`,
      hoursWeekday: '8:00 AM – 7:00 PM',
      hoursSaturday: '9:00 AM – 3:00 PM',
      hoursSunday: '10:00 AM – 1:00 PM',
      coordinates: { lat: 40.0, lng: -95.0 },
      landmark: `Primary Medical District, ${customCity.trim()}`,
      parkingInfo: 'Dedicated medical facility parking structure.'
    };

    onSelectLocation(newLoc);
    setCustomCity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112233]/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/80">
        {/* Header */}
        <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold">Select Clinic Location</h3>
              <p className="text-xs text-slate-300">Choose your nearest Kynexis Health medical center</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Preset Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESET_CITIES.map((loc) => {
              const isSelected = currentLocation.city.toLowerCase() === loc.city.toLowerCase();
              return (
                <button
                  key={loc.city}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`p-4 text-left rounded-xl border transition-all duration-200 relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-3 right-3 p-1 rounded-full bg-[#D4AF37] text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-lg font-bold text-[#112233]">
                        {loc.city}, {loc.state}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{loc.fullAddress}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#D4AF37]" />
                      {loc.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8A9A86]" />
                      Mon-Fri 8-7
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom City Input */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Or Enter Custom City / Region for Local SEO Strategy
            </label>
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Navigation className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="e.g. Dallas, TX or London, UK"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!customCity.trim()}
                className="px-5 py-2.5 bg-[#112233] text-white text-sm font-medium rounded-xl hover:bg-[#1a344d] transition-colors disabled:opacity-50"
              >
                Apply Location
              </button>
            </form>
            <p className="text-[11px] text-slate-500 mt-2">
              Switching location updates website NAP, Google Business Profile schema, and local contact details seamlessly across all pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
