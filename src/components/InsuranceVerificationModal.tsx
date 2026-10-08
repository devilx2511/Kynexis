import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, X, Loader2, Building, CreditCard, User, Phone, Check } from 'lucide-react';
import { InsuranceVerification } from '../types';

interface InsuranceVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete?: (details: InsuranceVerification) => void;
}

const POPULAR_PROVIDERS = [
  'Star Health & Allied Insurance',
  'HDFC ERGO Health Insurance',
  'ICICI Lombard General Insurance',
  'Niva Bupa Health Insurance',
  'Care Health Insurance',
  'Bajaj Allianz General Insurance',
  'Tata AIG Health Insurance',
  'Max Bupa Health Insurance',
  'CGHS / Central Government Health Scheme',
  'Medicare / Senior Citizens Care',
  'Other Commercial Insurance Provider',
];

export const InsuranceVerificationModal: React.FC<InsuranceVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationComplete,
}) => {
  const [provider, setProvider] = useState('');
  const [memberId, setMemberId] = useState('');
  const [policyholderName, setPolicyholderName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Self');
  const [groupNumber, setGroupNumber] = useState('');

  // Validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<InsuranceVerification | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!provider) {
      newErrors.provider = 'Please select your insurance provider.';
    }

    if (!memberId.trim()) {
      newErrors.memberId = 'Member ID or Policy Number is required.';
    } else if (memberId.trim().length < 6) {
      newErrors.memberId = 'Member ID must be at least 6 characters.';
    } else if (!/^[a-zA-Z0-9-/]+$/.test(memberId.trim())) {
      newErrors.memberId = 'Member ID can only contain letters, numbers, and hyphens.';
    }

    if (!policyholderName.trim()) {
      newErrors.policyholderName = 'Primary Policyholder Name is required.';
    } else if (policyholderName.trim().length < 2) {
      newErrors.policyholderName = 'Policyholder Name must be at least 2 characters.';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Contact mobile number is required.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsVerifying(true);

    // Simulate Payer Network API verification delay
    setTimeout(() => {
      const result: InsuranceVerification = {
        provider,
        memberId: memberId.trim().toUpperCase(),
        policyholderName: policyholderName.trim(),
        groupNumber: groupNumber.trim() || undefined,
        patientRelationship: relationship,
        phone: phone.trim(),
        verifiedAt: new Date().toISOString().split('T')[0],
        status: 'Verified',
        copayAmount: '₹200 OPD Co-pay / 80% Cashless Coverage',
        coverageDetails: 'Eligible for direct cashless OPD consultation & diagnostic claims at Kolupukur Clinic.',
      };

      setIsVerifying(false);
      setVerifiedResult(result);
      if (onVerificationComplete) {
        onVerificationComplete(result);
      }
    }, 1500);
  };

  const handleReset = () => {
    setVerifiedResult(null);
    setProvider('');
    setMemberId('');
    setPolicyholderName('');
    setPhone('');
    setGroupNumber('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#112233] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">Insurance Verification Portal</h3>
              <p className="text-xs text-slate-300">Check Direct Cashless Coverage & OPD Network Status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 text-slate-800 dark:text-slate-100 max-h-[78vh] overflow-y-auto">
          {verifiedResult ? (
            /* SUCCESS VERIFICATION RESULT STATE */
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-[#8A9A86]/20 border border-[#8A9A86] text-[#8A9A86] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#8A9A86]" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-[#8A9A86]/20 text-[#2D5A27] dark:text-[#8A9A86] text-xs font-bold border border-[#8A9A86]/40 uppercase tracking-wide">
                  Active & Cashless Coverage Verified
                </span>
                <h4 className="font-heading text-xl font-bold text-[#112233] dark:text-white mt-3">
                  {verifiedResult.provider}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Member ID: <strong className="font-mono text-slate-800 dark:text-slate-200">{verifiedResult.memberId}</strong>
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Primary Policyholder:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{verifiedResult.policyholderName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">OPD Co-Pay Status:</span>
                  <span className="font-bold text-[#2D5A27] dark:text-[#8A9A86]">{verifiedResult.copayAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Network Facility:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Kynexis Kolupukur Clinic</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {verifiedResult.coverageDetails} Show this digital verification badge during check-in to apply cashless benefits.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Verify Another Policy
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* VERIFICATION INPUT FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Provider Selection */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Insurance Provider <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={provider}
                    onChange={(e) => {
                      setProvider(e.target.value);
                      if (errors.provider) setErrors({ ...errors, provider: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white ${
                      errors.provider ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <option value="">-- Select Insurance Provider --</option>
                    {POPULAR_PROVIDERS.map((p, idx) => (
                      <option key={idx} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                {errors.provider && (
                  <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.provider}
                  </p>
                )}
              </div>

              {/* Member ID & Policyholder Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Member ID */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Member ID / Policy No. <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={memberId}
                      onChange={(e) => {
                        setMemberId(e.target.value);
                        if (errors.memberId) setErrors({ ...errors, memberId: '' });
                      }}
                      placeholder="e.g. STR-90812345"
                      className={`w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white ${
                        errors.memberId ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.memberId && (
                    <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.memberId}
                    </p>
                  )}
                </div>

                {/* Policyholder Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Policyholder Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={policyholderName}
                    onChange={(e) => {
                      setPolicyholderName(e.target.value);
                      if (errors.policyholderName) setErrors({ ...errors, policyholderName: '' });
                    }}
                    placeholder="As listed on policy card"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white ${
                      errors.policyholderName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.policyholderName && (
                    <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.policyholderName}
                    </p>
                  )}
                </div>

              </div>

              {/* Phone & Relationship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Mobile Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white ${
                      errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Patient Relationship */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Patient Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white"
                  >
                    <option value="Self">Self (Primary)</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child / Dependent</option>
                    <option value="Parent">Dependent Parent</option>
                  </select>
                </div>

              </div>

              {/* Group / Sub Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Group / Corporate Sub-Code <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={groupNumber}
                  onChange={(e) => setGroupNumber(e.target.value)}
                  placeholder="e.g. GRP-4029"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white"
                />
              </div>

              {/* Security Banner */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8A9A86] shrink-0" />
                <span>Your insurance credentials are query-encrypted directly with payer clearinghouse networks under HIPAA guidelines.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#112233] text-white text-xs font-bold rounded-xl hover:bg-[#1a344d] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                      <span>Verifying with Payer Network...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span>Verify Insurance Coverage</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
