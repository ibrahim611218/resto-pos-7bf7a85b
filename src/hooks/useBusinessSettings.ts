
import { useState, useEffect } from "react";
import { BusinessSettings } from "@/types";
import databaseService from "@/services/DatabaseService";

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

  const updateSettings = async (newSettings: BusinessSettings) => {
    try {
      setLoading(true);
      const result = await databaseService.saveSettings(newSettings);
      
      if (result.success) {
        setSettings(newSettings);
        return true;
      } else {
        console.error("Failed to save settings:", result.error);
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
