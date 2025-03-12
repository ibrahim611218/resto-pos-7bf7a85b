
import React, { useState } from "react";
import { Invoice } from "@/types";
import PaymentMethodDialog from "../PaymentMethodDialog";
import { PaymentMethod } from "@/types";

interface PaymentDialogHandlerProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string) => Invoice;
  setCurrentInvoice: (invoice: Invoice | null) => void;
}

const PaymentDialogHandler: React.FC<PaymentDialogHandlerProps> = ({
  paymentMethod,
  setPaymentMethod,
  createInvoice,
  setCurrentInvoice
}) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (customerName?: string, customerTaxNumber?: string) => {
    const invoice = createInvoice(customerName, customerTaxNumber);
    setCurrentInvoice(invoice);
    setShowPaymentMethodDialog(false);
    return invoice;
  };

  return {
    showPaymentMethodDialog,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    renderDialog: () => (
      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handlePaymentMethodSelected}
      />
    )
  };
};

export default PaymentDialogHandler;
