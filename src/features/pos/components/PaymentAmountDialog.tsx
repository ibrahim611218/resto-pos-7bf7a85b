
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/invoice";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentAmountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paidAmount: number) => void;
  total: number;
}

const PaymentAmountDialog: React.FC<PaymentAmountDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  total,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [paidAmount, setPaidAmount] = useState<number>(total);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      // Reset the form when dialog opens
      setPaidAmount(total);
      setRemainingAmount(0);
    }
  }, [isOpen, total]);

  const handlePaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPaidAmount(value);
    setRemainingAmount(Math.max(total - value, 0));
  };

  const handleConfirm = () => {
    onConfirm(paidAmount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "إدخال المبلغ المدفوع" : "Enter Payment Amount"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="total" className="text-right">
              {isArabic ? "المبلغ الإجمالي" : "Total Amount"}
            </Label>
            <div className="font-bold text-lg">
              {formatCurrency(total, isArabic ? "ar-SA" : "en-US", "SAR")}
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="paidAmount" className="text-right">
              {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
            </Label>
            <Input
              id="paidAmount"
              type="number"
              value={paidAmount || ""}
              onChange={handlePaidAmountChange}
              min="0"
              step="0.01"
              className="text-lg"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="remainingAmount" className="text-right">
              {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
            </Label>
            <div className={`font-bold text-lg ${remainingAmount > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleConfirm}>
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentAmountDialog;
