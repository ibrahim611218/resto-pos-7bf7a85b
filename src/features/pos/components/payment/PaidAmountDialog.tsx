
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/utils/invoice";

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
  const [amount, setAmount] = useState(total.toString());
  
  // Quick amounts options (total + common additions)
  const quickAmounts = [
    total,
    Math.ceil(total / 5) * 5, // Round up to nearest 5
    Math.ceil(total / 10) * 10, // Round up to nearest 10
    Math.ceil(total / 50) * 50, // Round up to nearest 50
    Math.ceil(total / 100) * 100, // Round up to nearest 100
  ];
  
  // Filter out duplicates
  const uniqueQuickAmounts = [...new Set(quickAmounts)].sort((a, b) => a - b);

  const handleConfirm = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount >= 0) {
      onConfirm(parsedAmount);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "أدخل المبلغ المستلم" : "Enter Paid Amount"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="amount">{isArabic ? "المبلغ المستلم" : "Paid Amount"}</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 text-left"
              min="0"
              autoFocus
            />
          </div>
          
          <div>
            <Label>{isArabic ? "مبالغ سريعة" : "Quick Amounts"}</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {uniqueQuickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  onClick={() => setAmount(quickAmount.toString())}
                >
                  {formatCurrency(quickAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm">
              <span>{isArabic ? "المبلغ الإجمالي" : "Total Amount"}:</span>
              <span className="font-semibold">{formatCurrency(total, isArabic ? "ar-SA" : "en-US", "SAR")}</span>
            </div>
            
            {parseFloat(amount) > total && (
              <div className="flex justify-between text-sm text-green-600 mt-1">
                <span>{isArabic ? "المبلغ المتبقي" : "Change"}:</span>
                <span className="font-semibold">
                  {formatCurrency(parseFloat(amount) - total, isArabic ? "ar-SA" : "en-US", "SAR")}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
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

export default PaidAmountDialog;
