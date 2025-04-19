
import { useState, useEffect, useRef } from 'react';
import licenseService, { License, LicenseStatus } from '@/services/license/LicenseService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useLicense = () => {
  const [license, setLicense] = useState<License | null>(null);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>({
    isActive: true // Always set to true to work offline
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialCheckComplete = useRef(true); // Set to true to skip initial check
  const checkInProgress = useRef(false);
  const isOffline = useRef(true); // Always consider as offline

  // Check if license is active - always returns true in offline mode
  const checkLicense = async () => {
    // In offline mode, license is always considered active
    return true;
  };
  
  // Create default license object for offline mode
  const createDefaultLicense = (): License => {
    const now = Date.now();
    return {
      key: 'OFFLINE-LICENSE',
      type: 'full',
      issuedAt: now,
      expiryDate: now + 365 * 24 * 60 * 60 * 1000, // 1 year
      durationDays: 365,
      used: true,
      activatedAt: now
    };
  };

  // Get license info - always returns a valid license in offline mode
  const getLicenseInfo = async () => {
    return createDefaultLicense();
  };

  // Activate license - always successful in offline mode
  const activateLicense = async (licenseKey: string): Promise<boolean> => {
    setLicense(createDefaultLicense());
    return true;
  };

  // Generate a license - always successful in offline mode
  const generateLicense = async (type: 'trial' | 'full', durationDays: number) => {
    return {
      success: true,
      license: createDefaultLicense()
    };
  };

  // Get all licenses - returns a default license in offline mode
  const getAllLicenses = async () => {
    return [createDefaultLicense()];
  };

  // Always allow access in offline mode
  const requireLicense = () => true;

  useEffect(() => {
    // In offline mode, immediately set a default license
    const offlineLicense = createDefaultLicense();
    setLicense(offlineLicense);
    localStorage.setItem('active-license', JSON.stringify(offlineLicense));
    
    // Set license status to active
    setLicenseStatus({
      isActive: true,
      daysLeft: 365,
      type: 'full'
    });
  }, []);

  return {
    license,
    licenseStatus,
    isLoading: false,
    checkLicense,
    getLicenseInfo,
    activateLicense,
    generateLicense,
    getAllLicenses,
    requireLicense
  };
};
