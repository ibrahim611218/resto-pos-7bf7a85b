import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, Percent, DollarSign } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import NumberPad from "./NumberPad";

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
  const [inputValue, setInputValue] = useState<string>(
    discount > 0 ? discount.toString() : ""
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(discount > 0);
  const [showNumberPad, setShowNumberPad] = useState<boolean>(false);

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

  const handleInputClick = () => {
    setShowNumberPad(true);
  };

  const handleSetDiscount = (newValue: number) => {
    setInputValue(newValue.toString());
    setDiscount(newValue);
  };

  const handleBlur = () => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setInputValue("");
      setDiscount(0);
      if (discount === 0) {
        setIsExpanded(false);
      }
    }
  };

  const toggleDiscount = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && discount === 0) {
      setInputValue("");
    }
  };

  const handleDiscountTypeChange = (value: string) => {
    setDiscountType(value as "percentage" | "fixed");
  };

  return (
    <div className={`mb-${isMobile ? '2' : '3'}`}>
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-right hover:bg-transparent hover:text-primary flex items-center" 
          onClick={toggleDiscount}
        >
          <Label className={`block cursor-pointer ${isMobile ? 'text-sm' : 'text-base'}`}>
            الخصم {discount > 0 && `(${discount}${discountType === 'percentage' ? '%' : ' ر.س'})`}
          </Label>
          {isExpanded ? 
            <MinusCircle className="mr-1 h-4 w-4" /> : 
            <PlusCircle className="mr-1 h-4 w-4" />
          }
        </Button>
      </div>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          <RadioGroup 
            value={discountType} 
            onValueChange={handleDiscountTypeChange}
            className="flex space-x-4 space-y-0 rtl:space-x-reverse"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="flex items-center">
                <Percent className="h-4 w-4 ml-1" /> نسبة مئوية
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="flex items-center">
                <DollarSign className="h-4 w-4 ml-1" /> مبلغ ثابت
              </Label>
            </div>
          </RadioGroup>

          <div className="flex">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onClick={handleInputClick}
                type="text"
                placeholder={discountType === "percentage" ? "نسبة الخصم" : "قيمة الخصم"}
                className={`flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}
              />
            </div>
            <div className="flex items-center mr-2">
              {discountType === "percentage" ? "%" : "ر.س"}
            </div>
          </div>
        </div>
      )}

      <NumberPad
        isOpen={showNumberPad}
        onClose={() => setShowNumberPad(false)}
        onConfirm={handleSetDiscount}
        initialValue={discount || 0}
      />
    </div>
  );
};

export default DiscountInput;
