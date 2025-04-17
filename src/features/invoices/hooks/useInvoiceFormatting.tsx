
import { useCallback } from "react";
import { Invoice } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/utils/formatters";
import { printInvoice as printInvoiceUtil } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

export const useInvoiceFormatting = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  
  // Format invoice date for display
  const formatInvoiceDate = useCallback((date: Date | string) => {
    if (!date) return "";
    return formatDate(new Date(date));
  }, []);

  // Print invoice
  const printInvoice = useCallback((invoice: Invoice) => {
    printInvoiceUtil(invoice, settings);
  }, [settings]);

  // Get badge color based on invoice status
  const getStatusBadgeColor = useCallback((status: "completed" | "cancelled" | "refunded" | "pending") => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-amber-100 text-amber-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  return {
    isArabic,
    formatInvoiceDate,
    getStatusBadgeColor,
    printInvoice
  };
};
