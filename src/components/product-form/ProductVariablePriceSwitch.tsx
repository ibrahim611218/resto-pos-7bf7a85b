import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ProductVariablePriceSwitchProps {
  variablePrice: boolean | undefined;
  handleSwitchChange: (checked: boolean) => void;
  isArabic: boolean;
}

const ProductVariablePriceSwitch: React.FC<ProductVariablePriceSwitchProps> = ({
  variablePrice,
  handleSwitchChange,
  isArabic,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="variablePrice">{isArabic ? "سعر متغير" : "Variable Price"}</Label>
        <p className="text-sm text-muted-foreground">
          {isArabic 
            ? "عند التفعيل، سيتم إدخال السعر عند إضافة المنتج للسلة" 
            : "When enabled, price will be entered when adding to cart"
          }
        </p>
      </div>
      <Switch
        id="variablePrice"
        checked={variablePrice || false}
        onCheckedChange={handleSwitchChange}
      />
    </div>
  );
};

export default ProductVariablePriceSwitch;