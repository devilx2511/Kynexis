import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Doctor, BlogPost, PageCmsItem } from '../types';
import { doctorsData } from '../data/clinicData';
import { initialPageCmsList, initialBlogPosts } from '../data/devmodeData';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export interface CmsSectionItem {
  id: string;
  name: string;
  enabled: boolean;
}

export interface CmsConfig {
  heroTitle: string;
  heroSubtitle: string;
  sections: CmsSectionItem[];
  pages: PageCmsItem[];
  blogPosts: BlogPost[];
  updatedAt?: string;
}

export const DEFAULT_CMS_CONFIG: CmsConfig = {
  heroTitle: 'Advanced Healthcare. Connected Expertise.',
  heroSubtitle: 'Experience comprehensive, patient-centered healthcare through trusted medical expertise in Kolupukur, Kolkata.',
  sections: [
    { id: 'sec_1', name: 'Hero Section & Appointment CTA', enabled: true },
    { id: 'sec_2', name: 'Search Services & Specialty Bar', enabled: true },
    { id: 'sec_3', name: 'Trust Strip (Authentic Care, Patient First)', enabled: true },
    { id: 'sec_4', name: 'Symptom Navigator Interactive Filter', enabled: true },
    { id: 'sec_5', name: 'Kolupukur Clinic Map & Location Selector', enabled: true },
    { id: 'sec_6', name: 'Featured Treatments & 3D Echocardiography', enabled: true },
    { id: 'sec_7', name: 'Verified Patient Reviews & Ratings', enabled: true },
    { id: 'sec_8', name: 'Encrypted Patient Portal Banner', enabled: true },
  ],
  pages: initialPageCmsList,
  blogPosts: initialBlogPosts,
  updatedAt: new Date().toISOString(),
};

interface LiveDataContextType {
  doctors: Doctor[];
  saveDoctor: (doctor: Doctor) => Promise<boolean>;
  deleteDoctor: (doctorId: string) => Promise<boolean>;
  addDoctor: (doctor: Doctor) => Promise<boolean>;
  resetDoctors: () => Promise<boolean>;

  cmsConfig: CmsConfig;
  updateCmsConfig: (patch: Partial<CmsConfig>) => Promise<boolean>;
  toggleCmsSection: (sectionId: string) => Promise<boolean>;
  reorderCmsSections: (newSections: CmsSectionItem[]) => Promise<boolean>;
  resetCmsConfig: () => Promise<boolean>;

  isSavingLiveData: boolean;
  lastLiveDataSyncedAt: string | null;
}

const LiveDataContext = createContext<LiveDataContextType>({
  doctors: doctorsData,
  saveDoctor: async () => false,
  deleteDoctor: async () => false,
  addDoctor: async () => false,
  resetDoctors: async () => false,

  cmsConfig: DEFAULT_CMS_CONFIG,
  updateCmsConfig: async () => false,
  toggleCmsSection: async () => false,
  reorderCmsSections: async () => false,
  resetCmsConfig: async () => false,

  isSavingLiveData: false,
  lastLiveDataSyncedAt: null,
});

const DOCTORS_STORAGE_KEY = 'kynexis_live_doctors_v2';
const CMS_STORAGE_KEY = 'kynexis_live_cms_v2';

