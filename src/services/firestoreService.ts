import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  deleteDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Appointment } from '../types';

export interface MedicalRecordDoc {
  id: string;
  userId: string;
  title: string;
  category: string;
  doctorName?: string;
  date: string;
  summary?: string;
  fileUrl?: string;
  createdAt: string;
}

export interface InquiryDoc {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  department?: string;
  message: string;
  status: string;
  createdAt: string;
}

// Subscribe to real-time appointments for a patient
export function subscribeToPatientAppointments(
  userId: string, 
  onUpdate: (appointments: Appointment[]) => void
) {
  const q = query(
    collection(db, 'appointments'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const appointments: Appointment[] = [];
    snapshot.forEach((docSnap) => {
      appointments.push(docSnap.data() as Appointment);
    });
    // Sort descending by date
    appointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    onUpdate(appointments);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'appointments');
  });
}

// Alias for subscribeToPatientAppointments
export const listenToUserAppointments = subscribeToPatientAppointments;

// Create / Save an appointment in Firestore & Cloud SQL
export async function saveAppointment(appointment: Appointment, idToken?: string | null) {
  const path = `appointments/${appointment.id}`;
  try {
    const docRef = doc(db, 'appointments', appointment.id);
    await setDoc(docRef, appointment);

    // Sync to Cloud SQL via Express API
    if (idToken) {
      fetch('/api/appointments/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          appointmentUid: appointment.id,
          patientName: appointment.patientName,
          patientPhone: appointment.patientPhone,
          patientEmail: appointment.patientEmail,
          doctorId: appointment.doctorId,
          doctorName: appointment.doctorName,
          specialty: appointment.specialty,
          date: appointment.date,
          timeSlot: appointment.timeSlot,
          consultationType: appointment.consultationType,
          location: appointment.location,
          symptoms: appointment.symptoms,
          status: appointment.status,
        }),
      }).catch((err) => {
        console.warn('Cloud SQL async appointment sync warning:', err);
      });
    }

    return appointment;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Cancel appointment
export async function cancelAppointment(appointmentId: string) {
  const path = `appointments/${appointmentId}`;
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    await setDoc(docRef, { status: 'cancelled' }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Subscribe to patient medical records
export function subscribeToPatientRecords(
  userId: string,
  onUpdate: (records: MedicalRecordDoc[]) => void
) {
  const q = query(
    collection(db, 'medical_records'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const records: MedicalRecordDoc[] = [];
    snapshot.forEach((docSnap) => {
      records.push(docSnap.data() as MedicalRecordDoc);
    });
    records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    onUpdate(records);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'medical_records');
  });
}

// Create medical record
export async function saveMedicalRecord(record: MedicalRecordDoc) {
  const path = `medical_records/${record.id}`;
  try {
    const docRef = doc(db, 'medical_records', record.id);
    await setDoc(docRef, record);
    return record;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Submit public contact inquiry
export async function submitInquiry(inquiry: InquiryDoc) {
  const path = `inquiries/${inquiry.id}`;
  try {
    const docRef = doc(db, 'inquiries', inquiry.id);
    await setDoc(docRef, inquiry);
    return inquiry;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
