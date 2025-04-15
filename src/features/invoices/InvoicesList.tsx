
import React, { useEffect } from "react";
import { useInvoices } from "./hooks/useInvoices";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import InvoiceListHeader from "./components/InvoiceListHeader";
import InvoiceTabsContainer from "./components/InvoiceTabsContainer";
import { handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { Invoice } from "@/types";

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

  const handlePrintInvoice = (invoice: Invoice) => {
    handleInvoiceExport("print", invoice, settings);
  };

  // Create adapter function to match expected parameter types
  const handleViewInvoiceDetails = (id: string) => {
    const invoice = filteredInvoices.find(inv => inv.id === id);
    if (invoice) {
      viewInvoiceDetails(invoice);
    }
  };

  // Create adapter function for refund
  const handleRefundInvoice = (invoiceId: string): boolean => {
    const invoice = filteredInvoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      refundInvoice(invoice);
      return true;
    }
    return false;
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
        viewInvoiceDetails={handleViewInvoiceDetails}
        printInvoice={handlePrintInvoice}
      />

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        open={!!selectedInvoice}
        onClose={closeInvoiceDetails}
        formatInvoiceDate={formatInvoiceDate}
        onPrint={handlePrintInvoice}
        onRefund={handleRefundInvoice}
      />
    </div>
  );
};

export default InvoicesList;
