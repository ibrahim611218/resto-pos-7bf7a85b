
import { useState, useCallback, useMemo } from "react";
import { Invoice } from "@/types";
import { mockInvoices } from "../data/mockInvoices";
import { formatDate } from "@/utils/formatters";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { handleInvoiceExport } from "@/utils/invoice";

// Helper to save invoice to localStorage
export const saveInvoiceToStorage = (invoice: Invoice) => {
  try {
    // Get existing invoices from localStorage
    const storedInvoices = localStorage.getItem('invoices');
    let invoices: Invoice[] = [];
    
    if (storedInvoices) {
      invoices = JSON.parse(storedInvoices);
    }
    
    // Add new invoice to the array
    invoices.unshift(invoice);
    
    // Save back to localStorage
    localStorage.setItem('invoices', JSON.stringify(invoices));
    
    return true;
  } catch (error) {
    console.error("Error saving invoice:", error);
    return false;
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

  // Print invoice
  const printInvoice = (invoice: Invoice) => {
    if (settings) {
      handleInvoiceExport("print", invoice, settings);
    }
  };
  
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

  // Add invoice
  const addInvoice = useCallback((invoice: Invoice) => {
    setInvoices((prevInvoices) => [invoice, ...prevInvoices]);
    
    // Save to localStorage
    try {
      const storedInvoices = localStorage.getItem('invoices');
      const invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
      localStorage.setItem('invoices', JSON.stringify([invoice, ...invoices]));
      
      // Trigger reports update
      window.dispatchEvent(new CustomEvent('invoice-created', { detail: invoice }));
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  }, []);

  // Update invoice
  const updateInvoice = useCallback((updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
    
    // Update in localStorage
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const updated = invoices.map((inv: Invoice) =>
          inv.id === updatedInvoice.id ? updatedInvoice : inv
        );
        localStorage.setItem('invoices', JSON.stringify(updated));
        
        // Trigger reports update
        window.dispatchEvent(new CustomEvent('invoice-updated', { detail: updatedInvoice }));
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  }, []);

  // Delete invoice
  const deleteInvoice = useCallback((invoiceId: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== invoiceId)
    );
  }, []);

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
    deleteInvoice,
    saveInvoiceToStorage
  };
};
