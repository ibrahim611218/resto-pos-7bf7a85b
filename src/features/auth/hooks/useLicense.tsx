
import { useState, useEffect, useRef } from 'react';
import licenseService, { License, LicenseStatus } from '@/services/license/LicenseService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useLicense = () => {
  const [license, setLicense] = useState<License | null>(null);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>({
    isActive: true // Default to true to prevent blocking UI
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const initialCheckComplete = useRef(false);
  const checkInProgress = useRef(false);

  // Optimized check if license is active with timeout protection
  const checkLicense = async () => {
    try {
      // Prevent multiple simultaneous checks
      if (checkInProgress.current) {
        console.log("License check already in progress, skipping duplicate request");
        return licenseStatus.isActive;
      }
      
      checkInProgress.current = true;
      console.log("Starting checkLicense function");
      setIsLoading(true);
      
      // Add timeout protection
      const timeoutPromise = new Promise<License | null>(resolve => {
        setTimeout(() => {
          console.log("License check timeout, using cached or default license");
          resolve(license || createDefaultLicense());
        }, 2500); // 2.5 second timeout
      });
      
      // Race between actual check and timeout
      const activeLicense = await Promise.race([
        licenseService.getActivatedLicense(),
        timeoutPromise
      ]);
      
      console.log("Got active license:", activeLicense ? "Yes" : "No");
      setLicense(activeLicense);
      
      // Use timeout for status check as well
      const statusTimeoutPromise = new Promise<LicenseStatus>(resolve => {
        setTimeout(() => {
          console.log("License status check timeout, using default active status");
          resolve({ isActive: true });
        }, 1500); // 1.5 second timeout
      });
      
      const status = await Promise.race([
        licenseService.getLicenseStatus(),
        statusTimeoutPromise
      ]);
      
      console.log("License status:", status);
      setLicenseStatus(status);
      
      // Show warning toast if license is about to expire and warning is needed
      if (status.showWarning && status.daysLeft !== undefined) {
        toast.warning(
          `الترخيص سينتهي قريباً - ${status.daysLeft} يوم متبقي`,
          {
            duration: 7000,
            position: 'top-center'
          }
        );
      }
      
      checkInProgress.current = false;
      return status.isActive;
    } catch (error) {
      console.error('Error checking license:', error);
      checkInProgress.current = false;
      // Return true on error to not block the UI
      return true;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create default license object for fallbacks
  const createDefaultLicense = (): License => {
    const now = Date.now();
    return {
      key: 'DEFAULT-FALLBACK-LICENSE',
      type: 'trial',
      issuedAt: now,
      expiryDate: now + 30 * 24 * 60 * 60 * 1000,
      durationDays: 30,
      used: true,
      activatedAt: now
    };
  };

  // Get license info with timeout protection
  const getLicenseInfo = async () => {
    try {
      const timeoutPromise = new Promise<License | null>(resolve => {
        setTimeout(() => {
          console.log("getLicenseInfo timeout, returning cached or default license");
          resolve(license || createDefaultLicense());
        }, 2000);
      });
      
      return await Promise.race([
        licenseService.getActivatedLicense(),
        timeoutPromise
      ]);
    } catch (error) {
      console.error('Error getting license info:', error);
      return license || createDefaultLicense();
    }
  };

  // Activate a license with improved error handling
  const activateLicense = async (licenseKey: string): Promise<boolean> => {
    if (!licenseKey || licenseKey.trim() === '') {
      console.error('Invalid license key provided');
      return false;
    }

    try {
      console.log("بدء عملية التفعيل للرمز:", licenseKey);
      setIsLoading(true);
      
      // تنفيذ عملية التفعيل
      const result = await licenseService.activateLicense(licenseKey.trim());
      console.log("نتيجة التفعيل:", result);
      
      if (result && result.success) {
        setLicense(result.license || null);
        await checkLicense();
        console.log("تم التحقق من الرخصة");
        return true;
      } else {
        console.error("فشل التفعيل:", result?.message || 'سبب غير معروف');
        return false;
      }
    } catch (error) {
      console.error('خطأ خلال عملية التفعيل:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a license
  const generateLicense = async (type: 'trial' | 'full', durationDays: number) => {
    try {
      setIsLoading(true);
      const result = await licenseService.generateLicense(type, durationDays);
      
      if (result.success) {
        toast.success('تم إنشاء مفتاح الترخيص بنجاح');
        return result.license;
      } else {
        toast.error(result.message || 'فشل إنشاء مفتاح الترخيص');
        return null;
      }
    } catch (error) {
      console.error('Error generating license:', error);
      toast.error('حدث خطأ أثناء إنشاء مفتاح الترخيص');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get all licenses
  const getAllLicenses = async () => {
    try {
      return await licenseService.getAllLicenses();
    } catch (error) {
      console.error('Error getting all licenses:', error);
      return [];
    }
  };

  // Redirect to activation page if license is not active
  const requireLicense = () => {
    if (!isLoading && !licenseStatus.isActive) {
      navigate('/activate');
      return false;
    }
    return true;
  };

  // Check license on first load - only once and with timeout
  useEffect(() => {
    // Skip if we've already done the initial check
    if (initialCheckComplete.current) return;
    initialCheckComplete.current = true;
    
    const initialCheck = async () => {
      // Set a timeout for the entire operation
      const checkTimeout = setTimeout(() => {
        console.log("Initial license check timed out, using default active state");
        setLicenseStatus({ isActive: true });
        setIsLoading(false);
      }, 3000); // 3 second timeout for initial check
      
      try {
        await checkLicense();
      } catch (error) {
        console.error('Error during initial license check:', error);
        // Set default active state on error
        setLicenseStatus({ isActive: true });
      } finally {
        clearTimeout(checkTimeout);
        setIsLoading(false);
      }
    };
    
    initialCheck();
  }, []);

  return {
    license,
    licenseStatus,
    isLoading,
    checkLicense,
    getLicenseInfo,
    activateLicense,
    generateLicense,
    getAllLicenses,
    requireLicense
  };
};
