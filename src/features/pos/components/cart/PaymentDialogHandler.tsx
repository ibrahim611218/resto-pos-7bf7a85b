
import React, { useState } from "react";
import { Invoice, PaymentMethod } from "@/types";
import PaymentMethodDialog from "../PaymentMethodDialog";

interface PaymentDialogHandlerProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
  setCurrentInvoice: (invoice: Invoice | null) => void;
  total?: number;
}

// Custom hook to handle payment dialog logic
export const usePaymentDialog = ({
  paymentMethod,
  setPaymentMethod,
  createInvoice,
  setCurrentInvoice,
  total = 0
}: PaymentDialogHandlerProps) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (
    customerName?: string, 
    customerTaxNumber?: string, 
    customerId?: string,
    commercialRegister?: string,
    address?: string,
    paidAmount?: number
  ) => {
    const invoice = createInvoice(customerName, customerTaxNumber, customerId, commercialRegister, address, paidAmount);
    setCurrentInvoice(invoice);
    setShowPaymentMethodDialog(false);
    return invoice;
  };

  return {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    handleCreateInvoice,
    handlePaymentMethodSelected
  };
};

// Component that renders the payment dialog
const PaymentDialogHandler: React.FC<PaymentDialogHandlerProps> = (props) => {
  const { 
    showPaymentMethodDialog, 
    setShowPaymentMethodDialog, 
    handlePaymentMethodSelected 
  } = usePaymentDialog(props);

  return (
    <PaymentMethodDialog
      isOpen={showPaymentMethodDialog}
      onClose={() => setShowPaymentMethodDialog(false)}
      paymentMethod={props.paymentMethod}
      setPaymentMethod={props.setPaymentMethod}
      onConfirm={handlePaymentMethodSelected}
      total={props.total}
    />
  );
};

export default PaymentDialogHandler;
