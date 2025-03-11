
import React, { useState } from "react";
import { CreditCard, ChefHat, Percent, DollarSign, Home, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { CartItem as CartItemType, Language, Invoice, PaymentMethod } from "@/types";
import CartItemComponent from "./CartItem";
import KitchenAssignmentDialog from "./KitchenAssignmentDialog";
import { formatCurrency } from "@/utils/invoice";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface CartPanelProps {
  cartItems: CartItemType[];
  isArabic: boolean;
  language: Language;
  subtotal: number;
  taxAmount: number;
  total: number;
  discount: number;
  discountType: "percentage" | "fixed";
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod: PaymentMethod;
  createInvoice: () => Invoice; 
  clearCart: () => void;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({
  cartItems,
  isArabic,
  language,
  subtotal,
  taxAmount,
  total,
  discount,
  discountType,
  orderType,
  tableNumber,
  paymentMethod,
  createInvoice,
  clearCart,
  getSizeLabel,
  updateQuantity,
  removeItem,
  setDiscount,
  setDiscountType,
  setOrderType,
  setTableNumber,
  setPaymentMethod,
}) => {
  const [showKitchenDialog, setShowKitchenDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

  const handleCreateInvoice = () => {
    const invoice = createInvoice();
    setCurrentInvoice(invoice);
    setShowKitchenDialog(true);
  };

  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

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
      
      {/* نوع الطلب */}
      <div className="mb-4">
        <Label className="block mb-2">{isArabic ? "نوع الطلب" : "Order Type"}</Label>
        <RadioGroup 
          value={orderType} 
          onValueChange={(value: "takeaway" | "dineIn") => setOrderType(value)}
          className="flex"
        >
          <div className="flex items-center space-x-2 ml-4">
            <RadioGroupItem value="takeaway" id="takeaway" />
            <Label htmlFor="takeaway" className="flex items-center">
              <ShoppingBag className="ml-1 h-4 w-4" />
              {isArabic ? "سفري" : "Takeaway"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dineIn" id="dineIn" />
            <Label htmlFor="dineIn" className="flex items-center">
              <Home className="ml-1 h-4 w-4" />
              {isArabic ? "محلي" : "Dine In"}
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* رقم الطاولة (يظهر فقط عند اختيار محلي) */}
      {orderType === "dineIn" && (
        <div className="mb-4">
          <Label htmlFor="tableNumber" className="block mb-2">
            {isArabic ? "رقم الطاولة" : "Table Number"}
          </Label>
          <Input
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full"
            placeholder={isArabic ? "أدخل رقم الطاولة" : "Enter table number"}
          />
        </div>
      )}
      
      {/* طريقة الدفع */}
      <PaymentMethodSelector 
        value={paymentMethod}
        onChange={setPaymentMethod}
      />
      
      {/* الخصم */}
      <div className="mb-4">
        <Label className="block mb-2">{isArabic ? "الخصم" : "Discount"}</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-full pr-8"
                placeholder={isArabic ? "قيمة الخصم" : "Discount value"}
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                {discountType === "percentage" ? "%" : "ر.س"}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="px-3"
            onClick={() => setDiscountType(discountType === "percentage" ? "fixed" : "percentage")}
          >
            {discountType === "percentage" ? <Percent size={16} /> : <DollarSign size={16} />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {isArabic ? "المجموع الفرعي" : "Subtotal"}
          </span>
          <span>
            {formatCurrency(subtotal, "ar-SA", "SAR")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {isArabic ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}
          </span>
          <span>
            {formatCurrency(taxAmount, "ar-SA", "SAR")}
          </span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>
              {isArabic ? `الخصم ${discountType === 'percentage' ? `(${discount}%)` : ''}` : 
                `Discount ${discountType === 'percentage' ? `(${discount}%)` : ''}`}
            </span>
            <span>
              - {formatCurrency(discountAmount, "ar-SA", "SAR")}
            </span>
          </div>
        )}
        
        <div className="flex justify-between font-bold">
          <span>
            {isArabic ? "الإجمالي" : "Total"}
          </span>
          <span>
            {formatCurrency(total, "ar-SA", "SAR")}
          </span>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <Button 
          className="w-full h-12 flex items-center justify-center gap-2" 
          onClick={handleCreateInvoice}
          disabled={cartItems.length === 0}
        >
          <div className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
          </div>
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

      {/* Kitchen Assignment Dialog */}
      <KitchenAssignmentDialog
        isOpen={showKitchenDialog}
        onClose={() => setShowKitchenDialog(false)}
        cartItems={cartItems}
        invoiceId={currentInvoice?.number || ""}
        language={language}
      />
    </div>
  );
};

export default CartPanel;
