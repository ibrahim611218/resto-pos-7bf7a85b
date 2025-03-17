
import React from "react";
import PosContainer from "./PosContainer";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

/**
 * Main POS component that acts as an entry point
 */
const Pos: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  
  return (
    <div 
      className={`w-full h-full overflow-hidden ${theme === 'dark' ? 'bg-background' : 'bg-gray-50'} rounded-lg max-w-[100vw] mx-auto`} 
      dir={isArabic ? "rtl" : "ltr"}
    >
      <PosContainer />
    </div>
  );
};

export default Pos;
