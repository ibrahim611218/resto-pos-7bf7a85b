
import React from "react";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCartIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const EmptyCart: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  const isLightTheme = theme === "light";

  return (
    <AnimatedTransition animation="fade">
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground py-10">
        <div className={`w-20 h-20 rounded-full ${isLightTheme ? 'bg-primary/10' : 'bg-primary/20'} flex items-center justify-center mb-4`}>
          <ShoppingCartIcon className="h-10 w-10 text-primary/70" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          {isArabic ? "السلة فارغة" : "Your cart is empty"}
        </p>
        <p className="text-sm mt-1 text-muted-foreground/70 text-center max-w-[200px]">
          {isArabic 
            ? "أضف بعض العناصر إلى السلة للبدء"
            : "Add some items to get started"
          }
        </p>
      </div>
    </AnimatedTransition>
  );
};

export default EmptyCart;
