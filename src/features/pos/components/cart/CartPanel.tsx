import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import CartFooter from "./CartFooter";
import EmptyCart from "./EmptyCart";
import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import PaymentMethodDialog from "../payment/PaymentMethodDialog";
import PaidAmountDialog from "../payment/PaidAmountDialog";
import { createInvoiceObject } from "@/utils/invoice";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useInvoiceFormatting } from "@/features/invoices/hooks/useInvoiceFormatting";

interface CartPanelProps {
  expanded: boolean;
  onToggleExpand: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ 
  expanded, 
  onToggleExpand 
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const { settings } = useBusinessSettings();
  const { formatInvoiceDate, printInvoice } = useInvoiceFormatting();
  const { 
    cartItems, 
    clearCart, 
    subtotal, 
    taxAmount, 
    total,
    discount,
    discountType,
    setDiscount,
    setDiscountType,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    paymentMethod,
    paidAmount,
    setPaymentMethod,
    setPaidAmount
  } = useCart();

  // State for dialogs
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showPaidAmountDialog, setShowPaidAmountDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (method: "cash" | "card") => {
    setPaymentMethod(method);
    setShowPaymentMethodDialog(false);
    
    // If cash payment, show paid amount dialog
    if (method === "cash") {
      setShowPaidAmountDialog(true);
    } else {
      // For card, assume full amount is paid
      createAndShowInvoice(method, total);
    }
  };

  const handlePaidAmountConfirmed = (amount: number) => {
    setPaidAmount(amount);
    setShowPaidAmountDialog(false);
    createAndShowInvoice("cash", amount);
  };

  const createAndShowInvoice = (paymentMethod: "cash" | "card", paidAmount: number) => {
    // Use the cartItems directly since they now have all required properties
    const invoice = createInvoiceObject(
      cartItems,
      subtotal,
      taxAmount,
      discount,
      discountType,
      total,
      paymentMethod
    );
    
    // Add additional invoice details
    invoice.paidAmount = paidAmount;
    invoice.orderType = orderType;
    if (orderType === "dineIn" && tableNumber) {
      invoice.tableNumber = tableNumber;
    }
    
    // Save invoice to current state and show invoice modal
    setCurrentInvoice(invoice);
    setShowInvoiceModal(true);
    
    // Clear cart
    clearCart();
    
    // Show success notification
    toast({
      title: isArabic ? "تم إنشاء الفاتورة بنجاح" : "Invoice created successfully",
      description: isArabic ? `رقم الفاتورة: ${invoice.number}` : `Invoice Number: ${invoice.number}`,
    });
  };

  const handlePaidAmountClick = () => {
    if (paymentMethod === "cash") {
      setShowPaidAmountDialog(true);
    }
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    setCurrentInvoice(null);
  };

  return (
    <div 
      className={cn(
        "h-full flex flex-col border-r bg-card",
        expanded ? "w-full lg:w-1/3 xl:w-1/4" : "w-20",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <CartHeader 
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={cartItems.length === 0}
        toggleExpand={onToggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
      />
      
      {expanded ? (
        <>
          <div className="flex-1 overflow-auto">
            {cartItems.length > 0 ? (
              <CartItemsList cartItems={cartItems} isArabic={isArabic} />
            ) : (
              <EmptyCart />
            )}
          </div>
          
          <CartFooter 
            isMobile={isMobile}
            cartItems={cartItems}
            orderType={orderType}
            tableNumber={tableNumber}
            discount={discount}
            discountType={discountType}
            subtotal={subtotal}
            taxAmount={taxAmount}
            total={total}
            paymentMethod={paymentMethod}
            paidAmount={paidAmount}
            setOrderType={setOrderType}
            setTableNumber={setTableNumber}
            setDiscount={setDiscount}
            setDiscountType={setDiscountType}
            handleCreateInvoice={handleCreateInvoice}
            clearCart={clearCart}
            isArabic={isArabic}
            onPaidAmountClick={handlePaidAmountClick}
          />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center pt-4 text-center">
          <div className="text-sm font-medium mb-2">
            {cartItems.length}
          </div>
          <div className="text-xs text-muted-foreground">
            {isArabic ? 'العناصر' : 'Items'}
          </div>
        </div>
      )}

      {/* Dialogs */}
      <PaymentMethodDialog
        open={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        onSelectPaymentMethod={handlePaymentMethodSelected}
      />
      
      <PaidAmountDialog
        open={showPaidAmountDialog}
        onClose={() => setShowPaidAmountDialog(false)}
        onConfirm={handlePaidAmountConfirmed}
        total={total}
      />
      
      {currentInvoice && (
        <InvoiceDetailsModal
          invoice={currentInvoice}
          open={showInvoiceModal}
          onClose={handleCloseInvoiceModal}
          formatInvoiceDate={formatInvoiceDate}
          onPrint={printInvoice}
        />
      )}
    </div>
  );
};

export default CartPanel;
