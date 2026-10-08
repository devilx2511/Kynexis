import { ClinicLocation, Doctor, MedicalService, SpecialtyInfo } from '../types';
import { defaultLocation, doctorsData, servicesData, specialtiesData } from './clinicData';

/**
 * KYNEXIS HEALTH — CENTRALIZED PRODUCTION SEO CONFIGURATION
 * Master configuration for Technical SEO, Open Graph, Twitter Cards, Schema.org JSON-LD,
 * and Local Business Search indexing.
 */

export const SEO_CONFIG = {
  // Brand & Site Entity
  SITE_NAME: 'Kynexis Health',
  SITE_URL: 'https://kynexishealth.com',
  SITE_TAGLINE: 'Advanced Multi-Specialty Healthcare & Precision Diagnostics Clinic',
  SITE_DESCRIPTION: 'Kynexis Health is a premier multi-specialty medical clinic in Kolkata offering evidence-informed primary care, cardiology, orthopedics, neurology, dermatology, and executive diagnostics.',
  
  // Default Metadata
  DEFAULT_TITLE: 'Kynexis Health | Advanced Multi-Specialty Clinic in Kolkata',
  DEFAULT_DESCRIPTION: 'Comprehensive, patient-centered multi-specialty healthcare in Kolkata. Board-certified physicians in cardiology, internal medicine, orthopedics, neurology, and dermatology.',
  DEFAULT_OG_IMAGE: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&h=630&q=85',
  DEFAULT_LOCALE: 'en_US',
  DEFAULT_THEME_COLOR: '#112233',

  // Clinic NAP & Geo Data (Kolupukur, Kolkata)
  CLINIC_NAME: 'Kynexis Health Clinic',
  CLINIC_LEGAL_NAME: 'Kynexis Health Multi-Specialty Medical Centre Pvt. Ltd.',
  CLINIC_FOUNDING_DATE: '2021',
  CLINIC_PHONE: '+91 (033) 2555-0199',
  CLINIC_EMERGENCY_PHONE: '+91 (033) 2555-0100',
  CLINIC_EMAIL: 'care.kolkata@kynexishealth.com',
  CLINIC_ADDRESS_STREET: 'Kolupukur, Near VIP Road & New Town Expressway',
  CLINIC_CITY: 'Kolkata',
  CLINIC_STATE: 'West Bengal',
  CLINIC_POSTAL_CODE: '700157',
  CLINIC_COUNTRY: 'IN',
  CLINIC_LATITUDE: 22.628,
  CLINIC_LONGITUDE: 88.435,

  // Schedule & Operation
  OPENING_HOURS_WEEKDAY: 'Mo-Fr 08:00-20:00',
  OPENING_HOURS_SATURDAY: 'Sa 09:00-17:00',
  OPENING_HOURS_SUNDAY: 'Su 10:00-14:00',
  PRICE_RANGE: '$$',
  PAYMENT_ACCEPTED: 'Cash, Credit Card, Debit Card, UPI, Health Insurance, Net Banking',
  CURRENCY_ACCEPTED: 'INR, USD',

  // URLs & Integrations
  APPOINTMENT_URL: 'https://kynexishealth.com/?action=book',
  PORTAL_URL: 'https://kynexishealth.com/?action=portal',
  GOOGLE_MAPS_URL: 'https://maps.google.com/?q=22.628,88.435',
  
  // Official Verified Social Entity Links
  SOCIAL_URLS: [
    'https://www.linkedin.com/company/kynexis-health',
    'https://twitter.com/kynexishealth',
    'https://www.facebook.com/kynexishealth',
    'https://www.instagram.com/kynexishealth',
    'https://www.youtube.com/@kynexishealth'
  ],

  // Medical Accreditations & Standards
  ACCREDITATIONS: [
    'HIPAA Privacy & Security Standards Compliant',
    'NABH Quality Guidelines Aligned Facility',
    'ISO 9001:2015 Healthcare Management Standards'
  ]
};

/**
 * Route-by-route Metadata Registry
 */
