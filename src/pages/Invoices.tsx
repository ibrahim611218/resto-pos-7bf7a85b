
import React from "react";
import InvoicesList from "@/features/invoices/InvoicesList";
import { useLanguage } from "@/context/LanguageContext";

const Invoices: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <InvoicesList language={language} />
    </div>
  );
};

export default Invoices;
