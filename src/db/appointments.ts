import { db } from './index.ts';
import { appointments, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { getOrCreateUser } from './users.ts';

export interface CreateAppointmentInput {
  appointmentUid: string;
  userUid: string;
  userEmail: string;
  userName?: string;
  patientName: string;
  patientPhone?: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  consultationType?: string;
  location?: string;
  symptoms?: string;
  status?: string;
}

export async function createOrSyncAppointment(data: CreateAppointmentInput) {
  try {
    // Ensure user exists first
    const user = await getOrCreateUser(data.userUid, data.userEmail, data.userName);

    const result = await db.insert(appointments)
      .values({
        appointmentUid: data.appointmentUid,
        userId: user.id,
        userUid: data.userUid,
        patientName: data.patientName,
        patientPhone: data.patientPhone || '',
        patientEmail: data.patientEmail || '',
        doctorId: data.doctorId,
        doctorName: data.doctorName,
        specialty: data.specialty,
        date: data.date,
        timeSlot: data.timeSlot,
        consultationType: data.consultationType || 'In-Person Consultation',
        location: data.location || 'Kolkata Facility',
        symptoms: data.symptoms || '',
        status: data.status || 'confirmed',
      })
      .onConflictDoUpdate({
        target: appointments.appointmentUid,
        set: {
          patientName: data.patientName,
          patientPhone: data.patientPhone || undefined,
          date: data.date,
          timeSlot: data.timeSlot,
          status: data.status || 'confirmed',
        }
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database appointment insert/sync failed:", error);
    throw new Error("Failed to persist appointment in Cloud SQL.", { cause: error });
  }
}

export async function getUserAppointments(userUid: string) {
  try {
    return await db.select()
      .from(appointments)
      .where(eq(appointments.userUid, userUid))
      .orderBy(desc(appointments.createdAt));
  } catch (error) {
    console.error("Database getUserAppointments failed:", error);
    throw new Error("Failed to query appointments from Cloud SQL.", { cause: error });
  }
}
