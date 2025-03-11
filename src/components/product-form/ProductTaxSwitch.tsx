
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ProductTaxSwitchProps {
  taxable: boolean;
  handleSwitchChange: (checked: boolean) => void;
  isArabic: boolean;
}

const ProductTaxSwitch: React.FC<ProductTaxSwitchProps> = ({
  taxable,
  handleSwitchChange,
  isArabic,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch 
          id="taxable"
          checked={taxable}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="taxable">خاضع للضريبة</Label>
      </div>
    </div>
  );
};

export default ProductTaxSwitch;
