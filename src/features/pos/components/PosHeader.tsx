
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useTheme } from "@/context/ThemeContext";

const PosHeader: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useBusinessSettings();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  const isLightTheme = theme === "light";
  const isDarkTheme = theme === "dark";

  return (
    <div className={`${isLightTheme ? 'bg-white text-[#004d40] shadow-sm' : isDarkTheme ? 'bg-black text-white' : 'bg-[#004d40] text-white'} p-4 border-b flex flex-col sm:flex-row gap-3 items-center transition-colors duration-300`}>
      <div className="flex items-center gap-2">
        <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" alt="RestoPOS" className="h-10 w-10" />
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
