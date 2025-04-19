import { useState, useCallback, useEffect } from "react";
import { Invoice, PaymentMethod, Customer, CartItem, Size } from "@/types";
import { createInvoiceObject } from "@/utils/invoice";
import { useInvoiceFormatting } from "@/features/invoices/hooks/useInvoiceFormatting";
import { toast } from "@/hooks/use-toast";
import { saveInvoiceToStorage } from "@/features/invoices/hooks/useInvoices";
import kitchenOrderService from "@/services/kitchen/KitchenOrderService";

interface UseCartInvoiceProps {
  cartItems: CartItem[];
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod?: PaymentMethod;
  paidAmount?: number;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaidAmount: (amount: number) => void;
  clearCart: () => void;
  isArabic: boolean;
}

export const useCartInvoice = ({
  cartItems,
  subtotal,
  taxAmount,
  discount,
  discountType,
  total,
  orderType,
  tableNumber,
  paymentMethod,
  paidAmount,
  setPaymentMethod,
  setPaidAmount,
  clearCart,
  isArabic
}: UseCartInvoiceProps) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showPaidAmountDialog, setShowPaidAmountDialog] = useState(false);
  const [showTransferReceiptDialog, setShowTransferReceiptDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [transferReceiptNumber, setTransferReceiptNumber] = useState("");
  const [customer, setCustomer] = useState<Customer | undefined>();
  const { formatInvoiceDate, printInvoice } = useInvoiceFormatting();

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (method: PaymentMethod, selectedCustomer?: Customer) => {
    setPaymentMethod(method);
    setShowPaymentMethodDialog(false);
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
    
    if (method === "cash") {
      setShowPaidAmountDialog(true);
    } else if (method === "transfer") {
      setShowTransferReceiptDialog(true);
    } else {
      setPaidAmount(total);
    }
  };

  const handlePaidAmountConfirmed = (amount: number) => {
    setPaidAmount(amount);
    setShowPaidAmountDialog(false);
  };

  const handleTransferReceiptConfirmed = (receiptNumber: string, selectedCustomer?: Customer) => {
    setTransferReceiptNumber(receiptNumber);
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
    setPaidAmount(total);
    setShowTransferReceiptDialog(false);
  };

  const handleShowPaidAmountDialog = () => {
    if (paymentMethod === "cash") {
      setShowPaidAmountDialog(true);
    }
  };

  const handleInvoiceModalClose = () => {
    setShowInvoiceModal(false);
    setCurrentInvoice(null);
  };

  const createAndShowInvoice = useCallback(async () => {
    if (!paymentMethod || paidAmount === undefined) return;
    
    const invoiceCartItems = cartItems.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      nameAr: item.nameAr,
      variantId: item.variantId,
      size: item.size as Size,
      price: item.price,
      quantity: item.quantity,
      taxable: item.taxable,
      categoryId: item.categoryId
    }));
    
    const invoice = createInvoiceObject(
      invoiceCartItems,
      subtotal,
      taxAmount,
      discount,
      discountType,
      total,
      paymentMethod
    );
    
    invoice.paidAmount = paidAmount;
    invoice.orderType = orderType;
    if (orderType === "dineIn" && tableNumber) {
      invoice.tableNumber = tableNumber;
    }
    
    if (paymentMethod === "transfer" && transferReceiptNumber) {
      invoice.transferReceiptNumber = transferReceiptNumber;
    }
    
    if (customer) {
      invoice.customer = customer;
    }
    
    await saveInvoiceToStorage(invoice);
    
    if (invoice.items.length > 0) {
      try {
        await kitchenOrderService.createKitchenOrder(invoice);
      } catch (error) {
        console.error('Error creating kitchen order:', error);
      }
    }
    
    setCurrentInvoice(invoice);
    setShowInvoiceModal(true);
    
    clearCart();
    
    toast({
      title: isArabic ? "تم إنشاء الفاتورة بنجاح" : "Invoice created successfully",
      description: isArabic ? `رقم الفاتورة: ${invoice.number}` : `Invoice Number: ${invoice.number}`,
    });
  }, [cartItems, subtotal, taxAmount, discount, discountType, total, orderType, tableNumber, clearCart, isArabic, paymentMethod, paidAmount, transferReceiptNumber, customer]);
  
  useEffect(() => {
    if (paymentMethod && paidAmount !== undefined) {
      createAndShowInvoice();
    }
  }, [paymentMethod, paidAmount, createAndShowInvoice]);

  return {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    showPaidAmountDialog,
    setShowPaidAmountDialog,
    showTransferReceiptDialog,
    setShowTransferReceiptDialog,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    handlePaidAmountConfirmed,
    handleTransferReceiptConfirmed,
    transferReceiptNumber,
    customer,
    setCustomer,
    handleShowPaidAmountDialog,
    handleInvoiceModalClose,
    formatInvoiceDate,
    printInvoice
  };
};
