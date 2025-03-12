
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CartItem as CartItemType, Language, Invoice, PaymentMethod } from "@/types";
import CartItemComponent from "./CartItem";
import KitchenAssignmentDialog from "./KitchenAssignmentDialog";
import EmptyCart from "./cart/EmptyCart";
import OrderTypeSelector from "./cart/OrderTypeSelector";
import DiscountInput from "./cart/DiscountInput";
import CartSummary from "./cart/CartSummary";
import CartActions from "./cart/CartActions";
import { useLanguage } from "@/context/LanguageContext";
import PaymentMethodDialog from "./PaymentMethodDialog";

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
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { language: contextLanguage } = useLanguage();

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = () => {
    const invoice = createInvoice();
    setCurrentInvoice(invoice);
    setShowKitchenDialog(true);
    setShowPaymentMethodDialog(false);
    return invoice;
  };

  const handleSendToKitchen = () => {
    setShowKitchenDialog(true);
  };

  return (
    <div className="w-full md:w-1/3 lg:w-2/5 flex flex-col h-full border-l bg-card shadow-md">
      <div className="p-4 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-3">
          {isArabic ? "السلة" : "Cart"}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-2">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-3">
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
      
      <div className="p-4 border-t bg-card flex-shrink-0">
        <Separator className="mb-4" />
        
        {/* Order Type Selector */}
        <OrderTypeSelector
          orderType={orderType}
          tableNumber={tableNumber}
          setOrderType={setOrderType}
          setTableNumber={setTableNumber}
        />
        
        {/* Discount Input */}
        <DiscountInput
          discount={discount}
          discountType={discountType}
          setDiscount={setDiscount}
          setDiscountType={setDiscountType}
        />
        
        {/* Cart Summary */}
        <CartSummary
          subtotal={subtotal}
          taxAmount={taxAmount}
          discount={discount}
          discountType={discountType}
          total={total}
        />
        
        {/* Cart Actions */}
        <CartActions
          cartItems={cartItems}
          handleCreateInvoice={handleCreateInvoice}
          clearCart={clearCart}
          onSendToKitchen={handleSendToKitchen}
        />
      </div>

      {/* Kitchen Assignment Dialog */}
      <KitchenAssignmentDialog
        isOpen={showKitchenDialog}
        onClose={() => setShowKitchenDialog(false)}
        cartItems={cartItems}
        invoiceId={currentInvoice?.number || ""}
        language={language}
      />

      {/* Payment Method Dialog */}
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
