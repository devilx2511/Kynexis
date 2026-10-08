import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, Shield, Clock, FileText, Check, ThumbsUp, ArrowRight } from 'lucide-react';
import { ClinicLocation } from '../types';

interface FaqAccordionProps {
  currentLocation: ClinicLocation;
  onOpenInsuranceVerification?: () => void;
  onOpenBookModal?: () => void;
  onOpenPortalModal?: () => void;
}

interface FaqItem {
  id: string;
  category: 'policies' | 'billing' | 'hours';
  categoryLabel: string;
  question: string;
  answer: string;
  actionText?: string;
  actionType?: 'insurance' | 'book' | 'portal';
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  currentLocation,
  onOpenInsuranceVerification,
  onOpenBookModal,
  onOpenPortalModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'policies' | 'billing' | 'hours'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1', 'faq-3']); // Default first & billing open
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: string]: boolean }>({});

  const faqData: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'policies',
      categoryLabel: 'Clinic Policies',
      question: 'How do I prepare for my first appointment at Kynexis Health?',
      answer: `Please arrive 15 minutes prior to your scheduled time at our ${currentLocation.city} clinic. Bring a government-issued photo ID (Aadhaar / Voter ID / Passport), active health insurance card, a list of your current prescription medications, and any recent lab reports or medical imaging disks.`,
      actionText: 'Book Initial Appointment',
      actionType: 'book',
    },
    {
      id: 'faq-2',
      category: 'policies',
      categoryLabel: 'Clinic Policies',
      question: 'What is the appointment cancellation and rescheduling policy?',
      answer: 'We kindly request at least 24 hours notice for any appointment cancellations or rescheduling. This allows our clinical triage team to offer open slots to urgent outpatient cases. You can modify your appointment 24/7 directly through your encrypted Patient Portal.',
      actionText: 'Manage via Portal',
      actionType: 'portal',
    },
    {
      id: 'faq-3',
      category: 'billing',
      categoryLabel: 'Billing & Insurance',
      question: 'Does Kynexis Health accept health insurance and cashless claims?',
      answer: `Yes, Kynexis Health participates with major commercial health insurance networks (Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Care Health, etc.) and government schemes. We offer direct cashless OPD billing for verified members at our ${currentLocation.city} facility.`,
      actionText: 'Verify Insurance Coverage',
      actionType: 'insurance',
    },
    {
      id: 'faq-4',
      category: 'billing',
      categoryLabel: 'Billing & Insurance',
      question: 'How are consultation fees and diagnostic tests itemized?',
      answer: 'Kynexis Health follows a transparent pricing model. Before any diagnostic imaging, blood panel, or procedure is performed, you will receive an itemized cost estimate. Payment options include Cash, Credit/Debit Cards, UPI, and direct cashless insurance authorization.',
    },
    {
      id: 'faq-5',
      category: 'hours',
      categoryLabel: 'Office Hours & Location',
      question: 'What are the operating hours and location of the clinic?',
      answer: `Our clinic is located at ${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state} ${currentLocation.zip}. Regular outpatient consultation hours are Monday to Friday from ${currentLocation.hoursWeekday}, and Saturday from ${currentLocation.hoursSaturday}. We are closed on Sunday.`,
    },
    {
      id: 'faq-6',
      category: 'hours',
      categoryLabel: 'Office Hours & Location',
      question: 'Is parking and valet service available at the clinic?',
      answer: `${currentLocation.parkingInfo} Complimentary valet service is stationed directly at the main entrance for elderly and mobility-assisted patients.`,
    },
    {
      id: 'faq-7',
      category: 'hours',
      categoryLabel: 'Office Hours & Location',
      question: 'What should I do in case of an after-hours medical emergency?',
      answer: `For life-threatening medical emergencies, please call emergency services (102 / 108 / 112) or go to the nearest emergency hospital immediately. For urgent clinical inquiries regarding ongoing treatments outside office hours, active patients can call our emergency line at ${currentLocation.phone}.`,
    },
    {
      id: 'faq-8',
      category: 'policies',
      categoryLabel: 'Clinic Policies',
      question: 'How quickly will my lab results and imaging reports be available?',
      answer: 'Most standard blood panels and digital X-rays are processed and verified within 24 hours. Reports are immediately uploaded to your HIPAA-encrypted Kynexis Patient Portal, where you can view or download official PDF summaries.',
      actionText: 'Access Portal Lab Reports',
      actionType: 'portal',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleVote = (id: string) => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }));
  };

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by keyword (e.g. insurance, parking, hours)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none dark:text-white shadow-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            All Questions ({faqData.length})
          </button>

          <button
            onClick={() => setSelectedCategory('policies')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'policies'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Clinic Policies</span>
          </button>

          <button
            onClick={() => setSelectedCategory('billing')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'billing'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#8A9A86]" />
            <span>Billing & Insurance</span>
          </button>

          <button
            onClick={() => setSelectedCategory('hours')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'hours'
                ? 'bg-[#112233] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Hours & Location</span>
          </button>
        </div>

      </div>

      {/* Accordion Items List */}
      {filteredFaqs.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 dark:text-slate-400">No questions found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold text-[#D4AF37] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqIds.includes(faq.id);
            const isVoted = helpfulVotes[faq.id];

            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden transition-all duration-200 shadow-xs"
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[#112233] dark:text-[#D4AF37] text-[10px] font-bold uppercase shrink-0 mt-0.5">
                      {faq.categoryLabel}
                    </span>
                    <h4 className="font-bold text-sm text-[#112233] dark:text-white leading-snug">
                      {faq.question}
                    </h4>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#112233] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 space-y-3 border-t border-slate-100 dark:border-slate-700/60 animate-fade-in">
                    <p className="leading-relaxed mt-2">{faq.answer}</p>

                    {/* Action button if present */}
                    {faq.actionText && (
                      <div className="pt-1">
                        {faq.actionType === 'insurance' && onOpenInsuranceVerification && (
                          <button
                            onClick={onOpenInsuranceVerification}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#112233] text-white font-bold rounded-xl text-xs hover:bg-[#1a344d] transition-colors shadow-sm"
                          >
                            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{faq.actionText}</span>
                            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                          </button>
                        )}

                        {faq.actionType === 'book' && onOpenBookModal && (
                          <button
                            onClick={onOpenBookModal}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#112233] text-white font-bold rounded-xl text-xs hover:bg-[#1a344d] transition-colors shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{faq.actionText}</span>
                            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                          </button>
                        )}

                        {faq.actionType === 'portal' && onOpenPortalModal && (
                          <button
                            onClick={onOpenPortalModal}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#8A9A86]/20 text-[#112233] dark:text-[#8A9A86] border border-[#8A9A86]/40 font-bold rounded-xl text-xs hover:bg-[#8A9A86]/30 transition-colors"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            <span>{faq.actionText}</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Helpful Vote Footer */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Was this answer helpful?</span>
                      {isVoted ? (
                        <span className="text-[#8A9A86] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Thank you for your feedback
                        </span>
                      ) : (
                        <button
                          onClick={() => handleVote(faq.id)}
                          className="hover:text-[#D4AF37] flex items-center gap-1 font-semibold"
                        >
                          <ThumbsUp className="w-3 h-3" /> Yes, helpful
                        </button>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
