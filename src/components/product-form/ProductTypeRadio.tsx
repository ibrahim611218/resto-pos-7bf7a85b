
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductType } from "@/types";

interface ProductTypeRadioProps {
  productType: ProductType;
  handleTypeChange: (value: ProductType) => void;
  isArabic: boolean;
}

const ProductTypeRadio: React.FC<ProductTypeRadioProps> = ({
  productType,
  handleTypeChange,
  isArabic,
}) => {
  return (
    <div className="space-y-2">
      <Label>نوع المنتج</Label>
      <RadioGroup 
        value={productType} 
        onValueChange={(value) => handleTypeChange(value as ProductType)}
        className="flex space-x-4 space-x-reverse"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="sized" id="sized" />
          <Label htmlFor="sized">متعدد المقاسات</Label>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single">منتج فردي (بالحبة)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProductTypeRadio;
