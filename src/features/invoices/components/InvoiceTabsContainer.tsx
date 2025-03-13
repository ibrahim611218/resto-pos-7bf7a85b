
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceTabPanel from "./InvoiceTabPanel";
import { Invoice } from "@/types";

interface InvoiceTabsContainerProps {
  filteredInvoices: Invoice[];
  isArabic: boolean;
  formatInvoiceDate: (date: Date) => string;
  getStatusBadgeColor: (status: "completed" | "cancelled" | "refunded" | "pending") => string;
  viewInvoiceDetails: (id: string) => void;
  printInvoice: (invoice: Invoice) => void;
}

const InvoiceTabsContainer: React.FC<InvoiceTabsContainerProps> = ({
  filteredInvoices,
  isArabic,
  formatInvoiceDate,
  getStatusBadgeColor,
  viewInvoiceDetails,
  printInvoice
}) => {
  return (
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
          printInvoice={printInvoice}
        />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <InvoiceTabPanel
          invoices={filteredInvoices}
          isArabic={isArabic}
          formatInvoiceDate={formatInvoiceDate}
          getStatusBadgeColor={getStatusBadgeColor}
          viewInvoiceDetails={viewInvoiceDetails}
          printInvoice={printInvoice}
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
          printInvoice={printInvoice}
          filteredStatus="refunded"
          showHeader={false}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InvoiceTabsContainer;
