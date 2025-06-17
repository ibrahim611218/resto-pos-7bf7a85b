
import React from "react";
import { Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Package } from "lucide-react";

interface ProductImageProps {
  product: Product;
  viewMode: ViewMode;
  isArabic: boolean;
  hasImage: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ 
  product, 
  viewMode, 
  isArabic, 
  hasImage 
}) => {
  const getCardSizes = () => {
    if (viewMode === "grid-large") {
      return {
        imageHeight: "aspect-square",
        titleSize: "text-lg",
        priceSize: "text-sm",
        iconSize: 48
      };
    } else {
      return {
        imageHeight: "aspect-square",
        titleSize: "text-base",
        priceSize: "text-xs",
        iconSize: 32
      };
    }
  };

  const sizes = getCardSizes();

  if (hasImage) {
    return (
      <div className={`${sizes.imageHeight} bg-gray-100 relative`}>
        <img 
          src={product.image} 
          alt={isArabic ? product.nameAr || product.name : product.name}
          className="w-full h-full object-cover" 
        />
      </div>
    );
  }

  return (
    <div className={`${sizes.imageHeight} bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 relative flex flex-col items-center justify-center p-4 text-white overflow-hidden`}>
      <Package size={sizes.iconSize} className="mb-2 text-white opacity-90" />
      <div className="text-center">
        <h3 className={`${sizes.titleSize} font-bold mb-2 text-white leading-tight`}>
          {isArabic ? product.nameAr || product.name : product.name}
        </h3>
        {product.variants.length > 1 ? (
          <p className={`${sizes.priceSize} text-white opacity-90`}>
            {product.variants[0]?.price.toFixed(2)} - {product.variants[product.variants.length - 1]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </p>
        ) : (
          <p className={`${sizes.priceSize} text-white opacity-90`}>
            {product.variants[0]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
