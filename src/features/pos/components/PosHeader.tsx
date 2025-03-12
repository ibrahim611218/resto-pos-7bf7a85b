
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useTheme } from "@/context/ThemeContext";
import { ShoppingBag } from "lucide-react";

const PosHeader: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useBusinessSettings();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  const isLightTheme = theme === "light";

  return (
    <div className={`${isLightTheme ? 'bg-gradient-to-r from-primary to-primary/90 text-white' : 'bg-[#004d40] text-white'} px-6 py-4 flex flex-col sm:flex-row gap-3 items-center transition-colors duration-300 shadow-md`}>
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow-md">
          <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" alt="RestoPOS" className="h-8 w-8" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-xl">Resto</span>
          <span className="text-amber-300 font-bold text-xl">POS</span>
        </div>
      </div>
      <div className="flex-1 text-xl font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span>{isArabic ? "نقاط البيع" : "Point of Sale"}</span>
        </div>
        {settings.logo && (
          <img 
            src={settings.logo} 
            alt={settings.nameAr || settings.name || "Restaurant Logo"} 
            className="h-8 mr-2 object-contain rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default PosHeader;
