
import React, { useEffect } from "react";
import { useInvoices } from "./hooks/useInvoices";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import InvoiceListHeader from "./components/InvoiceListHeader";
import InvoiceTabsContainer from "./components/InvoiceTabsContainer";
import { handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

interface InvoicesListProps {
  language?: "en" | "ar";
}

const InvoicesList: React.FC<InvoicesListProps> = ({ language = "ar" }) => {
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  const {
    invoices,
    filteredInvoices,
    selectedInvoice,
    searchTerm,
    setSearchTerm,
    viewInvoiceDetails,
    closeInvoiceDetails,
    formatInvoiceDate,
    getStatusBadgeColor,
    printInvoice,
    refundInvoice,
    loadInvoicesFromStorage
  } = useInvoices();

  // Load invoices from localStorage on component mount
  useEffect(() => {
    loadInvoicesFromStorage();
  }, [loadInvoicesFromStorage]);

  const handlePrintInvoice = (invoice: any) => {
    handleInvoiceExport("print", invoice, settings);
  };

  return (
    <div className="container mx-auto py-6" dir={isArabic ? "rtl" : "ltr"}>
      <InvoiceListHeader
        title={isArabic ? "الفواتير" : "Invoices"}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={isArabic ? "بحث عن فاتورة..." : "Search invoices..."}
      />

      <InvoiceTabsContainer
        filteredInvoices={filteredInvoices}
        isArabic={isArabic}
        formatInvoiceDate={formatInvoiceDate}
        getStatusBadgeColor={getStatusBadgeColor}
        viewInvoiceDetails={viewInvoiceDetails}
        printInvoice={handlePrintInvoice}
      />

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        open={!!selectedInvoice}
        onClose={closeInvoiceDetails}
        formatInvoiceDate={formatInvoiceDate}
        onPrint={handlePrintInvoice}
        onRefund={refundInvoice}
      />
    </div>
  );
};

export default InvoicesList;
