import { Doctor, MedicalService, SpecialtyInfo, ClinicLocation, Testimonial, HealthRecord, NotificationItem, EncryptedMessage } from '../types';

export const defaultLocation: ClinicLocation = {
  city: 'Kolkata',
  state: 'West Bengal',
  zip: '700157',
  fullAddress: 'Kolupukur, Kolkata, West Bengal, India, Kolkata 700157',
  phone: '+91 (033) 2555-0199',
  emergencyPhone: '+91 (033) 2555-0100',
  email: 'care.kolkata@kynexishealth.com',
  hoursWeekday: '8:00 AM – 8:00 PM',
  hoursSaturday: '9:00 AM – 5:00 PM',
  hoursSunday: '10:00 AM – 2:00 PM (Urgent Care Only)',
  coordinates: { lat: 22.628, lng: 88.435 },
  landmark: 'Kolupukur Hub, Near VIP Road & New Town Expressway',
  parkingInfo: 'Dedicated subterranean patient parking & valet service available at Kolupukur entrance.'
};

export const specialtiesData: SpecialtyInfo[] = [
  {
    id: 'internal-medicine',
    name: 'Internal Medicine',
    tagline: 'Comprehensive primary & preventative adult care',
    description: 'Expert diagnostic evaluations, chronic disease management, and tailored wellness strategies for adults of all ages.',
    iconName: 'Activity',
    featuredTreatments: ['Comprehensive Executive Health Check', 'Hypertension & Lipid Optimization', 'Metabolic Health Evaluation'],
    doctorIds: ['doc-1', 'doc-5'],
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cardiology',
    name: 'Cardiology & Vascular Health',
    tagline: 'Advanced precision cardiovascular care',
    description: 'State-of-the-art non-invasive cardiac imaging, risk stratifications, arrhythmia evaluations, and preventative heart care.',
    iconName: 'HeartPulse',
    featuredTreatments: ['High-Resolution Echocardiography', 'Advanced Lipidomics & Plaque Assessment', '24-Hour Holter & Arrhythmia Monitoring'],
    doctorIds: ['doc-2'],
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Regenerative Care',
    tagline: 'Restoring joint integrity and biomechanical precision',
    description: 'Subspecialty orthopedic consultations, non-surgical joint therapies, sports injury rehabilitation, and minimally invasive care.',
    iconName: 'Bone',
    featuredTreatments: ['Targeted Ultrasound-Guided Injections', 'Comprehensive Joint Biomechanics Assessment', 'Sports Injury Rehabilitation'],
    doctorIds: ['doc-3'],
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'neurology',
    name: 'Neurology & Cognitive Health',
    tagline: 'Specialized brain, spine, and peripheral nerve care',
    description: 'In-depth neurological diagnostics for headache disorders, neuropathy, movement disorders, and proactive cognitive preservation.',
    iconName: 'Brain',
    featuredTreatments: ['Comprehensive Migraine & Headache Protocol', 'Cognitive Function & Memory Mapping', 'Peripheral Neuropathy Diagnostic Suite'],
    doctorIds: ['doc-4'],
    heroImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Skin Integrity',
    tagline: 'Medical and cosmetic skin health precision',
    description: 'Full-spectrum medical dermatologic screenings, mole mapping, inflammatory skin disease protocols, and aesthetic restoration.',
    iconName: 'Sparkles',
    featuredTreatments: ['Digital Dermoscopy & Skin Cancer Screening', 'Targeted Biologic Therapy for Psoriasis & Eczema', 'Laser Skin Resurfacing & Collagen Renewal'],
    doctorIds: ['doc-6'],
    heroImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preventive-health',
    name: 'Preventive Health & Longevity',
    tagline: 'Proactive cellular wellness and diagnostic precision',
    description: 'Early biomarker detection, genomic risk profiling, targeted nutritional optimization, and evidence-informed longevity medicine.',
    iconName: 'ShieldCheck',
    featuredTreatments: ['Full-Body Biomarker Panel Analysis', 'Cardiometabolic Risk Profiling', 'Longevity & Longevity Biomarker Tracking'],
    doctorIds: ['doc-1', 'doc-2'],
    heroImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
  }
];

