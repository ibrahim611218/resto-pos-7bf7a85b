
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InvoiceSearchBarProps {
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
  handleInvoiceSearch: () => void;
}

const InvoiceSearchBar: React.FC<InvoiceSearchBarProps> = ({
  invoiceNumber,
  setInvoiceNumber,
  handleInvoiceSearch,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <Input
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        placeholder={isArabic ? "رقم الفاتورة" : "Invoice Number"}
        className="flex-1 min-w-[200px]"
      />
      <Button
        variant="outline"
        onClick={handleInvoiceSearch}
        className="flex gap-2 items-center whitespace-nowrap"
      >
        <Receipt className="h-4 w-4" />
        {isArabic ? "استرجاع الفاتورة" : "Return Invoice"}
      </Button>
    </div>
  );
};

export default InvoiceSearchBar;
