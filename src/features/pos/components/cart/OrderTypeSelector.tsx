
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isArabic = language === "ar";
  const isLightTheme = theme === "light";

  return (
    <>
      <div className="mb-5 text-center">
        <Label className="block mb-3 text-base text-center mx-auto">{isArabic ? "نوع الطلب" : "Order Type"}</Label>
        <RadioGroup 
          value={orderType} 
          onValueChange={(value: "takeaway" | "dineIn") => setOrderType(value)}
          className="flex space-x-2 space-x-reverse justify-center"
        >
          <div className={`flex items-center space-x-2 space-x-reverse ${isLightTheme ? 'bg-secondary/20' : 'bg-accent'} p-3 rounded-xl border border-accent-foreground/10 flex-1 justify-center ${orderType === 'takeaway' ? 'ring-1 ring-primary' : ''}`}>
            <RadioGroupItem value="takeaway" id="takeaway" />
            <Label htmlFor="takeaway" className="flex items-center cursor-pointer">
              <ShoppingBag className="ml-2 h-4 w-4" />
              <span className="text-sm">{isArabic ? "سفري" : "Takeaway"}</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-2 space-x-reverse ${isLightTheme ? 'bg-secondary/20' : 'bg-accent'} p-3 rounded-xl border border-accent-foreground/10 flex-1 justify-center ${orderType === 'dineIn' ? 'ring-1 ring-primary' : ''}`}>
            <RadioGroupItem value="dineIn" id="dineIn" />
            <Label htmlFor="dineIn" className="flex items-center cursor-pointer">
              <Utensils className="ml-2 h-4 w-4" />
              <span className="text-sm">{isArabic ? "محلي" : "Dine In"}</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {orderType === "dineIn" && (
        <div className="mb-5 text-center">
          <Label htmlFor="tableNumber" className="block mb-2 text-base text-center">
            {isArabic ? "رقم الطاولة" : "Table Number"}
          </Label>
          <Input
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full p-2 text-base rounded-xl text-center mx-auto max-w-[200px]"
            placeholder={isArabic ? "أدخل رقم الطاولة" : "Enter table number"}
          />
        </div>
      )}
    </>
  );
};

export default OrderTypeSelector;
