import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Cloud SQL Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  fullName: text('full_name'),
  phone: text('phone'),
  authProvider: text('auth_provider'),
  bloodGroup: text('blood_group'),
  emergencyContact: text('emergency_contact'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Cloud SQL Appointments Table
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  appointmentUid: text('appointment_uid').notNull().unique(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  userUid: text('user_uid').notNull(),
  patientName: text('patient_name').notNull(),
  patientPhone: text('patient_phone'),
  patientEmail: text('patient_email'),
  doctorId: text('doctor_id').notNull(),
  doctorName: text('doctor_name').notNull(),
  specialty: text('specialty').notNull(),
  date: text('date').notNull(),
  timeSlot: text('time_slot').notNull(),
  consultationType: text('consultation_type').default('In-Person Consultation'),
  location: text('location'),
  symptoms: text('symptoms'),
  status: text('status').default('confirmed'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cloud SQL Medical Records Table
export const medicalRecords = pgTable('medical_records', {
  id: serial('id').primaryKey(),
  recordUid: text('record_uid').notNull().unique(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  userUid: text('user_uid').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  doctorName: text('doctor_name'),
  date: text('date').notNull(),
  summary: text('summary'),
  fileUrl: text('file_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cloud SQL Inquiries Table
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  inquiryUid: text('inquiry_uid').notNull().unique(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  department: text('department'),
  message: text('message').notNull(),
  status: text('status').default('new'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments),
  medicalRecords: many(medicalRecords),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));

export const medicalRecordsRelations = relations(medicalRecords, ({ one }) => ({
  patient: one(users, {
    fields: [medicalRecords.userId],
    references: [users.id],
  }),
}));
