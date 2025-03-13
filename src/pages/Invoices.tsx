
import React, { useEffect } from "react";
import InvoicesList from "@/features/invoices/InvoicesList";
import { useLanguage } from "@/context/LanguageContext";

const Invoices: React.FC = () => {
  const { language } = useLanguage();
  
  return <InvoicesList language={language} />;
};

export default Invoices;
