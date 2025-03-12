
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const PosHeader: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="bg-[#004d40] text-white p-4 border-b flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex items-center gap-2">
        <img src="/assets/restopos-logo.png" alt="RestoPOS" className="h-8 w-8" />
        <div>
          <span className="text-white font-bold">Resto</span>
          <span className="text-orange-500 font-bold">POS</span>
        </div>
      </div>
      <div className="flex-1 text-xl font-semibold">
        {isArabic ? "نقاط البيع" : "Point of Sale"}
      </div>
    </div>
  );
};

export default PosHeader;
