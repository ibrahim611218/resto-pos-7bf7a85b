
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CartActionsProps {
  cartItems: any[];
  handleCreateInvoice: () => void;
  clearCart: () => void; // We'll keep this in the interface for now to avoid breaking existing code
}

const CartActions: React.FC<CartActionsProps> = ({
  cartItems,
  handleCreateInvoice,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const isEmpty = cartItems.length === 0;

  return (
    <div className="mt-3">
      <Button 
        className="w-full h-10 flex items-center justify-center gap-1 text-base" 
        onClick={handleCreateInvoice}
        disabled={isEmpty}
      >
        <div className="flex items-center">
          <CreditCard className={`${isArabic ? 'ml-1' : 'mr-1'} h-4 w-4`} />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </div>
      </Button>
    </div>
  );
};

export default CartActions;
