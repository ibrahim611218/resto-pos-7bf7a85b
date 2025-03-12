
import React from "react";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { useLanguage } from "@/context/LanguageContext";

const EmptyCart: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <AnimatedTransition animation="fade">
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p className="text-lg">
          {isArabic ? "السلة فارغة" : "Your cart is empty"}
        </p>
      </div>
    </AnimatedTransition>
  );
};

export default EmptyCart;
