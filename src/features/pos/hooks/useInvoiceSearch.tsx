
import { useState } from "react";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export const useInvoiceSearch = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const findInvoiceByNumber = (number: string): Invoice | null => {
    // Try to find the invoice in localStorage
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        return invoices.find((inv: Invoice) => inv.number === number) || null;
      }
    } catch (error) {
      console.error("Error searching for invoice:", error);
    }
    
    // If not found in localStorage, check mock data
    const mockInvoices = [
      {
        id: "inv123",
        number: "1", // Updated to use numeric format
        date: new Date(),
        items: [
          { 
            id: "item1", 
            productId: "prod1", 
            variantId: "var1", 
            name: "Espresso", 
            nameAr: "إسبريسو", 
            quantity: 2, 
            price: 10, 
            size: "medium" as const, 
            taxable: true 
          },
          { 
            id: "item2", 
            productId: "prod2", 
            variantId: "var2", 
            name: "Cappuccino", 
            nameAr: "كابتشينو", 
            quantity: 1, 
            price: 15, 
            size: "large" as const, 
            taxable: true 
          }
        ],
        subtotal: 35,
        taxAmount: 5.25,
        total: 40.25,
        discount: 0,
        discountType: "percentage" as const,
        paymentMethod: "نقدي",
        cashierId: "user1",
        cashierName: "كاشير",
        status: "completed" as const,
        orderType: "takeaway" as const,
        customer: {
          name: "عميل افتراضي",
          taxNumber: "123456789"
        }
      }
    ];
    
    return mockInvoices.find(inv => inv.number === number) || null;
  };

  const handleRefundInvoice = (invoiceId: string): boolean => {
    toast({
      title: isArabic ? "تم إرجاع الفاتورة" : "Invoice Refunded",
      description: isArabic 
        ? `تم إرجاع الفاتورة رقم ${invoiceId} بنجاح` 
        : `Invoice #${invoiceId} has been refunded successfully`,
      variant: "default",
    });
    
    return true;
  };

  const handleInvoiceSearch = () => {
    if (!invoiceNumber.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "الرجاء إدخال رقم الفاتورة" : "Please enter an invoice number",
        variant: "destructive",
      });
      return;
    }
    
    const invoice = findInvoiceByNumber(invoiceNumber.trim());
    
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
