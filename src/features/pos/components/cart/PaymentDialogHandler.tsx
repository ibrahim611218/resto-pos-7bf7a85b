
import { useState } from "react";
import { PaymentMethod, Invoice } from "@/types";

interface UsePaymentDialogProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
  setCurrentInvoice: (invoice: Invoice | null) => void;
  total: number;
}

export const usePaymentDialog = ({
  paymentMethod,
  setPaymentMethod,
  createInvoice,
  setCurrentInvoice,
  total
}: UsePaymentDialogProps) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
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
    
    // Close the payment method dialog
    setShowPaymentMethodDialog(false);
    
    // Create the invoice directly after selecting payment method
    // Note: In the actual implementation, paidAmount is handled in CartPanel
    const invoice = createInvoice(
      customerInfo.name,
      customerInfo.taxNumber,
      customerInfo.customerId,
      customerInfo.commercialRegister,
      customerInfo.address
    );
    
    // Set the current invoice
    setCurrentInvoice(invoice);
  };

  return {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    customerInfo,
    setCustomerInfo,
    handleCreateInvoice,
    handlePaymentMethodSelected
  };
};
