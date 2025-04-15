
import { useState, useEffect, useRef } from 'react';
import licenseService, { License, LicenseStatus } from '@/services/license/LicenseService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useLicense = () => {
  const [license, setLicense] = useState<License | null>(null);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>({
    isActive: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const initialCheckComplete = useRef(false);

  // Check if license is active
  const checkLicense = async () => {
    try {
      console.log("Starting checkLicense function");
      setIsLoading(true);
      const activeLicense = await licenseService.getActivatedLicense();
      console.log("Got active license:", activeLicense ? "Yes" : "No");
      setLicense(activeLicense);
      
      const status = await licenseService.getLicenseStatus();
      console.log("License status:", status);
      setLicenseStatus(status);
      
      // Show warning toast if license is about to expire
      if (status.showWarning) {
        toast.warning(
          `الترخيص سينتهي قريباً - ${status.daysLeft} يوم متبقي`,
          {
            duration: 7000,
            position: 'top-center'
          }
        );
      }
      
      return status.isActive;
    } catch (error) {
      console.error('Error checking license:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get license info
  const getLicenseInfo = async () => {
    try {
      const activeLicense = await licenseService.getActivatedLicense();
      return activeLicense;
    } catch (error) {
      console.error('Error getting license info:', error);
      return null;
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

  // Check license on first load - only once
  useEffect(() => {
    // Skip if we've already done the initial check
    if (initialCheckComplete.current) return;
    
    const initialCheck = async () => {
      try {
        await checkLicense();
      } catch (error) {
        console.error('Error during initial license check:', error);
      } finally {
        initialCheckComplete.current = true;
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
