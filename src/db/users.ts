import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(
  uid: string, 
  email: string, 
  fullName?: string, 
  phone?: string, 
  authProvider?: string
) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email: email || `${uid}@anonymous.kynexis.local`,
        fullName: fullName || 'Valued Patient',
        phone: phone || '',
        authProvider: authProvider || 'unknown',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email: email || `${uid}@anonymous.kynexis.local`,
          fullName: fullName || undefined,
          phone: phone || undefined,
          authProvider: authProvider || undefined,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database user upsert query failed:", error);
    throw new Error("Failed to register/sync user in Cloud SQL.", { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const result = await db.select().from(users).where(eq(users.uid, uid));
    return result[0] || null;
  } catch (error) {
    console.error("Database user query failed:", error);
    throw new Error("Failed to fetch user record.", { cause: error });
  }
}
