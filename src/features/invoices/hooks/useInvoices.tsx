
import { useState } from "react";
import { Invoice } from "@/types";
import { mockInvoices } from "../data/mockInvoices";
import { format } from "date-fns";
import { toast } from "sonner";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = searchTerm
    ? invoices.filter((invoice) => 
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.cashierName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : invoices;

  const getInvoiceById = (id: string) => {
    return invoices.find((invoice) => invoice.id === id) || null;
  };

  const viewInvoiceDetails = (id: string) => {
    const invoice = getInvoiceById(id);
    setSelectedInvoice(invoice);
  };

  const closeInvoiceDetails = () => {
    setSelectedInvoice(null);
  };

  const formatInvoiceDate = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const getStatusBadgeColor = (status: "completed" | "cancelled" | "refunded") => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-amber-500";
      case "refunded":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const printInvoice = (invoice: Invoice) => {
    // In a real app, this would connect to a printer
    console.log("Printing invoice:", invoice);
    toast.success(`Printing invoice #${invoice.number}`);
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
    printInvoice
  };
};
