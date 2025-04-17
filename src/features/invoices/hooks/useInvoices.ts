import { useState, useCallback } from "react";
import { Invoice, PaymentMethod } from "@/types";
import invoiceService from "@/services/invoices/InvoiceService";

// Ensure type-only exports
export type { Invoice, PaymentMethod };

interface UseInvoicesProps {
  initialInvoices?: Invoice[];
}

export const useInvoices = ({ initialInvoices }: UseInvoicesProps = {}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices || []);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(initialInvoices || []);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadInvoicesFromStorage = useCallback(async () => {
    try {
      const invoices = await invoiceService.getInvoices();
      setInvoices(invoices);
      setFilteredInvoices(invoices);
    } catch (error) {
      console.error("Error loading invoices from storage:", error);
    }
  }, []);

  const saveInvoiceToStorage = async (invoice: Invoice) => {
    try {
      await invoiceService.saveInvoice(invoice);
      loadInvoicesFromStorage(); // Reload invoices to reflect the changes
    } catch (error) {
      console.error("Error saving invoice to storage:", error);
    }
  };

  const updateInvoiceInStorage = async (invoice: Invoice) => {
    try {
      await invoiceService.updateInvoice(invoice);
      loadInvoicesFromStorage(); // Reload invoices to reflect the changes
    } catch (error) {
      console.error("Error updating invoice in storage:", error);
    }
  };

  const viewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeInvoiceDetails = () => {
    setSelectedInvoice(null);
  };

  const formatInvoiceDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const printInvoice = (invoice: Invoice) => {
    // Implementation for printing invoice
    console.log("Printing invoice:", invoice.number);
  };

  const refundInvoice = async (invoice: Invoice) => {
    const updatedInvoice = { ...invoice, status: "refunded" as const };
    await updateInvoiceInStorage(updatedInvoice);
  };

  // Function to filter invoices based on search term
  const filterInvoices = useCallback(() => {
    if (!searchTerm) {
      setFilteredInvoices(invoices);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = invoices.filter((invoice) => {
      return (
        invoice.number.toLowerCase().includes(term) ||
        (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(term)) ||
        invoice.items.some((item) => item.name.toLowerCase().includes(term))
      );
    });
    setFilteredInvoices(filtered);
  }, [invoices, searchTerm]);

  // Call filterInvoices whenever invoices or searchTerm changes
  useState(() => {
    filterInvoices();
  }, [invoices, searchTerm, filterInvoices]);

  return {
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
    loadInvoicesFromStorage,
    saveInvoiceToStorage
  };
};
