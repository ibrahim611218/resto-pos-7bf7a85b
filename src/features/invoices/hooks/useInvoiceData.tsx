
import { useState, useEffect, useCallback } from "react";
import { Invoice } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import databaseService from "@/services/index";

export const useInvoiceData = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load invoices from storage
  const loadInvoicesFromStorage = useCallback(async () => {
    try {
      setLoading(true);
      const data = await databaseService.getInvoices();
      setInvoices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError(isArabic ? "حدث خطأ أثناء تحميل الفواتير" : "Error loading invoices");
    } finally {
      setLoading(false);
    }
  }, [isArabic]);

  // Add new invoice
  const addNewInvoice = useCallback(async (invoice: Invoice) => {
    try {
      // Save the invoice to the database
      const result = await databaseService.saveInvoice(invoice);
      
      if (result.success) {
        // Update the invoices state after successful save
        setInvoices(prev => {
          // Ensure no duplicate invoice
          const invoiceExists = prev.some(inv => inv.number === invoice.number);
          if (invoiceExists) {
            console.log("Invoice already exists:", invoice.number);
            return prev;
          }
          return [invoice, ...prev];
        });
        return true;
      } else {
        console.error("Failed to save invoice:", result.error || "Unknown error");
        return false;
      }
    } catch (error) {
      console.error("Error adding invoice:", error);
      return false;
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    loadInvoicesFromStorage();
  }, [loadInvoicesFromStorage]);

  return {
    invoices,
    setInvoices,
    loading,
    error,
    loadInvoicesFromStorage,
    addNewInvoice
  };
};
