
import React from "react";
import PaymentMethodDialog from "../payment/PaymentMethodDialog";
import PaidAmountDialog from "../../components/payment/PaidAmountDialog";
import TransferReceiptDialog from "../payment/TransferReceiptDialog";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Invoice, PaymentMethod, Customer } from "@/types";
import { useInvoiceFormatting } from "@/features/invoices/hooks/useInvoiceFormatting";

interface CartInvoiceDialogsProps {
  showPaymentMethodDialog: boolean;
  showPaidAmountDialog: boolean;
  showTransferReceiptDialog: boolean;
  total: number;
  currentInvoice: Invoice | null;
  showInvoiceModal: boolean;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
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
  const { formatInvoiceDate, printInvoice } = useInvoiceFormatting();
  
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
          onPrint={printInvoice}
        />
      )}
    </>
  );
};

export default CartInvoiceDialogs;
