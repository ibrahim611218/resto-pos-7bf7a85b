
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/invoice";
import NumberPad from "./NumberPad";

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
  const remainingAmount = Math.max(0, total - paidAmount);

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

      {remainingAmount > 0 && paidAmount > 0 && (
        <div className="text-sm mt-1 text-red-600 font-medium">
          {isArabic ? "المتبقي: " : "Remaining: "}
          {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
        </div>
      )}

      <NumberPad
        isOpen={showNumberPad}
        onClose={() => setShowNumberPad(false)}
        onConfirm={(value) => {
          setPaidAmount(value);
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
