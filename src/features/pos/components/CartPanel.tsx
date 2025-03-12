
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CartItem as CartItemType, Language, Invoice, PaymentMethod } from "@/types";
import CartItemComponent from "./CartItem";
import EmptyCart from "./cart/EmptyCart";
import OrderTypeSelector from "./cart/OrderTypeSelector";
import DiscountInput from "./cart/DiscountInput";
import CartSummary from "./cart/CartSummary";
import CartActions from "./cart/CartActions";
import { useLanguage } from "@/context/LanguageContext";
import PaymentMethodDialog from "./PaymentMethodDialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useScreenSize } from "@/hooks/use-mobile";

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
  // We'll use the props directly, not redeclare them
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
  const { isMobile, isTablet } = useScreenSize();

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (customerName?: string, customerTaxNumber?: string) => {
    const invoice = createInvoice(customerName, customerTaxNumber);
    setCurrentInvoice(invoice);
    
    // Automatically send to kitchen - this happens behind the scenes now
    console.log(`Order ${invoice.number} automatically sent to kitchen`);
    
    setShowPaymentMethodDialog(false);
    return invoice;
  };

  const isEmpty = cartItems.length === 0;

  // Adjust styles for different screen sizes
  const headerClass = isMobile ? "p-1 text-sm" : "p-2";
  const itemsContainerClass = isMobile ? "px-1 pb-1" : "px-2 pb-1";
  const footerClass = isMobile ? "p-1" : "p-2";

  // All UI is now in Arabic
  const borderClasses = "border-l border-r-0 shadow-[-2px_0_5px_rgba(0,0,0,0.1)]";

  return (
    <div className={`flex flex-col h-full ${borderClasses} bg-card overflow-hidden`}>
      <div className={`${headerClass} flex-shrink-0 flex justify-between items-center border-b`}>
        <h2 className={isMobile ? "text-base font-semibold" : "text-lg font-bold"}>
          السلة
        </h2>
        <Button 
          variant="destructive" 
          size={isMobile ? "sm" : "sm"}
          className="h-auto py-1" 
          onClick={clearCart}
          disabled={isEmpty}
          title="مسح السلة"
        >
          <Trash2 className={isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} />
          {!isMobile && <span className="mr-1">مسح</span>}
        </Button>
      </div>
      
      <div className={`flex-grow overflow-y-auto ${itemsContainerClass} min-h-0`}>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className={`space-y-${isMobile ? "1" : "2"} pt-2`}>
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
      
      <div className={`${footerClass} border-t bg-card flex-shrink-0`}>
        <Separator className={isMobile ? "mb-1" : "mb-2"} />
        
        <OrderTypeSelector
          orderType={orderType}
          tableNumber={tableNumber}
          setOrderType={setOrderType}
          setTableNumber={setTableNumber}
          isMobile={isMobile}
        />
        
        <DiscountInput
          discount={discount}
          discountType={discountType}
          setDiscount={setDiscount}
          setDiscountType={setDiscountType}
          isMobile={isMobile}
        />
        
        <CartSummary
          subtotal={subtotal}
          taxAmount={taxAmount}
          discount={discount}
          discountType={discountType}
          total={total}
          isMobile={isMobile}
        />
        
        <CartActions
          cartItems={cartItems}
          handleCreateInvoice={handleCreateInvoice}
          clearCart={clearCart}
          isMobile={isMobile}
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
