
import React, { useState } from "react";
import { Invoice, PaymentMethod } from "@/types";
import PaymentMethodDialog from "../PaymentMethodDialog";

interface PaymentDialogHandlerProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
  setCurrentInvoice: (invoice: Invoice | null) => void;
  total?: number;
  paidAmount?: number;
  setPaidAmount?: (amount: number) => void;
}

// Custom hook to handle payment dialog logic
export const usePaymentDialog = ({
  paymentMethod,
  setPaymentMethod,
  createInvoice,
  setCurrentInvoice,
  total = 0,
  paidAmount = 0,
  setPaidAmount
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
    newPaidAmount?: number
  ) => {
    const actualPaidAmount = newPaidAmount !== undefined ? newPaidAmount : total;
    
    // Update the paidAmount state if setPaidAmount is provided
    if (setPaidAmount && newPaidAmount !== undefined) {
      setPaidAmount(newPaidAmount);
    }
    
    const invoice = createInvoice(customerName, customerTaxNumber, customerId, commercialRegister, address, actualPaidAmount);
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
      paidAmount={props.paidAmount}
      setPaidAmount={props.setPaidAmount}
    />
  );
};

export default PaymentDialogHandler;
