
import { useState, useEffect, useCallback } from "react";
import { LicenseState } from "@/types/license";
import licenseService from "@/services/license/LicenseService";
import { toast } from "sonner";

export const useLicense = () => {
  const [licenseState, setLicenseState] = useState<LicenseState>({ isLicensed: false });
  const [loading, setLoading] = useState(true);

  const fetchLicenseState = useCallback(async () => {
    try {
      setLoading(true);
      const state = await licenseService.getLicenseState();
      setLicenseState(state);
      return state;
    } catch (error) {
      console.error("Error fetching license state:", error);
      return { isLicensed: false };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLicenseState();
  }, [fetchLicenseState]);

  const activateLicense = async (licenseKey: string) => {
    try {
      setLoading(true);
      const result = await licenseService.activateLicense(licenseKey);
      
      if (result.success) {
        const newState = await fetchLicenseState();
        toast.success(
          newState.isTrial 
            ? "تم تفعيل الإصدار التجريبي بنجاح" 
            : "تم تفعيل الترخيص بنجاح"
        );
        return true;
      } else {
        toast.error(result.error || "فشل في تفعيل الترخيص");
        return false;
      }
    } catch (error) {
      console.error("Error activating license:", error);
      toast.error("حدث خطأ أثناء تفعيل الترخيص");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deactivateLicense = async () => {
    try {
      setLoading(true);
      const result = await licenseService.deactivateLicense();
      
      if (result.success) {
        await fetchLicenseState();
        toast.success("تم إلغاء تفعيل الترخيص بنجاح");
        return true;
      } else {
        toast.error(result.error || "فشل في إلغاء تفعيل الترخيص");
        return false;
      }
    } catch (error) {
      console.error("Error deactivating license:", error);
      toast.error("حدث خطأ أثناء إلغاء تفعيل الترخيص");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a 1-day trial license key
  const generateOneDayTrialKey = () => {
    // Create type prefix for one-day trial
    const prefix = "T";
    
    // Random alphanumeric characters
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));
    
    // Generate parts of the key with special "1D" marker for one-day trial
    const firstPart = prefix + "1D" + getRandomChar();
    const secondPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    const thirdPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    const fourthPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    
    return `${firstPart}-${secondPart}-${thirdPart}-${fourthPart}`;
  };

  return {
    licenseState,
    loading,
    activateLicense,
    deactivateLicense,
    fetchLicenseState,
    generateOneDayTrialKey
  };
};
