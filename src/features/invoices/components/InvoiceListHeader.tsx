
import React from "react";
import SearchBox from "./SearchBox";
import { useLanguage } from "@/context/LanguageContext";

interface InvoiceListHeaderProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
}

const InvoiceListHeader: React.FC<InvoiceListHeaderProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  placeholder
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InvoiceListHeader;
