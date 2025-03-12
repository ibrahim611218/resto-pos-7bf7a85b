
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Send, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CartActionsProps {
  cartItems: any[];
  handleCreateInvoice: () => void;
  clearCart: () => void;
  onSendToKitchen: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({
  cartItems,
  handleCreateInvoice,
  clearCart,
  onSendToKitchen,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const isEmpty = cartItems.length === 0;

  return (
    <div className="mt-6 space-y-3">
      <Button 
        className="w-full h-14 flex items-center justify-center gap-2 text-lg" 
        onClick={handleCreateInvoice}
        disabled={isEmpty}
      >
        <div className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full h-12 flex items-center justify-center gap-2"
        onClick={onSendToKitchen}
        disabled={isEmpty}
      >
        <Send className="mr-2 h-5 w-5" />
        {isArabic ? "إرسال للمطبخ" : "Send to Kitchen"}
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full h-12 flex items-center justify-center gap-2"
        onClick={clearCart}
        disabled={isEmpty}
      >
        <Trash2 className="mr-2 h-5 w-5" />
        {isArabic ? "مسح السلة" : "Clear Cart"}
      </Button>
    </div>
  );
};

export default CartActions;
