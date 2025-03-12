
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Product, Invoice, Size } from "@/types";
import CartPanel from "./CartPanel";
import ProductsPanel from "./ProductsPanel";
import { useScreenSize } from "@/hooks/use-mobile";

interface PosContentProps {
  cartItems: any[];
  isArabic: boolean;
  language: any;
  subtotal: number;
  taxAmount: number;
  total: number;
  discount: number;
  discountType: "percentage" | "fixed";
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod: any;
  addToCart: (product: Product, variantId: string) => void;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string) => Invoice;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
  categories: any[];
  filteredProducts: Product[];
  searchedProducts: Product[];
  getSizeLabel: (size: string) => string;
}

const PosContent: React.FC<PosContentProps> = ({
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
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  createInvoice,
  setDiscount,
  setDiscountType,
  setOrderType,
  setTableNumber,
  setPaymentMethod,
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  filteredProducts,
  searchedProducts,
  getSizeLabel,
}) => {
  const { width, height, isMobile, isTablet } = useScreenSize();
  
  const handleCreateInvoice = (customerName?: string, customerTaxNumber?: string) => {
    const invoice = createInvoice(customerName, customerTaxNumber);
    return invoice;
  };

  // Dynamic layout adjustments based on screen size
  const cartWidthClass = isMobile 
    ? "w-full" 
    : isTablet 
      ? "w-1/3" 
      : "w-1/4";
  
  const productsWidthClass = isMobile 
    ? "w-full" 
    : isTablet 
      ? "w-2/3" 
      : "w-3/4";

  // On mobile, we'll use a flex column layout instead of row
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full w-full overflow-hidden m-0 p-0`}>
      {/* For mobile: Products panel appears first, followed by cart panel */}
      {isMobile ? (
        <>
          <div className="flex-1 w-full h-1/2 overflow-hidden">
            <ProductsPanel 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              filteredProducts={filteredProducts}
              searchedProducts={searchedProducts}
              onAddToCart={addToCart}
              isArabic={isArabic}
              getSizeLabel={getSizeLabel}
            />
          </div>
          
          <div className="w-full h-1/2 overflow-hidden">
            <CartPanel 
              cartItems={cartItems}
              isArabic={isArabic}
              language={language}
              subtotal={subtotal}
              taxAmount={taxAmount}
              total={total}
              discount={discount}
              discountType={discountType}
              orderType={orderType}
              tableNumber={tableNumber}
              paymentMethod={paymentMethod}
              createInvoice={handleCreateInvoice}
              clearCart={clearCart}
              getSizeLabel={getSizeLabel}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              setDiscount={setDiscount}
              setDiscountType={setDiscountType}
              setOrderType={setOrderType}
              setTableNumber={setTableNumber}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
        </>
      ) : (
        // For tablets and desktop: Products panel on left, cart on right
        <>
          <div className={`flex-1 ${productsWidthClass} h-full`}>
            <ProductsPanel 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              filteredProducts={filteredProducts}
              searchedProducts={searchedProducts}
              onAddToCart={addToCart}
              isArabic={isArabic}
              getSizeLabel={getSizeLabel}
            />
          </div>
          
          <div className={`${cartWidthClass} h-full`}>
            <CartPanel 
              cartItems={cartItems}
              isArabic={isArabic}
              language={language}
              subtotal={subtotal}
              taxAmount={taxAmount}
              total={total}
              discount={discount}
              discountType={discountType}
              orderType={orderType}
              tableNumber={tableNumber}
              paymentMethod={paymentMethod}
              createInvoice={handleCreateInvoice}
              clearCart={clearCart}
              getSizeLabel={getSizeLabel}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              setDiscount={setDiscount}
              setDiscountType={setDiscountType}
              setOrderType={setOrderType}
              setTableNumber={setTableNumber}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PosContent;
