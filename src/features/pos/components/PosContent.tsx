
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Product, Invoice, PaymentMethod } from "@/types";
import { useScreenSize } from "@/hooks/use-mobile";
import PosLayout from "./layout/PosLayout";
import MobilePosLayout from "./layout/MobilePosLayout";
import DesktopPosLayout from "./layout/DesktopPosLayout";
import PosProductsRenderer from "./PosProductsRenderer";
import PosCartRenderer from "./PosCartRenderer";
import { useTheme } from "@/context/ThemeContext";

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
  paymentMethod: PaymentMethod;
  addToCart: (product: Product, variantId: string) => void;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
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
  const { theme } = useTheme();

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
      updateQuantity={props.updateQuantity}
      removeItem={props.removeItem}
      setDiscount={props.setDiscount}
      setDiscountType={props.setDiscountType}
      setOrderType={props.setOrderType}
      setTableNumber={props.setTableNumber}
      setPaymentMethod={props.setPaymentMethod}
      getSizeLabel={props.getSizeLabel}
    />
  );

  // Add background color based on theme
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-background';

  return (
    <PosLayout isArabic={props.isArabic}>
      <div className={`w-full h-full ${bgClass} flex rounded-lg shadow-md`}>
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
    </PosLayout>
  );
};

export default PosContent;
