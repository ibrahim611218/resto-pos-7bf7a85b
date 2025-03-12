
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

const PosHeader: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useBusinessSettings();
  const isArabic = language === "ar";

  return (
    <div className="bg-[#004d40] text-white p-4 border-b flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex items-center gap-2">
        <img src="/assets/restopos-logo.png" alt="RestoPOS" className="h-10 w-10" />
        <div>
          <span className="text-[#00825A] font-bold">Resto</span>
          <span className="text-[#FF6B00] font-bold">POS</span>
        </div>
      </div>
      <div className="flex-1 text-xl font-semibold flex items-center justify-between">
        <span>{isArabic ? "نقاط البيع" : "Point of Sale"}</span>
        {settings.logo && (
          <img 
            src={settings.logo} 
            alt={settings.nameAr || settings.name || "Restaurant Logo"} 
            className="h-8 mr-2 object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default PosHeader;
