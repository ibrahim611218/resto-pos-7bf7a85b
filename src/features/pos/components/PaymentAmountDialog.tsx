
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  total
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const [paidAmount, setPaidAmount] = useState<number>(total);
  const [remaining, setRemaining] = useState<number>(0);

  // Update paid amount when total changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setPaidAmount(total);
      setRemaining(0);
    }
  }, [isOpen, total]);

  // Calculate remaining amount when paid amount changes
  const handlePaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPaidAmount(value);
      setRemaining(Math.max(0, total - value));
    } else {
      setPaidAmount(0);
      setRemaining(total);
    }
  };

  const handleConfirm = () => {
    onConfirm(paidAmount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-md"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isArabic ? "تفاصيل الدفع" : "Payment Details"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="total-amount" className="text-md">
              {isArabic ? "المبلغ الإجمالي" : "Total Amount"}
            </Label>
            <Input
              id="total-amount"
              value={total.toFixed(2)}
              disabled
              className="text-lg font-bold"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="paid-amount" className="text-md">
              {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
            </Label>
            <Input
              id="paid-amount"
              type="number"
              value={paidAmount}
              onChange={handlePaidAmountChange}
              className="text-lg font-bold"
              autoFocus
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="remaining-amount" className="text-md">
              {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
            </Label>
            <Input
              id="remaining-amount"
              value={remaining.toFixed(2)}
              disabled
              className={`text-lg font-bold ${remaining > 0 ? 'text-red-500' : 'text-green-500'}`}
            />
          </div>
        </div>
        
        <DialogFooter className={isArabic ? "sm:justify-start" : "sm:justify-end"}>
          <Button type="button" variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="button" onClick={handleConfirm}>
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentAmountDialog;