export interface PageSeoMeta {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogType: 'website' | 'article' | 'profile';
  ogImage?: string;
  h1: string;
  breadcrumbs: { name: string; path: string }[];
}

export const ROUTE_SEO_REGISTRY: Record<string, PageSeoMeta> = {
  home: {
    title: 'Kynexis Health | Advanced Multi-Specialty Clinic in Kolkata',
    description: 'Experience comprehensive, patient-centered healthcare in Kolkata. Coordinated specialty care across cardiology, neurology, orthopedics, internal medicine, and dermatology.',
    keywords: [
      'Kynexis Health Kolkata',
      'multi specialty clinic Kolkata',
      'Kolupukur clinic Kolkata 700157',
      'cardiologist in Kolkata',
      'internal medicine doctor Kolkata',
      'orthopedic clinic Kolkata',
      'neurology specialist Kolkata',
      'dermatologist Kolkata',
      'executive health check Kolkata'
    ],
    canonicalPath: '/',
    ogType: 'website',
    h1: 'Advanced Healthcare. Connected Expertise.',
    breadcrumbs: [{ name: 'Home', path: '/' }]
  },
  about: {
    title: 'About Kynexis Health | Clinical Philosophy, Heritage & Leadership',
    description: 'Learn about Kynexis Health in Kolkata — our board-certified medical leadership, state-of-the-art diagnostic suites, patient-first care philosophy, and modern facilities.',
    keywords: [
      'about Kynexis Health',
      'Kolkata clinic leadership',
      'medical team Kolkata',
      'healthcare philosophy Kolkata',
      'modern diagnostic center Kolupukur'
    ],
    canonicalPath: '/about',
    ogType: 'website',
    h1: 'Redefining Multi-Specialty Healthcare with Dignity & Scientific Precision',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Kynexis', path: '/about' }
    ]
  },
  specialties: {
    title: 'Medical Specialties | Cardiology, Neurology, Orthopedics & Medicine | Kynexis Health',
    description: 'Explore our 6 core medical specialties in Kolkata: Internal Medicine, Cardiology & Vascular Health, Orthopedics, Neurology, Dermatology, and Preventive Health.',
    keywords: [
      'medical specialties Kolkata',
      'cardiology department Kolkata',
      'neurology clinic Kolkata',
      'orthopedic center Kolupukur',
      'preventive health checkup Kolkata'
    ],
    canonicalPath: '/specialties',
    ogType: 'website',
    h1: 'Comprehensive Clinical Specialties',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Medical Specialties', path: '/specialties' }
    ]
  },
  services: {
    title: 'Diagnostic Services & Treatments | Executive Health & Echocardiogram | Kynexis Health',
    description: 'High-precision diagnostic testing and clinical treatments in Kolkata including 3D Echocardiography, Executive Health Checks, Ultrasound-guided Joint Injections, and Dermoscopy.',
    keywords: [
      'medical treatments Kolkata',
      'echocardiogram test Kolkata',
      'executive health checkup Kolkata',
      'ultrasound joint injection Kolkata',
      'migraine treatment Kolkata',
      'skin check dermoscopy Kolkata'
    ],
    canonicalPath: '/services',
    ogType: 'website',
    h1: 'High-Precision Diagnostics & Outpatient Treatments',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services & Treatments', path: '/services' }
    ]
  },
  doctors: {
    title: 'Our Specialist Doctors & Faculty Directory | Kynexis Health Kolkata',
    description: 'Meet our team of board-certified physicians, fellows, and surgeons in Kolkata. View clinical credentials, qualifications, OPD consulting schedules, and book directly.',
    keywords: [
      'doctors in Kolkata',
      'specialist physicians Kolkata',
      'Dr Evelyn Vance',
      'Dr Marcus Thorne cardiologist',
      'Dr Sarah Lin orthopedics',
      'Dr Jonathan Reynolds neurologist',
      'Dr Amara Patel endocrinologist',
      'Dr Elena Rostova dermatologist'
    ],
    canonicalPath: '/doctors',
    ogType: 'website',
    h1: 'Distinguished Clinical Faculty & Medical Specialists',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Doctors Directory', path: '/doctors' }
    ]
  },
  'why-kynexis': {
    title: 'Why Choose Kynexis Health | Acoustic Suites, Zero Waiting & Direct Access',
    description: 'Discover the Kynexis difference: dedicated quiet acoustic suites, 45-minute unhurried consultations, integrated diagnostics under one roof, and encrypted digital records.',
    keywords: [
      'why choose Kynexis Health',
      'patient care standards Kolkata',
      'private diagnostic suites Kolkata',
      'transparent healthcare pricing'
    ],
    canonicalPath: '/why-kynexis',
    ogType: 'website',
    h1: 'Designed for Dignified, Unhurried Healthcare',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Why Kynexis', path: '/why-kynexis' }
    ]
  },
  'patient-resources': {
    title: 'Patient Resources, Health Guides & FAQs | Kynexis Health Kolkata',
    description: 'Access patient preparation guides for diagnostic testing, insurance verification information, download intake forms, and review HIPAA privacy rights.',
    keywords: [
      'patient resources Kolkata clinic',
      'health checkup preparation guide',
      'insurance verification Kolkata clinic',
      'patient rights and forms'
    ],
    canonicalPath: '/patient-resources',
    ogType: 'website',
    h1: 'Patient Resources & Health Navigation Hub',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Patient Resources', path: '/patient-resources' }
    ]
  },
  contact: {
    title: 'Contact Kynexis Health Clinic Kolkata | Address, Map, Phone & Hours',
    description: 'Contact Kynexis Health at Kolupukur, Kolkata 700157. View clinic opening hours, call +91 (033) 2555-0199, get driving directions, and schedule a consultation.',
    keywords: [
      'contact Kynexis Health Kolkata',
      'Kolupukur clinic address',
      'Kynexis clinic phone number',
      'clinic opening hours Kolkata',
      'driving directions Kolupukur clinic'
    ],
    canonicalPath: '/contact',
    ogType: 'website',
    h1: 'Contact Our Kolupukur Clinic in Kolkata',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact & Location', path: '/contact' }
    ]
  }
};

