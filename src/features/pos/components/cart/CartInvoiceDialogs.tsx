
import React from "react";
import PaymentMethodDialog from "../payment/PaymentMethodDialog";
import PaidAmountDialog from "../payment/PaidAmountDialog";
import TransferReceiptDialog from "../payment/TransferReceiptDialog";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Invoice, PaymentMethod, Customer } from "@/types";
import { useInvoiceFormatting } from "@/features/invoices/hooks/useInvoiceFormatting";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { handleInvoiceExport } from "@/utils/invoice/export";

interface CartInvoiceDialogsProps {
  showPaymentMethodDialog: boolean;
  showPaidAmountDialog: boolean;
  showTransferReceiptDialog: boolean;
  total: number;
  currentInvoice: Invoice | null;
  showInvoiceModal: boolean;
  onSelectPaymentMethod: (method: PaymentMethod, customer?: Customer) => void;
  onConfirmPaidAmount: (amount: number) => void;
  onConfirmTransferReceipt: (receiptNumber: string, customer?: Customer) => void;
  onCloseInvoiceModal: () => void;
}

const CartInvoiceDialogs: React.FC<CartInvoiceDialogsProps> = ({
  showPaymentMethodDialog,
  showPaidAmountDialog,
  showTransferReceiptDialog,
  total,
  currentInvoice,
  showInvoiceModal,
  onSelectPaymentMethod,
  onConfirmPaidAmount,
  onConfirmTransferReceipt,
  onCloseInvoiceModal
}) => {
  const { formatInvoiceDate } = useInvoiceFormatting();
  const { settings } = useBusinessSettings();
  
  const handlePrintInvoice = (invoice: Invoice) => {
    if (invoice && settings) {
      console.log("Printing invoice from CartInvoiceDialogs");
      handleInvoiceExport("print", invoice, settings);
    }
  };
  
  return (
    <>
      <PaymentMethodDialog
        open={showPaymentMethodDialog}
        onClose={() => onSelectPaymentMethod("card")}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />
      
      <PaidAmountDialog
        open={showPaidAmountDialog}
        onClose={() => onConfirmPaidAmount(total)}
        onConfirm={onConfirmPaidAmount}
        total={total}
      />
      
      <TransferReceiptDialog
        open={showTransferReceiptDialog}
        onClose={() => onConfirmTransferReceipt("", undefined)}
        onConfirm={onConfirmTransferReceipt}
        total={total}
      />
      
      {currentInvoice && (
        <InvoiceDetailsModal
          invoice={currentInvoice}
          open={showInvoiceModal}
          onClose={onCloseInvoiceModal}
          formatInvoiceDate={formatInvoiceDate}
          onPrint={handlePrintInvoice}
        />
      )}
    </>
  );
};

export default CartInvoiceDialogs;
