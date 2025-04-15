
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedInvoiceTable from "./EnhancedInvoiceTable";
import { Invoice } from "@/types";

interface InvoiceTabPanelProps {
  title?: string;
  invoices: Invoice[];
  isArabic: boolean;
  formatInvoiceDate: (date: Date) => string;
  getStatusBadgeColor: (status: "completed" | "cancelled" | "refunded" | "pending") => string;
  viewInvoiceDetails: (id: string) => void;
  printInvoice: (invoice: Invoice) => void;
  onRefund?: (invoice: Invoice) => void;
  filteredStatus?: "completed" | "refunded" | null;
  showHeader?: boolean;
}

const InvoiceTabPanel: React.FC<InvoiceTabPanelProps> = ({
  title,
  invoices,
  isArabic,
  formatInvoiceDate,
  getStatusBadgeColor,
  viewInvoiceDetails,
  printInvoice,
  onRefund,
  filteredStatus,
  showHeader = true
}) => {
  return (
    <Card>
      {showHeader && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {title || (isArabic ? "قائمة الفواتير" : "Invoices List")}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={!showHeader ? "pt-6" : undefined}>
        <EnhancedInvoiceTable
          invoices={invoices}
          isArabic={isArabic}
          formatInvoiceDate={formatInvoiceDate}
          getStatusBadgeColor={getStatusBadgeColor}
          viewInvoiceDetails={viewInvoiceDetails}
          printInvoice={printInvoice}
          onRefund={onRefund}
          filteredStatus={filteredStatus}
        />
      </CardContent>
    </Card>
  );
};

export default InvoiceTabPanel;