export const doctorsData: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Evelyn Vance, MD, FACP',
    title: 'Senior Physician & Chief of Internal Medicine',
    specialtyId: 'internal-medicine',
    specialtyName: 'Internal Medicine & Preventive Care',
    qualifications: ['MD — Johns Hopkins University School of Medicine', 'Board Certified in Internal Medicine', 'Fellow, American College of Physicians (FACP)'],
    experienceYears: 18,
    languages: ['English', 'French'],
    regNumber: 'IL-MED-049281',
    bio: 'Dr. Vance leads the Internal Medicine department at Kynexis Health. She specializes in diagnostic complexity, preventative health optimization, and long-term metabolic health for active professionals.',
    image: 'https://images.unsplash.com/photo-1594824813566-78a983b66472?auto=format&fit=crop&w=600&q=80',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    rating: 4.96,
    reviewCount: 142,
    education: 'Johns Hopkins School of Medicine (MD), Residency at Massachusetts General Hospital'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Thorne, MD, FACC',
    title: 'Director of Cardiovascular Medicine',
    specialtyId: 'cardiology',
    specialtyName: 'Cardiology & Vascular Health',
    qualifications: ['MD — Harvard Medical School', 'Board Certified in Cardiovascular Disease', 'Fellow, American College of Cardiology (FACC)'],
    experienceYears: 20,
    languages: ['English', 'Spanish'],
    regNumber: 'IL-MED-058319',
    bio: 'Dr. Thorne is a nationally recognized cardiologist with extensive background in non-invasive imaging, preventative cardiology, and personalized hypertension management.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    rating: 4.98,
    reviewCount: 189,
    education: 'Harvard Medical School (MD), Cardiovascular Fellowship at Cleveland Clinic'
  },
  {
    id: 'doc-3',
    name: 'Dr. Sarah Lin, MD, FAAOS',
    title: 'Orthopedic & Joint Preservation Specialist',
    specialtyId: 'orthopedics',
    specialtyName: 'Orthopedics & Regenerative Medicine',
    qualifications: ['MD — Stanford University School of Medicine', 'Board Certified in Orthopedic Surgery', 'Subspecialty Certification in Sports Medicine'],
    experienceYears: 14,
    languages: ['English', 'Mandarin'],
    regNumber: 'IL-MED-061204',
    bio: 'Dr. Lin emphasizes non-surgical joint preservation, regenerative orthobiologics, and targeted ultrasound interventions to restore biomechanical freedom.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
    rating: 4.94,
    reviewCount: 118,
    education: 'Stanford University (MD), Fellowship at Hospital for Special Surgery (HSS)'
  },
  {
    id: 'doc-4',
    name: 'Dr. Jonathan Reynolds, MD, FAAN',
    title: 'Director of Neurological Sciences',
    specialtyId: 'neurology',
    specialtyName: 'Neurology & Cognitive Health',
    qualifications: ['MD — Columbia University Vagelos College of Physicians and Surgeons', 'Board Certified in Neurology', 'Fellow, American Academy of Neurology (FAAN)'],
    experienceYears: 16,
    languages: ['English', 'German'],
    regNumber: 'IL-MED-052441',
    bio: 'Dr. Reynolds specializes in complex headache disorders, peripheral neuropathies, and proactive cognitive longevity protocols using advanced neuro-imaging integration.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    availableDays: ['Monday', 'Tuesday', 'Friday'],
    rating: 4.97,
    reviewCount: 96,
    education: 'Columbia University (MD), Neurology Residency at NY Presbyterian'
  },
  {
    id: 'doc-5',
    name: 'Dr. Amara Patel, MD',
    title: 'Metabolic & Endocrinology Specialist',
    specialtyId: 'internal-medicine',
    specialtyName: 'Internal Medicine & Endocrinology',
    qualifications: ['MD — University of Pennsylvania Perelman School of Medicine', 'Board Certified in Endocrinology, Diabetes & Metabolism'],
    experienceYears: 12,
    languages: ['English', 'Hindi', 'Gujarati'],
    regNumber: 'IL-MED-068932',
    bio: 'Dr. Patel focuses on thyroid disorders, insulin resistance, continuous glucose monitoring technology, and hormonal balance tailored to each patient.',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
    rating: 4.93,
    reviewCount: 84,
    education: 'Penn Medicine (MD), Endocrinology Fellowship at UCSF'
  },
  {
    id: 'doc-6',
    name: 'Dr. Elena Rostova, MD, FAAD',
    title: 'Consultant Dermatologist',
    specialtyId: 'dermatology',
    specialtyName: 'Dermatology & Skin Health',
    qualifications: ['MD — Yale School of Medicine', 'Board Certified in Dermatology', 'Fellow, American Academy of Dermatology (FAAD)'],
    experienceYears: 15,
    languages: ['English', 'Russian'],
    regNumber: 'IL-MED-054110',
    bio: 'Dr. Rostova blends rigorous clinical dermatologic care with aesthetic refinement, specializing in early skin cancer screening and laser rejuvenation therapies.',
    image: 'https://images.unsplash.com/photo-1594824813566-78a983b66472?auto=format&fit=crop&w=600&q=80',
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    rating: 4.95,
    reviewCount: 130,
    education: 'Yale School of Medicine (MD), Residency at NYU Langone Health'
  }
];

