
import React from "react";
import PaymentMethodDialog from "../payment/PaymentMethodDialog";
import PaidAmountDialog from "../payment/PaidAmountDialog";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Invoice, PaymentMethod } from "@/types";

interface InvoiceDialogsProps {
  showPaymentMethodDialog: boolean;
  onClosePaymentDialog: () => void;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  showPaidAmountDialog: boolean;
  onClosePaidAmountDialog: () => void;
  onConfirmPaidAmount: (amount: number) => void;
  total: number;
  currentInvoice: Invoice | null;
  showInvoiceModal: boolean;
  onCloseInvoiceModal: () => void;
  formatInvoiceDate: (date: Date) => string;
  onPrintInvoice: (invoice: Invoice) => void;
}

const InvoiceDialogs: React.FC<InvoiceDialogsProps> = ({
  showPaymentMethodDialog,
  onClosePaymentDialog,
  onSelectPaymentMethod,
  showPaidAmountDialog,
  onClosePaidAmountDialog,
  onConfirmPaidAmount,
  total,
  currentInvoice,
  showInvoiceModal,
  onCloseInvoiceModal,
  formatInvoiceDate,
  onPrintInvoice
}) => {
  return (
    <>
      <PaymentMethodDialog
        open={showPaymentMethodDialog}
        onClose={onClosePaymentDialog}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />
      
      <PaidAmountDialog
        open={showPaidAmountDialog}
        onClose={onClosePaidAmountDialog}
        onConfirm={onConfirmPaidAmount}
        total={total}
      />
      
      {currentInvoice && (
        <InvoiceDetailsModal
          invoice={currentInvoice}
          open={showInvoiceModal}
          onClose={onCloseInvoiceModal}
          formatInvoiceDate={formatInvoiceDate}
          onPrint={onPrintInvoice}
        />
      )}
    </>
  );
};

export default InvoiceDialogs;
