
import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const useInvoiceFormatting = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  // Format invoice date
  const formatInvoiceDate = useCallback((date: Date) => {
    return new Date(date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [isArabic]);

  // Get status badge color
  const getStatusBadgeColor = useCallback((status: "completed" | "cancelled" | "refunded" | "pending") => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "refunded":
        return "bg-amber-500";
      case "pending":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  }, []);

  // Print invoice
  const printInvoice = useCallback((invoice: Invoice) => {
    // This is just a TypeScript representation, actual printing is handled in InvoicesList
    console.log("Printing invoice:", invoice.number);
    return true;
  }, []);

  return {
    formatInvoiceDate,
    getStatusBadgeColor,
    printInvoice
  };
};
