
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
    <div className="mt-6">
      <Button 
        className="w-full h-14 flex items-center justify-center gap-2 text-lg" 
        onClick={handleCreateInvoice}
        disabled={isEmpty}
      >
        <div className="flex items-center">
          <CreditCard className={`${isArabic ? 'ml-2' : 'mr-2'} h-5 w-5`} />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </div>
      </Button>
    </div>
  );
};

export default CartActions;
