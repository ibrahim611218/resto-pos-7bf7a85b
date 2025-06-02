
import React, { useEffect } from "react";
import BusinessSettingsForm from "@/features/settings/BusinessSettingsForm";
import { useLanguage } from "@/context/LanguageContext";

const BusinessSettings = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  useEffect(() => {
    const storedSettings = localStorage.getItem("display-settings");
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        if (settings.touchMode) {
          document.body.classList.add("touch-target-fix");
        }
      } catch (error) {
        console.error("Error loading stored display settings:", error);
      }
    }
  }, []);
  
  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <BusinessSettingsForm />
    </div>
  );
};

export default BusinessSettings;
