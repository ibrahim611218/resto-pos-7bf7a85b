
import { useState, useCallback } from "react";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import databaseService from "@/services/DatabaseService";

export const useInvoiceSearch = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const { refundInvoice } = useInvoices();

  const findInvoiceByNumber = useCallback(async (number: string): Promise<Invoice | null> => {
    try {
      // Get all invoices from the database
      const invoices = await databaseService.getInvoices();
      
      // Find the invoice with the matching number
      return invoices.find((inv: Invoice) => inv.number === number) || null;
    } catch (error) {
      console.error("Error searching for invoice:", error);
      return null;
    }
  }, []);

  const handleRefundInvoice = (invoiceId: string): boolean => {
    // Use the refundInvoice function from useInvoices
    const result = refundInvoice(invoiceId);
    
    if (result) {
      // Update the current invoice if it was refunded successfully
      if (currentInvoice && currentInvoice.id === invoiceId) {
        setCurrentInvoice(prev => prev ? { ...prev, status: "refunded" } : null);
      }
    }
    
    return result;
  };

  const handleInvoiceSearch = async () => {
    if (!invoiceNumber.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "الرجاء إدخال رقم الفاتورة" : "Please enter an invoice number",
        variant: "destructive",
      });
      return;
    }
    
    const invoice = await findInvoiceByNumber(invoiceNumber.trim());
    
    if (invoice) {
      setCurrentInvoice(invoice);
      setShowInvoiceModal(true);
    } else {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "لم يتم العثور على الفاتورة" : "Invoice not found",
        variant: "destructive",
      });
    }
  };

  return {
    invoiceNumber,
    setInvoiceNumber,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal,
    handleInvoiceSearch,
    handleRefundInvoice,
  };
};
