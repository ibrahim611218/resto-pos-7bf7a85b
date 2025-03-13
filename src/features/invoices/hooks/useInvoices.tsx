
import { useInvoiceData } from "./useInvoiceData";
import { useInvoiceFilters } from "./useInvoiceFilters";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { useInvoiceFormatting } from "./useInvoiceFormatting";
import { useInvoiceRefund } from "./useInvoiceRefund";
import { Invoice } from "@/types";

export const useInvoices = () => {
  // Use our composable hooks
  const { 
    invoices, 
    setInvoices,
    loading, 
    error, 
    loadInvoicesFromStorage, 
    addNewInvoice 
  } = useInvoiceData();
  
  const { 
    filteredInvoices, 
    searchTerm, 
    setSearchTerm 
  } = useInvoiceFilters(invoices);
  
  const { 
    selectedInvoice, 
    setSelectedInvoice,
    viewInvoiceDetails: baseViewInvoiceDetails, 
    closeInvoiceDetails 
  } = useInvoiceSelection();
  
  const { 
    formatInvoiceDate, 
    getStatusBadgeColor, 
    printInvoice 
  } = useInvoiceFormatting();
  
  const { 
    refundInvoice 
  } = useInvoiceRefund(invoices, setInvoices, selectedInvoice, setSelectedInvoice);

  // Wrap the base viewInvoiceDetails to pass invoices
  const viewInvoiceDetails = (id: string) => {
    baseViewInvoiceDetails(id, invoices);
  };

  return {
    invoices,
    filteredInvoices,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedInvoice,
    viewInvoiceDetails,
    closeInvoiceDetails,
    formatInvoiceDate,
    getStatusBadgeColor,
    printInvoice,
    addNewInvoice,
    refundInvoice,
    loadInvoicesFromStorage
  };
};
