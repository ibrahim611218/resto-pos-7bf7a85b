
import React from "react";
import OrderTypeSelector from "../OrderTypeSelector";

interface OrderTypeSectionProps {
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  isMobile: boolean;
  isArabic: boolean;
}

const OrderTypeSection: React.FC<OrderTypeSectionProps> = ({
  orderType,
  tableNumber,
  setOrderType,
  setTableNumber,
  isMobile,
  isArabic
}) => {
  return (
    <OrderTypeSelector
      orderType={orderType}
      tableNumber={tableNumber}
      setOrderType={setOrderType}
      setTableNumber={setTableNumber}
      isMobile={isMobile}
      isArabic={isArabic}
    />
  );
};

export default OrderTypeSection;
