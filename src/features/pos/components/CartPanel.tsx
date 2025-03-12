
import React, { useState } from "react";
import { ShoppingBag, Home, Percent, DollarSign, Trash2, CreditCard, ChefHat, Send } from "lucide-react";
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
    return invoice;
  };

  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-card border-l p-5 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">
        {isArabic ? "السلة" : "Cart"}
      </h2>
      
      {cartItems.length === 0 ? (
        <AnimatedTransition animation="fade">
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-3"
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
            <p className="text-lg">
              {isArabic ? "السلة فارغة" : "Your cart is empty"}
            </p>
          </div>
        </AnimatedTransition>
      ) : (
        <div className="space-y-5">
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
      
      <Separator className="my-5" />
      
      {/* نوع الطلب */}
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
      
      {/* رقم الطاولة (يظهر فقط عند اختيار محلي) */}
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
      
      {/* طريقة الدفع */}
      <PaymentMethodSelector 
        value={paymentMethod}
        onChange={setPaymentMethod}
      />
      
      {/* الخصم */}
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
      
      <div className="space-y-3 text-base">
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
        
        <div className="flex justify-between font-bold text-lg pt-1">
          <span>
            {isArabic ? "الإجمالي" : "Total"}
          </span>
          <span>
            {formatCurrency(total, "ar-SA", "SAR")}
          </span>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <Button 
          className="w-full h-14 flex items-center justify-center gap-2 text-lg" 
          onClick={handleCreateInvoice}
          disabled={cartItems.length === 0}
        >
          <div className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 flex items-center justify-center gap-2"
          onClick={() => setShowKitchenDialog(true)}
          disabled={cartItems.length === 0}
        >
          <Send className="mr-2 h-5 w-5" />
          {isArabic ? "إرسال للمطبخ" : "Send to Kitchen"}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 flex items-center justify-center gap-2"
          onClick={clearCart}
          disabled={cartItems.length === 0}
        >
          <Trash2 className="mr-2 h-5 w-5" />
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
