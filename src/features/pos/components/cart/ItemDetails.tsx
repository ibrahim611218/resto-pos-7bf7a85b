
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
  return (
    <div className="flex-1">
      <p className="font-medium">
        {isArabic ? nameAr || name : name}
        {size !== "regular" && (
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
