
import React from "react";
import DiscountInput from "../DiscountInput";

interface DiscountSectionProps {
  discount: number;
  discountType: "percentage" | "fixed";
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  isMobile: boolean;
  isArabic: boolean;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({
  discount,
  discountType,
  setDiscount,
  setDiscountType,
  isMobile,
  isArabic
}) => {
  return (
    <DiscountInput
      discount={discount}
      discountType={discountType}
      setDiscount={setDiscount}
      setDiscountType={setDiscountType}
      isMobile={isMobile}
      isArabic={isArabic}
    />
  );
};

export default DiscountSection;
