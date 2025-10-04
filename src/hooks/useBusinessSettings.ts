
import { useState, useEffect } from "react";
import { BusinessSettings } from "@/types";
import databaseService from "@/services/index";

export const useBusinessSettings = () => {
  const [settings, setSettings] = useState<BusinessSettings>({
    name: "مطعم الذواق",
    nameAr: "مطعم الذواق",
    taxNumber: "300000000000003",
    address: "الرياض، المملكة العربية السعودية",
    addressAr: "الرياض، المملكة العربية السعودية",
    phone: "966500000000",
    email: "info@example.com",
    taxRate: 15,
    taxIncluded: false,
    taxEnabled: true,
    showAddress: true,
    showPhone: true,
    showEmail: true,
    invoiceNotesAr: "شكراً لزيارتكم"
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const loadedSettings = await databaseService.getSettings();
        if (loadedSettings) {
          setSettings(loadedSettings);
        }
      } catch (error) {
        console.error("Error loading business settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (partialSettings: Partial<BusinessSettings>) => {
    try {
      setLoading(true);
      
      // Ensure taxRate is a valid number
      if (partialSettings.taxRate !== undefined) {
        const taxRateValue = Number(partialSettings.taxRate);
        if (isNaN(taxRateValue)) {
          partialSettings.taxRate = settings.taxRate; // Keep the previous value if invalid
        } else {
          partialSettings.taxRate = taxRateValue;
        }
      }
      
      // Create a new settings object by merging the current settings with the partial update
      const newSettings = { ...settings, ...partialSettings };
      
      const result = await databaseService.saveSettings(newSettings);
      
      if (result.success) {
        setSettings(newSettings);
        return true;
      } else {
        console.error("Failed to save settings:", "Unknown error");
        return false;
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    loading,
    updateSettings
  };
};
