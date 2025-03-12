
import { useState, useEffect, useCallback } from "react";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import databaseService from "@/services/DatabaseService";

export const useInvoices = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch invoices on mount
  useEffect(() => {
    const fetchInvoices = async () => {
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
    };

    fetchInvoices();
  }, [isArabic]);

  // Add a new invoice
  const addNewInvoice = useCallback(async (invoice: Invoice) => {
    try {
      const result = await databaseService.saveInvoice(invoice);
      
      if (result.success) {
        setInvoices(prev => [invoice, ...prev]);
        return true;
      } else {
        console.error("Failed to save invoice:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Error adding invoice:", error);
      return false;
    }
  }, []);

  // Refund an invoice
  const refundInvoice = useCallback(async (invoiceId: string) => {
    // Find the invoice to refund
    const invoiceToRefund = invoices.find(inv => inv.id === invoiceId);
    
    if (!invoiceToRefund) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "لم يتم العثور على الفاتورة" : "Invoice not found",
        variant: "destructive",
      });
      return false;
    }
    
    if (invoiceToRefund.status === "refunded") {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "تم استرجاع هذه الفاتورة بالفعل" : "This invoice has already been refunded",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Create a copy of the invoice with refunded status
      const refundedInvoice: Invoice = {
        ...invoiceToRefund,
        status: "refunded"
      };
      
      // Update the invoice in the database
      const result = await databaseService.updateInvoice(refundedInvoice);
      
      if (result.success) {
        // Update the invoice in the state
        setInvoices(prevInvoices => 
          prevInvoices.map(inv => 
            inv.id === invoiceId ? {...inv, status: "refunded"} : inv
          )
        );
        
        toast({
          title: isArabic ? "تم إرجاع الفاتورة" : "Invoice Refunded",
          description: isArabic 
            ? `تم إرجاع الفاتورة رقم ${invoiceToRefund.number} بنجاح` 
            : `Invoice #${invoiceToRefund.number} has been refunded successfully`,
          variant: "default",
        });
        
        return true;
      } else {
        toast({
          title: isArabic ? "خطأ" : "Error",
          description: result.error || (isArabic ? "فشل استرجاع الفاتورة" : "Failed to refund invoice"),
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Error refunding invoice:", error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء استرجاع الفاتورة" : "Error refunding invoice",
        variant: "destructive",
      });
      return false;
    }
  }, [invoices, isArabic]);

  return {
    invoices,
    loading,
    error,
    addNewInvoice,
    refundInvoice
  };
};
