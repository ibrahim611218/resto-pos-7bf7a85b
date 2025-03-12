
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface CartActionsProps {
  cartItems: any[];
  handleCreateInvoice: () => void;
  clearCart: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({
  cartItems,
  handleCreateInvoice,
  clearCart,
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  const isEmpty = cartItems.length === 0;
  const isLightTheme = theme === "light";

  return (
    <div className="mt-6 space-y-3">
      <Button 
        className={`w-full h-14 flex items-center justify-center gap-2 text-lg shadow-md transition-all duration-200 hover:translate-y-[-2px] transform ${
          isLightTheme ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80' : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={handleCreateInvoice}
        disabled={isEmpty}
      >
        <div className="flex items-center">
          <CreditCard className={`${isArabic ? 'ml-2' : 'mr-2'} h-5 w-5`} />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </div>
      </Button>
      
      {!isEmpty && (
        <Button 
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive/90 border-destructive/30" 
          onClick={clearCart}
        >
          <Trash2 className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {isArabic ? "مسح السلة" : "Clear Cart"}
        </Button>
      )}
    </div>
  );
};

export default CartActions;
