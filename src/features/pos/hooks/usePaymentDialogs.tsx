
import { useState } from "react";
import { Invoice, PaymentMethod } from "@/types";

interface UsePaymentDialogsProps {
  paymentMethod?: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaidAmount: (amount: number) => void;
  total: number;
}

export const usePaymentDialogs = ({
  paymentMethod,
  setPaymentMethod,
  setPaidAmount,
  total
}: UsePaymentDialogsProps) => {
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showPaidAmountDialog, setShowPaidAmountDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowPaymentMethodDialog(false);
    
    // If cash payment, show paid amount dialog
    if (method === "cash") {
      setShowPaidAmountDialog(true);
    } else {
      // For card, assume full amount is paid
      setPaidAmount(total);
      completeInvoiceProcess();
    }
  };

  const handlePaidAmountConfirmed = (amount: number) => {
    setPaidAmount(amount);
    setShowPaidAmountDialog(false);
    completeInvoiceProcess();
  };

  const completeInvoiceProcess = () => {
    // This method will be called by the parent component
  };

  const handleShowPaidAmountDialog = () => {
    if (paymentMethod === "cash") {
      setShowPaidAmountDialog(true);
    }
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    setCurrentInvoice(null);
  };
  
  return {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    showPaidAmountDialog,
    setShowPaidAmountDialog,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    handlePaidAmountConfirmed,
    handleShowPaidAmountDialog,
    handleCloseInvoiceModal
  };
};
