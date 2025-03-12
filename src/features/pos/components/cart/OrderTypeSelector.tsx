
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface OrderTypeSelectorProps {
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
}

const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  orderType,
  tableNumber,
  setOrderType,
  setTableNumber,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <>
      <div className="mb-5">
        <Label className="block mb-3 text-lg">{isArabic ? "نوع الطلب" : "Order Type"}</Label>
        <RadioGroup 
          value={orderType} 
          onValueChange={(value: "takeaway" | "dineIn") => setOrderType(value)}
          className="flex space-x-4 space-x-reverse"
        >
          <div className="flex items-center space-x-2 space-x-reverse bg-accent p-3 rounded-lg border border-accent-foreground/20 flex-1 justify-center">
            <RadioGroupItem value="takeaway" id="takeaway" />
            <Label htmlFor="takeaway" className="flex items-center cursor-pointer">
              <ShoppingBag className="ml-2 h-5 w-5" />
              <span className="text-base">{isArabic ? "سفري" : "Takeaway"}</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse bg-accent p-3 rounded-lg border border-accent-foreground/20 flex-1 justify-center">
            <RadioGroupItem value="dineIn" id="dineIn" />
            <Label htmlFor="dineIn" className="flex items-center cursor-pointer">
              <Home className="ml-2 h-5 w-5" />
              <span className="text-base">{isArabic ? "محلي" : "Dine In"}</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {orderType === "dineIn" && (
        <div className="mb-5">
          <Label htmlFor="tableNumber" className="block mb-3 text-lg">
            {isArabic ? "رقم الطاولة" : "Table Number"}
          </Label>
          <Input
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full p-3 text-lg"
            placeholder={isArabic ? "أدخل رقم الطاولة" : "Enter table number"}
          />
        </div>
      )}
    </>
  );
};

export default OrderTypeSelector;
