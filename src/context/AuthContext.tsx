import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType, testFirestoreConnection } from '../lib/firebase';

export interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  authProvider: 'google' | 'password' | 'phone' | 'anonymous';
  bloodGroup?: string;
  emergencyContact?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isGuest: boolean;
  firestoreConnected: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, fullName: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  setupPhoneRecaptcha: (containerId: string) => RecaptchaVerifier;
  sendPhoneOtp: (phoneNumber: string, appVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
  confirmPhoneOtp: (confirmationResult: ConfirmationResult, otpCode: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePatientProfile: (updates: Partial<UserProfile>) => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [firestoreConnected, setFirestoreConnected] = useState<boolean>(true);

  // Connectivity test on mount
  useEffect(() => {
    testFirestoreConnection().then((connected) => {
      setFirestoreConnected(connected);
    });
  }, []);

  // Sync user profile to Firestore & backend Cloud SQL
  const syncUserProfileToBackend = async (firebaseUser: User, extraData?: { fullName?: string; phone?: string; provider?: string }) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const isAnon = firebaseUser.isAnonymous;
      const provider = extraData?.provider || (isAnon ? 'anonymous' : (firebaseUser.providerData[0]?.providerId.includes('google') ? 'google' : (firebaseUser.phoneNumber ? 'phone' : 'password')));
      
      const docSnap = await getDoc(userDocRef).catch((err) => {
        handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
      });

      const existingData = docSnap?.exists() ? docSnap.data() as UserProfile : null;
      
      const profileData: UserProfile = {
        userId: firebaseUser.uid,
        fullName: extraData?.fullName || firebaseUser.displayName || existingData?.fullName || (isAnon ? 'Guest Patient' : 'Valued Patient'),
        email: firebaseUser.email || existingData?.email || (firebaseUser.phoneNumber ? `${firebaseUser.phoneNumber}@phone.kynexis.local` : `${firebaseUser.uid}@guest.kynexis.local`),
        phone: extraData?.phone || firebaseUser.phoneNumber || existingData?.phone || '',
        authProvider: (provider as any) || 'password',
        bloodGroup: existingData?.bloodGroup || '',
        emergencyContact: existingData?.emergencyContact || '',
        createdAt: existingData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Write to Firestore with error handler
      await setDoc(userDocRef, profileData, { merge: true }).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`);
      });

      setUserProfile(profileData);

      // Async sync to Cloud SQL backend
      const token = await firebaseUser.getIdToken();
      fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          phone: profileData.phone,
          authProvider: profileData.authProvider,
        }),
      }).catch((err) => {
        console.warn('Cloud SQL user sync warning (non-blocking):', err);
      });

    } catch (error) {
      console.error('Error syncing user profile:', error);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Listen to Firestore user profile real-time
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubProfile = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserProfile(snapshot.data() as UserProfile);
          } else {
            // First time profile creation
            syncUserProfileToBackend(currentUser);
          }
        }, (error) => {
          console.warn('Firestore profile snapshot listener notice:', error.message);
        });

        setLoading(false);
        return () => unsubProfile();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserProfileToBackend(result.user, { provider: 'google' });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      await syncUserProfileToBackend(result.user, { provider: 'password' });
    } catch (error: any) {
      console.error('Email Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, fullName: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(result.user, { displayName: fullName });
      await syncUserProfileToBackend(result.user, { fullName, provider: 'password' });
    } catch (error: any) {
      console.error('Email Sign-Up Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInGuest = async () => {
    setLoading(true);
    try {
      const result = await signInAnonymously(auth);
      await syncUserProfileToBackend(result.user, { fullName: 'Guest Patient', provider: 'anonymous' });
    } catch (error: any) {
      console.error('Guest Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password Reset Error:', error);
      throw error;
    }
  };

  const setupPhoneRecaptcha = (containerId: string) => {
    return new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
  };

  const sendPhoneOtp = async (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error: any) {
      console.error('Phone OTP Send Error:', error);
      throw error;
    }
  };

  const confirmPhoneOtp = async (confirmationResult: ConfirmationResult, otpCode: string, fullName?: string) => {
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otpCode);
      if (fullName) {
        await updateProfile(result.user, { displayName: fullName });
      }
      await syncUserProfileToBackend(result.user, { fullName, phone: result.user.phoneNumber || undefined, provider: 'phone' });
    } catch (error: any) {
      console.error('Phone OTP Confirmation Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePatientProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const payload = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await setDoc(userDocRef, payload, { merge: true }).catch((err) => {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      });
      setUserProfile((prev) => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Failed to update patient profile:', error);
      throw error;
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    if (!user) return null;
    return await user.getIdToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isGuest: Boolean(user?.isAnonymous),
        firestoreConnected,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInGuest,
        sendPasswordReset,
        setupPhoneRecaptcha,
        sendPhoneOtp,
        confirmPhoneOtp,
        logout,
        updatePatientProfile,
        getIdToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
