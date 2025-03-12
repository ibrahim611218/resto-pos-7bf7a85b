
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
    <div className={`w-full md:w-2/5 lg:w-1/3 flex flex-col h-full ${isLightTheme ? 'bg-white shadow-lg' : 'bg-card shadow-md'} border-r text-center`}>
      <div className={`p-5 flex-shrink-0 flex justify-between items-center ${isLightTheme ? 'bg-primary/5' : 'bg-muted/30'} border-b`}>
        <h2 className="text-2xl font-bold flex items-center justify-center mx-auto">
          <ShoppingCart className={`${isArabic ? 'ml-3' : 'mr-3'} h-6 w-6 text-primary`} />
          {isArabic ? "السلة" : "Cart"}
          {!isEmpty && (
            <span className="ml-2 text-sm bg-primary text-white rounded-full px-2.5 py-0.5">
              {cartItems.length}
            </span>
          )}
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 w-10" 
          onClick={clearCart}
          disabled={isEmpty}
          title={isArabic ? "مسح السلة" : "Clear Cart"}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto no-scrollbar px-4 pb-2 max-h-[calc(100vh-300px)] text-center">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-4 pt-4">
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
      
      <div className={`p-5 border-t ${isLightTheme ? 'bg-white' : 'bg-card'} flex-shrink-0 text-center`}>
        <Collapsible open={!isSummaryCollapsed} onOpenChange={(open) => setIsSummaryCollapsed(!open)}>
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center gap-2 text-primary font-medium text-lg">
              <Receipt className="h-5 w-5" />
              {isArabic ? "ملخص الطلب" : "Order Summary"}
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                {isSummaryCollapsed ? 
                  <ChevronDown className="h-5 w-5" /> : 
                  <ChevronUp className="h-5 w-5" />
                }
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <Separator className="mb-5" />
            
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
