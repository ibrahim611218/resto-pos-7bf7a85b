
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Percent, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-${isMobile ? '2' : '3'}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between">
          <Label className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>
            {isArabic ? "الخصم" : "Discount"}
          </Label>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size={isMobile ? "xs" : "sm"} className={`h-${isMobile ? '6' : '7'} w-${isMobile ? '6' : '7'} p-0`}>
              {isOpen ? 
                <ChevronUp className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} /> : 
                <ChevronDown className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
              }
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className={`w-full pr-8 ${isMobile ? 'text-sm p-2' : 'text-base p-3'}`}
                  placeholder={isArabic ? "قيمة الخصم" : "Discount value"}
                />
                <div className={`absolute inset-y-0 right-3 flex items-center ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {discountType === "percentage" ? "%" : "ر.س"}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="px-3"
              size={isMobile ? "xs" : "default"}
              onClick={() => setDiscountType(discountType === "percentage" ? "fixed" : "percentage")}
            >
              {discountType === "percentage" ? <Percent size={isMobile ? 16 : 18} /> : <DollarSign size={isMobile ? 16 : 18} />}
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DiscountInput;
