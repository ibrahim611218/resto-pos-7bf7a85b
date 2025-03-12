
import React from "react";
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
    <div className="flex-1">
      <p className="font-medium text-base mb-1">
        {isArabic ? nameAr || name : name}
      </p>
      <div className="flex items-center">
        <span className={`text-sm mr-2 ${isLightTheme ? 'bg-primary/10 text-primary' : 'bg-secondary/50 text-secondary-foreground'} px-2 py-0.5 rounded-full`}>
          {sizeLabel}
        </span>
        <p className="text-sm text-muted-foreground">
          {price.toFixed(2)} {isArabic ? "ر.س" : "SAR"} x {quantity} = <span className="font-semibold text-foreground">{totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
