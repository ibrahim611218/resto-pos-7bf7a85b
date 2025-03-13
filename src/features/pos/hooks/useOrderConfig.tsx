
import { useState } from "react";
import { PaymentMethod } from "@/types";

export const useOrderConfig = () => {
  const [orderType, setOrderType] = useState<"takeaway" | "dineIn">("takeaway");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [paidAmount, setPaidAmount] = useState<number>(0);

  const resetOrderConfig = () => {
    setOrderType("takeaway");
    setTableNumber("");
    setDiscount(0);
    setDiscountType("percentage");
    setPaymentMethod("cash");
    setPaidAmount(0);
  };

  return {
    orderType,
    tableNumber,
    discount,
    discountType,
    paymentMethod,
    paidAmount,
    setOrderType,
    setTableNumber,
    setDiscount,
    setDiscountType,
    setPaymentMethod,
    setPaidAmount,
    resetOrderConfig
  };
};
