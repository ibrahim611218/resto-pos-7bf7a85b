
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Listen for product updates to trigger refresh
  useEffect(() => {
    const handleProductUpdate = () => {
      console.log("Products page detected product update, refreshing...");
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('product-updated', handleProductUpdate);
    window.addEventListener('data-updated', handleProductUpdate);

    return () => {
      window.removeEventListener('product-updated', handleProductUpdate);
      window.removeEventListener('data-updated', handleProductUpdate);
    };
  }, []);

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isArabic ? "المنتجات" : "Products"}</h1>
        <Button onClick={handleAddProduct}>
          <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} />
          {isArabic ? "إضافة منتج" : "Add Product"}
        </Button>
      </div>
      <ProductsGrid 
        viewMode={viewMode} 
        onViewModeChange={setViewMode} 
        key={`products-grid-${refreshTrigger}`}  
      />
    </div>
  );
};

export default Products;
