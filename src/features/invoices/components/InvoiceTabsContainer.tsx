
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
  onRefund?: (invoice: Invoice) => void;
}

const InvoiceTabsContainer: React.FC<InvoiceTabsContainerProps> = ({
  filteredInvoices,
  isArabic,
  formatInvoiceDate,
  getStatusBadgeColor,
  viewInvoiceDetails,
  printInvoice,
  onRefund
}) => {
  const completedInvoices = filteredInvoices.filter(inv => inv.status === "completed");
  const refundedInvoices = filteredInvoices.filter(inv => inv.status === "refunded");

  return (
    <Tabs defaultValue="all" className="mt-6">
      <TabsList>
        <TabsTrigger value="all">
          {isArabic ? "جميع الفواتير" : "All Invoices"}
        </TabsTrigger>
        <TabsTrigger value="completed">
          {isArabic ? "الفواتير المكتملة" : "Completed"}
        </TabsTrigger>
        <TabsTrigger value="refunded">
          {isArabic ? "الفواتير المستردة" : "Refunded"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <InvoiceTabPanel
          title={isArabic ? "جميع الفواتير" : "All Invoices"}
          invoices={filteredInvoices}
          isArabic={isArabic}
          formatInvoiceDate={formatInvoiceDate}
          getStatusBadgeColor={getStatusBadgeColor}
          viewInvoiceDetails={viewInvoiceDetails}
          printInvoice={printInvoice}
          onRefund={onRefund}
        />
      </TabsContent>

      <TabsContent value="completed">
        <InvoiceTabPanel
          title={isArabic ? "الفواتير المكتملة" : "Completed Invoices"}
          invoices={completedInvoices}
          isArabic={isArabic}
          formatInvoiceDate={formatInvoiceDate}
          getStatusBadgeColor={getStatusBadgeColor}
          viewInvoiceDetails={viewInvoiceDetails}
          printInvoice={printInvoice}
          onRefund={onRefund}
          filteredStatus="completed"
        />
      </TabsContent>

      <TabsContent value="refunded">
        <InvoiceTabPanel
          title={isArabic ? "الفواتير المستردة" : "Refunded Invoices"}
          invoices={refundedInvoices}
          isArabic={isArabic}
          formatInvoiceDate={formatInvoiceDate}
          getStatusBadgeColor={getStatusBadgeColor}
          viewInvoiceDetails={viewInvoiceDetails}
          printInvoice={printInvoice}
          filteredStatus="refunded"
        />
      </TabsContent>
    </Tabs>
  );
};

export default InvoiceTabsContainer;
