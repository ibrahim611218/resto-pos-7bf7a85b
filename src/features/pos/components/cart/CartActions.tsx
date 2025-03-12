
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface CartActionsProps {
  cartItems: any[];
  handleCreateInvoice: () => void;
  clearCart: () => void; 
  isMobile?: boolean;
  isArabic?: boolean;
}

const CartActions: React.FC<CartActionsProps> = ({
  cartItems,
  handleCreateInvoice,
  isMobile = false,
  isArabic = false
}) => {
  const isEmpty = cartItems.length === 0;

  return (
    <div className={isMobile ? "mt-2" : "mt-3"}>
      <Button 
        className={`w-full ${isMobile ? 'h-9 text-sm' : 'h-10 text-base'} flex items-center justify-center gap-1`}
        onClick={handleCreateInvoice}
        disabled={isEmpty}
      >
        <div className="flex items-center">
          <CreditCard className={`${isArabic ? 'ml-1' : 'mr-1'} ${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </div>
      </Button>
    </div>
  );
};

export default CartActions;
