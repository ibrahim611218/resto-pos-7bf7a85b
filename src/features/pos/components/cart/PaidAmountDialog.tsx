
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
import { formatCurrency } from "@/utils/invoice";

interface PaidAmountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  total: number;
  isArabic: boolean;
}

const PaidAmountDialog: React.FC<PaidAmountDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  total,
  isArabic
}) => {
  const [paidAmount, setPaidAmount] = useState<number>(total);
  const [change, setChange] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>(total.toString());

  // Update paid amount when total changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setPaidAmount(total);
      setInputValue(total.toString());
      setChange(0);
    }
  }, [isOpen, total]);

  // Calculate change amount when paid amount changes
  const handlePaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);
    
    const value = parseFloat(inputVal);
    if (!isNaN(value)) {
      setPaidAmount(value);
      // Calculate change amount - if paid is more than total, we give change
      const changeAmount = value - total;
      setChange(Math.max(0, changeAmount));
    } else {
      setPaidAmount(0);
      setChange(0);
    }
  };

  const handleConfirm = () => {
    onConfirm(paidAmount);
    onClose();
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
              value={formatCurrency(total, isArabic ? "ar-SA" : "en-US", "SAR")}
              disabled
              className="text-lg font-bold"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="paid-amount" className="text-md">
              {isArabic ? "المبلغ المستلم" : "Paid Amount"}
            </Label>
            <Input
              id="paid-amount"
              type="number"
              min="0"
              step="0.01"
              value={inputValue}
              onChange={handlePaidAmountChange}
              className="text-lg font-bold"
              autoFocus
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="change-amount" className="text-md">
              {isArabic ? "المبلغ المتبقي للعميل" : "Change Amount"}
            </Label>
            <Input
              id="change-amount"
              value={formatCurrency(change, isArabic ? "ar-SA" : "en-US", "SAR")}
              disabled
              className={`text-lg font-bold ${change > 0 ? 'text-green-500' : 'text-gray-500'}`}
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

export default PaidAmountDialog;
