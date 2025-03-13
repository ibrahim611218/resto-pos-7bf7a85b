
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
import { useLanguage } from "@/context/LanguageContext";
import NumericKeypad from "./cart/numeric-keypad/NumericKeypad";
import QuickAmountButtons from "./cart/quick-amount/QuickAmountButtons";
import AmountField from "./cart/amount-field/AmountField";

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
  const [isFirstInput, setIsFirstInput] = useState(true);

  // Update paid amount when total changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setPaidAmount(total);
      setInputValue(total.toString());
      setChange(0);
      setIsFirstInput(true);
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
      setIsFirstInput(true);
    } else if (digit === "⌫") {
      newValue = inputValue.slice(0, -1);
      if (newValue === "") newValue = "0";
    } else if (digit === ".") {
      if (!inputValue.includes(".")) {
        newValue = isFirstInput ? "0." : inputValue + ".";
        setIsFirstInput(false);
      }
    } else {
      // For regular digits
      if (isFirstInput) {
        newValue = digit;
        setIsFirstInput(false);
      } else {
        newValue = inputValue + digit;
      }
    }
    
    updateAmount(newValue);
  };

  const handleQuickAmountSelect = (amount: string) => {
    updateAmount(amount);
    setIsFirstInput(false);
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
          <AmountField 
            id="total-amount"
            label={isArabic ? "المبلغ الإجمالي" : "Total Amount"}
            value={total.toFixed(2)}
            disabled={true}
            isArabic={isArabic}
          />
          
          <AmountField 
            id="paid-amount"
            label={isArabic ? "المبلغ المدفوع" : "Paid Amount"}
            value={inputValue}
            onChange={handlePaidAmountChange}
            onClick={() => setIsFirstInput(true)}
            isArabic={isArabic}
          />
          
          <QuickAmountButtons 
            quickAmounts={quickAmounts}
            total={total}
            isArabic={isArabic}
            onAmountSelect={handleQuickAmountSelect}
          />
          
          <NumericKeypad onNumberClick={handleNumberClick} />
          
          <AmountField 
            id="change-amount"
            label={isArabic ? "المبلغ المتبقي للعميل" : "Change Amount"}
            value={change.toFixed(2)}
            disabled={true}
            className={change > 0 ? 'text-green-500' : 'text-gray-500'}
            isArabic={isArabic}
          />
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
