
import { useState } from "react";
import { Invoice, PaymentMethod, Customer } from "@/types";

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
  const [showTransferReceiptDialog, setShowTransferReceiptDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [transferReceiptNumber, setTransferReceiptNumber] = useState("");
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowPaymentMethodDialog(false);
    
    // Show appropriate dialog based on payment method
    if (method === "cash") {
      setShowPaidAmountDialog(true);
    } else if (method === "transfer") {
      setShowTransferReceiptDialog(true);
    } else {
      // For card, assume full amount is paid
      setPaidAmount(total);
    }
  };

  const handlePaidAmountConfirmed = (amount: number) => {
    setPaidAmount(amount);
    setShowPaidAmountDialog(false);
  };

  const handleTransferReceiptConfirmed = (receiptNumber: string, selectedCustomer?: Customer) => {
    setTransferReceiptNumber(receiptNumber);
    setCustomer(selectedCustomer);
    setPaidAmount(total);
    setShowTransferReceiptDialog(false);
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
    handleShowPaidAmountDialog,
    handleCloseInvoiceModal
  };
};
