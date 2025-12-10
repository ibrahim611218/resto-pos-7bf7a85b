
import React from "react";
import OrderTypeSelector from "../OrderTypeSelector";
import { OrderType } from "@/types";

interface OrderTypeSectionProps {
  orderType: OrderType;
  tableNumber: string;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (number: string) => void;
  isMobile: boolean;
  isArabic: boolean;
  deliveryAddress?: string;
  setDeliveryAddress?: (address: string) => void;
}

const OrderTypeSection: React.FC<OrderTypeSectionProps> = ({
  orderType,
  tableNumber,
  setOrderType,
  setTableNumber,
  isMobile,
  isArabic,
  deliveryAddress,
  setDeliveryAddress
}) => {
  return (
    <OrderTypeSelector
      orderType={orderType}
      tableNumber={tableNumber}
      setOrderType={setOrderType}
      setTableNumber={setTableNumber}
      isMobile={isMobile}
      isArabic={isArabic}
      deliveryAddress={deliveryAddress}
      setDeliveryAddress={setDeliveryAddress}
    />
  );
};

export default OrderTypeSection;
