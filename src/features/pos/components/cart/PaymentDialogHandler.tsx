
import { useState } from "react";
import { PaymentMethod, Invoice } from "@/types";

interface UsePaymentDialogProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
  setCurrentInvoice: (invoice: Invoice | null) => void;
  total: number;
  setPaidAmount?: (amount: number) => void; // Add optional setPaidAmount
}

export const usePaymentDialog = ({
  paymentMethod,
  setPaymentMethod,
  createInvoice,
  setCurrentInvoice,
  total,
  setPaidAmount
}: UsePaymentDialogProps) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showPaymentAmountDialog, setShowPaymentAmountDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<{
    name?: string;
    taxNumber?: string;
    customerId?: string;
    commercialRegister?: string;
    address?: string;
  }>({});

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (selectedMethod: PaymentMethod) => {
    setPaymentMethod(selectedMethod);
    
    // After selecting payment method, show the payment amount dialog
    setShowPaymentMethodDialog(false);
    setShowPaymentAmountDialog(true);
  };

  const handlePaymentAmountConfirmed = (paidAmount: number) => {
    // Close the payment amount dialog
    setShowPaymentAmountDialog(false);
    
    // Store the paid amount if setPaidAmount is provided
    if (setPaidAmount) {
      setPaidAmount(paidAmount);
    }
    
    // Create the invoice with the paid amount
    const invoice = createInvoice(
      customerInfo.name,
      customerInfo.taxNumber,
      customerInfo.customerId,
      customerInfo.commercialRegister,
      customerInfo.address,
      paidAmount
    );
    
    // Set the current invoice
    setCurrentInvoice(invoice);
  };

  return {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    showPaymentAmountDialog,
    setShowPaymentAmountDialog,
    customerInfo,
    setCustomerInfo,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    handlePaymentAmountConfirmed
  };
};
