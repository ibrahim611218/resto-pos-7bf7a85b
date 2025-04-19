import { useState, useCallback } from "react";
import { Invoice, PaymentMethod } from "@/types";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const addInvoice = useCallback((invoice: Invoice) => {
    setInvoices((prevInvoices) => [invoice, ...prevInvoices]);
  }, []);

  const updateInvoice = useCallback((updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  }, []);

  const deleteInvoice = useCallback((invoiceId: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== invoiceId)
    );
  }, []);

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };
};

export const saveInvoiceToStorage = async (invoice: Invoice) => {
  try {
    const storedInvoices = localStorage.getItem('invoices');
    let invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
    invoices = [invoice, ...invoices];
    localStorage.setItem('invoices', JSON.stringify(invoices));
    return { success: true, id: invoice.id };
  } catch (error) {
    console.error('Error saving invoice to localStorage:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};
