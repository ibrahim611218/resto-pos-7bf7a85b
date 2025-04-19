
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CartProvider } from "@/features/pos/hooks/useCart";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");

  return (
    <CartProvider>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{isArabic ? "المنتجات" : "Products"}</h1>
          <Button onClick={() => navigate("/products/add")}>
            <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} />
            {isArabic ? "إضافة منتج" : "Add Product"}
          </Button>
        </div>
        <ProductsGrid viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>
    </CartProvider>
  );
};

export default Products;
