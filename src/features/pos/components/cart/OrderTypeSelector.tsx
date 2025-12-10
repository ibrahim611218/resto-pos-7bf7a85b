
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Home, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import NumberPad from "./NumberPad";
import { OrderType } from "@/types";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

export interface OrderTypeSelectorProps {
  orderType: OrderType;
  tableNumber: string;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (number: string) => void;
  isMobile?: boolean;
  isArabic?: boolean;
  deliveryAddress?: string;
  setDeliveryAddress?: (address: string) => void;
}

const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  orderType,
  tableNumber,
  setOrderType,
  setTableNumber,
  isMobile = false,
  isArabic = false,
  deliveryAddress = "",
  setDeliveryAddress
}) => {
  const [showNumberPad, setShowNumberPad] = useState(false);
  const { settings } = useBusinessSettings();

  const handleTableNumberClick = () => {
    setShowNumberPad(true);
  };

  const handleNumberPadConfirm = (value: number) => {
    setTableNumber(value.toString());
    setShowNumberPad(false);
  };

  return (
    <>
      <div className={`mb-${isMobile ? '2' : '3'}`}>
        <Label className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
          {isArabic ? "نوع الطلب" : "Order Type"}
        </Label>
        <RadioGroup 
          value={orderType} 
          onValueChange={(value: OrderType) => setOrderType(value)}
          className="flex flex-wrap gap-2"
        >
          <div className={`flex items-center space-x-1 space-x-reverse bg-accent p-${isMobile ? '1' : '2'} rounded-lg border border-accent-foreground/20 flex-1 justify-center min-w-[80px]`}>
            <RadioGroupItem value="takeaway" id="takeaway" />
            <Label htmlFor="takeaway" className="flex items-center cursor-pointer">
              <ShoppingBag className={`${isArabic ? 'ml-1' : 'mr-1'} h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
              <span className="text-sm">{isArabic ? "سفري" : "Takeaway"}</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-1 space-x-reverse bg-accent p-${isMobile ? '1' : '2'} rounded-lg border border-accent-foreground/20 flex-1 justify-center min-w-[80px]`}>
            <RadioGroupItem value="dineIn" id="dineIn" />
            <Label htmlFor="dineIn" className="flex items-center cursor-pointer">
              <Home className={`${isArabic ? 'ml-1' : 'mr-1'} h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
              <span className="text-sm">{isArabic ? "محلي" : "Dine In"}</span>
            </Label>
          </div>
          {settings.deliveryEnabled && (
            <div className={`flex items-center space-x-1 space-x-reverse bg-accent p-${isMobile ? '1' : '2'} rounded-lg border border-accent-foreground/20 flex-1 justify-center min-w-[80px] ${orderType === 'delivery' ? 'bg-primary/20 border-primary' : ''}`}>
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="flex items-center cursor-pointer">
                <Truck className={`${isArabic ? 'ml-1' : 'mr-1'} h-${isMobile ? '3' : '4'} w-${isMobile ? '3' : '4'}`} />
                <span className="text-sm">{isArabic ? "توصيل" : "Delivery"}</span>
              </Label>
            </div>
          )}
        </RadioGroup>
      </div>
      
      {orderType === "dineIn" && (
        <>
          <div className={`mb-${isMobile ? '2' : '3'}`}>
            <Label htmlFor="tableNumber" className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
              {isArabic ? "رقم الطاولة" : "Table Number"}
            </Label>
            <Input
              id="tableNumber"
              value={tableNumber}
              onClick={handleTableNumberClick}
              className={`w-full p-${isMobile ? '1.5' : '2'} ${isMobile ? 'text-sm' : 'text-base'}`}
              placeholder={isArabic ? "أدخل رقم الطاولة" : "Enter table number"}
              readOnly
            />
          </div>

          <NumberPad
            isOpen={showNumberPad}
            onClose={() => setShowNumberPad(false)}
            onConfirm={handleNumberPadConfirm}
            initialValue={parseInt(tableNumber) || 1}
          />
        </>
      )}

      {orderType === "delivery" && setDeliveryAddress && (
        <div className={`mb-${isMobile ? '2' : '3'}`}>
          <Label htmlFor="deliveryAddress" className={`block mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
            {isArabic ? "عنوان التوصيل" : "Delivery Address"}
          </Label>
          <Input
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className={`w-full p-${isMobile ? '1.5' : '2'} ${isMobile ? 'text-sm' : 'text-base'}`}
            placeholder={isArabic ? "أدخل عنوان التوصيل" : "Enter delivery address"}
          />
        </div>
      )}
    </>
  );
};

export default OrderTypeSelector;
