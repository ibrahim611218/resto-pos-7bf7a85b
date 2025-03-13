import React from "react";
import { useScreenSize } from "@/hooks/use-mobile";
import DesktopPosLayout from "./layout/DesktopPosLayout";
import MobilePosLayout from "./layout/MobilePosLayout";

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
  
  return (
    <div className="flex h-full">
      {isMobile ? (
        <MobilePosLayout {...props} />
      ) : (
        <DesktopPosLayout {...props} />
      )}
    </div>
  );
};

export default PosContent;