/**
 * GENERATE SCHEMA.ORG JSON-LD STRUCTURED DATA
 */

/**
 * 1. Comprehensive MedicalClinic & LocalBusiness Schema
 */
export function generateMedicalClinicSchema(location: ClinicLocation = defaultLocation) {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness', 'MedicalBusiness'],
    '@id': `${SEO_CONFIG.SITE_URL}/#clinic`,
    name: SEO_CONFIG.CLINIC_NAME,
    legalName: SEO_CONFIG.CLINIC_LEGAL_NAME,
    alternateName: `${SEO_CONFIG.SITE_NAME} ${location.city}`,
    url: SEO_CONFIG.SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.SITE_URL}/assets/logo.png`,
      caption: `${SEO_CONFIG.SITE_NAME} Logo`
    },
    image: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    ],
    description: SEO_CONFIG.SITE_DESCRIPTION,
    telephone: location.phone || SEO_CONFIG.CLINIC_PHONE,
    email: location.email || SEO_CONFIG.CLINIC_EMAIL,
    priceRange: SEO_CONFIG.PRICE_RANGE,
    currenciesAccepted: 'INR, USD',
    paymentAccepted: SEO_CONFIG.PAYMENT_ACCEPTED,
    isAcceptingNewPatients: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.fullAddress.split(',')[0] || SEO_CONFIG.CLINIC_ADDRESS_STREET,
      addressLocality: location.city || SEO_CONFIG.CLINIC_CITY,
      addressRegion: location.state || SEO_CONFIG.CLINIC_STATE,
      postalCode: location.zip || SEO_CONFIG.CLINIC_POSTAL_CODE,
      addressCountry: location.city === 'Kolkata' ? 'IN' : 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat || SEO_CONFIG.CLINIC_LATITUDE,
      longitude: location.coordinates.lng || SEO_CONFIG.CLINIC_LONGITUDE
    },
    hasMap: SEO_CONFIG.GOOGLE_MAPS_URL,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '14:00'
      }
    ],
    sameAs: SEO_CONFIG.SOCIAL_URLS,
    medicalSpecialty: specialtiesData.map((s) => s.name),
    availableService: servicesData.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.name,
      description: s.shortDesc,
      procedureType: 'Outpatient'
    })),
    physician: doctorsData.map((d) => ({
      '@type': 'Physician',
      '@id': `${SEO_CONFIG.SITE_URL}/doctors/#${d.id}`,
      name: d.name,
      jobTitle: d.title,
      medicalSpecialty: d.specialtyName,
      image: d.image
    })),
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.SITE_URL}/?action=book`,
        inLanguage: 'en-US',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'MedicalReservation',
        name: 'Medical Consultation Appointment'
      }
    }
  };
}

/**
 * 2. Organization Structured Data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${SEO_CONFIG.SITE_URL}/#organization`,
    name: SEO_CONFIG.SITE_NAME,
    legalName: SEO_CONFIG.CLINIC_LEGAL_NAME,
    url: SEO_CONFIG.SITE_URL,
    logo: `${SEO_CONFIG.SITE_URL}/assets/logo.png`,
    description: SEO_CONFIG.SITE_DESCRIPTION,
    foundingDate: SEO_CONFIG.CLINIC_FOUNDING_DATE,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SEO_CONFIG.CLINIC_PHONE,
        contactType: 'customer service / appointments',
        areaServed: ['IN', 'WB', 'Kolkata'],
        availableLanguage: ['English', 'Bengali', 'Hindi']
      },
      {
        '@type': 'ContactPoint',
        telephone: SEO_CONFIG.CLINIC_EMERGENCY_PHONE,
        contactType: 'emergency medical advisory',
        areaServed: ['IN', 'WB', 'Kolkata'],
        availableLanguage: ['English', 'Bengali', 'Hindi']
      }
    ],
    sameAs: SEO_CONFIG.SOCIAL_URLS
  };
}

