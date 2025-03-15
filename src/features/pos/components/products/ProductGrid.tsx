
import React, { memo, useEffect, useState, useCallback } from "react";
import { Product } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  // Calculate grid columns with a memoized function for better performance
  useEffect(() => {
    // Handle both string and function types for getGridCols
    const gridColsClass = typeof getGridCols === 'function' ? getGridCols() : getGridCols;
    
    // Add additional responsive classes based on screen dimensions
    const gapClass = width > 1280 ? 'gap-4' : (width > 768 ? 'gap-3' : 'gap-2');
    const responsiveClass = `product-grid-container ${gapClass}`;
    
    setGridClass(`${gridColsClass} ${responsiveClass}`);
    
    // Force layout recalculation after grid class change
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [getGridCols, width, height]);
  
  // Optimized product click handler with useCallback
  const handleProductClick = useCallback((product: Product) => {
    console.log("Product clicked:", product.name);
    if (product && typeof onProductClick === 'function') {
      onProductClick(product);
    }
  }, [onProductClick]);

  // Explicit touch/mouse handlers to improve interaction
  const handlePress = useCallback((e: React.MouseEvent | React.TouchEvent, product: Product) => {
    e.preventDefault(); // Prevent default to avoid any issues
    e.stopPropagation(); // Stop propagation to parent elements
    console.log("Product pressed:", product.name);
    handleProductClick(product);
  }, [handleProductClick]);
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground w-full flex items-center justify-center">
        <div className="bg-muted/30 p-6 rounded-lg w-full max-w-md">
          {isArabic ? "لا توجد منتجات" : "No products found"}
        </div>
      </div>
    );
  }
  
  // Ensure card size is appropriate for screen size
  const cardSizeClass = width > 1920 ? 'min-h-[200px]' : 
                       width > 1280 ? 'min-h-[180px]' : 
                       width > 768 ? 'min-h-[150px]' : 'min-h-[120px]';
  
  return (
    <div 
      className={`grid ${gridClass} w-full`} 
      style={{ minHeight: "100px" }}
      role="grid"
      aria-label={isArabic ? "قائمة المنتجات" : "Products list"}
    >
      {products.map((product, index) => (
        <GlassCard
          key={product.id || `product-${index}`}
          animation="fade"
          delay={Math.min(index * 30, 300)} // Cap the delay at 300ms for better performance
          className={`cursor-pointer hover:shadow-md bg-secondary/30 p-1 product-card transition-transform duration-200 ease-in-out transform hover:scale-105 interactive ${cardSizeClass}`}
          onClick={(e) => handlePress(e, product)}
          onTouchStart={(e) => e.stopPropagation()} // Stop propagation for touch events
          onTouchEnd={(e) => handlePress(e, product)}
          role="button"
          tabIndex={0}
          aria-label={isArabic ? product.nameAr || product.name : product.name}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleProductClick(product);
            }
          }}
        >
          <div className="w-full aspect-square overflow-hidden rounded-md bg-muted mb-1 grid-item-square">
            {product.image ? (
              <img 
                src={product.image} 
                alt={isArabic ? product.nameAr || product.name : product.name}
                className="w-full h-full object-cover product-image transition-transform duration-200"
                loading="lazy" // Add lazy loading for better performance
                onError={(e) => {
                  // Fallback for broken images
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg'; // Use placeholder image
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                {isArabic ? "لا توجد صورة" : "No image"}
              </div>
            )}
          </div>
          <div className="text-center py-1">
            <p className="font-medium truncate text-sm">
              {isArabic ? product.nameAr || product.name : product.name}
            </p>
            <p className="text-xs text-white mt-0.5 bg-black/70 rounded-full px-2 py-0.5 inline-block">
              {product.variants && product.variants.length > 0 
                ? product.variants[0].price 
                : product.price} {isArabic ? "ر.س" : "SAR"}
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
