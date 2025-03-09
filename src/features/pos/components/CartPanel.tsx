
import React from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { CartItem as CartItemType } from "@/types";
import CartItemComponent from "./CartItem";

interface CartPanelProps {
  cartItems: CartItemType[];
  isArabic: boolean;
  subtotal: number;
  taxAmount: number;
  total: number;
  createInvoice: () => void;
  clearCart: () => void;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({
  cartItems,
  isArabic,
  subtotal,
  taxAmount,
  total,
  createInvoice,
  clearCart,
  getSizeLabel,
  updateQuantity,
  removeItem,
}) => {
  return (
    <div className="w-full md:w-96 bg-card border-l p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        {isArabic ? "السلة" : "Cart"}
      </h2>
      
      {cartItems.length === 0 ? (
        <AnimatedTransition animation="fade">
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p>
              {isArabic ? "السلة فارغة" : "Your cart is empty"}
            </p>
          </div>
        </AnimatedTransition>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <CartItemComponent
              key={item.id}
              item={item}
              index={index}
              isArabic={isArabic}
              getSizeLabel={getSizeLabel}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
      )}
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {isArabic ? "المجموع الفرعي" : "Subtotal"}
          </span>
          <span>
            {subtotal.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {isArabic ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}
          </span>
          <span>
            {taxAmount.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </span>
        </div>
        <div className="flex justify-between font-bold">
          <span>
            {isArabic ? "الإجمالي" : "Total"}
          </span>
          <span>
            {total.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </span>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <Button 
          className="w-full h-12" 
          onClick={createInvoice}
          disabled={cartItems.length === 0}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearCart}
          disabled={cartItems.length === 0}
        >
          {isArabic ? "مسح السلة" : "Clear Cart"}
        </Button>
      </div>
    </div>
  );
};

export default CartPanel;
