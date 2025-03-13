
import { useState, useEffect } from "react";
import { Invoice } from "@/types";

export const useInvoiceFilters = (invoices: Invoice[]) => {
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter invoices when search term or invoices change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredInvoices(invoices);
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(lowercaseSearch) ||
        (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(lowercaseSearch))
    );
    setFilteredInvoices(filtered);
  }, [searchTerm, invoices]);

  return {
    filteredInvoices,
    searchTerm,
    setSearchTerm
  };
};
