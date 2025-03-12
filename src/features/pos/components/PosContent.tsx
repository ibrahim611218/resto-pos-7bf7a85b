
import React, { memo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Product, Invoice, Size } from "@/types";
import CartPanel from "./CartPanel";
import ProductsPanel from "./ProductsPanel";

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
  const handleCreateInvoice = React.useCallback((customerName?: string, customerTaxNumber?: string) => {
    return createInvoice(customerName, customerTaxNumber);
  }, [createInvoice]);

  return (
    <main className="flex flex-1 overflow-hidden">
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
    </main>
  );
};

export default memo(PosContent);
