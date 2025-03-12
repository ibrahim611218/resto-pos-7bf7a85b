
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { Percent, DollarSign } from "lucide-react";

export interface DiscountInputProps {
  discount: number;
  discountType: "percentage" | "fixed";
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  isMobile?: boolean;
}

const DiscountInput: React.FC<DiscountInputProps> = ({
  discount,
  discountType,
  setDiscount,
  setDiscountType,
  isMobile = false
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [inputValue, setInputValue] = useState<string>(
    discount > 0 ? discount.toString() : ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setDiscount(numericValue);
    } else {
      setDiscount(0);
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setInputValue("");
      setDiscount(0);
    }
  };

  return (
    <div className={`mb-${isMobile ? '2' : '3'}`}>
      <Label className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
        {isArabic ? "الخصم" : "Discount"}
      </Label>
      <div className="flex space-x-2 rtl:space-x-reverse">
        <div className="flex-1 flex">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="number"
            min="0"
            placeholder={isArabic ? "قيمة الخصم" : "Discount value"}
            className={`flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}
          />
        </div>
        <div className="flex space-x-1 rtl:space-x-reverse">
          <Button
            type="button"
            variant={discountType === "percentage" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setDiscountType("percentage")}
            className="flex items-center justify-center"
          >
            <Percent className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
          </Button>
          <Button
            type="button"
            variant={discountType === "fixed" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setDiscountType("fixed")}
            className="flex items-center justify-center"
          >
            <DollarSign className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscountInput;
