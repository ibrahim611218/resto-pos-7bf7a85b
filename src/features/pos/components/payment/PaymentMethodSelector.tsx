
import React from "react";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/types";
import { Coins, CreditCard, Banknote } from "lucide-react";
import { formatPaymentMethod } from "@/features/reports/sales-report/utils/formatters";

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
    <div className="grid grid-cols-3 gap-4">
      <Button
        variant={paymentMethod === "cash" ? "default" : "outline"}
        className="h-14 text-lg flex flex-col items-center justify-center p-2"
        onClick={() => setPaymentMethod("cash")}
      >
        <Coins className="h-5 w-5 mb-1" />
        {formatPaymentMethod("cash", isArabic)}
      </Button>
      <Button
        variant={paymentMethod === "card" ? "default" : "outline"}
        className="h-14 text-lg flex flex-col items-center justify-center p-2"
        onClick={() => setPaymentMethod("card")}
      >
        <CreditCard className="h-5 w-5 mb-1" />
        {formatPaymentMethod("card", isArabic)}
      </Button>
      <Button
        variant={paymentMethod === "transfer" ? "default" : "outline"}
        className="h-14 text-lg flex flex-col items-center justify-center p-2"
        onClick={() => setPaymentMethod("transfer")}
      >
        <Banknote className="h-5 w-5 mb-1" />
        {formatPaymentMethod("transfer", isArabic)}
      </Button>
    </div>
  );
};

export default PaymentMethodSelector;
