
import React, { useEffect } from "react";
import { useInvoices } from "./hooks/useInvoices";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import SearchBox from "./components/SearchBox";
import InvoiceTabPanel from "./components/InvoiceTabPanel";
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "الفواتير" : "Invoices"}
        </h1>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن فاتورة..." : "Search invoices..."}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="all" className="flex-1">
            {isArabic ? "جميع الفواتير" : "All Invoices"}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            {isArabic ? "مكتملة" : "Completed"}
          </TabsTrigger>
          <TabsTrigger value="refunded" className="flex-1">
            {isArabic ? "مستردة" : "Refunded"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <InvoiceTabPanel
            invoices={filteredInvoices}
            isArabic={isArabic}
            formatInvoiceDate={formatInvoiceDate}
            getStatusBadgeColor={getStatusBadgeColor}
            viewInvoiceDetails={viewInvoiceDetails}
            printInvoice={handlePrintInvoice}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <InvoiceTabPanel
            invoices={filteredInvoices}
            isArabic={isArabic}
            formatInvoiceDate={formatInvoiceDate}
            getStatusBadgeColor={getStatusBadgeColor}
            viewInvoiceDetails={viewInvoiceDetails}
            printInvoice={handlePrintInvoice}
            filteredStatus="completed"
            showHeader={false}
          />
        </TabsContent>

        <TabsContent value="refunded" className="mt-0">
          <InvoiceTabPanel
            invoices={filteredInvoices}
            isArabic={isArabic}
            formatInvoiceDate={formatInvoiceDate}
            getStatusBadgeColor={getStatusBadgeColor}
            viewInvoiceDetails={viewInvoiceDetails}
            printInvoice={handlePrintInvoice}
            filteredStatus="refunded"
            showHeader={false}
          />
        </TabsContent>
      </Tabs>

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
