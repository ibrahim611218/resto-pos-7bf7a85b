
import React from "react";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/types";

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  isArabic: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod,
  isArabic,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant={paymentMethod === "cash" ? "default" : "outline"}
        className="h-14 text-lg"
        onClick={() => setPaymentMethod("cash")}
      >
        {isArabic ? "نقدي" : "Cash"}
      </Button>
      <Button
        variant={paymentMethod === "card" ? "default" : "outline"}
        className="h-14 text-lg"
        onClick={() => setPaymentMethod("card")}
      >
        {isArabic ? "شبكة" : "Card"}
      </Button>
    </div>
  );
};

export default PaymentMethodSelector;

