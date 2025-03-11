
import React from "react";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import ProductsPanel from "./components/ProductsPanel";
import CartPanel from "./components/CartPanel";
import { useLanguage } from "@/context/LanguageContext";

const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const {
    cartItems,
    subtotal,
    taxAmount,
    total,
    discount,
    discountType,
    orderType,
    tableNumber,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    createInvoice,
    setDiscount,
    setDiscountType,
    setOrderType,
    setTableNumber,
  } = useCart();
  
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    searchedProducts,
  } = useProductFiltering(products);
  
  // Function for consistent size labels
  const getSizeLabelFn = (size: string) => getSizeLabel(size, language);
  
  return (
    <div 
      className={`h-[calc(100vh-4rem)] flex flex-col md:flex-row ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
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
        getSizeLabel={getSizeLabelFn}
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
        createInvoice={createInvoice}
        clearCart={clearCart}
        getSizeLabel={getSizeLabelFn}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
      />
    </div>
  );
};

export default Pos;
