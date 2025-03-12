
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface DiscountInputProps {
  discount: number;
  discountType: "percentage" | "fixed";
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  isMobile?: boolean;
  isArabic?: boolean;
}

const DiscountInput: React.FC<DiscountInputProps> = ({
  discount,
  discountType,
  setDiscount,
  setDiscountType,
  isMobile = false,
  isArabic = false
}) => {
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) value = 0;
    setDiscount(value);
  };

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';

  return (
    <div className={`mb-${isMobile ? '2' : '3'}`}>
      <Label className={`block mb-1 ${textSizeClass}`}>
        {isArabic ? "الخصم" : "Discount"}
      </Label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            type="number"
            min="0"
            value={discount || ""}
            onChange={handleDiscountChange}
            className={`w-full p-${isMobile ? '1.5' : '2'}`}
            placeholder={isArabic ? "أدخل قيمة الخصم" : "Enter discount"}
          />
        </div>
        <RadioGroup 
          value={discountType} 
          onValueChange={(value: "percentage" | "fixed") => setDiscountType(value)}
          className="flex shrink-0 items-center justify-end space-x-2"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="percentage" id="percentage" />
            <Label htmlFor="percentage" className="cursor-pointer">%</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed" className="cursor-pointer">
              {isArabic ? "ر.س" : "SAR"}
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DiscountInput;
