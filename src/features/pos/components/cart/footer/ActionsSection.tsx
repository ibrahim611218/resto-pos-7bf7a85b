
import React from "react";
import CartActions from "../CartActions";

interface ActionsSectionProps {
  cartItems: any[];
  handleCreateInvoice: () => void;
  clearCart: () => void;
  isMobile: boolean;
  isArabic: boolean;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({
  cartItems,
  handleCreateInvoice,
  clearCart,
  isMobile,
  isArabic
}) => {
  return (
    <CartActions
      cartItems={cartItems}
      handleCreateInvoice={handleCreateInvoice}
      clearCart={clearCart}
      isMobile={isMobile}
      isArabic={isArabic}
    />
  );
};

export default ActionsSection;
