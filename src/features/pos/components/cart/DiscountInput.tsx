
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent, DollarSign } from "lucide-react";
import NumberPad from "./NumberPad";

interface DiscountInputProps {
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
  const [showNumberPad, setShowNumberPad] = useState(false);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscount(value);
  };

  const handleInputClick = () => {
    setShowNumberPad(true);
  };

  const handleNumberPadConfirm = (value: number) => {
    setDiscount(value);
    setShowNumberPad(false);
  };

  return (
    <>
      <div className={`mb-${isMobile ? '2' : '3'}`}>
        <Label className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
          {isArabic ? "الخصم" : "Discount"}
        </Label>
        <div className="flex space-x-1 space-x-reverse">
          <Input
            type="number"
            value={discount}
            onChange={handleDiscountChange}
            onClick={handleInputClick}
            className={`flex-1 p-${isMobile ? '1.5' : '2'} ${isMobile ? 'text-sm' : 'text-base'}`}
            placeholder="0"
            min="0"
            step="0.01"
            readOnly
          />
          <Button
            type="button"
            variant={discountType === "percentage" ? "default" : "outline"}
            onClick={() => setDiscountType("percentage")}
            className={`px-${isMobile ? '2' : '3'}`}
            size={isMobile ? "sm" : "default"}
          >
            <Percent className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
          </Button>
          <Button
            type="button"
            variant={discountType === "fixed" ? "default" : "outline"}
            onClick={() => setDiscountType("fixed")}
            className={`px-${isMobile ? '2' : '3'}`}
            size={isMobile ? "sm" : "default"}
          >
            <DollarSign className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
          </Button>
        </div>
      </div>

      <NumberPad
        isOpen={showNumberPad}
        onClose={() => setShowNumberPad(false)}
        onConfirm={handleNumberPadConfirm}
        initialValue={discount}
      />
    </>
  );
};

export default DiscountInput;
