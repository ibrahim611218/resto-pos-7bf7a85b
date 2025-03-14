
import { useState, useEffect, useCallback } from "react";
import { LicenseState } from "@/types/license";
import licenseService from "@/services/license/LicenseService";
import { toast } from "sonner";
import { generateSecureLicenseKey } from "@/utils/license/licenseUtils";

export const useLicense = () => {
  const [licenseState, setLicenseState] = useState<LicenseState>({ isLicensed: false });
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false);

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

  // Function to enter admin mode with password
  const enterAdminMode = (password: string): boolean => {
    // Replace this with your own secure admin password verification
    const adminPassword = "d19s7d5f1g56df1g65df1g";
    const isCorrect = password === adminPassword;
    
    if (isCorrect) {
      setAdminMode(true);
      return true;
    }
    return false;
  };

  // Generate a secure license key that only you would know
  const generateSecureLicenseKey = (type: string, days: number) => {
    if (!adminMode) {
      return null; // Only admin can generate secure keys
    }
    
    return generateSecureLicenseKeyInternal(type, days);
  };

  // Internal function with the actual key generation logic
  const generateSecureLicenseKeyInternal = (type: string, days: number) => {
    // You can customize this with your own algorithm that only you know
    const typePrefix = type === "trial" ? "T" : type === "monthly" ? "M" : "Y";
    const secretPattern = type === "trial" ? "SEC" : type === "monthly" ? "ADM" : "PRO";
    
    // Use a format that includes your personal encoding pattern
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));
    
    // Add days encoding to the key (only you know this pattern)
    const daysEncoded = encodeNumberToChars(days);
    
    const firstPart = typePrefix + secretPattern.substring(0, 2);
    const secondPart = daysEncoded + Array(2).fill(0).map(() => getRandomChar()).join("");
    const thirdPart = secretPattern.substring(2) + Array(3).fill(0).map(() => getRandomChar()).join("");
    const fourthPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    
    return `${firstPart}-${secondPart}-${thirdPart}-${fourthPart}`;
  };

  // Helper function to encode number to characters (your secret algorithm)
  const encodeNumberToChars = (num: number): string => {
    // Simple encoding: convert to base 36 and take first 2 chars
    // You can make this more complex as needed
    const encoded = num.toString(36).toUpperCase().padStart(2, '0');
    return encoded.substring(0, 2);
  };

  return {
    licenseState,
    loading,
    activateLicense,
    deactivateLicense,
    fetchLicenseState,
    generateOneDayTrialKey,
    enterAdminMode,
    generateSecureLicenseKey,
    isAdminMode: adminMode
  };
};
