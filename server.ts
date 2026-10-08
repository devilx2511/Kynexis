import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import { createOrSyncAppointment, getUserAppointments } from './src/db/appointments.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Kynexis Health API',
      cloudSqlConfigured: Boolean(process.env.SQL_HOST),
      timestamp: new Date().toISOString(),
    });
  });

  // Sync / Register authenticated user with Cloud SQL
  app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || `${uid}@kynexis.local`;
      const { fullName, phone, authProvider } = req.body;

      if (!uid) {
        return res.status(400).json({ error: 'User UID is required' });
      }

      const user = await getOrCreateUser(
        uid,
        email,
        fullName || req.user?.name,
        phone || req.user?.phone_number,
        authProvider || 'firebase'
      );

      res.json({ success: true, user });
    } catch (error: any) {
      console.error('Failed to sync user with Cloud SQL:', error);
      res.status(500).json({ error: error.message || 'Database user sync failed' });
    }
  });

  // Get current user profile from Cloud SQL
  app.get('/api/users/me', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(400).json({ error: 'User UID is required' });
      }

      const user = await getUserByUid(uid);
      res.json({ success: true, user });
    } catch (error: any) {
      console.error('Failed to fetch user from Cloud SQL:', error);
      res.status(500).json({ error: error.message || 'Database fetch failed' });
    }
  });

  // Sync / Create appointment in Cloud SQL
  app.post('/api/appointments/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || `${uid}@kynexis.local`;
      if (!uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointmentData = req.body;
      const synced = await createOrSyncAppointment({
        ...appointmentData,
        userUid: uid,
        userEmail: email,
        userName: req.user?.name,
      });

      res.json({ success: true, appointment: synced });
    } catch (error: any) {
      console.error('Failed to sync appointment with Cloud SQL:', error);
      res.status(500).json({ error: error.message || 'Appointment database sync failed' });
    }
  });

  // Get user's appointments from Cloud SQL
  app.get('/api/appointments', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointmentsList = await getUserAppointments(uid);
      res.json({ success: true, appointments: appointmentsList });
    } catch (error: any) {
      console.error('Failed to get appointments from Cloud SQL:', error);
      res.status(500).json({ error: error.message || 'Appointments query failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kynexis Health Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
