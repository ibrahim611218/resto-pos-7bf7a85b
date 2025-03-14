
import { useState, useEffect } from 'react';
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

  // Check if license is active
  const checkLicense = async () => {
    try {
      setIsLoading(true);
      const activeLicense = await licenseService.getActivatedLicense();
      setLicense(activeLicense);
      
      const status = await licenseService.getLicenseStatus();
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

  // Activate a license
  const activateLicense = async (licenseKey: string) => {
    try {
      setIsLoading(true);
      const result = await licenseService.activateLicense(licenseKey);
      
      if (result.success) {
        setLicense(result.license || null);
        await checkLicense();
        toast.success('تم تفعيل الترخيص بنجاح');
        return true;
      } else {
        toast.error(result.message || 'فشل التفعيل');
        return false;
      }
    } catch (error) {
      console.error('Error activating license:', error);
      toast.error('حدث خطأ أثناء التفعيل');
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

  // Check license on first load
  useEffect(() => {
    checkLicense();
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
