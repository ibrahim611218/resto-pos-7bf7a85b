
import { useState } from "react";
import { PaymentMethod } from "@/types";

export const useOrderConfig = () => {
  const [orderType, setOrderType] = useState<"takeaway" | "dineIn">("takeaway");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const resetOrderConfig = () => {
    setDiscount(0);
    setTableNumber("");
    setOrderType("takeaway");
    setPaymentMethod("cash");
  };

  return {
    orderType,
    tableNumber,
    discount,
    discountType,
    paymentMethod,
    setOrderType,
    setTableNumber,
    setDiscount,
    setDiscountType,
    setPaymentMethod,
    resetOrderConfig
  };
};
