
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import CartFooter from "./CartFooter";
import EmptyCart from "./EmptyCart";
import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface CartPanelProps {
  expanded: boolean;
  onToggleExpand: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ 
  expanded, 
  onToggleExpand 
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const { 
    cartItems, 
    clearCart, 
    subtotal, 
    taxAmount, 
    total,
    discount,
    discountType,
    setDiscount,
    setDiscountType,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    paymentMethod,
    paidAmount
  } = useCart();

  const handleCreateInvoice = () => {
    // TODO: Implement invoice creation
    console.log("Creating invoice with", cartItems.length, "items");
  };

  return (
    <div 
      className={cn(
        "h-full flex flex-col border-r bg-card",
        expanded ? "w-full lg:w-1/3 xl:w-1/4" : "w-20",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <CartHeader 
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={cartItems.length === 0}
        toggleExpand={onToggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
      />
      
      {expanded ? (
        <>
          <div className="flex-1 overflow-auto">
            {cartItems.length > 0 ? (
              <CartItemsList cartItems={cartItems} isArabic={isArabic} />
            ) : (
              <EmptyCart />
            )}
          </div>
          
          <CartFooter 
            isMobile={isMobile}
            cartItems={cartItems}
            orderType={orderType}
            tableNumber={tableNumber}
            discount={discount}
            discountType={discountType}
            subtotal={subtotal}
            taxAmount={taxAmount}
            total={total}
            paymentMethod={paymentMethod}
            paidAmount={paidAmount}
            setOrderType={setOrderType}
            setTableNumber={setTableNumber}
            setDiscount={setDiscount}
            setDiscountType={setDiscountType}
            handleCreateInvoice={handleCreateInvoice}
            clearCart={clearCart}
            isArabic={isArabic}
          />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center pt-4 text-center">
          <div className="text-sm font-medium mb-2">
            {cartItems.length}
          </div>
          <div className="text-xs text-muted-foreground">
            {isArabic ? 'العناصر' : 'Items'}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
