
import React from "react";
import { useScreenSize } from "@/hooks/use-mobile";
import DesktopPosLayout from "./layout/DesktopPosLayout";
import MobilePosLayout from "./layout/MobilePosLayout";
import PosProductsRenderer from "./PosProductsRenderer";
import PosCartRenderer from "./PosCartRenderer";

interface PosContentProps {
  cartItems: any[];
  isArabic: boolean;
  language: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  discount: number;
  discountType: "percentage" | "fixed";
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod: any;
  paidAmount: number;
  remainingAmount: number;
  addToCart: (product: any, quantity: number, size?: string) => void;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string) => any;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: any) => void;
  setPaidAmount: (amount: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: any[];
  filteredProducts: any[];
  searchedProducts: any[];
  getSizeLabel: (size: string) => string;
  showAllProducts: boolean;
  setShowAllProducts: (show: boolean) => void;
}

const PosContent: React.FC<PosContentProps> = (props) => {
  const { isMobile, isTablet } = useScreenSize();
  
  // Create the products panel component
  const productsPanel = (
    <PosProductsRenderer
      searchTerm={props.searchTerm}
      setSearchTerm={props.setSearchTerm}
      activeCategory={props.activeCategory}
      setActiveCategory={props.setActiveCategory}
      categories={props.categories}
      filteredProducts={props.filteredProducts}
      searchedProducts={props.searchedProducts}
      onAddToCart={props.addToCart} // Using the correct prop name
      showAllProducts={props.showAllProducts}
      setShowAllProducts={props.setShowAllProducts}
      isArabic={props.isArabic}
    />
  );
  
  // Create the cart panel component
  const cartPanel = (
    <PosCartRenderer
      cartItems={props.cartItems}
      isArabic={props.isArabic}
      language={props.language}
      subtotal={props.subtotal}
      taxAmount={props.taxAmount}
      total={props.total}
      discount={props.discount}
      discountType={props.discountType}
      orderType={props.orderType}
      tableNumber={props.tableNumber}
      paymentMethod={props.paymentMethod}
      paidAmount={props.paidAmount}
      remainingAmount={props.remainingAmount}
      createInvoice={props.createInvoice}
      clearCart={props.clearCart}
      getSizeLabel={props.getSizeLabel}
      updateQuantity={props.updateQuantity}
      removeItem={props.removeItem}
      setDiscount={props.setDiscount}
      setDiscountType={props.setDiscountType}
      setOrderType={props.setOrderType}
      setTableNumber={props.setTableNumber}
      setPaymentMethod={props.setPaymentMethod}
      setPaidAmount={props.setPaidAmount}
    />
  );
  
  return (
    <div className="flex h-full">
      {isMobile ? (
        <MobilePosLayout 
          isArabic={props.isArabic}
          productsPanel={productsPanel}
          cartPanel={cartPanel}
        />
      ) : (
        <DesktopPosLayout
          isArabic={props.isArabic}
          productsPanel={productsPanel}
          cartPanel={cartPanel}
        />
      )}
    </div>
  );
};

export default PosContent;
