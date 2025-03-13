
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Invoice } from "@/types";
import InvoicesList from "../InvoicesList";

interface InvoicesTabProps {
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

const InvoicesTab: React.FC<InvoicesTabProps> = ({
  filteredInvoices,
  isArabic
}) => {
  return (
    <TabsContent value="invoices">
      <InvoicesList 
        filteredInvoices={filteredInvoices} 
        isArabic={isArabic} 
      />
    </TabsContent>
  );
};

export default InvoicesTab;
