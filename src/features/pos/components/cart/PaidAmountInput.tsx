
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/invoice";
import NumberPad from "./NumberPad";
import { DollarSign } from "lucide-react";

interface PaidAmountInputProps {
  paidAmount: number;
  setPaidAmount: (amount: number) => void;
  total: number;
  isMobile?: boolean;
  isArabic?: boolean;
}

const PaidAmountInput: React.FC<PaidAmountInputProps> = ({
  paidAmount,
  setPaidAmount,
  total,
  isMobile = false,
  isArabic = false
}) => {
  const [showNumberPad, setShowNumberPad] = useState(false);
  
  // Calculate the remaining amount (only for display)
  const remainingAmount = Math.max(0, total - paidAmount);

  // Automatically update paid amount when total changes
  useEffect(() => {
    if (paidAmount > total) {
      setPaidAmount(total);
    }
  }, [total, paidAmount, setPaidAmount]);

  const handlePaidAmountClick = () => {
    setShowNumberPad(true);
  };

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';

  return (
    <div className={`mb-${isMobile ? '2' : '3'}`}>
      <Label className={`block mb-1 ${textSizeClass}`}>
        {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
      </Label>
      <div className="flex space-x-2 rtl:space-x-reverse">
        <div className="flex-1">
          <Input
            type="text"
            readOnly
            value={paidAmount ? formatCurrency(paidAmount, isArabic ? "ar-SA" : "en-US", "SAR") : "0"}
            onClick={handlePaidAmountClick}
            className={`w-full p-${isMobile ? '1.5' : '2'}`}
            placeholder={isArabic ? "أدخل المبلغ المدفوع" : "Enter paid amount"}
          />
        </div>
      </div>

      {/* إظهار المبلغ المتبقي دائماً بشكل واضح مع أيقونة إذا كان هناك مبلغ متبقي */}
      {remainingAmount > 0 && (
        <div className="text-sm mt-2 text-red-600 font-bold flex items-center">
          <DollarSign className={`${isArabic ? 'ml-1' : 'mr-1'}`} size={16} />
          <span>
            {isArabic ? "المتبقي: " : "Remaining: "}
            {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
          </span>
        </div>
      )}

      <NumberPad
        isOpen={showNumberPad}
        onClose={() => setShowNumberPad(false)}
        onConfirm={(value) => {
          // Ensure paid amount doesn't exceed total
          const newPaidAmount = Math.min(value, total);
          setPaidAmount(newPaidAmount);
          setShowNumberPad(false);
        }}
        initialValue={paidAmount}
        title={isArabic ? "أدخل المبلغ المدفوع" : "Enter Paid Amount"}
        decimalAllowed={true}
        isArabic={isArabic}
        showRemainingAmount={true}
        remainingAmount={total}
      />
    </div>
  );
};

export default PaidAmountInput;