/**
 * 3. Physician Structured Data for individual doctor
 */
export function generateDoctorSchema(doctor: Doctor, location: ClinicLocation = defaultLocation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SEO_CONFIG.SITE_URL}/doctors/#${doctor.id}`,
    name: doctor.name,
    jobTitle: doctor.title,
    medicalSpecialty: doctor.specialtyName,
    description: doctor.bio,
    image: doctor.image,
    worksFor: {
      '@type': 'MedicalClinic',
      name: SEO_CONFIG.CLINIC_NAME,
      url: SEO_CONFIG.SITE_URL,
      telephone: location.phone
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: doctor.education
    },
    knowsLanguage: doctor.languages,
    qualifications: Array.isArray(doctor.qualifications)
      ? doctor.qualifications.join(', ')
      : doctor.qualifications,
    hasCredential: Array.isArray(doctor.qualifications)
      ? doctor.qualifications.map((q) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Medical Degree / Fellowship',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Medical Licensing Board'
          },
          name: q
        }))
      : [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Medical Degree / Fellowship',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Medical Licensing Board'
            },
            name: String(doctor.qualifications || 'Medical Degree')
          }
        ]
  };
}

/**
 * 4. MedicalProcedure / Service Structured Data
 */
export function generateServiceSchema(service: MedicalService, location: ClinicLocation = defaultLocation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${SEO_CONFIG.SITE_URL}/services/#${service.id}`,
    name: service.name,
    description: service.fullDesc,
    procedureType: 'Outpatient',
    bodyLocation: service.specialtyId,
    provider: {
      '@type': 'MedicalClinic',
      name: SEO_CONFIG.CLINIC_NAME,
      url: SEO_CONFIG.SITE_URL,
      telephone: location.phone
    },
    followup: service.expectedOutcome,
    howPerformed: service.consultationSteps.join(' ')
  };
}

/**
 * 5. BreadcrumbList Structured Data
 */
export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.SITE_URL}${item.path === '/' ? '' : item.path}`
    }))
  };
}

/**
 * 6. FAQPage Structured Data for Patient Resources & Service FAQs
 */
export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
