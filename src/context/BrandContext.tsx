import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BrandConfig, PresetLogoIcon } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  logoType: 'vector',
  customLogoUrl: '',
  brandName: 'KYNEXIS',
  tagline: 'HEALTH',
  showTagline: true,
  presetIcon: 'monogram_gold',
  primaryColor: '#112233',
  goldAccentColor: '#D4AF37',
  logoHeightMultiplier: 1.0,
  syncFavicon: true,
  openingPageImageUrl: '/src/assets/images/kynexis_luxury_clinic_hero_1787993777543.jpg',
  openingPageHeadline: 'Advanced Healthcare.',
  openingPageHeadlineAccent: 'Connected Expertise.',
  openingPageSubtitle: 'Experience comprehensive, patient-centered care with trusted specialists, modern facilities, and a coordinated approach to your wellbeing.',
  openingPageCtaText: 'Start Booking Your Consultant',
  showOpeningPageWallSign: true,
  updatedAt: new Date().toISOString(),
};

const STORAGE_KEY = 'kynexis_brand_configuration_v4';

interface BrandContextType {
  brandConfig: BrandConfig;
  updateBrandConfig: (patch: Partial<BrandConfig>) => Promise<boolean>;
  setCustomLogoImage: (dataUrlOrUrl: string) => Promise<boolean>;
  setOpeningPageImage: (dataUrlOrUrl: string) => Promise<boolean>;
  setPresetLogo: (preset: PresetLogoIcon) => Promise<boolean>;
  resetToDefaultBrand: () => Promise<boolean>;
  isSaving: boolean;
  isLiveDatabaseConnected: boolean;
  lastSavedAt: string | null;
  syncError: string | null;
}

const BrandContext = createContext<BrandContextType>({
  brandConfig: DEFAULT_BRAND_CONFIG,
  updateBrandConfig: async () => false,
  setCustomLogoImage: async () => false,
  setOpeningPageImage: async () => false,
  setPresetLogo: async () => false,
  resetToDefaultBrand: async () => false,
  isSaving: false,
  isLiveDatabaseConnected: false,
  lastSavedAt: null,
  syncError: null,
});

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_BRAND_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read brand config from localStorage:', e);
    }
    return DEFAULT_BRAND_CONFIG;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isLiveDatabaseConnected, setIsLiveDatabaseConnected] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Sync favicon if configured
  useEffect(() => {
    try {
      if (brandConfig.syncFavicon && brandConfig.customLogoUrl) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = brandConfig.customLogoUrl;
      }
    } catch (e) {
      console.warn('Favicon sync note:', e);
    }
  }, [brandConfig.syncFavicon, brandConfig.customLogoUrl]);

  // Real-time Cloud Sync: Listen to Firestore 'settings/branding' live across all devices
  useEffect(() => {
    if (!db) return;

    try {
      const brandingDocRef = doc(db, 'settings', 'branding');
      
      const unsubscribe = onSnapshot(
        brandingDocRef,
        (snap) => {
          setIsLiveDatabaseConnected(true);
          setSyncError(null);
          if (snap.exists()) {
            const remoteData = snap.data() as Partial<BrandConfig>;
            if (remoteData) {
              setBrandConfig((prev) => {
                const merged = { ...prev, ...remoteData };
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                } catch (err) {
                  // localStorage quota might trigger on huge files
                }
                return merged;
              });
              setLastSavedAt(new Date().toLocaleTimeString());
            }
          }
        },
        (error) => {
          console.warn('Firestore branding real-time sync warning:', error);
          setSyncError(error.message);
          setIsLiveDatabaseConnected(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore branding listener setup note:', err);
    }
  }, []);

  const saveConfig = useCallback(async (newConfig: BrandConfig): Promise<boolean> => {
    setIsSaving(true);
    setSyncError(null);

    const timestampedConfig: BrandConfig = {
      ...newConfig,
      updatedAt: new Date().toISOString(),
    };

    // 1. Optimistic local update
    setBrandConfig(timestampedConfig);

    // 2. Cache in localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timestampedConfig));
    } catch (e) {
      console.warn('localStorage caching note:', e);
    }

    // 3. Publish LIVE to Firestore Cloud Database
    let cloudSuccess = false;
    if (db) {
      try {
        const brandingDocRef = doc(db, 'settings', 'branding');
        await setDoc(brandingDocRef, timestampedConfig, { merge: true });
        cloudSuccess = true;
        setIsLiveDatabaseConnected(true);
        setLastSavedAt(new Date().toLocaleTimeString());
      } catch (err: any) {
        console.error('Firestore cloud publishing error:', err);
        setSyncError(err?.message || 'Failed to publish to database');
      }
    }

    setIsSaving(false);
    return cloudSuccess;
  }, []);

  const updateBrandConfig = async (patch: Partial<BrandConfig>): Promise<boolean> => {
    const updated = { ...brandConfig, ...patch };
    return await saveConfig(updated);
  };

  const setCustomLogoImage = async (dataUrlOrUrl: string): Promise<boolean> => {
    const updated: BrandConfig = {
      ...brandConfig,
      logoType: 'image',
      customLogoUrl: dataUrlOrUrl,
    };
    return await saveConfig(updated);
  };

  const setOpeningPageImage = async (dataUrlOrUrl: string): Promise<boolean> => {
    const updated: BrandConfig = {
      ...brandConfig,
      openingPageImageUrl: dataUrlOrUrl,
    };
    return await saveConfig(updated);
  };

  const setPresetLogo = async (preset: PresetLogoIcon): Promise<boolean> => {
    const updated: BrandConfig = {
      ...brandConfig,
      logoType: 'preset',
      presetIcon: preset,
    };
    return await saveConfig(updated);
  };

  const resetToDefaultBrand = async (): Promise<boolean> => {
    return await saveConfig(DEFAULT_BRAND_CONFIG);
  };

  return (
    <BrandContext.Provider
      value={{
        brandConfig,
        updateBrandConfig,
        setCustomLogoImage,
        setOpeningPageImage,
        setPresetLogo,
        resetToDefaultBrand,
        isSaving,
        isLiveDatabaseConnected,
        lastSavedAt,
        syncError,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    return {
      brandConfig: DEFAULT_BRAND_CONFIG,
      updateBrandConfig: async () => false,
      setCustomLogoImage: async () => false,
      setOpeningPageImage: async () => false,
      setPresetLogo: async () => false,
      resetToDefaultBrand: async () => false,
      isSaving: false,
      isLiveDatabaseConnected: false,
      lastSavedAt: null,
      syncError: null,
    };
  }
  return context;
};
