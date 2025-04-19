
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import { ViewMode } from "@/components/ui-custom/ViewToggle";

const Products = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");

  return (
    <div className="container mx-auto p-4">
      <ProductsGrid viewMode={viewMode} onViewModeChange={setViewMode} />
    </div>
  );
};

export default Products;
