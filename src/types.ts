export type SpecialtyId = 
  | 'internal-medicine'
  | 'cardiology'
  | 'orthopedics'
  | 'neurology'
  | 'dermatology'
  | 'preventive-health'
  | 'gastroenterology'
  | 'endocrinology';

export interface Doctor {
  id: string;
  name: string;
  title?: string;
  specialtyId: SpecialtyId | string;
  specialtyName: string;
  qualifications: string[] | string;
  experienceYears?: number;
  languages: string[];
  regNumber?: string;
  bio?: string;
  image?: string;
  availableDays?: string[];
  rating: number;
  reviewCount?: number;
  education?: string;
  // Convenience fields for CMS & DevMode management
  designation?: string;
  specialty?: string;
  location?: string;
  imageUrl?: string;
  experience?: string;
  availability?: string;
  department?: string;
  about?: string;
  consultationFee?: string;
  reviewsCount?: number;
}

export interface MedicalService {
  id: string;
  name: string;
  specialtyId: SpecialtyId;
  shortDesc: string;
  fullDesc: string;
  concernsAddressed: string[];
  consultationSteps: string[];
  whyChooseUs: string[];
  doctorIds: string[];
  expectedOutcome: string;
  faqs: { question: string; answer: string }[];
  iconName: string;
  durationMinutes: number;
}

export interface SpecialtyInfo {
  id: SpecialtyId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  featuredTreatments: string[];
  doctorIds: string[];
  heroImage: string;
}

export interface Appointment {
  id: string;
  userId?: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  specialtyId: SpecialtyId;
  specialty?: string;
  doctorId: string;
  doctorName?: string;
  date: string;
  timeSlot: string;
  reason?: string;
  symptoms?: string;
  consultationType?: string;
  location?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
  isFirstVisit: boolean;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'lab_result' | 'message' | 'general';
}

export interface EncryptedMessage {
  id: string;
  sender: 'patient' | 'provider' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isEncrypted: boolean;
  attachmentName?: string;
}

export interface HealthRecord {
  id: string;
  title: string;
  category: 'Lab Report' | 'Imaging' | 'Prescription' | 'Clinical Notes';
  date: string;
  doctorName: string;
  status: 'Final' | 'Reviewed' | 'Action Required';
  fileSize: string;
  summary: string;
}

export interface ClinicLocation {
  city: string;
  state: string;
  zip: string;
  fullAddress: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  coordinates: { lat: number; lng: number };
  landmark: string;
  parkingInfo: string;
}

export interface Testimonial {
  id: string;
  patientInitials: string;
  city: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  doctorName: string;
}

// Administrative DevMode Types
export type DevRole =
  | 'founder'
  | 'super_admin'
  | 'developer'
  | 'seo_manager'
  | 'maintenance'
  | 'reception'
  | 'content_editor';

export interface DevUser {
  id: string;
  name: string;
  email: string;
  role: DevRole;
  avatar: string;
  lastLogin: string;
  mfaEnabled: boolean;
  status: 'active' | 'suspended' | 'invited';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: DevRole;
  action: string;
  targetObject: string;
  ipAddress: string;
}

export interface ErrorLogItem {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  path: string;
  severity: 'low' | 'medium' | 'high' | 'fatal';
  status: 'New' | 'Investigating' | 'Resolved';
  device: string;
  stackTrace?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  readTimeMinutes: number;
}

export interface RedirectRule {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  type: '301 Permanent' | '302 Temporary';
  hits: number;
  createdBy: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  environment: 'Production' | 'Staging' | 'Development';
}

export interface DeploymentVersion {
  id: string;
  version: string;
  deployedAt: string;
  deployedBy: string;
  commitHash: string;
  changelog: string[];
  environment: string;
}

export interface PageCmsItem {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft' | 'Archived';
  seoScore: number;
  lastUpdated: string;
  updatedBy: string;
  viewsMonth: number;
}

export interface InsuranceVerification {
  provider: string;
  memberId: string;
  policyholderName: string;
  groupNumber?: string;
  patientRelationship: string;
  phone: string;
  verifiedAt?: string;
  status?: 'Verified' | 'Pending' | 'Failed';
  copayAmount?: string;
  coverageDetails?: string;
}

export type PresetLogoIcon = 
  | 'monogram_gold' 
  | 'medical_cross' 
  | 'caduceus' 
  | 'stethoscope' 
  | 'dna_helix' 
  | 'heart_pulse';

export interface BrandConfig {
  logoType: 'vector' | 'image' | 'preset' | 'text_only';
  customLogoUrl: string;
  brandName: string;
  tagline: string;
  showTagline: boolean;
  presetIcon: PresetLogoIcon;
  primaryColor?: string;
  goldAccentColor?: string;
  logoHeightMultiplier: number;
  syncFavicon: boolean;
  openingPageImageUrl?: string;
  openingPageHeadline?: string;
  openingPageHeadlineAccent?: string;
  openingPageSubtitle?: string;
  openingPageCtaText?: string;
  showOpeningPageWallSign?: boolean;
  updatedAt?: string;
}

