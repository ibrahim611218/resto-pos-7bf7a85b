
import React from "react";

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
  // Only show size label if it's not regular AND not medium (when displayed as regular)
  const shouldShowSizeLabel = size !== "regular" && size !== "medium";
  
  return (
    <div className="flex-1">
      <p className="font-medium">
        {isArabic ? nameAr || name : name}
        {shouldShowSizeLabel && (
          <span className="text-xs ml-1 text-muted-foreground">
            ({sizeLabel})
          </span>
        )}
      </p>
      <p className="text-sm text-muted-foreground">
        {price.toFixed(2)} {isArabic ? "ر.س" : "SAR"} x {quantity}
      </p>
    </div>
  );
};

export default ItemDetails;
