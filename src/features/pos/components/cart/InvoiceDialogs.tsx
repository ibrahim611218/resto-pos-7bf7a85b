
import React from "react";
import PaymentMethodDialog from "../payment/PaymentMethodDialog";
import PaidAmountDialog from "../../components/payment/PaidAmountDialog";
import TransferReceiptDialog from "../payment/TransferReceiptDialog";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Invoice, PaymentMethod, Customer } from "@/types";

interface InvoiceDialogsProps {
  showPaymentMethodDialog: boolean;
  onClosePaymentDialog: () => void;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  showPaidAmountDialog: boolean;
  onClosePaidAmountDialog: () => void;
  onConfirmPaidAmount: (amount: number) => void;
  showTransferReceiptDialog?: boolean;
  onCloseTransferReceiptDialog?: () => void;
  onConfirmTransferReceipt?: (receiptNumber: string, customer?: Customer) => void;
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
  showTransferReceiptDialog = false,
  onCloseTransferReceiptDialog = () => {},
  onConfirmTransferReceipt = () => {},
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
      
      <TransferReceiptDialog
        open={showTransferReceiptDialog}
        onClose={onCloseTransferReceiptDialog}
        onConfirm={onConfirmTransferReceipt}
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
