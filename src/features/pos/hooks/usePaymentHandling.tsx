
import { useCallback } from "react";
import { PaymentMethod, Invoice } from "@/types";
import { usePaymentDialog } from "../components/cart/PaymentDialogHandler";
import { usePaidAmount } from "./usePaidAmount";

interface UsePaymentHandlingProps {
  total: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
}

export const usePaymentHandling = ({
  total,
  paymentMethod,
  setPaymentMethod,
  createInvoice
}: UsePaymentHandlingProps) => {
  // Paid amount management
  const {
    paidAmount,
    showPaidAmountDialog,
    setShowPaidAmountDialog,
    handlePaidAmountClick,
    handlePaidAmountConfirm
  } = usePaidAmount({ total, paymentMethod });

  // Payment dialog management
  const { 
    showPaymentMethodDialog, 
    setShowPaymentMethodDialog,
    handleCreateInvoice
  } = usePaymentDialog({
    paymentMethod,
    setPaymentMethod,
    createInvoice,
    setCurrentInvoice: () => {}, // Will be handled in handlePaymentMethodSelectedWithAmount
    total
  });

  // Create a handler that combines payment method selection with paid amount
  const handlePaymentMethodSelectedWithAmount = useCallback((method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowPaymentMethodDialog(false);
    
    // If cash payment, ensure we have a paid amount set
    const finalPaidAmount = method === "cash" ? paidAmount : total;
    
    // Create invoice with paid amount
    createInvoice(
      undefined, 
      undefined, 
      undefined, 
      undefined, 
      undefined, 
      finalPaidAmount
    );
  }, [paidAmount, total, setPaymentMethod, setShowPaymentMethodDialog, createInvoice]);

  return {
    paidAmount,
    showPaidAmountDialog,
    setShowPaidAmountDialog,
    handlePaidAmountClick,
    handlePaidAmountConfirm,
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    handleCreateInvoice,
    handlePaymentMethodSelectedWithAmount
  };
};
