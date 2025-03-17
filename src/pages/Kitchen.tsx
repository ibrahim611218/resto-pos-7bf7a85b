
import React from "react";
import KitchenOrders from "@/features/kitchen/KitchenOrders";
import { Language } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface KitchenProps {
  language?: Language;
}

const Kitchen: React.FC<KitchenProps> = ({ language: propLanguage }) => {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <KitchenOrders language={language} />
    </div>
  );
};

export default Kitchen;
