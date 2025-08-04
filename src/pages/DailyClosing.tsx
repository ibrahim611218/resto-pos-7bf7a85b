import React from "react";
import DailyClosingManager from "@/components/DailyClosingManager";
import { useLanguage } from "@/context/LanguageContext";

const DailyClosingPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isArabic ? "تقفيل اليومية" : "Daily Closing"}
        </h1>
        <p className="text-muted-foreground">
          {isArabic 
            ? "إدارة المبيعات والمصروفات والكاش اليومي" 
            : "Manage daily sales, expenses, and cash flow"
          }
        </p>
      </div>
      
      <DailyClosingManager isArabic={isArabic} />
    </div>
  );
};

export default DailyClosingPage;