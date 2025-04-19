
import React from "react";
import CartSummary from "../CartSummary";
import { PaymentMethod } from "@/types";

interface SummarySectionProps {
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  isMobile: boolean;
  isArabic: boolean;
  paymentMethod?: PaymentMethod;
  paidAmount?: number;
  onPaidAmountClick?: () => void;
  taxIncluded?: boolean;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  subtotal,
  taxAmount,
  discount,
  discountType,
  total,
  isMobile,
  isArabic,
  paymentMethod,
  paidAmount,
  onPaidAmountClick,
  taxIncluded
}) => {
  return (
    <CartSummary
      subtotal={subtotal}
      taxAmount={taxAmount}
      discount={discount}
      discountType={discountType}
      total={total}
      isMobile={isMobile}
      isArabic={isArabic}
      paymentMethod={paymentMethod}
      paidAmount={paidAmount}
      onPaidAmountClick={onPaidAmountClick}
      taxIncluded={taxIncluded}
    />
  );
};

export default SummarySection;
