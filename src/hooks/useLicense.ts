
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
        await fetchLicenseState();
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

  return {
    licenseState,
    loading,
    activateLicense,
    deactivateLicense,
    fetchLicenseState
  };
};