export const servicesData: MedicalService[] = [
  {
    id: 'executive-health-check',
    name: 'Executive Health Check',
    specialtyId: 'internal-medicine',
    shortDesc: 'A comprehensive single-day assessment evaluating cardiovascular, metabolic, and systemic health.',
    fullDesc: 'Designed for busy individuals seeking an exhaustive health baseline. Includes advanced blood panels, resting & stress ECG, high-resolution carotid ultrasound, body composition analysis, and a 60-minute physician consultation.',
    concernsAddressed: ['Unexplained fatigue', 'Cardiovascular risk factors', 'Metabolic slowdown', 'Family history of illness'],
    consultationSteps: [
      'Comprehensive pre-visit medical history intake and digital questionnaire.',
      'Fasting blood draw and advanced cardiometabolic biomarker processing.',
      'Non-invasive vascular ultrasound and cardiac diagnostic battery.',
      'Direct 1-on-1 review with Dr. Vance to establish your personalized 12-month care roadmap.'
    ],
    whyChooseUs: [
      'Coordinated single-visit testing completed in luxury comfort.',
      'Same-day preliminary results reviewed directly by board-certified physicians.',
      'Integration into your Kynexis Patient Portal with PDF reports.'
    ],
    doctorIds: ['doc-1'],
    expectedOutcome: 'Complete diagnostic clarity, identified metabolic biomarkers, and a tailored preventive healthcare plan.',
    faqs: [
      { question: 'How long does the Executive Health Check take?', answer: 'The in-person evaluation typically takes between 3 to 4 hours in a private clinical suite with minimal waiting.' },
      { question: 'Do I need to fast before my visit?', answer: 'Yes, a 10-hour overnight fast is recommended for optimal lipid and metabolic blood accuracy. Refreshments are served immediately following blood collection.' }
    ],
    iconName: 'Activity',
    durationMinutes: 180
  },
  {
    id: 'echocardiogram-cardiac-suite',
    name: 'Advanced Echocardiography Suite',
    specialtyId: 'cardiology',
    shortDesc: 'High-definition 3D ultrasound visualization of heart muscle structure, valves, and blood flow velocity.',
    fullDesc: 'Our non-invasive cardiac diagnostic suite utilizes state-of-the-art strain imaging echocardiography to detect subtle wall motion abnormalities, valvular regurgitation, and early heart muscle stress.',
    concernsAddressed: ['Shortness of breath', 'Chest discomfort evaluation', 'Heart murmur investigation', 'Hypertension follow-up'],
    consultationSteps: [
      'Pre-procedure explanation by senior cardiac technologist.',
      'Quiet acoustic chamber positioning with continuous ECG lead monitoring.',
      'High-definition multi-planar ultrasound acquisition.',
      'Board-certified cardiologist interpretation and immediate discussion.'
    ],
    whyChooseUs: [
      'Ultra-high clarity transducer technology yielding high spatial resolution.',
      'Immediate cardiologist overread without weeks of waiting.'
    ],
    doctorIds: ['doc-2'],
    expectedOutcome: 'Clear understanding of heart pump function, valve integrity, and actionable cardiology recommendations.',
    faqs: [
      { question: 'Is an echocardiogram painful?', answer: 'Not at all. It is a completely painless, non-invasive ultrasound procedure taking approximately 45 minutes.' }
    ],
    iconName: 'HeartPulse',
    durationMinutes: 45
  },
  {
    id: 'ultrasound-joint-injection',
    name: 'Ultrasound-Guided Joint & Regenerative Care',
    specialtyId: 'orthopedics',
    shortDesc: 'Sub-millimeter precision target placement of therapeutic anti-inflammatory or orthobiologic agents.',
    fullDesc: 'Real-time ultrasound guidance eliminates guesswork during joint, tendon, or bursa injections. Minimizes discomfort while maximizing therapeutic medication delivery directly to damaged connective tissue.',
    concernsAddressed: ['Chronic knee osteoarthritic pain', 'Rotator cuff tendinopathy', 'Hip bursitis', 'Planter fasciitis'],
    consultationSteps: [
      'Targeted joint mobility and range-of-motion examination.',
      'Dynamic high-frequency ultrasound landmarking.',
      'Targeted local skin numbing for maximum patient comfort.',
      'Sub-millimeter needle trajectory needle placement with real-time screen visualization.'
    ],
    whyChooseUs: [
      '100% targeted accuracy under real-time acoustic visual feedback.',
      'Reduced post-procedure soreness and faster functional return.'
    ],
    doctorIds: ['doc-3'],
    expectedOutcome: 'Substantial pain reduction, decreased local joint inflammation, and improved mobility.',
    faqs: [
      { question: 'How quickly will I feel relief?', answer: 'Depending on the solution used, relief often begins within 48 to 72 hours as inflammatory signaling subsides.' }
    ],
    iconName: 'Bone',
    durationMinutes: 30
  },
  {
    id: 'migraine-neurology-suite',
    name: 'Comprehensive Migraine & Headache Suite',
    specialtyId: 'neurology',
    shortDesc: 'Specialized clinical assessment, nerve block options, and preventative CGRP antibody therapies.',
    fullDesc: 'Chronic headaches require precise neurological classification. We provide customized treatment protocols including peripheral nerve blocks, targeted trigger point therapy, and modern monthly CGRP antagonist administration.',
    concernsAddressed: ['Frequent migraine attacks', 'Occipital neuralgia', 'Tension-type headaches', 'Medication overuse rebound'],
    consultationSteps: [
      'Detailed headache diary and neurological cranial nerve exam.',
      'Differential diagnosis excluding secondary vascular or structural causes.',
      'Formulation of acute abortive and daily preventative treatment plan.'
    ],
    whyChooseUs: [
      'Specialized neurological focus avoiding trial-and-error prescribing.',
      'In-office administration of therapeutic nerve blocks when indicated.'
    ],
    doctorIds: ['doc-4'],
    expectedOutcome: 'Significant reduction in headache frequency, intensity, and disability.',
    faqs: [
      { question: 'When should I see a neurologist for headaches?', answer: 'If headaches occur more than 4 days per month, interfere with work or sleep, or do not respond to over-the-counter medication.' }
    ],
    iconName: 'Brain',
    durationMinutes: 45
  },
  {
    id: 'digital-dermoscopy-skin-check',
    name: 'Digital Dermoscopy & Total Body Skin Check',
    specialtyId: 'dermatology',
    shortDesc: 'High-magnification polarized dermoscopy screening for early detection of melanoma and dysplastic nevi.',
    fullDesc: 'A meticulous head-to-toe dermatologic examination utilizing polarized dermoscopy to evaluate pigment architecture, border regularity, and vascular patterns in moles and suspicious lesions.',
    concernsAddressed: ['Changing or dark moles', 'New skin growths', 'Family history of melanoma', 'Sun damage monitoring'],
    consultationSteps: [
      'Complete patient history including sun exposure and personal risk factors.',
      'Systematic skin surface exam from scalp to feet.',
      'High-magnification digital dermoscopic photo documentation of atypical lesions.'
    ],
    whyChooseUs: [
      'Board-certified dermatologist performing all examinations.',
      'Pain-free digital archiving allowing year-over-year comparison.'
    ],
    doctorIds: ['doc-6'],
    expectedOutcome: 'Peace of mind, documented baseline of skin lesions, and immediate biopsy if a suspicious lesion is identified.',
    faqs: [
      { question: 'How often should I get a full body skin check?', answer: 'Annual skin checks are recommended for adults, or every 6 months for individuals with a history of atypical moles or skin cancer.' }
    ],
    iconName: 'Sparkles',
    durationMinutes: 30
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    patientInitials: 'M. Sterling',
    city: 'Chicago, IL',
    serviceName: 'Executive Health Check',
    rating: 5,
    comment: 'The level of care and thoroughness at Kynexis Health is unmatched. Having my full cardiovascular workup and blood diagnostics conducted in one quiet, elegant setting saved me days of back-and-forth.',
    date: 'July 14, 2026',
    doctorName: 'Dr. Evelyn Vance'
  },
  {
    id: 'test-2',
    patientInitials: 'R. K.',
    city: 'Chicago, IL',
    serviceName: 'Cardiology Consultation',
    rating: 5,
    comment: 'Dr. Marcus Thorne spent 45 uninterrupted minutes explaining my heart rhythm results with incredible clarity. I finally feel confident in my treatment plan.',
    date: 'June 28, 2026',
    doctorName: 'Dr. Marcus Thorne'
  },
  {
    id: 'test-3',
    patientInitials: 'C. Hayes',
    city: 'Naperville, IL',
    serviceName: 'Orthopedic Joint Care',
    rating: 5,
    comment: 'Dr. Sarah Lin performed an ultrasound-guided knee injection that restored my mobility without surgery. The clinical team communicated clearly before, during, and after.',
    date: 'August 2, 2026',
    doctorName: 'Dr. Sarah Lin'
  }
];

