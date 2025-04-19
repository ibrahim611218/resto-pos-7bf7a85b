
import React, { useState } from "react";
import { Language } from "@/types";
import KitchenOrdersList from "./components/KitchenOrdersList";
import ChefCompletionStats from "./components/ChefCompletionStats";
import DailyKitchenReport from "./components/DailyKitchenReport";

interface KitchenOrdersProps {
  language: Language;
}

const KitchenOrders: React.FC<KitchenOrdersProps> = ({ language }) => {
  const isArabic = language === "ar";
  const [showStats, setShowStats] = useState(false);
  
  return (
    <div 
      className={`container mx-auto p-4 ${isArabic ? "font-[system-ui]" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "إدارة طلبات المطبخ" : "Kitchen Orders Management"}
        </h1>
        <button
          onClick={() => setShowStats(!showStats)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          {isArabic ? "إحصائيات الشيفات" : "Chef Stats"}
        </button>
      </div>
      
      {/* Add Daily Report Section */}
      <div className="mb-6">
        <DailyKitchenReport />
      </div>
      
      {showStats ? (
        <ChefCompletionStats language={language} />
      ) : (
        <KitchenOrdersList language={language} />
      )}
    </div>
  );
};

export default KitchenOrders;
