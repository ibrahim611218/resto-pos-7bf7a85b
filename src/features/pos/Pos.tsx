
import React from "react";
import { Language } from "@/types";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import ProductsPanel from "./components/ProductsPanel";
import CartPanel from "./components/CartPanel";

interface PosProps {
  language: Language;
}

const Pos: React.FC<PosProps> = ({ language }) => {
  const isArabic = language === "ar";
  
  const {
    cartItems,
    subtotal,
    taxAmount,
    total,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    createInvoice,
  } = useCart(language);
  
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
        createInvoice={createInvoice}
        clearCart={clearCart}
        getSizeLabel={getSizeLabelFn}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default Pos;
