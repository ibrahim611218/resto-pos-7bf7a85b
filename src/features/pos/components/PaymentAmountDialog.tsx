
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
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
    updateAmount(inputVal);
  };

  const updateAmount = (inputVal: string) => {
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

  const handleNumberClick = (digit: string) => {
    let newValue = inputValue;
    
    // Handle special cases
    if (digit === "C") {
      newValue = "0";
    } else if (digit === "⌫") {
      newValue = inputValue.slice(0, -1);
      if (newValue === "") newValue = "0";
    } else if (digit === ".") {
      if (!inputValue.includes(".")) {
        newValue = inputValue + ".";
      }
    } else {
      // For regular digits
      if (inputValue === "0") {
        newValue = digit;
      } else {
        newValue = inputValue + digit;
      }
    }
    
    updateAmount(newValue);
  };

  const handleConfirm = () => {
    onConfirm(paidAmount);
  };

  // Predefined amounts based on total - for quick selection
  const getQuickAmounts = () => {
    const roundedTotal = Math.ceil(total);
    const denominations = [10, 20, 50, 100, 200, 500];
    return denominations.filter(amount => amount >= roundedTotal);
  };

  const quickAmounts = getQuickAmounts();

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
          <DialogDescription>
            {isArabic ? "ادخل المبلغ المدفوع من العميل" : "Enter the amount paid by the customer"}
          </DialogDescription>
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
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handlePaidAmountChange}
              className="text-lg font-bold"
            />
          </div>
          
          {/* Quick amount selection */}
          <div className="flex flex-wrap gap-2 mt-1">
            {quickAmounts.map(amount => (
              <Button 
                key={amount} 
                type="button" 
                variant="outline" 
                className="flex-1 min-w-[70px]"
                onClick={() => updateAmount(amount.toString())}
              >
                {amount}
              </Button>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 min-w-[70px]"
              onClick={() => updateAmount(total.toString())}
            >
              {isArabic ? "الضبط" : "Exact"}
            </Button>
          </div>
          
          {/* Numeric keypad */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button
                key={num}
                type="button"
                variant="outline"
                onClick={() => handleNumberClick(num.toString())}
                className="h-12 text-lg"
              >
                {num}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleNumberClick(".")}
              className="h-12 text-lg"
            >
              .
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleNumberClick("0")}
              className="h-12 text-lg"
            >
              0
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleNumberClick("C")}
              className="h-12 text-lg"
            >
              C
            </Button>
          </div>
          
          <div className="grid gap-2 mt-1">
            <Label htmlFor="change-amount" className="text-md">
              {isArabic ? "المبلغ المتبقي للعميل" : "Change Amount"}
            </Label>
            <Input
              id="change-amount"
              value={change.toFixed(2)}
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

export default PaymentAmountDialog;
