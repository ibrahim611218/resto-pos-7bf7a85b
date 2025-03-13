
import React, { useState } from "react";
import { Invoice, PaymentMethod } from "@/types";
import PaymentMethodDialog from "../PaymentMethodDialog";
import PaymentAmountDialog from "../PaymentAmountDialog";

interface PaymentDialogHandlerProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
  setCurrentInvoice: (invoice: Invoice | null) => void;
  total: number;
}

// Custom hook to handle payment dialog logic
export const usePaymentDialog = ({
  paymentMethod,
  setPaymentMethod,
  createInvoice,
  setCurrentInvoice,
  total
}: PaymentDialogHandlerProps) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showPaymentAmountDialog, setShowPaymentAmountDialog] = useState(false);
  const [pendingCustomerInfo, setPendingCustomerInfo] = useState<{
    customerName?: string;
    customerTaxNumber?: string;
    customerId?: string;
    commercialRegister?: string;
    address?: string;
  } | null>(null);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (
    customerName?: string, 
    customerTaxNumber?: string, 
    customerId?: string,
    commercialRegister?: string,
    address?: string
  ) => {
    // Store customer info temporarily and show payment amount dialog
    setPendingCustomerInfo({
      customerName,
      customerTaxNumber,
      customerId,
      commercialRegister,
      address
    });
    setShowPaymentMethodDialog(false);
    setShowPaymentAmountDialog(true);
  };

  const handlePaymentAmountConfirmed = (paidAmount: number) => {
    if (pendingCustomerInfo) {
      const { customerName, customerTaxNumber, customerId, commercialRegister, address } = pendingCustomerInfo;
      const invoice = createInvoice(customerName, customerTaxNumber, customerId, commercialRegister, address, paidAmount);
      setCurrentInvoice(invoice);
      setShowPaymentAmountDialog(false);
      setPendingCustomerInfo(null);
    }
  };

  return {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    showPaymentAmountDialog,
    setShowPaymentAmountDialog,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    handlePaymentAmountConfirmed
  };
};

// Component that renders the payment dialogs
const PaymentDialogHandler: React.FC<PaymentDialogHandlerProps> = (props) => {
  const { 
    showPaymentMethodDialog, 
    setShowPaymentMethodDialog, 
    showPaymentAmountDialog,
    setShowPaymentAmountDialog,
    handlePaymentMethodSelected,
    handlePaymentAmountConfirmed
  } = usePaymentDialog(props);

  return (
    <>
      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        paymentMethod={props.paymentMethod}
        setPaymentMethod={props.setPaymentMethod}
        onConfirm={handlePaymentMethodSelected}
      />
      <PaymentAmountDialog
        isOpen={showPaymentAmountDialog}
        onClose={() => setShowPaymentAmountDialog(false)}
        onConfirm={handlePaymentAmountConfirmed}
        total={props.total}
      />
    </>
  );
};

export default PaymentDialogHandler;
