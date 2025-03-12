
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CartItem as CartItemType, Language, Invoice, PaymentMethod } from "@/types";
import { Trash2, ShoppingCart, Receipt, ChevronDown, ChevronUp } from "lucide-react";
import CartItemComponent from "./CartItem";
import EmptyCart from "./cart/EmptyCart";
import OrderTypeSelector from "./cart/OrderTypeSelector";
import DiscountInput from "./cart/DiscountInput";
import CartSummary from "./cart/CartSummary";
import CartActions from "./cart/CartActions";
import { useLanguage } from "@/context/LanguageContext";
import PaymentMethodDialog from "./PaymentMethodDialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  createInvoice: (customerName?: string, customerTaxNumber?: string) => Invoice; 
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
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (customerName?: string, customerTaxNumber?: string) => {
    const invoice = createInvoice(customerName, customerTaxNumber);
    setCurrentInvoice(invoice);
    
    console.log(`Order ${invoice.number} automatically sent to kitchen`);
    
    setShowPaymentMethodDialog(false);
    return invoice;
  };

  const isEmpty = cartItems.length === 0;

  return (
    <div className="w-[320px] h-full flex flex-col overflow-hidden bg-card shadow-md">
      <div className={`p-2 border-b flex justify-between items-center ${isLightTheme ? 'bg-primary/5' : 'bg-muted/90'}`}>
        <h2 className="text-base font-bold flex items-center justify-center mx-auto">
          <ShoppingCart className={`${isArabic ? 'ml-1' : 'mr-1'} h-4 w-4 text-primary`} />
          {isArabic ? "السلة" : "Cart"}
          {!isEmpty && (
            <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
              {cartItems.length}
            </span>
          )}
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7" 
          onClick={clearCart}
          disabled={isEmpty}
          title={isArabic ? "مسح السلة" : "Clear Cart"}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-1.5">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-2 pt-1">
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
      </div>
      
      <div className="p-1.5 border-t">
        <Collapsible open={!isSummaryCollapsed} onOpenChange={(open) => setIsSummaryCollapsed(!open)}>
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center gap-1 text-primary font-bold text-sm">
              <Receipt className="h-4 w-4" />
              {isArabic ? "ملخص الطلب" : "Order Summary"}
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                {isSummaryCollapsed ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronUp className="h-4 w-4" />
                }
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <Separator className="mb-2" />
            
            <OrderTypeSelector
              orderType={orderType}
              tableNumber={tableNumber}
              setOrderType={setOrderType}
              setTableNumber={setTableNumber}
            />
            
            <DiscountInput
              discount={discount}
              discountType={discountType}
              setDiscount={setDiscount}
              setDiscountType={setDiscountType}
            />
            
            <CartSummary
              subtotal={subtotal}
              taxAmount={taxAmount}
              discount={discount}
              discountType={discountType}
              total={total}
            />
          </CollapsibleContent>
        </Collapsible>
        
        <CartActions
          cartItems={cartItems}
          handleCreateInvoice={handleCreateInvoice}
          clearCart={clearCart}
        />
      </div>

      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handlePaymentMethodSelected}
      />
    </div>
  );
};

export default CartPanel;
