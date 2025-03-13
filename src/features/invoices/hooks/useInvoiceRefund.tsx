
import { useCallback } from "react";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import databaseService from "@/services/index";

export const useInvoiceRefund = (
  invoices: Invoice[],
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>,
  selectedInvoice: Invoice | null,
  setSelectedInvoice: React.Dispatch<React.SetStateAction<Invoice | null>>
) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const refundInvoice = useCallback((invoiceId: string): boolean => {
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
      
      // Update the invoice in state immediately
      setInvoices(prevInvoices => 
        prevInvoices.map(inv => 
          inv.id === invoiceId ? {...inv, status: "refunded"} : inv
        )
      );
      
      // Update the selected invoice if it's being refunded
      if (selectedInvoice && selectedInvoice.id === invoiceId) {
        setSelectedInvoice({...selectedInvoice, status: "refunded"});
      }
      
      // Update the invoice in the database asynchronously
      databaseService.updateInvoice(refundedInvoice)
        .then(result => {
          if (!result.success) {
            console.error("Error saving refund status to database:", result.error);
            // Revert changes if database update fails
            setInvoices(prevInvoices => [...prevInvoices]);
            if (selectedInvoice && selectedInvoice.id === invoiceId) {
              setSelectedInvoice({...selectedInvoice});
            }
            return false;
          }
        })
        .catch(error => {
          console.error("Error during refund:", error);
          return false;
        });
      
      toast({
        title: isArabic ? "تم إرجاع الفاتورة" : "Invoice Refunded",
        description: isArabic 
          ? `تم إرجاع الفاتورة رقم ${invoiceToRefund.number} بنجاح` 
          : `Invoice #${invoiceToRefund.number} has been refunded successfully`,
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("Error refunding invoice:", error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء استرجاع الفاتورة" : "Error refunding invoice",
        variant: "destructive",
      });
      return false;
    }
  }, [invoices, isArabic, selectedInvoice, setInvoices, setSelectedInvoice]);

  return { refundInvoice };
};
