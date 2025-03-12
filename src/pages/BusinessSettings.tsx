
import React from "react";
import BusinessSettingsForm from "@/features/settings/BusinessSettingsForm";
import { useLanguage } from "@/context/LanguageContext";

const BusinessSettings = () => {
  const { language } = useLanguage();
  return <BusinessSettingsForm language={language} />;
};

export default BusinessSettings;
