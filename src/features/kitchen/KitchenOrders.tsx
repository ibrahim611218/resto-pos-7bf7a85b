
import React from "react";
import { Language } from "@/types";
import KitchenOrdersList from "./components/KitchenOrdersList";

interface KitchenOrdersProps {
  language: Language;
}

const KitchenOrders: React.FC<KitchenOrdersProps> = ({ language }) => {
  const isArabic = language === "ar";
  
  return (
    <div 
      className={`container mx-auto p-4 ${isArabic ? "font-[system-ui]" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <h1 className="text-2xl font-bold mb-6">
        {isArabic ? "إدارة طلبات المطبخ" : "Kitchen Orders Management"}
      </h1>
      
      <KitchenOrdersList language={language} />
    </div>
  );
};

export default KitchenOrders;
