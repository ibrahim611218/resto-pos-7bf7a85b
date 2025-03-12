
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Percent, DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DiscountInputProps {
  discount: number;
  discountType: "percentage" | "fixed";
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
}

const DiscountInput: React.FC<DiscountInputProps> = ({
  discount,
  discountType,
  setDiscount,
  setDiscountType,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="mb-5">
      <Label className="block mb-3 text-lg">{isArabic ? "الخصم" : "Discount"}</Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="w-full pr-8 text-base p-3"
              placeholder={isArabic ? "قيمة الخصم" : "Discount value"}
            />
            <div className="absolute inset-y-0 right-3 flex items-center text-base">
              {discountType === "percentage" ? "%" : "ر.س"}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="px-3"
          onClick={() => setDiscountType(discountType === "percentage" ? "fixed" : "percentage")}
        >
          {discountType === "percentage" ? <Percent size={18} /> : <DollarSign size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default DiscountInput;
