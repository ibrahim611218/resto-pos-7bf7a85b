
import React, { memo } from "react";
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
    <div className="mt-6 space-y-4 text-center">
      <Button 
        className={`w-full h-16 flex items-center justify-center gap-2 text-xl shadow-md transition-all duration-200 hover:translate-y-[-2px] transform ${
          isLightTheme ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80' : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={handleCreateInvoice}
        disabled={isEmpty}
      >
        <div className="flex items-center justify-center">
          <CreditCard className={`${isArabic ? 'ml-3' : 'mr-3'} h-6 w-6`} />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </div>
      </Button>
      
      {!isEmpty && (
        <Button 
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-2 text-base text-destructive hover:text-destructive-foreground hover:bg-destructive/90 border-destructive/30" 
          onClick={clearCart}
        >
          <Trash2 className={`${isArabic ? 'ml-2' : 'mr-2'} h-5 w-5`} />
          {isArabic ? "مسح السلة" : "Clear Cart"}
        </Button>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CartActions);
