
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";

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
  const [inputValue, setInputValue] = useState<string>(
    discount > 0 ? discount.toString() : ""
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(discount > 0);

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
      if (discount === 0) {
        setIsExpanded(false); // اخفاء حقل الخصم اذا كان الخصم صفر
      }
    }
  };

  const toggleDiscount = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && discount === 0) {
      setInputValue("");
    }
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
            الخصم {discount > 0 && `(${discount})`}
          </Label>
          {isExpanded ? 
            <MinusCircle className="mr-1 h-4 w-4" /> : 
            <PlusCircle className="mr-1 h-4 w-4" />
          }
        </Button>
      </div>
      
      {isExpanded && (
        <div className="flex mt-1">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              type="number"
              min="0"
              placeholder="قيمة الخصم"
              className={`flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountInput;
