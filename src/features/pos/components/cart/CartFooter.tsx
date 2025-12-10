
import React from "react";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod, Customer, OrderType } from "@/types";
import OrderTypeSection from "./footer/OrderTypeSection";
import DiscountSection from "./footer/DiscountSection";
import SummarySection from "./footer/SummarySection";
import ActionsSection from "./footer/ActionsSection";
import { cn } from "@/lib/utils";

interface CartFooterProps {
  isMobile: boolean;
  cartItems: any[];
  orderType: OrderType;
  tableNumber: string;
  discount: number;
  discountType: "percentage" | "fixed";
  subtotal: number;
  taxAmount: number;
  total: number;
  paymentMethod?: PaymentMethod;
  paidAmount?: number;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (number: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  handleCreateInvoice: () => void;
  clearCart: () => void;
  isArabic: boolean;
  onPaidAmountClick?: () => void;
  customer?: Customer;
  className?: string;
  deliveryAddress?: string;
  setDeliveryAddress?: (address: string) => void;
  deliveryFee?: number;
}

const CartFooter: React.FC<CartFooterProps> = ({
  isMobile,
  cartItems,
  orderType,
  tableNumber,
  discount,
  discountType,
  subtotal,
  taxAmount,
  total,
  paymentMethod,
  paidAmount,
  setOrderType,
  setTableNumber,
  setDiscount,
  setDiscountType,
  handleCreateInvoice,
  clearCart,
  isArabic,
  onPaidAmountClick,
  customer,
  className,
  deliveryAddress,
  setDeliveryAddress,
  deliveryFee = 0
}) => {
  const footerClass = isMobile ? "p-1" : "p-2";

  return (
    <div className={cn(`${footerClass} border-t bg-card flex-shrink-0`, className)}>
      <Separator className={isMobile ? "mb-1" : "mb-2"} />
      
      <OrderTypeSection
        orderType={orderType}
        tableNumber={tableNumber}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        isMobile={isMobile}
        isArabic={isArabic}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
      />
      
      <DiscountSection
        discount={discount}
        discountType={discountType}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        isMobile={isMobile}
        isArabic={isArabic}
      />
      
      <SummarySection
        subtotal={subtotal}
        taxAmount={taxAmount}
        discount={discount}
        discountType={discountType}
        total={total}
        isMobile={isMobile}
        isArabic={isArabic}
        paymentMethod={paymentMethod}
        paidAmount={paidAmount}
        onPaidAmountClick={onPaidAmountClick}
        deliveryFee={deliveryFee}
        orderType={orderType}
      />
      
      <ActionsSection
        cartItems={cartItems}
        handleCreateInvoice={handleCreateInvoice}
        clearCart={clearCart}
        isMobile={isMobile}
        isArabic={isArabic}
      />
      
      {customer && (
        <div className="border-t pt-2">
          <div className="text-sm">
            <p className="font-medium">{isArabic ? "العميل:" : "Customer:"} {customer.name}</p>
            {customer.taxNumber && (
              <p className="text-muted-foreground">
                {isArabic ? "الرقم الضريبي:" : "Tax Number:"} {customer.taxNumber}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartFooter;
