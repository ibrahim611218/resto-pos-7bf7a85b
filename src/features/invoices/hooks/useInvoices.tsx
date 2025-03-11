
import { useState } from "react";
import { Invoice } from "@/types";
import { mockInvoices } from "../data/mockInvoices";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, hasPermission } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === "ar";

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
    toast.success(isArabic ? `طباعة الفاتورة رقم ${invoice.number}` : `Printing invoice #${invoice.number}`);
  };

  const cancelInvoice = (invoiceId: string) => {
    // Check if user has admin permissions
    if (!hasPermission("admin")) {
      toast.error(isArabic ? "ليس لديك صلاحية لإلغاء الفواتير" : "You don't have permission to cancel invoices");
      return false;
    }

    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: "cancelled" }
          : invoice
      )
    );

    // If the canceled invoice is currently selected, update it
    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice(prev => prev ? { ...prev, status: "cancelled" } : null);
    }

    toast.success(isArabic ? "تم إلغاء الفاتورة بنجاح" : "Invoice cancelled successfully");
    return true;
  };

  const refundInvoice = (invoiceId: string) => {
    // Check if user has admin permissions
    if (!hasPermission("admin")) {
      toast.error(isArabic ? "ليس لديك صلاحية لإرجاع الفواتير" : "You don't have permission to refund invoices");
      return false;
    }

    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: "refunded" }
          : invoice
      )
    );

    // If the refunded invoice is currently selected, update it
    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice(prev => prev ? { ...prev, status: "refunded" } : null);
    }

    toast.success(isArabic ? "تم إرجاع الفاتورة بنجاح" : "Invoice refunded successfully");
    return true;
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
    cancelInvoice,
    refundInvoice
  };
};
