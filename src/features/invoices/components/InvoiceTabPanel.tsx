
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceTable from "./InvoiceTable";
import { Invoice } from "@/types";

interface InvoiceTabPanelProps {
  title?: string;
  invoices: Invoice[];
  isArabic: boolean;
  formatInvoiceDate: (date: Date) => string;
  getStatusBadgeColor: (status: "completed" | "cancelled" | "refunded") => string;
  viewInvoiceDetails: (id: string) => void;
  printInvoice: (invoice: Invoice) => void;
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
        <InvoiceTable
          invoices={invoices}
          isArabic={isArabic}
          formatInvoiceDate={formatInvoiceDate}
          getStatusBadgeColor={getStatusBadgeColor}
          viewInvoiceDetails={viewInvoiceDetails}
          printInvoice={printInvoice}
          filteredStatus={filteredStatus}
        />
      </CardContent>
    </Card>
  );
};

export default InvoiceTabPanel;
