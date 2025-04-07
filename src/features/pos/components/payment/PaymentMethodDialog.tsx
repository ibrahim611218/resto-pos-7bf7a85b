
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Coins } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentMethodDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: "cash" | "card") => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  open,
  onClose,
  onSelectPaymentMethod,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-6">
          <Button
            onClick={() => onSelectPaymentMethod("cash")}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 py-6"
          >
            <Coins className="h-12 w-12 mb-2" />
            <span>{isArabic ? "نقدي" : "Cash"}</span>
          </Button>
          <Button
            onClick={() => onSelectPaymentMethod("card")}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 py-6"
          >
            <CreditCard className="h-12 w-12 mb-2" />
            <span>{isArabic ? "بطاقة" : "Card"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
