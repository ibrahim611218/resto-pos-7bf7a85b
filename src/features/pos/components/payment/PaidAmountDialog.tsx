
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NumericKeypad from "../cart/numeric-keypad/NumericKeypad";
import QuickAmountButtons from "../cart/quick-amount/QuickAmountButtons";
import AmountField from "../cart/amount-field/AmountField";
import { useLanguage } from "@/context/LanguageContext";

interface PaidAmountDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  total: number;
}

const PaidAmountDialog: React.FC<PaidAmountDialogProps> = ({
  open,
  onClose,
  onConfirm,
  total,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [paidAmount, setPaidAmount] = useState<number>(total);
  const [change, setChange] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>(total.toString());
  const [isFirstInput, setIsFirstInput] = useState(true);

  useEffect(() => {
    if (open) {
      setPaidAmount(total);
      setInputValue(total.toString());
      setChange(0);
      setIsFirstInput(true);
    }
  }, [open, total]);

  const handlePaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    updateAmount(inputVal);
  };

  const updateAmount = (inputVal: string) => {
    setInputValue(inputVal);
    
    const value = parseFloat(inputVal);
    if (!isNaN(value)) {
      setPaidAmount(value);
      const changeAmount = value - total;
      setChange(Math.max(0, changeAmount));
    } else {
      setPaidAmount(0);
      setChange(0);
    }
  };

  const handleNumberClick = (digit: string) => {
    let newValue = inputValue;
    
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
      // For regular digits, replace the value on first click
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
    onClose();
  };

  const getQuickAmounts = () => {
    const roundedTotal = Math.ceil(total);
    const denominations = [10, 20, 50, 100, 200, 500];
    return denominations.filter(amount => amount >= roundedTotal);
  };

  const quickAmounts = getQuickAmounts();

  return (
    <Dialog open={open} onOpenChange={(openState) => !openState && onClose()}>
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
          <AmountField 
            id="total-amount"
            label={isArabic ? "المبلغ الإجمالي" : "Total Amount"}
            value={total}
            disabled={true}
            formatAsCurrency={true}
            isArabic={isArabic}
          />
          
          <AmountField 
            id="paid-amount"
            label={isArabic ? "المبلغ المستلم" : "Paid Amount"}
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
            value={change}
            disabled={true}
            formatAsCurrency={true}
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

export default PaidAmountDialog;

