
import React, { useEffect, useState } from "react";
import { useInvoices } from "./hooks/useInvoices";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import InvoiceListHeader from "./components/InvoiceListHeader";
import InvoiceTabsContainer from "./components/InvoiceTabsContainer";
import { ReturnOrderDialog } from "./components/ReturnOrderDialog";
import { handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { Invoice } from "@/types";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

interface InvoicesListProps {
  language?: "en" | "ar";
}

const InvoicesList: React.FC<InvoicesListProps> = ({ language = "ar" }) => {
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [selectedInvoiceForReturn, setSelectedInvoiceForReturn] = useState<Invoice | null>(null);
  
  // Add date filter states
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  
  const [startDate, setStartDate] = useState<Date | undefined>(today);
  const [endDate, setEndDate] = useState<Date | undefined>(endOfToday);
  
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
    if (!settings) {
      console.warn("Business settings not available, using defaults");
    }
    handleInvoiceExport("print", invoice, settings);
  };

  const handleViewInvoiceDetails = (id: string) => {
    const invoice = filteredInvoices.find(inv => inv.id === id);
    if (invoice) {
      viewInvoiceDetails(invoice);
    }
  };

  const handleRefundClick = (invoice: Invoice) => {
    setSelectedInvoiceForReturn(invoice);
    setShowReturnDialog(true);
  };

  const handleReturnConfirm = (reason: string) => {
    if (selectedInvoiceForReturn) {
      refundInvoice(selectedInvoiceForReturn);
      toast.success(isArabic 
        ? `تم استرداد الفاتورة رقم ${selectedInvoiceForReturn.number} بنجاح` 
        : `Invoice #${selectedInvoiceForReturn.number} has been refunded successfully`
      );
      setShowReturnDialog(false);
      setSelectedInvoiceForReturn(null);
    }
  };

  // Filter invoices by date range
  const dateFilteredInvoices = filteredInvoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    if (startDate && invoiceDate < startDate) return false;
    if (endDate && invoiceDate > endDate) return false;
    return true;
  });

  return (
    <div className="container mx-auto py-6" dir={isArabic ? "rtl" : "ltr"}>
      <InvoiceListHeader
        title={isArabic ? "الفواتير" : "Invoices"}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={isArabic ? "بحث عن فاتورة..." : "Search invoices..."}
      />
      
      {/* Date filters */}
      <div className="mb-4 p-4 bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{isArabic ? "من تاريخ" : "Start Date"}</Label>
            <DatePicker
              selected={startDate}
              onSelect={setStartDate}
              placeholderText={isArabic ? "اختر تاريخ البداية" : "Select start date"}
            />
          </div>
          <div className="space-y-2">
            <Label>{isArabic ? "إلى تاريخ" : "End Date"}</Label>
            <DatePicker
              selected={endDate}
              onSelect={setEndDate}
              placeholderText={isArabic ? "اختر تاريخ النهاية" : "Select end date"}
            />
          </div>
        </div>
      </div>

      <InvoiceTabsContainer
        filteredInvoices={dateFilteredInvoices}
        isArabic={isArabic}
        formatInvoiceDate={formatInvoiceDate}
        getStatusBadgeColor={getStatusBadgeColor}
        viewInvoiceDetails={handleViewInvoiceDetails}
        printInvoice={handlePrintInvoice}
        onRefund={handleRefundClick}
      />

      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          open={!!selectedInvoice}
          onClose={closeInvoiceDetails}
          formatInvoiceDate={formatInvoiceDate}
          onPrint={handlePrintInvoice}
          onRefund={(invoice) => {
            handleRefundClick(invoice);
            return true;
          }}
        />
      )}

      {showReturnDialog && selectedInvoiceForReturn && (
        <ReturnOrderDialog
          isOpen={showReturnDialog}
          onClose={() => setShowReturnDialog(false)}
          onConfirm={handleReturnConfirm}
          invoice={selectedInvoiceForReturn}
        />
      )}
    </div>
  );
};

export default InvoicesList;
