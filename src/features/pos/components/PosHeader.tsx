
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import InvoiceSearchBar from "./InvoiceSearchBar";

interface PosHeaderProps {
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
  handleInvoiceSearch: () => void;
}

const PosHeader: React.FC<PosHeaderProps> = ({
  invoiceNumber,
  setInvoiceNumber,
  handleInvoiceSearch,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="bg-muted/20 p-4 border-b flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex-1 text-xl font-semibold">
        {isArabic ? "نقاط البيع" : "Point of Sale"}
      </div>
      <InvoiceSearchBar
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        handleInvoiceSearch={handleInvoiceSearch}
      />
    </div>
  );
};

export default PosHeader;
