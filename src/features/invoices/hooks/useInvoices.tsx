
import { useState, useCallback, useEffect } from "react";
import { Invoice } from "@/types";
import { mockInvoices } from "../data/mockInvoices";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(
    // Sort invoices by date (newest first)
    [...mockInvoices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, hasPermission } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  // Load invoices from localStorage
  const loadInvoicesFromStorage = useCallback(() => {
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const parsedInvoices = JSON.parse(storedInvoices);
        // Combine with mock invoices and sort by date (newest first)
        setInvoices(prev => {
          // Create a map of existing invoice IDs to avoid duplicates
          const existingIds = new Map(prev.map(invoice => [invoice.id, true]));
          
          // Filter out duplicates from parsedInvoices
          const newInvoices = parsedInvoices.filter((invoice: Invoice) => !existingIds.has(invoice.id));
          
          // Combine and sort
          return [...newInvoices, ...prev].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        });
      }
    } catch (error) {
      console.error("Failed to load invoices from localStorage:", error);
    }
  }, []);

  // Load invoices from localStorage on initial render
  useEffect(() => {
    loadInvoicesFromStorage();
  }, [loadInvoicesFromStorage]);

  const filteredInvoices = searchTerm
    ? invoices.filter((invoice) => 
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

  const getStatusBadgeColor = (status: "completed" | "cancelled" | "refunded" | "pending") => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-amber-500";
      case "refunded":
        return "bg-red-500";
      case "pending":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const printInvoice = (invoice: Invoice) => {
    console.log("Printing invoice:", invoice);
    toast.success(`طباعة الفاتورة رقم ${invoice.number}`);
  };

  const cancelInvoice = (invoiceId: string) => {
    if (!hasPermission(["admin", "supervisor"])) {
      toast.error("ليس لديك صلاحية لإلغاء الفواتير");
      return false;
    }

    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: "cancelled" }
          : invoice
      )
    );

    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice(prev => prev ? { ...prev, status: "cancelled" } : null);
    }

    toast.success("تم إلغاء الفاتورة بنجاح");
    return true;
  };

  const refundInvoice = (invoiceId: string) => {
    if (!hasPermission(["admin", "supervisor"])) {
      toast.error("ليس لديك صلاحية لإرجاع الفواتير");
      return false;
    }

    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: "refunded" }
          : invoice
      )
    );

    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice(prev => prev ? { ...prev, status: "refunded" } : null);
    }

    // Update localStorage
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const parsedInvoices = JSON.parse(storedInvoices);
        const updatedInvoices = parsedInvoices.map((invoice: Invoice) => 
          invoice.id === invoiceId ? { ...invoice, status: "refunded" } : invoice
        );
        localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      }
    } catch (error) {
      console.error("Failed to update invoice in localStorage:", error);
    }

    toast.success("تم إرجاع الفاتورة بنجاح");
    return true;
  };

  const addNewInvoice = (invoice: Invoice) => {
    // Add new invoice at the beginning of the array (newest first)
    setInvoices(prev => [invoice, ...prev]);
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
    refundInvoice,
    addNewInvoice,
    loadInvoicesFromStorage
  };
};
