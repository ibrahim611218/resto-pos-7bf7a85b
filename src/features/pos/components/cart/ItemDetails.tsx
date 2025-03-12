
import React, { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ItemDetailsProps {
  name: string;
  nameAr?: string;
  size: string;
  price: number;
  quantity: number;
  isArabic: boolean;
  sizeLabel: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  nameAr,
  size,
  price,
  quantity,
  isArabic,
  sizeLabel,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const totalPrice = price * quantity;

  return (
    <div className="flex-1 text-center">
      <p className="font-bold text-base mb-1">
        {isArabic ? nameAr || name : name}
      </p>
      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
        <span className={`text-sm ${isLightTheme ? 'bg-primary/10 text-primary' : 'bg-primary/20 text-primary-foreground'} px-2 py-0.5 rounded-full font-medium`}>
          {sizeLabel}
        </span>
        <p className="text-sm">
          <span className="text-muted-foreground">{price.toFixed(2)} {isArabic ? "ر.س" : "SAR"} x {quantity} = </span>
          <span className="font-bold text-foreground">{totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ItemDetails);
