import React, { useState, useRef, useEffect } from "react";
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
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [expanded, setExpanded] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [startWidth, setStartWidth] = useState<number | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (resizeRef.current) {
      setWidth(resizeRef.current.offsetWidth);
    }
  }, []);

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

  const headerClass = isMobile ? "p-1 text-sm" : "p-2";
  const itemsContainerClass = isMobile ? "px-1 pb-1" : "px-2 pb-1";
  const footerClass = isMobile ? "p-1" : "p-2";

  const borderClasses = "border-l border-r-0 shadow-[-2px_0_5px_rgba(0,0,0,0.1)]";

  const handleMouseDown = (e: React.MouseEvent) => {
    if (resizeRef.current) {
      setStartWidth(resizeRef.current.offsetWidth);
      setStartX(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (startX !== null && startWidth !== null) {
        const diff = startX - e.clientX;
        const newWidth = Math.max(250, Math.min(600, startWidth + diff));
        if (resizeRef.current) {
          resizeRef.current.style.width = `${newWidth}px`;
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setStartX(null);
      setStartWidth(null);
    };

    if (startX !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [startX, startWidth]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      ref={resizeRef}
      className={`flex flex-col h-full ${borderClasses} bg-card overflow-hidden relative ${
        isMobile ? (expanded ? 'w-full' : 'w-full') : ''
      }`}
      style={{ 
        transition: isMobile ? 'width 0.3s ease' : 'none',
      }}
    >
      {!isMobile && (
        <div 
          className="absolute top-1/2 right-full h-16 w-1 bg-primary opacity-0 hover:opacity-100 cursor-ew-resize -translate-y-1/2"
          onMouseDown={handleMouseDown}
          title="سحب لتغيير حجم السلة"
        />
      )}
      
      <div className={`${headerClass} flex-shrink-0 flex justify-between items-center border-b`}>
        <h2 className={isMobile ? "text-base font-semibold" : "text-lg font-bold"}>
          السلة
        </h2>
        <div className="flex items-center gap-1">
          {isMobile && (
            <Button 
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={toggleExpand}
            >
              {expanded ? 
                <ChevronRight className="h-4 w-4" /> : 
                <ChevronLeft className="h-4 w-4" />
              }
            </Button>
          )}
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