export const LiveDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem(DOCTORS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return doctorsData;
  });

  const [cmsConfig, setCmsConfig] = useState<CmsConfig>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) return { ...DEFAULT_CMS_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      // ignore
    }
    return DEFAULT_CMS_CONFIG;
  });

  const [isSavingLiveData, setIsSavingLiveData] = useState(false);
  const [lastLiveDataSyncedAt, setLastLiveDataSyncedAt] = useState<string | null>(null);

  // 1. Real-Time Listener for Doctors Faculty from Firestore
  useEffect(() => {
    if (!db) return;
    try {
      const docRef = doc(db, 'settings', 'doctors');
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data && Array.isArray(data.list) && data.list.length > 0) {
            setDoctors(data.list);
            try {
              localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(data.list));
            } catch (err) {}
            setLastLiveDataSyncedAt(new Date().toLocaleTimeString());
          }
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Doctors live listener note:', err);
    }
  }, []);

  // 2. Real-Time Listener for Website CMS & Sections from Firestore
  useEffect(() => {
    if (!db) return;
    try {
      const docRef = doc(db, 'settings', 'cms');
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Partial<CmsConfig>;
          if (data) {
            setCmsConfig((prev) => {
              const merged = { ...prev, ...data };
              try {
                localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(merged));
              } catch (err) {}
              return merged;
            });
            setLastLiveDataSyncedAt(new Date().toLocaleTimeString());
          }
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('CMS live listener note:', err);
    }
  }, []);

  // Save Doctors to Firestore & Local Storage
  const persistDoctors = useCallback(async (newList: Doctor[]): Promise<boolean> => {
    setIsSavingLiveData(true);
    setDoctors(newList);
    try {
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {}

    let success = false;
    if (db) {
      try {
        const docRef = doc(db, 'settings', 'doctors');
        await setDoc(docRef, { list: newList, updatedAt: new Date().toISOString() }, { merge: true });
        success = true;
        setLastLiveDataSyncedAt(new Date().toLocaleTimeString());
      } catch (err) {
        console.warn('Doctors Firestore persist note:', err);
      }
    }
    setIsSavingLiveData(false);
    return success;
  }, []);

  const saveDoctor = async (updated: Doctor): Promise<boolean> => {
    const newList = doctors.map((d) => (d.id === updated.id ? updated : d));
    return await persistDoctors(newList);
  };

  const addDoctor = async (newDoc: Doctor): Promise<boolean> => {
    const newList = [newDoc, ...doctors];
    return await persistDoctors(newList);
  };

  const deleteDoctor = async (doctorId: string): Promise<boolean> => {
    const newList = doctors.filter((d) => d.id !== doctorId);
    return await persistDoctors(newList);
  };

  const resetDoctors = async (): Promise<boolean> => {
    return await persistDoctors(doctorsData);
  };

  // Save CMS Config to Firestore & Local Storage
  const persistCms = useCallback(async (newCms: CmsConfig): Promise<boolean> => {
    setIsSavingLiveData(true);
    const stamped: CmsConfig = { ...newCms, updatedAt: new Date().toISOString() };
    setCmsConfig(stamped);
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(stamped));
    } catch (e) {}

    let success = false;
    if (db) {
      try {
        const docRef = doc(db, 'settings', 'cms');
        await setDoc(docRef, stamped, { merge: true });
        success = true;
        setLastLiveDataSyncedAt(new Date().toLocaleTimeString());
      } catch (err) {
        console.warn('CMS Firestore persist note:', err);
      }
    }
    setIsSavingLiveData(false);
    return success;
  }, []);

  const updateCmsConfig = async (patch: Partial<CmsConfig>): Promise<boolean> => {
    return await persistCms({ ...cmsConfig, ...patch });
  };

  const toggleCmsSection = async (sectionId: string): Promise<boolean> => {
    const updatedSections = cmsConfig.sections.map((s) =>
      s.id === sectionId ? { ...s, enabled: !s.enabled } : s
    );
    return await persistCms({ ...cmsConfig, sections: updatedSections });
  };

  const reorderCmsSections = async (newSections: CmsSectionItem[]): Promise<boolean> => {
    return await persistCms({ ...cmsConfig, sections: newSections });
  };

  const resetCmsConfig = async (): Promise<boolean> => {
    return await persistCms(DEFAULT_CMS_CONFIG);
  };

  return (
    <LiveDataContext.Provider
      value={{
        doctors,
        saveDoctor,
        deleteDoctor,
        addDoctor,
        resetDoctors,
        cmsConfig,
        updateCmsConfig,
        toggleCmsSection,
        reorderCmsSections,
        resetCmsConfig,
        isSavingLiveData,
        lastLiveDataSyncedAt,
      }}
    >
      {children}
    </LiveDataContext.Provider>
  );
};

export const useLiveData = () => useContext(LiveDataContext);
