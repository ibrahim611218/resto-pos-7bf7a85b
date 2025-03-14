
import React, { memo, useEffect, useState } from "react";
import { Product } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface ProductGridProps {
  products: Product[];
  isArabic: boolean;
  onProductClick: (product: Product) => void;
  getGridCols: string | (() => string);
}

// Using memo to prevent unnecessary re-renders
const ProductGrid: React.FC<ProductGridProps> = memo(({
  products,
  isArabic,
  onProductClick,
  getGridCols,
}) => {
  const { width, height } = useWindowDimensions();
  const [gridClass, setGridClass] = useState("");
  
  // Dynamically adjust grid based on screen size
  useEffect(() => {
    // Handle both string and function types for getGridCols
    const gridColsClass = typeof getGridCols === 'function' ? getGridCols() : getGridCols;
    
    // Add additional responsive classes based on screen dimensions
    const responsiveClass = width > 1600 ? 'gap-4' : 'gap-2';
    
    setGridClass(`${gridColsClass} ${responsiveClass}`);
  }, [getGridCols, width, height]);
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground w-full h-full flex items-center justify-center">
        <div className="bg-muted/30 p-6 rounded-lg w-full max-w-md">
          {isArabic ? "لا توجد منتجات" : "No products found"}
        </div>
      </div>
    );
  }
  
  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product.name);
    onProductClick(product);
  };
  
  return (
    <div className={`grid ${gridClass} w-full`} style={{ minHeight: "100px" }}>
      {products.map((product, index) => (
        <GlassCard
          key={product.id}
          animation="fade"
          delay={Math.min(index * 30, 300)} // Cap the delay at 300ms for better performance
          className="cursor-pointer hover:shadow-md bg-secondary/30 p-1 product-card"
          onClick={() => handleProductClick(product)}
        >
          <div className="w-full aspect-square overflow-hidden rounded-md bg-muted mb-1">
            {product.image ? (
              <img 
                src={product.image} 
                alt={isArabic ? product.nameAr || product.name : product.name}
                className="w-full h-full object-cover product-image"
                loading="lazy" // Add lazy loading for better performance
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                {isArabic ? "لا توجد صورة" : "No image"}
              </div>
            )}
          </div>
          <div className="text-center py-1">
            <p className="font-medium truncate text-sm">
              {isArabic ? product.nameAr : product.name}
            </p>
            <p className="text-xs text-white mt-0.5 bg-black/70 rounded-full px-2 py-0.5 inline-block">
              {product.variants && product.variants.length > 0 ? product.variants[0].price : product.price} {isArabic ? "ر.س" : "SAR"}
            </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
});

// Display name for debugging
ProductGrid.displayName = "ProductGrid";

export default ProductGrid;
