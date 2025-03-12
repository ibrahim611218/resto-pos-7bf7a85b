
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Home } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface OrderTypeSelectorProps {
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  isMobile?: boolean;
  isArabic?: boolean;
}

const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  orderType,
  tableNumber,
  setOrderType,
  setTableNumber,
  isMobile = false,
  isArabic = false
}) => {
  return (
    <>
      <div className={`mb-${isMobile ? '2' : '3'}`}>
        <Label className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
          {isArabic ? "نوع الطلب" : "Order Type"}
        </Label>
        <RadioGroup 
          value={orderType} 
          onValueChange={(value: "takeaway" | "dineIn") => setOrderType(value)}
          className="flex space-x-2 space-x-reverse"
        >
          <div className={`flex items-center space-x-1 space-x-reverse bg-accent p-${isMobile ? '1' : '2'} rounded-lg border border-accent-foreground/20 flex-1 justify-center`}>
            <RadioGroupItem value="takeaway" id="takeaway" />
            <Label htmlFor="takeaway" className="flex items-center cursor-pointer">
              <ShoppingBag className={`${isArabic ? 'ml-1' : 'mr-1'} h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
              <span className="text-sm">{isArabic ? "سفري" : "Takeaway"}</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-1 space-x-reverse bg-accent p-${isMobile ? '1' : '2'} rounded-lg border border-accent-foreground/20 flex-1 justify-center`}>
            <RadioGroupItem value="dineIn" id="dineIn" />
            <Label htmlFor="dineIn" className="flex items-center cursor-pointer">
              <Home className={`${isArabic ? 'ml-1' : 'mr-1'} h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
              <span className="text-sm">{isArabic ? "محلي" : "Dine In"}</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {orderType === "dineIn" && (
        <div className={`mb-${isMobile ? '2' : '3'}`}>
          <Label htmlFor="tableNumber" className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
            {isArabic ? "رقم الطاولة" : "Table Number"}
          </Label>
          <Input
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className={`w-full p-${isMobile ? '1.5' : '2'} ${isMobile ? 'text-sm' : 'text-base'}`}
            placeholder={isArabic ? "أدخل رقم الطاولة" : "Enter table number"}
          />
        </div>
      )}
    </>
  );
};

export default OrderTypeSelector;
