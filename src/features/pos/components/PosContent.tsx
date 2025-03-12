
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Product, Invoice } from "@/types";
import { useScreenSize } from "@/hooks/use-mobile";
import PosLayout from "./layout/PosLayout";
import MobilePosLayout from "./layout/MobilePosLayout";
import DesktopPosLayout from "./layout/DesktopPosLayout";
import PosProductsRenderer from "./PosProductsRenderer";
import PosCartRenderer from "./PosCartRenderer";

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
  showAllProducts?: boolean;
  setShowAllProducts?: (show: boolean) => void;
}

const PosContent: React.FC<PosContentProps> = (props) => {
  const { isMobile } = useScreenSize();

  // Prepare product panel component
  const productsPanel = (
    <PosProductsRenderer
      searchTerm={props.searchTerm}
      setSearchTerm={props.setSearchTerm}
      activeCategory={props.activeCategory}
      setActiveCategory={props.setActiveCategory}
      categories={props.categories}
      filteredProducts={props.filteredProducts}
      searchedProducts={props.searchedProducts}
      onAddToCart={props.addToCart}
      isArabic={props.isArabic}
      getSizeLabel={props.getSizeLabel}
      showAllProducts={props.showAllProducts}
      setShowAllProducts={props.setShowAllProducts}
    />
  );

  // Prepare cart panel component
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
    />
  );

  return (
    <PosLayout isArabic={props.isArabic}>
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
    </PosLayout>
  );
};

export default PosContent;
