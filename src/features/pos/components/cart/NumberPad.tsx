
import React from "react";
import NumberPadComponent from "@/components/ui/number-pad";

interface NumberPadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: number) => void;
  initialValue?: number;
}

const NumberPad: React.FC<NumberPadProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValue = 1
}) => {
  return (
    <NumberPadComponent
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      initialValue={initialValue}
      title="أدخل الكمية"
      isArabic={true}
    />
  );
};

export default NumberPad;
