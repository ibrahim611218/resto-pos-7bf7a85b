
import React from "react";
import PosContainer from "./PosContainer";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Main POS component that acts as an entry point
 */
const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="w-full h-full overflow-auto" dir={isArabic ? "rtl" : "ltr"}>
      <PosContainer />
    </div>
  );
};

export default Pos;
