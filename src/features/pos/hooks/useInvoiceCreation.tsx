
import { useCallback, useState } from "react";
import { Invoice, PaymentMethod, Customer } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceNumber } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";

export const useInvoiceCreation = (
  cartItems: any[],
  subtotal: number,
  taxAmount: number,
  total: number,
  discount: number,
  discountType: "percentage" | "fixed",
  orderType: "takeaway" | "dineIn",
  tableNumber: string,
  paymentMethod: PaymentMethod,
  clearCart: () => void
) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  const { user } = useAuth();
  const { addNewInvoice } = useInvoices();
  
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const createInvoice = useCallback((
    customerName?: string, 
    customerTaxNumber?: string, 
    customerId?: string,
    commercialRegister?: string,
    address?: string
  ): Invoice => {
    const invoiceId = generateInvoiceNumber();
    
    let customer: Customer | undefined;
    if (customerName || customerId) {
      customer = {
        id: customerId,
        name: customerName || "",
        taxNumber: customerTaxNumber,
        commercialRegister: commercialRegister,
        address: address
      };
    }
    
    const invoice: Invoice = {
      id: Math.random().toString(36).substring(2, 9),
      number: invoiceId,
      date: new Date(),
      items: [...cartItems],
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: total,
      discount: discount,
      discountType: discountType,
      paymentMethod: paymentMethod === "cash" ? "نقدي" : "شبكة",
      cashierId: user?.id || "unknown",
      cashierName: user?.name || "كاشير",
      status: "completed",
      orderType: orderType,
      tableNumber: orderType === "dineIn" ? tableNumber : undefined,
      customer: customer
    };
    
    toast({
      title: "تم إنشاء الفاتورة",
      description: `تم إنشاء الفاتورة رقم ${invoiceId} بنجاح`,
      variant: "default",
    });

    // Store invoice in localStorage for demonstration
    try {
      const storedInvoices = localStorage.getItem('invoices');
      let invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
      invoices = [invoice, ...invoices]; // Add new invoice at the beginning
      
      // Save back to localStorage
      localStorage.setItem('invoices', JSON.stringify(invoices));

      // Add to invoices list for immediate display
      addNewInvoice(invoice);
    } catch (error) {
      console.error("Failed to save invoice to localStorage:", error);
    }
    
    return invoice;
  }, [cartItems, subtotal, taxAmount, total, discount, discountType, paymentMethod, user, isArabic, orderType, tableNumber, addNewInvoice]);

  return {
    createInvoice,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal
  };
};
