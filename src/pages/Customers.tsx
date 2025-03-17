
import React from "react";
import CustomersList from "@/features/customers/CustomersList";
import { useLanguage } from "@/context/LanguageContext";

const CustomersPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <CustomersList />
    </div>
  );
};

export default CustomersPage;
