
import { useState, useEffect } from "react";
import { PaymentMethod } from "@/types";

interface UsePaidAmountProps {
  total: number;
  paymentMethod: PaymentMethod;
}

export const usePaidAmount = ({ total, paymentMethod }: UsePaidAmountProps) => {
  const [paidAmount, setPaidAmount] = useState<number>(total);
  const [showPaidAmountDialog, setShowPaidAmountDialog] = useState(false);

  // Update paidAmount when total changes or payment method changes
  useEffect(() => {
    setPaidAmount(total);
  }, [total, paymentMethod]);

  const handlePaidAmountClick = () => {
    if (paymentMethod === "cash") {
      setShowPaidAmountDialog(true);
    }
  };

  const handlePaidAmountConfirm = (amount: number) => {
    setPaidAmount(amount);
  };

  return {
    paidAmount,
    setPaidAmount,
    showPaidAmountDialog,
    setShowPaidAmountDialog,
    handlePaidAmountClick,
    handlePaidAmountConfirm
  };
};
