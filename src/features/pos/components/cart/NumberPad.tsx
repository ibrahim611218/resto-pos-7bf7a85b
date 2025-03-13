
import React from "react";
import NumberPadComponent from "@/components/ui/number-pad";

interface NumberPadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: number) => void;
  initialValue?: number;
  title?: string;
  isArabic?: boolean;
  decimalAllowed?: boolean;
  showRemainingAmount?: boolean;
  remainingAmount?: number;
}

const NumberPad: React.FC<NumberPadProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValue = 1,
  title,
  isArabic = false,
  decimalAllowed = false,
  showRemainingAmount = false,
  remainingAmount = 0
}) => {
  return (
    <NumberPadComponent
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      initialValue={initialValue}
      title={title || (isArabic ? "أدخل الكمية" : "Enter Quantity")}
      isArabic={isArabic}
      decimalAllowed={decimalAllowed}
      showRemainingAmount={showRemainingAmount}
      remainingAmount={remainingAmount}
    />
  );
};

export default NumberPad;
