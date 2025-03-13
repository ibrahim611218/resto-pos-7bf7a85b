
import React from "react";
import SearchBox from "./SearchBox";

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
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InvoiceListHeader;
