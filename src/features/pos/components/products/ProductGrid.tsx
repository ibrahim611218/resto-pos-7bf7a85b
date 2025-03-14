
import React, { memo } from "react";
import { Product } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";

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
  // Handle both string and function types for getGridCols
  const gridColsClass = typeof getGridCols === 'function' ? getGridCols() : getGridCols;
  
  return (
    <div className={`grid ${gridColsClass} gap-2`}>
      {products.map((product, index) => (
        <GlassCard
          key={product.id}
          animation="fade"
          delay={Math.min(index * 30, 300)} // Cap the delay at 300ms for better performance
          className="cursor-pointer hover:shadow-md bg-secondary/30 p-1 product-card"
          onClick={() => onProductClick(product)}
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
              {product.variants.length > 0 ? product.variants[0].price : product.price} {isArabic ? "ر.س" : "SAR"}
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
