
import { useState, useCallback, useMemo } from "react";
import { Invoice, PaymentMethod } from "@/types";
import { mockInvoices } from "../data/mockInvoices";
import { formatDate } from "@/utils/formatters";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { printInvoice as printInvoiceUtil } from "@/utils/invoice";

// Helper to save invoice to localStorage
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

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { settings } = useBusinessSettings();

  // Load invoices from localStorage or fallback to mock data
  const loadInvoicesFromStorage = useCallback(() => {
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        setInvoices(JSON.parse(storedInvoices));
      } else {
        setInvoices(mockInvoices);
      }
    } catch (error) {
      console.error("Error loading invoices:", error);
      setInvoices(mockInvoices);
    }
  }, []);

  // Format invoice date for display
  const formatInvoiceDate = useCallback((date: Date | string) => {
    if (!date) return "";
    return formatDate(new Date(date));
  }, []);

  // Filter invoices by search term
  const filteredInvoices = useMemo(() => {
    if (!searchTerm) return invoices;
    
    const searchLower = searchTerm.toLowerCase();
    return invoices.filter(invoice => 
      invoice.number.toLowerCase().includes(searchLower) || 
      (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(searchLower)) ||
      formatInvoiceDate(invoice.date).toLowerCase().includes(searchLower)
    );
  }, [invoices, searchTerm, formatInvoiceDate]);

  // Get badge color based on invoice status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-amber-100 text-amber-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // View invoice details
  const viewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  // Close invoice details modal
  const closeInvoiceDetails = () => {
    setSelectedInvoice(null);
  };

  // Handle printing invoice
  const printInvoice = (invoice: Invoice) => {
    if (settings) {
      printInvoiceUtil(invoice, settings);
    }
  };

  // Add invoice
  const addInvoice = useCallback((invoice: Invoice) => {
    setInvoices((prevInvoices) => [invoice, ...prevInvoices]);
  }, []);

  // Update invoice
  const updateInvoice = useCallback((updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  }, []);

  // Delete invoice
  const deleteInvoice = useCallback((invoiceId: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== invoiceId)
    );
  }, []);

  // Refund invoice
  const refundInvoice = (invoice: Invoice) => {
    const refundedInvoice = {
      ...invoice,
      status: 'refunded' as const
    };
    
    // Update in state
    setInvoices(prevInvoices => 
      prevInvoices.map(inv => 
        inv.id === invoice.id ? refundedInvoice : inv
      )
    );
    
    // Update in localStorage
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const parsed = JSON.parse(storedInvoices);
        const updated = parsed.map((inv: Invoice) => 
          inv.id === invoice.id ? refundedInvoice : inv
        );
        localStorage.setItem('invoices', JSON.stringify(updated));
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
    
    // Update selected invoice if it's the one being refunded
    if (selectedInvoice?.id === invoice.id) {
      setSelectedInvoice(refundedInvoice);
    }
  };

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
    addInvoice,
    updateInvoice,
    deleteInvoice
  };
};
