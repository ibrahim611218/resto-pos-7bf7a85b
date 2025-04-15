
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Coins, Banknote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PaymentMethod, Customer } from "@/types";
import { formatPaymentMethod } from "@/features/reports/sales-report/utils/formatters";
import CustomerSelectionForm from "./CustomerSelectionForm";

interface PaymentMethodDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: PaymentMethod, customer?: Customer) => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  open,
  onClose,
  onSelectPaymentMethod,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();

  const handleSelectPayment = (method: PaymentMethod) => {
    onSelectPaymentMethod(method, selectedCustomer);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-6">
          <Button
            onClick={() => handleSelectPayment("cash")}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 py-6"
          >
            <Coins className="h-12 w-12 mb-2" />
            <span>{formatPaymentMethod("cash", isArabic)}</span>
          </Button>
          <Button
            onClick={() => handleSelectPayment("card")}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 py-6"
          >
            <CreditCard className="h-12 w-12 mb-2" />
            <span>{formatPaymentMethod("card", isArabic)}</span>
          </Button>
          <Button
            onClick={() => handleSelectPayment("transfer")}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 py-6"
          >
            <Banknote className="h-12 w-12 mb-2" />
            <span>{formatPaymentMethod("transfer", isArabic)}</span>
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">
            {isArabic ? "بيانات العميل" : "Customer Information"}
          </h3>
          <CustomerSelectionForm
            onCustomerChange={setSelectedCustomer}
            isArabic={isArabic}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
