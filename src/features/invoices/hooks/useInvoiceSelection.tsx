
import { useState, useCallback } from "react";
import { Invoice } from "@/types";

export const useInvoiceSelection = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const viewInvoiceDetails = useCallback((id: string, invoices: Invoice[]) => {
    const invoice = invoices.find((inv) => inv.id === id);
    if (invoice) {
      setSelectedInvoice(invoice);
    }
  }, []);

  const closeInvoiceDetails = useCallback(() => {
    setSelectedInvoice(null);
  }, []);

  return {
    selectedInvoice,
    setSelectedInvoice,
    viewInvoiceDetails,
    closeInvoiceDetails
  };
};