export const sampleHealthRecords: HealthRecord[] = [
  {
    id: 'rec-101',
    title: 'Comprehensive Cardiometabolic Biomarker Panel',
    category: 'Lab Report',
    date: 'August 02, 2026',
    doctorName: 'Dr. Evelyn Vance, MD',
    status: 'Final',
    fileSize: '1.4 MB',
    summary: 'Lipid panel, HbA1c, hs-CRP, ApoB, and thyroid function within target therapeutic ranges. ApoB optimized at 68 mg/dL.'
  },
  {
    id: 'rec-102',
    title: '3D Transthoracic Echocardiogram Report',
    category: 'Imaging',
    date: 'July 19, 2026',
    doctorName: 'Dr. Marcus Thorne, MD',
    status: 'Reviewed',
    fileSize: '4.8 MB',
    summary: 'Normal left ventricular ejection fraction (LVEF 62%). Valvular motion intact with no hemodynamically significant stenosis.'
  },
  {
    id: 'rec-103',
    title: 'Preventive Clinical Care Plan & Supplement Protocol',
    category: 'Clinical Notes',
    date: 'July 19, 2026',
    doctorName: 'Dr. Evelyn Vance, MD',
    status: 'Final',
    fileSize: '820 KB',
    summary: '12-Month wellness goals outlining dietary cardiovascular adjustments, aerobic heart rate zone training, and annual follow-up.'
  }
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Appointment Reminder',
    message: 'Your follow-up with Dr. Evelyn Vance is scheduled for Tuesday at 10:00 AM.',
    time: '2 hours ago',
    read: false,
    type: 'appointment'
  },
  {
    id: 'notif-2',
    title: 'Lab Results Available',
    message: 'Your Cardiometabolic Biomarker Panel results have been finalized and added to your encrypted chart.',
    time: '1 day ago',
    read: false,
    type: 'lab_result'
  },
  {
    id: 'notif-3',
    title: 'Encrypted Message Received',
    message: 'Dr. Marcus Thorne replied to your inquiry regarding medication timing.',
    time: '2 days ago',
    read: true,
    type: 'message'
  }
];

export const sampleEncryptedMessages: EncryptedMessage[] = [
  {
    id: 'msg-1',
    sender: 'provider',
    senderName: 'Dr. Evelyn Vance, MD',
    text: 'Hello! I have reviewed your recent fasting lab panel. Your inflammatory markers and lipid numbers have shown excellent improvement following our protocol.',
    timestamp: 'Yesterday at 3:15 PM',
    isEncrypted: true
  },
  {
    id: 'msg-2',
    sender: 'patient',
    senderName: 'You (Patient Portal)',
    text: 'Thank you Dr. Vance! Should I continue taking the vitamin D3 supplement at the same dosage through the autumn months?',
    timestamp: 'Yesterday at 4:02 PM',
    isEncrypted: true
  },
  {
    id: 'msg-3',
    sender: 'provider',
    senderName: 'Dr. Evelyn Vance, MD',
    text: 'Yes, please maintain 4,000 IU daily with breakfast. We will recheck your serum 25-OH Vitamin D level during our next 6-month wellness review.',
    timestamp: 'Today at 9:30 AM',
    isEncrypted: true
  }
];
