
import React from "react";
import VatReport from "@/features/reports/vat-report/VatReport";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const VatReportPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <VatReport />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default VatReportPage;
