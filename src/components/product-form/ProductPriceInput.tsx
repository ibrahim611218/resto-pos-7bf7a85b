
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductPriceInputProps {
  price: number | undefined;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isArabic: boolean;
}

const ProductPriceInput: React.FC<ProductPriceInputProps> = ({
  price,
  handlePriceChange,
  isArabic,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">{isArabic ? "السعر" : "Price"}</Label>
      <div className="flex items-center space-x-2 space-x-reverse">
        <Input 
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price || ""}
          onChange={handlePriceChange}
          placeholder={isArabic ? "أدخل سعر المنتج" : "Enter product price"}
          className="w-full"
        />
        <span>{isArabic ? "ريال" : "SAR"}</span>
      </div>
    </div>
  );
};

export default ProductPriceInput;
